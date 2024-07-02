import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ICoachToList,
  ICurrentCoachStudent,
  ICurrentCoachStudents,
  IReqToCoach,
  IUser,
} from "../types";
import { IAddToStudentsReq } from "../types";
import { userActions } from "./userSlice";

export const fetchAllCoachesAndAddToState = createAsyncThunk(
  "coachState/fetchAllCoachesAndAddToState",
  async function (paramsQuery: string = "", { rejectWithValue, dispatch }) {
    try {
      const req = await fetch(`../api/users/getAllCoaches${paramsQuery}`);
      const data: { message: string; result: ICoachToList[]; allCoachesCount: number } =
        await req.json();
      dispatch(coachActions.setAllCoachesArr(data.result));
      dispatch(coachActions.setAllCoachesCount(data.allCoachesCount));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postSubmitApplicationToCoach = createAsyncThunk(
  "coachState/postSubmitApplicationToCoach",
  async function (coachId: string = "", { rejectWithValue, dispatch }) {
    try {
      const postSubmitAppReq = await fetch(`./api/coaches/addToCoach`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachId: coachId,
        }),
      });
      const addedRequestToCoach = await postSubmitAppReq.json();
      if (!postSubmitAppReq.ok) {
        throw new Error(addedRequestToCoach.message);
      }

      const addedReqToCoach: IReqToCoach = addedRequestToCoach.result;
      dispatch(coachActions.addRequestToCoachInArray(addedReqToCoach));
      return addedRequestToCoach;
    } catch (error: any) {
      dispatch(coachActions.setPostSubmitAppToUserError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getCoachRequests = createAsyncThunk(
  "coachState/getCoachRequests",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch(`/api/coaches/getAddRequstsToCoach`);
      const data: { message: string; result: IAddToStudentsReq[] | [] } = await req.json();
      console.log(data);
      dispatch(coachActions.setRequestsAppTpCoach(data?.result));
      return data;
    } catch (error: any) {
      dispatch(coachActions.setGetCoachRequestsStatusErrorMessage(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const confirmAddToCoachRequest = createAsyncThunk(
  "coachState/confirmAddToCoachRequest",
  async function (addToCoachRequestId: string, { rejectWithValue, dispatch }) {
    try {
      const confirmAddToCoachReq = await fetch(`./api/coaches/confirmRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addToCoachRequestId: addToCoachRequestId,
        }),
      });

      const data = await confirmAddToCoachReq.json();
      if (!confirmAddToCoachReq.ok) {
        throw new Error(data.message);
      }
      dispatch(coachActions.setCurrentReqToCoachInactive(addToCoachRequestId));

      // return data;
      dispatch(coachActions.addToStudentsList(addToCoachRequestId));
    } catch (error: any) {
      dispatch(coachActions.setConfirmAddToCoachRequestErrorMessage(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentCoachStudentsAndSetInState = createAsyncThunk(
  "coachState/getCurrentCoachStudentsAndSetInState",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch(`./api/coaches/getCurrentCoachStudents`);
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      const data: { message: string; result: ICurrentCoachStudents[] | [] } = await req.json();

      dispatch(coachActions.setCurrentCoachStudents(data.result));

      return data;
    } catch (error: any) {
      dispatch(coachActions.setFetchCurrentCoachStudentsErrorMessage(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRequestByUser = createAsyncThunk(
  "coachState/deleteRequestByUser",
  async function (addToCoachRequest: IReqToCoach, { rejectWithValue, dispatch }) {
    try {
      const deletedAddToCoachReq = await fetch(`./api/requestsToCoach/deleteUserRequestToCoach`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addToCoachRequestId: addToCoachRequest._id,
        }),
      });

      const data = await deletedAddToCoachReq.json();
      if (!deletedAddToCoachReq.ok) {
        throw new Error(data.message);
      }
      console.log(addToCoachRequest);

      if (addToCoachRequest.rejectedByCoach === true) {
        //если запрос был отменён пользователем, то
        // запискаем диспатч, который найдёт и удалит этот запрос
        // у текущего пользователя из userSlice - currentUser
        console.log("Delete Rejected Request");
        dispatch(userActions.deleteRejectedRequestFromUser(addToCoachRequest._id));
      } else {
        dispatch(coachActions.deleteRequestFromCoachInArray(addToCoachRequest));
      }
      dispatch(coachActions.setDeletingRequestToFalse());

      return data;
    } catch (error: any) {
      dispatch(coachActions.setDeleteRequestByUserStatusErrorMessage(error.message));
      return rejectWithValue(error.message);
    }
  }
);

interface IaddToCoachRequestObj {
  addToCoachRequestId: string;
  status: string;
}

export const rejectOrDeleteRequestByCoachAndUpdateState = createAsyncThunk(
  "coachState/rejectRequestByCoach",
  async function (addToCoachRequestObj: IaddToCoachRequestObj, { rejectWithValue, dispatch }) {
    try {
      console.log(addToCoachRequestObj.addToCoachRequestId);

      const rejectOrDeleteRequestByCoachReq = await fetch(
        `./api/requestsToCoach/rejectOrDeleteRequestByCoach`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addToCoachRequestId: addToCoachRequestObj.addToCoachRequestId,
          }),
        }
      );

      const data = await rejectOrDeleteRequestByCoachReq.json();

      if (!rejectOrDeleteRequestByCoachReq.ok) {
        throw new Error(data.message);
      }

      if (addToCoachRequestObj.status === "request") {
        dispatch(
          coachActions.deleteRejectiongOrDeletingRequestByCoach(
            addToCoachRequestObj.addToCoachRequestId
          )
        );
      }
      if (addToCoachRequestObj.status === "student") {
        console.log("student");
        dispatch(
          coachActions.deleteStudentFromCoachesStudentsArr(addToCoachRequestObj.addToCoachRequestId)
        );
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum coachFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface ICoachSlice {
  coachState: {
    allCoachesArr: ICoachToList[];
    test: string;
    getAllCoachesStatus: coachFetchStatus;
    postSubmitApplicationStatus: coachFetchStatus;
    getCoachRequestsStatus: coachFetchStatus;
    confirmAddToCoachRequestStatus: coachFetchStatus;
    deleteRequestByUserStatus: coachFetchStatus;
    rejectOrDeleteRequestByCoachStatus: coachFetchStatus;
    getCoachRequestsErrorMessage: string;
    postSubmitAppErrorMessage: string;
    confirmAddToCoachRequestErrorMessage: string;
    deleteRequestByUserErrorMessage: string;
    rejectOrDeleteRequestByCoachErrorMessage: string;
    allCoachesCount: number;
    currentCoachesPage: number;
    searchCoachesQuery: string;
    requestsAppToCoach: IAddToStudentsReq[] | [];
    currentCoachStudents: ICurrentCoachStudent[] | [];
    fetchCurrentCoachStudentsStatus: coachFetchStatus;

    fetchCurrenrCoachStudentErrorMessage: string;
    deletingRequest: boolean;
  };
}

interface ICoachState {
  allCoachesArr: ICoachToList[];

  test: string;
  getAllCoachesStatus: coachFetchStatus;
  postSubmitApplicationStatus: coachFetchStatus;
  getCoachRequestsStatus: coachFetchStatus;
  confirmAddToCoachRequestStatus: coachFetchStatus;
  fetchCurrentCoachStudentsStatus: coachFetchStatus;
  deleteRequestByUserStatus: coachFetchStatus;
  rejectOrDeleteRequestByCoachStatus: coachFetchStatus;

  deleteRequestByUserErrorMessage: string;
  getCoachRequestsErrorMessage: string;
  postSubmitAppErrorMessage: string;
  confirmAddToCoachRequestErrorMessage: string;
  fetchCurrenrCoachStudentErrorMessage: string;
  rejectOrDeleteRequestByCoachErrorMessage: string;

  allCoachesCount: number;
  currentCoachesPage: number;
  searchCoachesQuery: string;
  requestsAppToCoach: IAddToStudentsReq[] | [];
  currentCoachStudents: ICurrentCoachStudent[] | [];
  deletingRequest: boolean;
}

export const initCoachState: ICoachState = {
  allCoachesArr: [
    {
      _id: "",
      email: "",
      name: "",
    },
  ],
  getAllCoachesStatus: coachFetchStatus.Ready,
  postSubmitApplicationStatus: coachFetchStatus.Ready,
  getCoachRequestsStatus: coachFetchStatus.Ready,
  confirmAddToCoachRequestStatus: coachFetchStatus.Ready,
  fetchCurrentCoachStudentsStatus: coachFetchStatus.Ready,
  deleteRequestByUserStatus: coachFetchStatus.Ready,
  rejectOrDeleteRequestByCoachStatus: coachFetchStatus.Ready,

  deleteRequestByUserErrorMessage: "",
  fetchCurrenrCoachStudentErrorMessage: "",
  getCoachRequestsErrorMessage: "",
  postSubmitAppErrorMessage: "",
  confirmAddToCoachRequestErrorMessage: "",
  rejectOrDeleteRequestByCoachErrorMessage: "",

  allCoachesCount: 0,
  currentCoachesPage: 1,
  searchCoachesQuery: "",
  requestsAppToCoach: [],
  test: "Super Coach",
  currentCoachStudents: [],
  deletingRequest: false,
};

export const coachSlice = createSlice({
  name: "coach",
  initialState: initCoachState,
  reducers: {
    setTest(state, action) {
      state.test = action.payload;
    },
    setAllCoachesArr(state, action) {
      state.allCoachesArr = action.payload;
    },
    setAllCoachesCount(state, action) {
      state.allCoachesCount = action.payload;
    },
    setCurrentCoachesPage(state, action) {
      state.currentCoachesPage = action.payload;
    },
    setSearchCoachesQuery(state, action) {
      state.searchCoachesQuery = action.payload;
    },
    setPostSubmitAppToUserError(state, action) {
      state.postSubmitAppErrorMessage = action.payload;
    },
    setPostSubmitApplicationStatusToReady(state) {
      state.postSubmitApplicationStatus = coachFetchStatus.Ready;
    },
    setRequestsAppTpCoach(state, action) {
      state.requestsAppToCoach = action.payload;
    },
    setCurrentReqToCoachInactive(state, action) {
      state.requestsAppToCoach = state.requestsAppToCoach.map((req) => {
        if (req._id === action.payload) {
          req.active = false;
        }
        return req;
      });
    },
    setGetCoachRequestsStatusToReady(state) {
      state.getCoachRequestsStatus = coachFetchStatus.Ready;
    },
    setGetCoachRequestsStatusErrorMessage(state, action) {
      state.getCoachRequestsErrorMessage = action.payload;
    },
    setConfirmAddToCoachRequestStatusToReady(state) {
      state.confirmAddToCoachRequestStatus = coachFetchStatus.Ready;
    },
    setConfirmAddToCoachRequestErrorMessage(state, action) {
      state.confirmAddToCoachRequestErrorMessage = action.payload;
    },
    setCurrentCoachStudents(state, action) {
      state.currentCoachStudents = action.payload;
    },
    setFetchCurrentCoachStudentsErrorMessage(state, action) {
      state.fetchCurrenrCoachStudentErrorMessage = action.payload;
    },
    addToStudentsList(state, action) {
      // console.log(action.payload);
      const reqIndex = state.requestsAppToCoach.findIndex(
        (element) => element._id === action.payload
      );

      //get current request
      console.log(state.requestsAppToCoach[0]);
      const student: ICurrentCoachStudent = {
        _id: action.payload,
        studentsArr: {
          studentId: {
            email: state.requestsAppToCoach[reqIndex].userId.email,
            name: state.requestsAppToCoach[reqIndex].userId.name,
            _id: state.requestsAppToCoach[reqIndex].userId._id,
          },
          addRequestId: action.payload,
        },
      };
      // state.currentCoachStudents.push(student);
      console.log(state.currentCoachStudents.length);
      if (!state.currentCoachStudents.length) {
        state.currentCoachStudents = [student];
      } else {
        const test: ICurrentCoachStudent[] = state.currentCoachStudents;
        test.push(student);
        state.currentCoachStudents = test;
      }
    },
    setDeletingRequestToFalse(state) {
      state.deletingRequest = false;
    },
    setDeletingRequestToTrue(state) {
      state.deletingRequest = true;
    },
    setDeleteRequestByUserStatusToReady(state) {
      state.deleteRequestByUserStatus = coachFetchStatus.Ready;
    },
    setDeleteRequestByUserStatusErrorMessage(state, action) {
      state.deleteRequestByUserErrorMessage = action.payload;
    },
    addRequestToCoachInArray(
      state,
      action: {
        payload: IReqToCoach;
        type: string;
      }
    ) {
      const currentCoach = state.allCoachesArr.find(
        (coach) => String(coach._id) === String(action.payload.coachId)
      );
      const currentCoachIndex = state.allCoachesArr.findIndex(
        (coach) => String(coach._id) === String(action.payload.coachId)
      );
      if (currentCoach?.requestToCoach) {
        currentCoach?.requestToCoach.push(action.payload);
      }
      state.allCoachesArr.forEach((coach) => {
        if (String(coach._id) === String(action.payload._id)) {
          return currentCoach;
        } else {
          return coach;
        }
      });
    },
    deleteRequestFromCoachInArray(
      state,
      action: {
        payload: IReqToCoach;
        type: string;
      }
    ) {
      const index = state.allCoachesArr.findIndex(
        (coach) => String(coach._id) === action.payload.coachId
      );

      state.allCoachesArr[index].requestToCoach = state.allCoachesArr[index].requestToCoach?.filter(
        (request) => String(request._id) !== String(action.payload._id)
      );
    },
    deleteRejectiongOrDeletingRequestByCoach(state, action) {
      console.log(action.payload);
      const updatedReq = state.requestsAppToCoach.filter((request) => {
        return String(request._id) !== action.payload;
      });
      state.requestsAppToCoach = updatedReq;
    },
    deleteStudentFromCoachesStudentsArr(state, action) {
      const updatedReq = state.currentCoachStudents.filter((student) => {
        return String(student.studentsArr.addRequestId) !== action.payload;
      });
      state.currentCoachStudents = updatedReq;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCoachesAndAddToState.pending, (state) => {
      state.getAllCoachesStatus = coachFetchStatus.Loading;
    });
    builder.addCase(postSubmitApplicationToCoach.pending, (state) => {
      state.postSubmitApplicationStatus = coachFetchStatus.Loading;
    });
    builder.addCase(getCoachRequests.pending, (state) => {
      state.getCoachRequestsStatus = coachFetchStatus.Loading;
    });
    builder.addCase(confirmAddToCoachRequest.pending, (state) => {
      state.confirmAddToCoachRequestStatus = coachFetchStatus.Loading;
    });
    builder.addCase(getCurrentCoachStudentsAndSetInState.pending, (state) => {
      state.fetchCurrentCoachStudentsStatus = coachFetchStatus.Loading;
    });
    builder.addCase(deleteRequestByUser.pending, (state) => {
      state.deleteRequestByUserStatus = coachFetchStatus.Loading;
    });
    builder.addCase(rejectOrDeleteRequestByCoachAndUpdateState.pending, (state) => {
      state.rejectOrDeleteRequestByCoachStatus = coachFetchStatus.Loading;
    });
    builder.addCase(fetchAllCoachesAndAddToState.fulfilled, (state) => {
      state.getAllCoachesStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(postSubmitApplicationToCoach.fulfilled, (state) => {
      state.postSubmitApplicationStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(getCoachRequests.fulfilled, (state) => {
      state.getCoachRequestsStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(confirmAddToCoachRequest.fulfilled, (state) => {
      state.confirmAddToCoachRequestStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(getCurrentCoachStudentsAndSetInState.fulfilled, (state) => {
      state.fetchCurrentCoachStudentsStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(deleteRequestByUser.fulfilled, (state) => {
      state.deleteRequestByUserStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(rejectOrDeleteRequestByCoachAndUpdateState.fulfilled, (state) => {
      state.rejectOrDeleteRequestByCoachStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(fetchAllCoachesAndAddToState.rejected, (state, action) => {
      state.getAllCoachesStatus = coachFetchStatus.Error;
    });
    builder.addCase(postSubmitApplicationToCoach.rejected, (state, action) => {
      state.postSubmitApplicationStatus = coachFetchStatus.Error;
    });
    builder.addCase(getCoachRequests.rejected, (state, action) => {
      state.getCoachRequestsStatus = coachFetchStatus.Error;
    });
    builder.addCase(confirmAddToCoachRequest.rejected, (state, action) => {
      state.confirmAddToCoachRequestStatus = coachFetchStatus.Error;
    });
    builder.addCase(getCurrentCoachStudentsAndSetInState.rejected, (state, action) => {
      state.fetchCurrentCoachStudentsStatus = coachFetchStatus.Error;
    });
    builder.addCase(deleteRequestByUser.rejected, (state, action) => {
      state.deleteRequestByUserStatus = coachFetchStatus.Error;
    });
    builder.addCase(rejectOrDeleteRequestByCoachAndUpdateState.rejected, (state, action) => {
      state.rejectOrDeleteRequestByCoachStatus = coachFetchStatus.Error;
    });
  },
});

export const coachActions = coachSlice.actions;
