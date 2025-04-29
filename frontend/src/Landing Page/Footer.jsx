import React from "react";
import "../styles/Footer.css";
import footer from "../assets/images/footer.png";

export const Footer = () => {
  return (
    <div className="h-[80vh] w-full  flex flex-col justify-end items-center  relative px-4">
      <div className="relative bg-[#0d0d0d] w-full h-full flex flex-col justify-center items-center rounded-t-4xl overflow-hidden">
        <div>
          <img
            src={footer}
            className="z-[1] absolute pointer-events-none bottom-1 sm:bottom-0 left-0 object-cover w-full h-full"
            alt=""
          />
        </div>
        <h1 className="sepulture z-[2] absolute bottom-10 sm:text-[300px] text-9xl pointer-events-none select-none text-[#767676] mix-blend-color-dodge ">
          Arkham
        </h1>
      </div>
    </div>
  );
};
