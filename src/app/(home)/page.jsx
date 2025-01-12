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

let isInitialLoad = false;

const Home = () => {
  const preloaderRef = useRef(null);
  // const progressBarRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  let middleLineRef = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
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
          delay: 5,
          ease: "hop-main",
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
            <p className="miniLogo">SA</p>
            <div className="middleLine" ref={middleLineRef}>
              <h3>When</h3>
              <h3>Creativity</h3>
              <h3>Meets</h3>
              <h3>Excellence</h3>
            </div>
          </div>
        </div>
      )}
      <TopSection showPreloader={showPreloader} />
      <AboutMe />
    </main>
  );
};

export default Home;
