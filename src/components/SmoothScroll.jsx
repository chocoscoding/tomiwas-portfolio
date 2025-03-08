"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }) {
  return (
    <ReactLenis
      root
      options={{
        smoothTouch: true,
        lerp: 0.03,
        smoothWheel: true,
        overscroll: false,
        gestureDirection: "vertical",
        smooth: true,
        touchMultiplier: 2,
      }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
