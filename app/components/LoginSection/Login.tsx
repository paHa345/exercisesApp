"use client";

import { IAuthSlice, authActions } from "@/app/store/authSlice";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const Login = () => {
  const [onFocusStatus, setInFocusStatus] = useState({
    login: false,
    password: false,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const loginUserErrorMessage = useSelector(
    (state: IAuthSlice) => state.authState.loginUserErrorMessage
  );

  const pathname = usePathname();
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");

  useEffect(() => {
    const doc = document.getElementById("loginEl");
  }, []);

  const changeLoginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLoginValue(e.currentTarget.value);
  };

  const changePassHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassValue(e.currentTarget.value);
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "loginEl"
      ? setInFocusStatus({ ...onFocusStatus, login: true })
      : setInFocusStatus({ ...onFocusStatus, password: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    e.target.id === "loginEl"
      ? setInFocusStatus({ ...onFocusStatus, login: false })
      : setInFocusStatus({ ...onFocusStatus, password: false });
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: loginValue,
      password: passValue,
    });
    console.log(result);
    if (result?.error) {
      dispatch(authActions.setLoginUserErrorMessage(result.error));
    }

    if (!result?.error) {
      router.replace("/my");
    }
  };

  return (
    <div>
      <div className="pb-6">
        <h1 className=" text-center text-2xl font-bold">Вход</h1>
      </div>

      <div className=" shadow-exerciseCardHowerShadow p-3 max-w-xl mx-auto border-headerButtonHoverColor rounded-md border-solid border-2">
        <form className="  w-11/12 mx-auto" action="">
          <div className=" relative py-4">
            <input
              onChange={changeLoginHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              className="w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="loginEl"
              type="email"
              value={loginValue}
            />
            <span>
              <label
                htmlFor="loginEl"
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.login || loginValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
              >
                Учётная запись
              </label>
            </span>
          </div>
          <div className=" flex justify-end">
            <button className=" text-cyan-700 hover:bg-slate-100 px-4 py-2">
              <span>Регистрация</span>
            </button>
          </div>
          <div className="py-4 relative">
            <input
              onChange={changePassHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              value={passValue}
              className=" w-full py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="passEl"
              type="password"
            />
            <span>
              <label
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.password || passValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
                htmlFor="passEl"
              >
                Пароль
              </label>
            </span>
          </div>
          <div className=" flex justify-end">
            <button className=" text-cyan-700 hover:bg-slate-100 px-4 py-2">
              <span>Забыли пароль?</span>
            </button>
          </div>
          <div>
            {!loginUserErrorMessage ||
              (loginUserErrorMessage.length > 0 && (
                <div>
                  <h1 className=" text-center text-xl text-gray-950 rounded-md my-6  px-3 py-3 bg-rose-300">
                    {loginUserErrorMessage}
                  </h1>
                </div>
              ))}

            <button
              onClick={loginHandler}
              className=" text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max py-2 px-6 rounded bg-buttonColor hover:bg-buttonHoverColor"
            >
              {" "}
              Вход
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
