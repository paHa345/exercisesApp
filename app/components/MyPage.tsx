import Link from "next/link";
import React from "react";
import Train from "./TrainSection/Train";

const MyPage = () => {
  
  return (
    <section className=" container mx-auto">
      <div>
        <h1 className=" text-right text-4xl font-bold py-10"> Привет, paHa</h1>
      </div>
      <div>
        <Link className=" buttonStandart" rel="stylesheet" href="/my/addNewWorkout">
          Добавить тренировку
        </Link>
      </div>

      <div>
        <h1 className=" text-center text-4xl font-bold py-10"> Мои тренировки</h1>
      </div>
      <div className=" flex flex-col gap-5 pb-7">
        {/* <Train></Train>
        <Train></Train> */}
      </div>
    </section>
  );
};

export default MyPage;
