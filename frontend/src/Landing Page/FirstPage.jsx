import React from "react";
import bg from "../assets/images/arkham.png";
import ParallaxStickers from "../components/ParallaxStickers";
import { Navbar } from "../components/Navbar";

export const FirstPage = () => {
  return (
    <div className="first-page min-h-screen w-full  relative">
      <Navbar />

      <div className="flex flex-col justify-center items-center absolute z-[1] w-full">
        <div className=" h-[90vh] w-[98vw] relative overflow-hidden rounded-4xl">
          <img
            src={bg}
            className="h-full w-full object-cover bg"
            alt="Arkham background"
          />
          <ParallaxStickers />
          {/* <div className="spotlight-1"></div>
          <div className="spotlight-2"></div> */}
        </div>
        <div className="z-[2] absolute sm:top-0 top-10 left-0 w-full h-screen flex flex-col sm:justify-center items-center">
          <div className="flex items-center justify-center gap-2 text-white px-3 py-1 rounded-full  uppercase shadow-lg batman-badge mb-4">
            <div className="dot"></div>Early Access
          </div>
          <p className="text-sm text-white mb-4 opacity-70 tracking-wide neue-reg">
            Trusted by developers from top tech companies
          </p>
          <h1 className="text-4xl font-bold text-center hero-text ">
            WELCOME TO <br />
            <span className="text-7xl">ARKHAM LABS</span>
          </h1>
          <p className="subhero-text text-xl text-center text-[#f9f9f9] mt-4">
            Where <span className="italic">elite</span> minds sharpen <br />{" "}
            their <span className="italic">coding powers.</span>
          </p>

          <button className="mt-10 get-started-btn">
            <span>✦</span> &nbsp; Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
