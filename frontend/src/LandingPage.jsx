import React from "react";
import { FirstPage } from "./Landing Page/FirstPage";
import { SecondPage } from "./Landing Page/SecondPage";
import "./styles/LandingPage.css";
export const LandingPage = () => {
  return (
    <div className="landing-page  bg-[#f9f9f9]">
      <FirstPage />
      <SecondPage />
    </div>
  );
};
