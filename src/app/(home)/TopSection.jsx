"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import CustomEase from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import RotatingText from "../../components/blocks/TextAnimations/RotatingText/RotatingText";

const DynamicWebGLSphere = dynamic(() => import("../../components/WebGLSphere/WebGLSphere"), {
  suspense: false,
  ssr: false,
});

const TopSection = ({ showPreloader }) => {
  const topSectionRef = useRef(null);
  const containerRef = useRef(null);
  const particleContainerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
    CustomEase.create("hop", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");
  }, []);

  useGSAP(
    () => {
      const tlMain = gsap.timeline({
        ease: "power4.out",
      });

      tlMain.to([".hero-title .line h1"], {
        y: 0,
        stagger: 0.08,
        delay: showPreloader ? 2.3 : 1,
        duration: 1,
      });
      tlMain.to(particleContainerRef.current, { opacity: 1, ease: "expo.in" }, ">-1");

      tlMain.to([".hero-title .line h1"], {
        scale: 0.9,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "50% top",
          scrub: true,
        },
      });
    },
    { scope: topSectionRef, dependencies: [showPreloader] }
  );

  return (
    <section ref={topSectionRef} className="topsection">
      <div className="particleCont" ref={particleContainerRef}>
        <Suspense fallback={<></>}>
          <DynamicWebGLSphere />
        </Suspense>
      </div>
      <section className="top-section">
        <div className="home-page" ref={containerRef}>
          <div className="hero-title">
            <div className="line">
              <h1 className="h1_1">Solarin</h1>
            </div>
            <div className="line line2">
              <RotatingText
                texts={["Creative Designer", "Product Designer", "Brand designer", "Motion designer", "Marketing strategist"]}
                mainClassName="changing_career_cont"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.005}
                splitLevelClassName="changing_career"
                transition={{ type: "ease-in", damping: 50, stiffness: 400 }}
                rotationInterval={3500}
              />
            </div>
            <div className="line">
              <h1 className="h1_2">Ayotomiwa</h1>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TopSection;
