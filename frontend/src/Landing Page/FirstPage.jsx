import React from "react";
import bg from "../assets/images/arkham.png";
import ParallaxStickers from "../components/ParallaxStickers";
export const FirstPage = () => {
  return (
    <div className="first-page min-h-screen w-full  relative">
      {/* Navbar  */}
      <div className="navbar">
        <div className="flex justify-between items-center px-4 py-2 rounded-full w-[98vw] mx-auto">
          <div className="logo text-4xl font-bold text-[#333] sepulture">
            Arkham
          </div>
          <div>
          <ul className="neue-montreal">
              <li className="inline-block px-4 py-2">
                <div className="nav-link-container">
                  <span className="nav-link-text">How it works</span>
                  <span className="nav-link-text-clone">How it works</span>
                </div>
              </li>
              <li className="inline-block px-4 py-2">
                <div className="nav-link-container">
                  <span className="nav-link-text">Testimonials</span>
                  <span className="nav-link-text-clone">Testimonials</span>
                </div>
              </li>
              <li className="inline-block px-4 py-2">
                <div className="nav-link-container">
                  <span className="nav-link-text">Pricing</span>
                  <span className="nav-link-text-clone">Pricing</span>
                </div>
              </li>
              <li className="inline-block px-4 py-2">
                <div className="nav-link-container">
                  <span className="nav-link-text">Features</span>
                  <span className="nav-link-text-clone">Features</span>
                </div>
              </li>
              <li className="inline-block px-4 py-2">
                <div className="nav-link-container">
                  <span className="nav-link-text">FAQs</span>
                  <span className="nav-link-text-clone">FAQs</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex gap-4">
            <button className="text-[#00105f] sign-in-btn hover:text-[#000] neue-montreal transition duration-300 ease-in-out">
              Login
            </button>
            <button className=" text-[#00105f] px-4 py-2 neue-montreal rounded-full hover:bg-[#555] transition duration-300 ease-in-out sign-up-btn">
              Sign Up <span>✦</span>
            </button>
          </div>
        </div>
      </div>

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
        <div className="z-[2] absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
          <div className="flex items-center justify-center gap-2 text-white px-3 py-1 rounded-full  uppercase shadow-lg batman-badge mb-4">
            <div className="dot"></div>Early Access
          </div>
          <p className="text-sm text-white mb-4 opacity-70 tracking-wide neue-montreal">
            Trusted by developers from top tech companies
          </p>
          <h1 className="text-5xl font-bold text-center hero-text ">
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
