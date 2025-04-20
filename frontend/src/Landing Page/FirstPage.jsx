import React from "react";
import bg from "../assets/images/arkham.png";
import batrang from "../assets/images/batrang.png";
export const FirstPage = () => {
  return (
    <div className="first-page h-screen w-screen relative">
      <div className="flex justify-center items-center absolute z-[1] w-full h-screen">
        <div className=" h-[90vh] w-[95vw] relative overflow-hidden">
          <img
            src={bg}
            className="rounded-4xl  h-full w-full object-cover"
            alt="Arkham background"
          />
          <img
            className="absolute top-[5vw] right-[40vw] rotate-[-20deg]  scale-[0.5] blur-[12px]"
            src={batrang}
            alt=""
          />
          <img
            className="absolute top-[-20vw] left-[40vw] rotate-[20deg]  scale-[0.3] blur-[8px] "
            src={batrang}
            alt=""
          />
          <img
            className="absolute top-[-20vw] left-[-44vw] rotate-[20deg]  scale-[0.14] blur-[26px] "
            src={batrang}
            alt=""
          />
        </div>
      </div>

      <div className="z-[2] absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center hero-text text-white">
          WELCOME TO <br />
          <span className="text-7xl">ARKHAM LABS</span>
        </h1>
        <p className="subhero-text text-xl text-center text-[#f9f9f9] mt-4">
          Where <span className="italic">elite</span> minds sharpen <br /> their{" "}
          <span className="italic">coding powers.</span>
        </p>
      </div>
    </div>
  );
};
