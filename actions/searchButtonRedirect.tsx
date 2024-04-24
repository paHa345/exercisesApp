"use server";
import { redirect } from "next/navigation";

export async function searchButtonRedirect(searchQuery: string | null) {
  if (searchQuery !== null) {
    redirect(`/search?query=${searchQuery}`);
  }
}
