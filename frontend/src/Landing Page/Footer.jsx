import React from "react";
import "../styles/Footer.css";
import footer from "../assets/images/footer.png";

export const Footer = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col justify-end items-center rounded-t-4xl relative">
      <div>
        <img
          src={footer}
          className="z-[1] absolute pointer-events-none bottom-1 sm:bottom-0 left-0 grayscale"
          alt=""
        />
      </div>
      <h1 className="sepulture z-[2] sm:text-[300px] text-9xl pointer-events-none select-none text-[#767676] mix-blend-color-dodge">
        Arkham
      </h1>
    </div>
  );
};
