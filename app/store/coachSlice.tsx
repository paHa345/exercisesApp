import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICoachToList, IUser } from "../types";
import { IAddToStudentsReq } from "../types";

export const fetchAllCoachesAndAddToState = createAsyncThunk(
  "coachState/fetchAllCoachesAndAddToState",
  async function (paramsQuery: string = "", { rejectWithValue, dispatch }) {
    try {
      console.log(paramsQuery);
      const req = await fetch(`../api/users/getAllCoaches${paramsQuery}`);
      const data: { message: string; result: ICoachToList[]; allCoachesCount: number } =
        await req.json();
      console.log(data);
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
      const data = await postSubmitAppReq.json();
      if (!postSubmitAppReq.ok) {
        throw new Error(data.message);
      }
      return data;
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
      const req = await fetch(`./api/coaches/getAddRequstsToCoach`);
      const data: { message: string; result: IAddToStudentsReq[] | [] } = await req.json();
      // console.log(data?.result?.addToStudentsRequests);
      dispatch(coachActions.setRequestsAppTpCoach(data?.result));
      return data;
    } catch (error: any) {
      dispatch(coachActions.setGetCoachRequestsStatusErrorMessage(error.message));
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
    getCoachRequestsErrorMessage: string;
    postSubmitAppErrorMessage: string;
    allCoachesCount: number;
    currentCoachesPage: number;
    searchCoachesQuery: string;
    requestsAppToCoach: IAddToStudentsReq[] | [];
  };
}

interface ICoachState {
  allCoachesArr: ICoachToList[];

  test: string;
  getAllCoachesStatus: coachFetchStatus;
  postSubmitApplicationStatus: coachFetchStatus;
  getCoachRequestsStatus: coachFetchStatus;
  getCoachRequestsErrorMessage: string;

  postSubmitAppErrorMessage: string;

  allCoachesCount: number;
  currentCoachesPage: number;
  searchCoachesQuery: string;
  requestsAppToCoach: IAddToStudentsReq[] | [];
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
  getCoachRequestsErrorMessage: "",
  postSubmitAppErrorMessage: "",
  allCoachesCount: 0,
  currentCoachesPage: 1,
  searchCoachesQuery: "",
  requestsAppToCoach: [],
  test: "Super Coach",
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
    setGetCoachRequestsStatusToReady(state) {
      state.getCoachRequestsStatus = coachFetchStatus.Ready;
    },
    setGetCoachRequestsStatusErrorMessage(state, action) {
      state.getCoachRequestsErrorMessage = action.payload;
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
    builder.addCase(fetchAllCoachesAndAddToState.fulfilled, (state) => {
      state.getAllCoachesStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(postSubmitApplicationToCoach.fulfilled, (state) => {
      state.postSubmitApplicationStatus = coachFetchStatus.Resolve;
    });
    builder.addCase(getCoachRequests.fulfilled, (state) => {
      state.getCoachRequestsStatus = coachFetchStatus.Resolve;
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
  },
});

export const coachActions = coachSlice.actions;
