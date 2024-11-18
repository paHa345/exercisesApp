"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Aside from "./components/Aside";
import MainComponent from "./components/MainComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAppSlice, appStateActions, fetchBestExercisesAndSet } from "./store/appStateSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import LoadingCards from "./components/LoadingCardSection/LoadingCards";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [bestExercises, setBestExercises] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const bestExercises = useSelector((state: IAppSlice) => state.appState.exercises);
  const fetchStatus = useSelector((state: IAppSlice) => state.appState.fetchBestExercisesStatus);

  useEffect(() => {
    dispatch(fetchBestExercisesAndSet());
  }, []);

  // const sendBotHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("first");
  //   const dataReq = await fetch(
  //     "https://api.telegram.org/bot7577331969:AAGYO1E1Kz_hDPu8DPhXRMUv1Gx_HdTn7Iw/getMyName"
  //   );
  //   const data = await dataReq.json();
  //   console.log(data);
  // };

  return (
    <div className="mx-auto">
      <div className=" grid  grid-cols-mainGrid gap-3">
        <div className="col-span-2  mx-auto py-10">
          <h1 className=" text-4xl font-bold">Лучшие упражнения</h1>
        </div>
        {/* <div className=" col-span-2 md:col-span-1">
          <Aside></Aside>
        </div> */}
        <div className=" col-span-2  md:col-span-2">
          {fetchStatus === "loading" && (
            <section className="pb-10">
              <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <LoadingCards></LoadingCards>
              </div>
            </section>
          )}
          {bestExercises && <MainComponent></MainComponent>}
          {fetchStatus === "error" && (
            <h1 className=" text-center text-xl font-bold my-32">
              Ошибка. Не удалось получить данные с сервера. Повторите попытку позже
            </h1>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";

// export default function Home() {
//   const [file, setFile] = useState<File>();

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;

//     try {
//       const data = new FormData();
//       data.set("file", file);

//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: data,
//       });
//       // handle the error
//       if (!res.ok) throw new Error(await res.text());
//     } catch (e: any) {
//       // Handle errors here
//       console.error(e);
//     }
//   };

//   return (
//     <main>
//       <form onSubmit={onSubmit}>
//         <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
//         <input type="submit" value="Upload" />
//       </form>
//     </main>
//   );
// }
