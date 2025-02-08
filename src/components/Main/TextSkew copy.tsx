import { useEffect, useRef, useState, ReactNode } from "react";

// Define the prop types for the SkewTransformWrapper component
type SkewTransformWrapperProps = {
  children: ReactNode; // The content to be wrapped and skewed
  className?: string; // Optional CSS class for styling
  perspective?: number; // Depth perspective effect
  maxSkew?: number; // Maximum skew angle in degrees
};

const SkewTransformWrapper: React.FC<SkewTransformWrapperProps> = ({ children, className = "", perspective = 800, maxSkew = 15 }) => {
  // Ref to track the wrapper div
  const containerRef = useRef<HTMLDivElement | null>(null);
  // State to store the transform style
  const [transform, setTransform] = useState<string>("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get the position and size of the wrapper element
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2; // Horizontal center
      const centerY = top + height / 2; // Vertical center

      // Calculate the normalized difference between cursor and center
      const deltaX = (e.clientX - centerX) / width;
      const deltaY = (e.clientY - centerY) / height;

      // Calculate skew and rotation values based on cursor position
      const skewX = deltaX * maxSkew; // Skew along X-axis
      const skewY = deltaY * maxSkew; // Skew along Y-axis
      const rotateX = deltaY * maxSkew; // Rotate along X-axis

      // Apply perspective and transform effect
      setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) skew(${skewX}deg, ${skewY}deg)`);
    };

    // Attach event listener to update transform on mouse move
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxSkew, perspective]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block", // Ensures the wrapper behaves as an inline-block
        transform, // Apply the computed transformation
        transition: "transform 0.1s ease-out", // Smooth transition effect
        transformOrigin: "center center", // Transform from the center
      }}>
      {children}
    </div>
  );
};

export default SkewTransformWrapper;
