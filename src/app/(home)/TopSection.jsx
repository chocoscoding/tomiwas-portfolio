"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import CustomEase from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

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
      const tlMain = gsap.timeline({});

      const vsOpts = {
        slides: document.querySelectorAll(".skill-slide"),
        list: document.querySelector(".skill-slides"),
        duration: 1,
        lineHeight: 50,
      };

      const vSlide = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      tlMain.to([".hero-title .line h1"], {
        y: 0,
        stagger: 0.08,
        delay: showPreloader ? 2.3 : 1,
        duration: 1,
        onComplete: () => {
          vSlide.play();
        },
      });
      tlMain.to(particleContainerRef.current, { opacity: 1, ease: "expo.in" }, ">-1");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "10% top",
        end: "50% top",
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          const yAxis = 290 * self.progress * 1.4;
          gsap.to([".hero-title .line h1"], {
            y: yAxis,
          });
        },
      });

      vsOpts.slides.forEach(function (slide, i) {
        // Create a label
        let label = "slide" + i;
        vSlide.add(label);

        // Move the whole word
        if (i > 0) {
          vSlide.to(
            vsOpts.list,
            {
              duration: vsOpts.duration,
              y: i * -1 * vsOpts.lineHeight,
            },
            label
          );
        }
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
              <ul className="skill-slides">
                <li className="skill-slide" id="skillSlide1">
                  Product designer
                </li>
                <li className="skill-slide">Brand designer</li>
                {/* <li className="skill-slide">Motion designer</li>
                <li className="skill-slide">Marketing strategist</li> */}
                <li className="skill-slide">Product designer</li>
              </ul>
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
