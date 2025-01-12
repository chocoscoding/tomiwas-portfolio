import React, { useEffect, useRef, useState } from "react";
import "./TextTrailEffect.css"; // Move your CSS content here

// Utility functions
const lerp = (a, b, n) => (1 - n) * a + n * b;
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// React Component
const TextTrailEffect = ({
  totalTrailElements = 9,
  valuesFromTo = { x: [-100, 100], y: [-100, 100], opacity: [0.2, 1] },
  amt = (pos) => 0.02 * pos + 0.05,
  amtMain = null,
  children,
}) => {
  const trailRef = useRef(null);
  const [cursor, setCursor] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [winsize, setWinsize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [textTransforms, setTextTransforms] = useState(Array(totalTrailElements).fill({ x: 0, y: 0, opacity: 1 }));

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWinsize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Rendering loop
  useEffect(() => {
    const trailElems = trailRef.current?.children;

    const render = () => {
      const updatedTransforms = textTransforms.map((transform, i) => {
        const amtValue = i < totalTrailElements - 1 ? amt(i) : amtMain ?? amt(totalTrailElements - 1);

        return {
          x: lerp(transform.x, map(cursor.x, 0, winsize.width, valuesFromTo.x[0], valuesFromTo.x[1]), amtValue),
          y: lerp(transform.y, map(cursor.y, 0, winsize.height, valuesFromTo.y[0], valuesFromTo.y[1]), amtValue),
          opacity: lerp(transform.opacity, map(i, 0, totalTrailElements - 1, valuesFromTo.opacity[0], valuesFromTo.opacity[1]), amtValue),
        };
      });

      setTextTransforms(updatedTransforms);

      // Apply transformations to trail elements
      updatedTransforms.forEach((transform, i) => {
        if (trailElems[i]) {
          trailElems[i].style.transform = `translateX(${transform.x}px) translateY(${transform.y}px)`;
          trailElems[i].style.opacity = transform.opacity;
        }
      });

      requestAnimationFrame(render);
    };

    render();
  }, [cursor, textTransforms, winsize, totalTrailElements, amt, amtMain, valuesFromTo]);

  // Generate trail elements
  const generateTrailElements = () => {
    return Array.from({ length: totalTrailElements }, (_, i) => (
      <div key={i} className="trail-text">
        {children}
      </div>
    ));
  };

  return (
    <div ref={trailRef} className="trail">
      {generateTrailElements()}
    </div>
  );
};

export default TextTrailEffect;
