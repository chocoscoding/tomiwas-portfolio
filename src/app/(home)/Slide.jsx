"use client";
import React, { useLayoutEffect, useRef } from "react";
import Phrase from "./Phrase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Slide = () => {
  const slidesRef = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    const parent = gsap.utils.selector(".slides_container");
    const phrases = parent(".phrase");

    const scrollTigger1 = {
      trigger: ".slides",
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
    };

    gsap.to("#phrase2", {
      ease: "sine",
      x: 800,
      scrollTrigger: scrollTigger1,
    });
    gsap.to("#phrase1", {
      ease: "sine",
      x: -1400,
      scrollTrigger: scrollTigger1,
    });
    gsap.to("#phrase3", {
      ease: "sine",
      xPercent: -10,
      scrollTrigger: {
        ...scrollTigger1,
        scrub: 5,
        start: "top+=50px bottom",
        end: "bottom top+=100px",
      },
    });
  });

  return (
    <section className="slides">
      <div className="slides_container">
        <Phrase id={"phrase1"} text={`LET'S`} src={"/assets/lets.gif"} />
        <Phrase id={"phrase2"} text={`WORK`} src={"/assets/work.gif"} />
        <Phrase id={"phrase3"} text={`TOGETHER`} src={"/assets/together.gif"} />
      </div>
    </section>
  );
};

export default Slide;
