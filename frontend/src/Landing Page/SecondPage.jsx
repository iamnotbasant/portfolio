import React from "react";
import bg from "../assets/images/arkham3.png";
import batrang from "../assets/images/batrang.png";
import brain from "../assets/images/brain.svg";
import bargraph from "../assets/images/bar-graph.svg";
import "../styles/SecondPage.css";

export const SecondPage = () => {
  return (
    <div className="second-page min-h-[95vh] p-4">
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden">
        {/* Background Image */}
        <img
          src={bg}
          className="absolute w-full h-full object-cover object-center bg"
          alt="Arkham background"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <h1 className="text-6xl text-center mt-16 neue-montreal text-white/90 tracking-tighter neue-med">
            Features{" "}
            <span className="italic tracking-normal text-5xl">
              (you'll love)
            </span>
          </h1>
          <p className="text-xl text-center mt-4 neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med">
            Your very own Alfred — here to prep, guide, and power you through
            every challenge.
          </p>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-24">
            <div className="card">
              <img
                src={brain}
                alt="Card 1"
                className="card-image w-16 rounded-full"
              />
              <h2 className="card-title neue-med">Curated Challenges</h2>
              <p className="card-description">
                Alfred wouldn’t send you into the field without preparation and
                neither do we. <br /> At Arkham Labs, every coding challenge is
                selected and{" "}
                <span className="bright-text">
                  sequenced to push your limits.
                </span>{" "}
                We tailor your journey to gradually build precision, speed, and
                confidence. No endless scrolling. No tutorial hell.{" "}
                <span className="bright-text">
                  Just a sharp climb to mastery.
                </span>
              </p>
            </div>

            <div className="card">
              <img
                src={batrang}
                alt="Card 2"
                className="card-image w-24 rounded-full"
              />
              <h2 className="card-title neue-med">
                Train Like League of Shadows
              </h2>
              <p className="card-description">
                Greatness is forged away from the spotlight. <br /> Practice in{" "}
                <span className="bright-text">real-world conditions</span> with
                timed challenges, limited hints, and dark-themed sessions built
                to mimic interview pressure. With every session, you'll be one
                step closer to walking into your interview like it’s{" "}
                <span className="bright-text">
                  Gotham and you own the night.
                </span>
              </p>
            </div>

            <div className="card">
              <img
                src={bargraph}
                alt="Card 3"
                className="card-image w-16 rounded-full"
              />
              <h2 className="card-title neue-med">
                Track Progress with Precision
              </h2>
              <p className="card-description">
                Even Batman checks in with Alfred. <br /> Our tracking system
                gives you <span className="bright-text">detailed insights</span>{" "}
                into your strengths, weaknesses, and historical performance.{" "}
                <span className="bright-text">
                  Watch your problem-solving improve week by week.
                </span>{" "}
                No guesswork — just clear metrics and intelligent suggestions on
                what to do next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
