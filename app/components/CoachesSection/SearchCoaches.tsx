import { AppDispatch } from "@/app/store";
import { ICoachSlice, coachActions } from "@/app/store/coachSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchCoaches = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();

  const searchCoachesQuery = useSelector(
    (state: ICoachSlice) => state.coachState.searchCoachesQuery
  );

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  const resetSearchCoachQuery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(coachActions.setSearchCoachesQuery(""));
    setsearchQuery("");
    router.push(`./coaches`);
  };

  const searchCoachFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery?.trim().length) {
      return;
    }
    if (searchQuery?.trim().length < 3) {
      return;
    }
    const filterEn = searchParams.get("filter") !== null ? searchParams.get("filter") : "popular";
    const increment =
      searchParams.get("increment") !== null ? searchParams.get("increment") : "increment";
    const page = searchParams.get("page") !== null ? searchParams.get("page") : "1";
    //добавить query
    const paramsString = `?filter=${filterEn}&increment=${increment}&page=${page}&query=${searchQuery?.trim()}`;

    dispatch(coachActions.setSearchCoachesQuery(searchQuery));
    console.log(paramsString);
    router.push(`./coaches${paramsString}`);
  };

  return (
    <div className=" py-3 max-w-fit flex flex-col md:flex-row gap-3 items-center  ">
      <form
        className=" flex rounded-md px-2 py-1 bg-amber-200"
        action="submit"
        onSubmit={searchCoachFormSubmitHandler}
      >
        <input
          className="rounded-md px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
          type="text"
          placeholder="Поиск тренера"
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

      {searchCoachesQuery.length > 0 && (
        <div className=" flex w-fit my-4 px-2 flex-row border-2 border-slate-400 rounded-md justify-center items-center">
          <h1>{searchCoachesQuery}</h1>
          <a href="" onClick={resetSearchCoachQuery}>
            <FontAwesomeIcon
              className=" mx-2 my-1 fa-xl hover:bg-slate-200 hover:rounded-xl  "
              icon={faCircleXmark}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default SearchCoaches;
