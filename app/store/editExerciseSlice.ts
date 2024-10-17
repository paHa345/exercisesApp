import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IExercise } from "../types";
import { PutBlobResult } from "@vercel/blob";
import { appStateActions } from "./appStateSlice";
import { revalidatePath, revalidateTag } from "next/cache";
import { revalidate } from "../articles/page";

export const editExerciseAndUpdate = createAsyncThunk(
  "editExerciseState/editExerciseAndUpdate",
  async function (editExerciseData: any, { rejectWithValue, dispatch, getState }) {
    try {
      console.log(editExerciseData);

      const editedExercise = { ...editExerciseData.editedExercise };

      const file = editExerciseData.imageFile[0];
      console.log(file);

      if (file) {
        const uploadImageResponse = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = (await uploadImageResponse.json()) as PutBlobResult;

        console.log(newBlob.url);
        editedExercise.image = newBlob.url;
        console.log(editedExercise);
      }

      const UpdateExerciseReq = await fetch("/api/exercises/editExercise", {
        next: { revalidate: 1 },
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(editedExercise),
      });

      if (!UpdateExerciseReq.ok) {
        throw new Error("Ошибка сервера");
      }

      // const revalidate = await fetch("./../api/revalidate");
      // const revRes = await revalidate.json();
      // console.log(revRes);

      const editedExerciseRes = await UpdateExerciseReq.json();
      //   dispatch(userActions.updateWorkoutToEdited(editedWorkout));
      dispatch(appStateActions.updateExerciseToEdited(editedExerciseRes.result));
      // revalidateTag("collection");

      // console.log("first 22")

      return editedExerciseRes.result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum uploadExerciseFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IEditExerciseSlice {
  editExerciseState: {
    updateExerciseStatus: uploadExerciseFetchStatus;
    editedExercise: IExercise | null;
  };
}

interface IEditExerciseState {
  updateExerciseStatus: uploadExerciseFetchStatus;
  editedExercise: IExercise | null;
}

export const initEditexerciseState: IEditExerciseState = {
  updateExerciseStatus: uploadExerciseFetchStatus.Ready,
  editedExercise: null,
};

export const editExerciseSlice = createSlice({
  name: "editExerciseSlice",
  initialState: initEditexerciseState,
  reducers: {
    setEditedExerciseName(state, action) {
      if (state.editedExercise) {
        state.editedExercise.name = action.payload;
      }
    },
    setEditedExerciseType(state, action) {
      if (state.editedExercise) {
        state.editedExercise.type = action.payload;
      }
    },
    setEditedExerciseRaiting(state, action) {
      if (state.editedExercise) {
        state.editedExercise.raiting = Number(action.payload);
      }
    },
    setEditedExerciseMainMuscleGroup(
      state,
      action: {
        payload:
          | {
              nameRu: string;
              nameEn: string;
            }
          | undefined;
        type: string;
      }
    ) {
      if (state.editedExercise) {
        state.editedExercise.mainGroup = action.payload?.nameEn;
        state.editedExercise.mainGroupRu = action.payload?.nameRu;
      }
    },
    deleteEditedExerciseMuscleGroup(state, action) {
      state.editedExercise?.muscleGroups?.splice(action.payload, 1);
    },
    addEditedExerciseMuscleGroup(state, action) {
      state.editedExercise?.muscleGroups?.push(action.payload);
    },
    setEditedexerciseVideo(state, action) {
      if (state.editedExercise) {
        state.editedExercise.video = action.payload;
      }
    },
    setEditedExerciseDescription(state, action) {
      if (state.editedExercise) {
        state.editedExercise.description = action.payload;
      }
    },
    setEditedExerciseImage(state, action) {
      if (state.editedExercise) {
        state.editedExercise.image = action.payload;
      }
    },
    setEditedExercise(state, action) {
      //   console.log(action.payload);
      state.editedExercise = action.payload;
    },
    setUploadExercisestatusToReady(state) {
      state.updateExerciseStatus = uploadExerciseFetchStatus.Ready;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editExerciseAndUpdate.pending, (state) => {
      state.updateExerciseStatus = uploadExerciseFetchStatus.Loading;
    });

    builder.addCase(editExerciseAndUpdate.fulfilled, (state, action) => {
      state.updateExerciseStatus = uploadExerciseFetchStatus.Resolve;
    });

    builder.addCase(editExerciseAndUpdate.rejected, (state, action) => {
      state.updateExerciseStatus = uploadExerciseFetchStatus.Error;
    });
  },
});

export const editExerciseActions = editExerciseSlice.actions;
