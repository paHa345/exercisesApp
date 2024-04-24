"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { findExerciseAndSetInState } from "@/app/store/searchExerciseSlice";
import { useSession } from "next-auth/react";

const HeaderSerchButton = () => {
  const session = useSession();
  console.log(session.data?.user?.name);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>("");

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  const dispatch = useDispatch<AppDispatch>();

  const searchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery !== null) {
      const params = new URLSearchParams(searchParams);
      console.log(params);
      if (searchQuery) {
        params.set("query", searchQuery);
      } else {
        params.delete("query");
      }
      if ((searchQuery || "").trim().length < 3) {
        return;
      }
      if ((searchQuery || "").trim().length !== 0) {
        console.log("replace");
        if (searchQuery !== null) {
          replace(`/search?query=${searchQuery.trim()}`);
          dispatch(findExerciseAndSetInState(searchParams.get("query")));
        }
      }
    }
  };

  return (
    <div className=" absolute top-14 right-10 md:right-0  md:static">
      <form action="submit" onSubmit={searchFormSubmitHandler}>
        <input
          className=" px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
          type="text"
          placeholder="Поиск упражнения"
          // onChange={changeSearchQuery}
        />
      </form>
    </div>
  );
};

export default HeaderSerchButton;
