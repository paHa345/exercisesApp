"use client";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import SessionProviderComponent from "../SessionProviderSection/SessionProvider";

const MainLayout = (props: any) => {
  return (
    <>
      <SessionProviderComponent>
        <Header></Header>
        <main
          className=" w-11/12
        mx-auto"
        >
          {props.children}
        </main>
        <Footer></Footer>
      </SessionProviderComponent>
    </>
  );
};

export default MainLayout;
