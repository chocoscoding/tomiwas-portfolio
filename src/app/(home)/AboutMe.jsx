"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const AboutMe = () => {
  const mainRef = useRef(null);
  const wrapperRef = useRef(null);
  const pTagRef = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      var split = new SplitText(pTagRef.current, { type: "lines", linesClass: "aboutLine" });
      var split2 = new SplitText(".aboutLine", { type: "lines", linesClass: "aboutLine2" });
      gsap.fromTo(
        split2.lines,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "center bottom",
            end: "5%",
            scrub: true,
          },
        }
      );

      gsap.to(".aboutme", {
        scale: 0.9,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "center bottom",
          scrub: true,
        },
      });
    },
    { scope: wrapperRef }
  );
  return (
    <main className="aboutWrapper" ref={wrapperRef}>
      <section className="aboutme" ref={mainRef}>
        <p ref={pTagRef}>
          Hi!<span className="wave">👋</span> <br /> My name is Ayotomiwa Solarin, but you can call me{" "}
          <span className="nameWrapper">Ayo😁.</span> I am a product designer, but generally wear multiple hats as a motion designer, Brand
          designer and Graphics designer <span className="specialText">(a full stack designer if you will)</span> and I’ve been doing what I
          love for 4 years now.
        </p>
      </section>
      <section className="whitespace"></section>
      <div className="aboutEnd"></div>
    </main>
  );
};

export default AboutMe;
