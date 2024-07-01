"use server";
import React from "react";
import CoachesSectionMain from "../components/CoachesSection/CoachesSectionMain";
import ReduxProvider from "../ReduxProvider";

export async function generateMetadata() {
  return {
    title: "Список тренеров",
  };
}

const page = () => {
  return (
    <ReduxProvider>
      <CoachesSectionMain></CoachesSectionMain>
    </ReduxProvider>
  );
};

export default page;
