import React from "react";

const CoachesListLoadingCard = () => {
  return (
    <>
      <article className=" my-6 animate-pulse  transition-shadow px-1 py-2 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
        <div className=" flex flex-row gap-3 items-center">
          <h1 className=" mx-2 my-4 w-1/4 h-40 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>

          <div className=" flex flex-col w-1/2">
            <h1 className=" mx-2 my-4 h-6   bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
          </div>
          <h1 className=" mx-2 my-4 h-10 w-2/12 bg-mainColor rounded grow text-base text font-bold pl-1 pt-1"></h1>
        </div>
      </article>
      <article className="animate-pulse  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
        <div className=" flex flex-row gap-3 items-center">
          <h1 className=" mx-2 my-4 w-1/4 h-40 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>

          <div className=" flex flex-col w-1/2">
            <h1 className=" mx-2 my-4 h-6   bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
            <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
          </div>
          <h1 className=" mx-2 my-4 h-10 w-2/12 bg-mainColor rounded grow text-base text font-bold pl-1 pt-1"></h1>
        </div>
      </article>
    </>
  );
};

export default CoachesListLoadingCard;
