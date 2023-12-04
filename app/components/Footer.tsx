import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-mainColor">
      <div className=" footerMainContainer">
        <div className=" flex justify-center items-center">
          <Link className=" h-12" href="/">
            <div className=" h-12 w-24 mx-auto my-auto">
              <Image
                className=" w-full h-full"
                src="/logo.jpg"
                alt="mainLogo"
                height={100}
                width={100}
                // layout="respomsive"
              ></Image>
            </div>
          </Link>
        </div>
        <div className=" text-lg leading-9">
          {" "}
          <p className="">Адрес</p>
          <ul>
            <li>г.Новосибирск</li>
            <li>ул. Вилюйская дом 13</li>
            <li>9231271059</li>
          </ul>
        </div>
        <div className=" footerLinksContainer">
          <Link href="/" className=" footerLinks">
            Войти в личный кабинет
          </Link>
          <Link href="/" className=" footerLinks">
            Каталог
          </Link>
          <Link href="/" className=" footerLinks">
            Написать письмо
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
