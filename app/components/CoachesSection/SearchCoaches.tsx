import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SearchCoaches = () => {
  const [searchQuery, setsearchQuery] = useState("");

  const searchParams = useSearchParams();

  const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
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
    const paramsString = `?filter=${filterEn}&increment=${increment}&page=${page}`;

    console.log(searchQuery);
  };

  return (
    <div className=" py-3 max-w-fit ">
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
    </div>
  );
};

export default SearchCoaches;
