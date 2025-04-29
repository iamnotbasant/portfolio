import { useEffect } from "react";
import { FirstPage } from "./Landing Page/FirstPage";
import { SecondPage } from "./Landing Page/SecondPage";
import { ThirdPage } from "./Landing Page/ThirdPage";
import { Footer } from "./Landing Page/Footer";
import Lenis from "lenis";
import "./styles/LandingPage.css";
export const LandingPage = () => {
  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      touchMultiplier: 2, // Better touch response
      lerp: 0.2, // Smoothness of the scroll
      smoothWheel: true,
      smoothTouch: true,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);
  return (
    <div className="landing-page  bg-[#f9f9f9]">
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      {/* <Footer /> */}
    </div>
  );
};
