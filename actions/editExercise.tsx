"use server";

import { revalidatePath } from "next/cache";

export const editExerciseRevalidateServerAction = async (id: string | undefined | string[]) => {
  console.log(`/catalog/${id}`);
  revalidatePath(`/catalog/66582fb1b825f8f115bc936e`);
};
