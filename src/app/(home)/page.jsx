"use client";
import { useEffect, useRef, useState, useLayoutEffect, Suspense } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
// import "./home.css";
// import Footer from "../components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import dynamic from "next/dynamic";
import TopSection from "./TopSection";
import AboutMe from "./AboutMe";
import Slide from "./Slide";
import Projects from "./Projects";
import Skillset from "./Skillset";
import Footer from "../../components/Footer";
import { SplitText } from "gsap/SplitText";

let isInitialLoad = true;

const Home = () => {
  const preloaderRef = useRef(null);
  // const progressBarRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  let middleLineRef = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  }, []);

  useEffect(() => {
    return () => {
      isInitialLoad = true;
    };
  }, []);

  useGSAP(
    () => {
      if (showPreloader) {
        const tl = gsap.timeline({
          onComplete: () => setShowPreloader(false),
        });

        tl.to(".miniLogo p", {
          stagger: 0.125,
          y: 0,
          duration: 1.1,
          ease: "ease.in",
        });
        tl.to(".miniLogo p", {
          delay: 1,
          stagger: 0.14,
          y: -400,
          ease: "power3.in",
          duration: 1.5,
        });
        tl.to(preloaderRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          delay: -0.8,
          ease: "power1.in",
        });
      }
    },
    { dependencies: [showPreloader] }
  );

  return (
    <main className="home">
      {showPreloader && (
        <div className="pre-loader" ref={preloaderRef}>
          <div className="main">
            <div className="miniLogo">
              <p>S</p>
              <p>A</p>
            </div>
          </div>
        </div>
      )}
      <TopSection showPreloader={showPreloader} />
      <AboutMe />
      <br />
      <Skillset />
      <br />
      <Projects />
      <br />
      <Slide />
    </main>
  );
};

export default Home;
