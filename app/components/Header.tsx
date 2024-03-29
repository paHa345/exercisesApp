import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard, faDumbbell, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  return (
    <header className=" bg-mainColor  py-4 pb-16 md:pb-4">
      <nav className=" relative flex flex-row items-center justify-center mx-6 gap-5">
        <Link className=" h-12 mr-12" href="/">
          <div className=" h-12 w-24">
            <Image
              className=" w-full h-full"
              src="/logo.jpg"
              alt="mainLogo"
              height={100}
              width={100}
              // layout="responsive"
            ></Image>
          </div>
        </Link>
        <div className=" absolute top-14 right-10 md:right-0  md:static">
          <input
            className=" px-2 py-2 border border-green-950 rounded-m bg-slate-100 hover:bg-slate-200"
            type="text"
            placeholder="Поиск упражнения"
          />
        </div>
        <div></div>
        <div className="pr-0 flex justify-end md:pr-10 md:justify-end gap-10 basis-1/2">
          <div className="">
            {" "}
            <Link
              href="/catalog"
              className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
            >
              {" "}
              <FontAwesomeIcon icon={faDumbbell} />
              <p className=" text-xs">Catalog</p>
            </Link>
          </div>
          {session.data && (
            <div>
              <Link
                href="/my"
                className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
              >
                <FontAwesomeIcon icon={faIdCard} />
                <p className=" text-xs">User</p>
              </Link>
            </div>
          )}

          {!session.data && (
            <div>
              {" "}
              <Link
                href="/login"
                className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
              >
                <FontAwesomeIcon className="" icon={faUser} />
                <p className=" text-xs">Login</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
