import { useState, useEffect, memo } from "react";
import bat from "../assets/images/batrang.png";

import "../styles/ParallaxStickers.css";
const ParallaxStickers = memo(() => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="stickers-container">
      <img
        src={bat}
        alt="sticker"
        className="parallax-sticker sticker-1"
        style={{
          transform: `translate(${position.x * 2}px, ${position.y * 2}px)`,
        }}
      />
      <img
        src={bat}
        alt="sticker"
        className="parallax-sticker sticker-2"
        style={{
          transform: `translate(${position.x * -3}px, ${position.y * -3}px)`,
        }}
      />
      <img
        src={bat}
        alt="sticker"
        className="parallax-sticker sticker-3"
        style={{
          transform: `translate(${position.x * 3}px, ${position.y * 3}px)`,
        }}
      />
    </div>
  );
});

export default ParallaxStickers;
