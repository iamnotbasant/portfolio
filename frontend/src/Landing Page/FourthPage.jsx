import React from "react";
import bg from "../assets/images/arkham3.png";
import batrang from "../assets/images/batrang.png";
import "../styles/FourthPage.css";

export const FourthPage = () => {
  return (
    <div className="second-page min-h-[95vh] p-4">
      <div className="relative min-h-[95vh] rounded-4xl overflow-hidden sm:pb-0 pb-12">
        {/* Background Image */}
        <img
          src={bg}
          className="absolute w-full h-full sm:object-cover object-fill bg"
          alt="Arkham background"
        />

        {/* Content Layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center">
          <h1 className="sm:text-5xl text-4xl text-center mt-16 neue-montreal text-white/90 tracking-tighter neue-med">
            Simple Pricing. No Riddles.
          </h1>
          <p className="sm:text-lg text-base text-center mt-4 neue-montreal text-transparent bg-gradient-to-r from-white to-[#949494] bg-clip-text neue-med">
            Whether you're testing the waters or going full vigilante, we've got
            a plan.
          </p>

          {/* cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:px-24">
            <div className="card pricing-card">
              <div className="w-24 text-6xl">🕶️</div>
              <h2 className="neue-med">Free Tier</h2>
              <h3 className="card-title neue-med">₹0 /forever</h3>
              <p className="mb-6 neue-med">Perfect for casual coders</p>
              <p className="card-description">
                ✦ Try daily challenges <br />✦ Explore a few problem sets <br />{" "}
                ✦ Community solutions <br />✦ Basic progress tracking <br />✦
                Public leaderboards <br />✦ Get a feel for the platform
                <span className="bright-text"></span>{" "}
              </p>
            </div>

            <div className="card pricing-card">
              <div className="w-full flex items-center justify-center">
                <div className="badge neue-med">✨ User's choice </div>
              </div>

              <div className="w-24 text-4xl mb-4">⚡</div>
              <h2 className="neue-med">Pro Plan</h2>
              <h3 className="card-title neue-med">₹299/month</h3>
              <p className="mb-6 neue-med">For the serious interview prepper</p>
              <p className="card-description">
                ✦ Everything in the Free Tier <br />✦ Full problem vault
                <br />✦ Mock interviews <br />✦ Smart tracking and insights{" "}
                <br />✦ Resume reviews
              </p>
            </div>

            <div className="card pricing-card">
              <img src={batrang} alt="Card 3" className="card-image w-24" />
              <h2 className="neue-med">
                "Bat Signal” Plan <br />
              </h2>
              <h3 className="card-title neue-med">Contact Us</h3>
              <p className="mb-6 neue-med">For institutions and enterprise</p>
              <p className="card-description">
                ✦ Everything in the Pro Plan <br />✦ Custom training and
                advanced analytics.
                <br />✦ Early access to new features
                <br />✦ VIP Discord access <br />✦ Guaranteed feedback on
                solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
