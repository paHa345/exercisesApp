import React, { useState } from "react";

const Registration = () => {
  const [onFocusStatus, setInFocusStatus] = useState({
    email: false,
    name: false,
    password: false,
  });

  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const changeLoginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value);
  };

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNameValue(e.currentTarget.value);
  };

  const changePassHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassValue(e.currentTarget.value);
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: true });
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus({ ...onFocusStatus, [e.target.id]: false });
  };
  return (
    <div>
      <div className="pb-6">
        <h1 className=" text-center text-2xl font-bold">Регистрация в личном кабинете</h1>
      </div>

      <div className=" shadow-exerciseCardHowerShadow p-3 max-w-xl mx-auto border-headerButtonHoverColor rounded-md border-solid border-2">
        <form className="  w-11/12 mx-auto" action="">
          <div className=" relative py-4">
            <input
              onChange={changeLoginHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              className="w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="email"
              type="email"
              value={emailValue}
            />
            <span>
              <label
                htmlFor="email"
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.email || emailValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
              >
                Email
              </label>
            </span>
          </div>

          <div className=" relative py-4">
            <input
              onChange={changeNameHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              className="w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="name"
              type="email"
              value={nameValue}
            />
            <span>
              <label
                htmlFor="login"
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.name || nameValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
              >
                Имя
              </label>
            </span>
          </div>

          <div className="py-4 relative">
            <input
              onChange={changePassHandler}
              onFocus={focusElHandler}
              onBlur={focusOutElHandler}
              value={passValue}
              className=" w-full py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id="password"
              type="password"
            />
            <span>
              <label
                className={` absolute transition-all ease-in-out ${
                  onFocusStatus.password || passValue.length > 0
                    ? "z-10 top-1 left-0  bg-white   scale-75"
                    : " top-1/3 left-2"
                }`}
                htmlFor="password"
              >
                Пароль
              </label>
            </span>
          </div>

          <div>
            <button className=" text-slate-50 font-bold shadow-exerciseCardHowerShadow min-w-max py-2 px-6 rounded bg-buttonColor hover:bg-buttonHoverColor">
              {" "}
              Отправить заявку на регистрацию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
