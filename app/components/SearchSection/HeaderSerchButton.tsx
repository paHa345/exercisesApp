"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { findExerciseAndSetInState, searchExerciseActions } from "@/app/store/searchExerciseSlice";
import { searchButtonRedirect } from "@/actions/searchButtonRedirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HeaderSerchButton = () => {
  const { replace } = useRouter();
  const { push } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery?.trim().length) {
      return;
    }
    if (searchQuery?.trim().length < 3) {
      return;
    }

    if (searchQuery !== null) {
      push(`/search?query=${String(searchQuery).trim()}&page=1`);
    }

    setSearchQuery("");
  };

  return (
    <div className=" absolute top-14 right-10 md:right-0  md:static">
      <form
        className=" flex rounded-md px-2 py-1 bg-amber-200"
        action="submit"
        onSubmit={searchFormSubmitHandler}
      >
        <input
          className="rounded-md px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
          type="text"
          placeholder="Поиск упражнения"
          onChange={changeSearchQuery}
          value={searchQuery}
        />
        <button
          className=" flex items-center ml-2 border-slate-800 border-solid border-2 rounded-md hover:border-double"
          type="submit"
        >
          <FontAwesomeIcon className=" mx-2 my-1 animate-bounce-slow " icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default HeaderSerchButton;
