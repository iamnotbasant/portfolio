import React, { useState } from "react";
import "../styles/Navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="flex justify-between items-center px-4 py-2 rounded-full w-[95%] mx-auto">
        <div className="logo text-4xl font-bold text-[#333] sepulture z-50">
          Arkham
        </div>

        {/* Mobile hamburger button */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div
            className={`hamburger-line line1 ${isOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line line2 ${isOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line line3 ${isOpen ? "active" : ""}`}
          ></div>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:block">
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

        {/* Desktop buttons */}
        <div className="hidden lg:flex gap-4">
          <button className="text-[#00105f] sign-in-btn hover:text-[#000] neue-montreal ease-in-out">
            Login
          </button>
          <button className="text-[#00105f] px-4 py-2 neue-montreal rounded-full sign-up-btn">
            Sign Up <span>✦</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu lg:hidden ${isOpen ? "open" : ""}`}>
        <ul className="pt-6 pb-8 flex flex-col items-center neue-montreal">
          <li className="py-4">
            <div className="mobile-nav-link">
              <span>How it works</span>
            </div>
          </li>
          <li className="py-4">
            <div className="mobile-nav-link">
              <span>Testimonials</span>
            </div>
          </li>
          <li className="py-4">
            <div className="mobile-nav-link">
              <span>Pricing</span>
            </div>
          </li>
          <li className="py-4">
            <div className="mobile-nav-link">
              <span>Features</span>
            </div>
          </li>
          <li className="py-4">
            <div className="mobile-nav-link">
              <span>FAQs</span>
            </div>
          </li>
          <div className="flex flex-col gap-4 mt-4 items-center w-full">
            <button className="text-[#00105f] sign-in-btn hover:text-[#000] neue-montreal transition duration-300 ease-in-out w-[80%]">
              Login
            </button>
            <button className="text-[#00105f] px-4 py-2 neue-montreal rounded-full hover:bg-[#555] transition duration-300 ease-in-out sign-up-btn">
              Sign Up <span>✦</span>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};
