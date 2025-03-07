"use client";

import { useMediaQuery } from "../../hooks/use-media-query";
import { LucideMoveUpRight as MoveUpRight } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import "./ProjectsList.css"; // Import the new CSS file

interface ImageData {
  id: string;
  img: string;
  title: string;
  slug: string;
}

const PortfolioProjects = [
  {
    title: "Flexible Dash",
    id: "Design",
    img: "/assets/img1.jpg",
    slug: "Web Development",
  },
  {
    title: "Athena",
    id: "Brand Identity",
    img: "/assets/img2.jpg",
    slug: "App Development",
  },
  {
    title: "Jomor",
    id: "UI/UX",
    img: "/assets/img3.jpg",
    slug: "Digital Marketing",
  },
  {
    title: "Esczpionade",
    id: "Fatchar Ers",
    img: "/assets/img4.jpg",
    slug: "Cloud Solutions",
  },
  {
    title: "ChocosCoding",
    id: "Website",
    img: "/assets/img4.jpg",
    slug: "IT Consultancy",
  },
  {
    title: "Flexible Dash",
    id: "Design",
    img: "/assets/img1.jpg",
    slug: "Web Development",
  },
  {
    title: "Athena",
    id: "Brand Identity",
    img: "/assets/img2.jpg",
    slug: "App Development",
  },
];

const images = PortfolioProjects.slice(0, 5);

const ProjectsLists: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeImage, setActiveImage] = useState<ImageData | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const prevCursorPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevCursorPosition.current.x;
    const dy = clientY - prevCursorPosition.current.y;

    // Apply easing to the cursor movement
    const easeAmount = 0.2;
    const newX = prevCursorPosition.current.x + dx * easeAmount;
    const newY = prevCursorPosition.current.y + dy * easeAmount;

    setCursorPosition({ x: newX, y: newY });
    prevCursorPosition.current = { x: newX, y: newY };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) return;
      requestRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
        requestRef.current = null;
      });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [handleMouseMove]);

  const handleImageHover = useCallback(
    (image: ImageData) => {
      if (activeImage !== image) {
        setActiveImage(image);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setOpacity(1);
          setScale(1);
        }, 50);
      } else {
        setOpacity(1);
        setScale(1);
      }
    },
    [activeImage]
  );

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    setScale(0.5);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveImage(null);
    }, 300);
  }, []);

  return (
    <div className="topWrapper" onMouseLeave={handleMouseLeave}>
      {images.map((image, index) => (
        <Link href={`/works/${image.slug}`} key={index} className="linkWrapper" onMouseEnter={() => handleImageHover(image)}>
          {!isDesktop && <img src={image?.img} className="mobileImg" title="mobileImg" />}
          <h2 className={`title ${activeImage?.id === image?.id ? "activeTitle" : ""}`}>{image.title}</h2>
          <button className={`button ${activeImage?.id === image?.id ? "activeButton" : ""}`}>
            <MoveUpRight className="icon" />
          </button>
          <div className={`underline ${activeImage?.id === image?.id ? "activeUnderline" : ""}`} />
        </Link>
      ))}
      {isDesktop && activeImage && (
        <img
          src={activeImage.img}
          title={activeImage.title}
          className="desktopImage"
          loading="eager"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity,
          }}
        />
      )}
    </div>
  );
};

export default ProjectsLists;
