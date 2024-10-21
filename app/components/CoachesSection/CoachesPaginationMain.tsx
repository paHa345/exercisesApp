import { ICoachSlice } from "@/app/store/coachSlice";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const CoachesPaginationMain = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const coachesCount = useSelector((state: ICoachSlice) => state.coachState.allCoachesCount);
  const currentPage = useSelector((state: ICoachSlice) => state.coachState.currentCoachesPage);

  const changePageButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const numberPageButton = Number(e.currentTarget.dataset.gotopage);
    console.log(numberPageButton);
    if (numberPageButton !== currentPage) {
      const filterEn = searchParams?.get("filter");
      const increment = searchParams?.get("increment");
      const query = searchParams?.get("query") !== null ? searchParams?.get("query") : "";

      const paramsString = `?filter=${filterEn}&increment=${increment}&page=${numberPageButton}&query=${query}`;
      router.push(`./coaches/${paramsString}`);
    }
  };

  const pagesCount = Math.ceil(coachesCount / 3);
  console.log(pagesCount);
  const pagesButton = [];
  let buttonCounter = 7;
  for (let i = currentPage - 3; i <= pagesCount; i++) {
    if (i === currentPage - 3) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === 1 ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={"GoToFirst"}
          data-gotopage={1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      );
    }
    if (i > 0 && buttonCounter > 0) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === i ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={i}
          data-gotopage={i}
        >
          {i}
        </button>
      );
      buttonCounter--;
    }

    if (i === pagesCount) {
      pagesButton.push(
        <button
          onClick={changePageButtonHandler}
          className={`${currentPage === pagesCount ? `bg-gray-600 text-slate-100` : `bg-stone-200`}  shadow-cardElementStartShadow self-center mx-3 my-3 py-1 px-2 rounded-md  hover:bg-gray-600  hover:text-slate-100  hover:shadow-cardElementShadow `}
          key={"GoToLast"}
          data-gotopage={pagesCount}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      );
    }
  }
  return (
    <div>
      {pagesCount > 1 && (
        <div>
          <h1>Страницы</h1>
          <div>{pagesButton}</div>
        </div>
      )}
    </div>
  );
};

export default CoachesPaginationMain;
