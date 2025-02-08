"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

type SkewwerProps = {
  children: ReactNode;
  className?: string; // Optional CSS class for styling
  perspective?: number; // Depth perspective effect
  maxSkew?: number; // Maximum skew angle in degrees
};
const Skewwer: FC<SkewwerProps> = ({ children, className = "", perspective = 300, maxSkew = 15 }) => {
  // Ref to track the wrapper div and state to store the transform style
  const containerRef = useRef(null);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get the position and size of the wrapper element
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate the normalized difference between cursor and center
      const deltaX = (e.clientX - centerX) / width;
      const deltaY = (e.clientY - centerY) / height;

      // Calculate skew and rotation values based on cursor position
      const skewX = deltaX * maxSkew * 0.9;
      // const skewY = deltaY * maxSkew; // Skew along Y-axis
      const skewY = 0; // you can remove mine and add that if you want
      const rotateX = -deltaY * maxSkew;

      setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) skew(${skewX}deg, ${skewY}deg)`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxSkew, perspective]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        transform,
        transition: "transform 0.1s ease-out",
        transformOrigin: "center center",
      }}>
      {children}
    </div>
  );
};

export default Skewwer;
