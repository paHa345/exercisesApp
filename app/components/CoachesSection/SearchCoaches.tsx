import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchCoaches = () => {
  return (
    <div className=" py-3 max-w-fit ">
      <form
        className=" flex rounded-md px-2 py-1 bg-amber-200"
        action="submit"
        // onSubmit={searchCoachFormSubmitHandler}
      >
        <input
          className="rounded-md px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
          type="text"
          placeholder="Поиск тренера"
          //   onChange={changeSearchQuery}
          //   value={searchCoachQuery}
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
