import React from "react";
import Aside from "../components/Aside";
import { getServerSession } from "next-auth";
import MyPage from "./../components/MyPageComponent/MyPage";
import Link from "next/link";
import { authOptions } from "../utils/authOptions";
import { redirect } from "next/navigation";

const My = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
    // return (
    //   <div className="flex flex-col items-center my-32">
    //     <h1 className=" text-2xl my-5">Вы не зарегистрированы</h1>
    //     <Link
    //       className=" text-2xl my-5 hover:text-sky-700 hover:underline hover:underline-offset-4"
    //       href={`./login`}
    //     >
    //       Войти на сайт
    //     </Link>
    //   </div>
    // );
  }

  return <MyPage></MyPage>;
};

export default My;
