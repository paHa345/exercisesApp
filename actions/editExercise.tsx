"use server";

import { revalidatePath } from "next/cache";

export const editExerciseRevalidateServerAction = async (id: string | undefined | string[]) => {
  revalidatePath(`https://exercises-app-one.vercel.app/catalog/66582fb1b825f8f115bc936e`);
};
