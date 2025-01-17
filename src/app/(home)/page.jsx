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

let isInitialLoad = true;

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

  useGSAP(
    () => {
      if (showPreloader) {
        const tl = gsap.timeline({});
        let q = gsap.utils.selector(middleLineRef);
        const h3Elements = q("h3");

        tl.to(h3Elements[0], {
          opacity: 1,
          duration: 0.55,
        });
        tl.to(h3Elements[0], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[1],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to(h3Elements[1], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[2],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to(h3Elements[2], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[3],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to([h3Elements[3], ".middleLine"], {
          delay: 0.5,
          opacity: 0,
          duration: 0.5,
        });
        tl.to(
          ".miniLogo",
          {
            opacity: 1,
            x: "-50%",
            y: "-50%",
            scale: 1,
            duration: 2.25,
            ease: "sine.inOut",
          },
          ">-1.3"
        );
      }
    },
    { scope: preloaderRef.current, dependencies: [showPreloader] }
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
      <Skillset />
    </main>
  );
};

export default Home;
