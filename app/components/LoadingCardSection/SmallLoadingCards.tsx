import React from "react";

const SmallLoadingCards = () => {
  return (
    <>
      <article className=" animate-pulse  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
        <div className=" flex flex-col">
          <div>
            <div className=" space-x-4 flex flex-col gap-2">
              <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
              <div className=" flex flex-row justify-around">
                <p className=" h-6 w-1/6  bg-baseColour self-center py-1 px-2 rounded-md"></p>

                <p className=" h-6 w-1/6   bg-mainGroupColour self-center py-1 px-2 rounded-md"></p>
              </div>
            </div>
            <div className=" flex flex-row justify-center"></div>
          </div>

          <div className=" flex flex-col">
            <div className=" h-6 w-1/3  bg-slate-200 my-3 self-end pt-1"></div>
          </div>
          <div className=" h-8 py-2 bg-mainColor rounded-md"></div>
        </div>
      </article>
      {/* <article className=" animate-pulse  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
        <div className=" flex flex-col">
          <div>
            <div className=" space-x-4 flex flex-col gap-2">
              <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
              <div className=" flex flex-row justify-around">
                <p className=" h-6 w-1/6  bg-baseColour self-center py-1 px-2 rounded-md"></p>

                <p className=" h-6 w-1/6   bg-mainGroupColour self-center py-1 px-2 rounded-md"></p>
              </div>
            </div>
            <div className=" flex flex-row justify-center"></div>
          </div>

          <div className=" flex flex-col">
            <div className=" h-6 w-1/3  bg-slate-200 my-3 self-end pt-1"></div>
          </div>
          <div className=" h-8 py-2 bg-mainColor rounded-md"></div>
        </div>
      </article>
      <article className=" animate-pulse  transition-shadow px-1 py-1 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
        <div className=" flex flex-col">
          <div>
            <div className=" space-x-4 flex flex-col gap-2">
              <h1 className=" mx-2 my-4 h-6 bg-slate-200 rounded grow text-base text font-bold pl-1 pt-1"></h1>
              <div className=" flex flex-row justify-around">
                <p className=" h-6 w-1/6  bg-baseColour self-center py-1 px-2 rounded-md"></p>

                <p className=" h-6 w-1/6   bg-mainGroupColour self-center py-1 px-2 rounded-md"></p>
              </div>
            </div>
            <div className=" flex flex-row justify-center"></div>
          </div>

          <div className=" flex flex-col">
            <div className=" h-6 w-1/3  bg-slate-200 my-3 self-end pt-1"></div>
          </div>
          <div className=" h-8 py-2 bg-mainColor rounded-md"></div>
        </div>
      </article> */}
    </>
  );
};

export default SmallLoadingCards;
