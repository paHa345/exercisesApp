"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { findExerciseAndSetInState, searchExerciseActions } from "@/app/store/searchExerciseSlice";
import { searchButtonRedirect } from "@/actions/searchButtonRedirect";

const HeaderSerchButton = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const dispatch = useDispatch<AppDispatch>();

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // dispatch(searchExerciseActions.setSerchQuery(e.target.value));
  };

  const searchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery?.trim().length) {
      return;
    }

    dispatch(searchExerciseActions.setSerchQuery(searchQuery));

    if (searchQuery !== null) {
      replace(`/search?query=${String(searchQuery).trim()}`);
    }
    // searchButtonRedirect(searchQuery);

    // if (searchQuery !== null) {
    //   const params = new URLSearchParams(searchParams);
    //   console.log(params);
    //   if (searchQuery) {
    //     params.set("query", searchQuery);
    //   } else {
    //     params.delete("query");
    //   }
    //   if ((searchQuery || "").trim().length < 3) {
    //     return;
    //   }
    //   if ((searchQuery || "").trim().length !== 0) {
    //     if (searchQuery !== null) {
    //       // dispatch(findExerciseAndSetInState(searchParams.get("query")));
    //       // replace(`/search?query=${searchQuery.trim()}`);
    //       redirect(`/my`);
    //     }
    //   }
    // }
  };

  return (
    <div className=" absolute top-14 right-10 md:right-0  md:static">
      <form action="submit" onSubmit={searchFormSubmitHandler}>
        <input
          className=" px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
          type="text"
          placeholder="Поиск упражнения"
          onChange={changeSearchQuery}
        />
      </form>
    </div>
  );
};

export default HeaderSerchButton;
