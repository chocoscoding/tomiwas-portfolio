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
import Skillset from "./Skillset";
import { SplitText } from "gsap/SplitText";

let isInitialLoad = true;

const Home = () => {
  const preloaderRef = useRef(null);
  // const progressBarRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  let middleLineRef = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
    CustomEase.create("hop-main", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");
  }, []);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useGSAP(
    () => {
      if (showPreloader) {
        const tl = gsap.timeline({
          onComplete: () => setShowPreloader(false),
        });

        tl.to(preloaderRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 2,
          delay: 1.5,
          ease: "hop-main",
        });
      }
    },
    { dependencies: [showPreloader] }
  );

  useGSAP(
    () => {
      if (showPreloader) {
        const tl = gsap.timeline({});
        tl.to(".miniLogo p", {
          stagger: 0.18,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }
    },
    { scope: preloaderRef.current, dependencies: [showPreloader] }
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
      <Skillset />
    </main>
  );
};

export default Home;
