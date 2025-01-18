"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const AboutMe = () => {
  const mainRef = useRef(null);
  const pTagRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);

  useGSAP(
    () => {
      const tlForHand = gsap.timeline();
      var split = new SplitText(pTagRef.current, { type: "chars" });
      gsap.fromTo(
        split.chars,
        {
          filter: "blur(10px) brightness(25%)",
          willChange: "filter",
        },
        {
          ease: "none",
          filter: "blur(0px) brightness(100%)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: mainRef.current,
            start: "center bottom",
            end: "center center-=30%",
            scrub: true,
          },
        }
      );
    },
    { scope: mainRef.current }
  );
  return (
    <main className="aboutWrapper">
      <section className="aboutme" ref={mainRef}>
        <p ref={pTagRef}>
          Hi!<span className="wave">👋</span> My name is Ayotomiwa Solarin, but you can call me <span className="nameWrapper">Ayo😁.</span>{" "}
          I am a product designer, but generally wear multiple hats as a motion designer, Brand designer and Graphics designer{" "}
          <span className="specialText">(a full stack designer if you will)</span> and I’ve been doing what I love for 4 years now.
        </p>
      </section>
      <section className="whitespace"></section>
      <div className="aboutEnd"></div>
    </main>
  );
};

export default AboutMe;
