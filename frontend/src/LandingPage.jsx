import { useEffect } from "react";
import { FirstPage } from "./Landing Page/FirstPage";
import { Features } from "./Landing Page/Features";
import { Testimonials } from "./Landing Page/Testimonials";
import { Pricing } from "./Landing Page/Pricing";
import { CTA } from "./Landing Page/CTA";
import { FAQs } from "./Landing Page/FAQs";
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
      <Features />
      <Testimonials />
      <Pricing />
      <FAQs />
      <CTA />
      <Footer />
    </div>
  );
};
