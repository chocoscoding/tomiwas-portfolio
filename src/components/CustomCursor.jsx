"use client";
import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const requestRef = useRef(null);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const animateCursor = () => {
      const { x, y } = previousMousePosition.current;
      const mouseX = x - cursorRef.current.clientWidth / 2;
      const mouseY = y - cursorRef.current.clientHeight / 2;
      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    if (window.innerWidth >= 760) {
      document.addEventListener("mousemove", handleMouseMove);
      requestRef.current = requestAnimationFrame(animateCursor);

      document.querySelectorAll("a, .cursor-pointer").forEach((el) => {
        el.addEventListener("mousemove", () => {
          cursorRef.current.classList.add("cursor-active");
        });
        el.addEventListener("mouseleave", () => {
          cursorRef.current.classList.remove("cursor-active");
        });
      });
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <div className="app_cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
