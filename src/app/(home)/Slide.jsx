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
      scrub: true,
    };

    gsap.to("#phrase2", {
      x: -1500,
      scrollTrigger: scrollTigger1,
    });
    gsap.to("#phrase1", {
      x: 1500,
      scrollTrigger: scrollTigger1,
    });
    gsap.to("#phrase3", {
      x: -800,
      scrollTrigger: scrollTigger1,
    });
  });

  return (
    <section className="slides">
      <div className="slides_container">
        <Phrase id={"phrase1"} text={`LET'S`} src={"/assets/img1.jpg"} />
        <Phrase id={"phrase2"} text={`WORK`} src={"/assets/img1.jpg"} />
        <Phrase id={"phrase3"} text={`TOGETHER`} src={"/assets/img1.jpg"} />
      </div>
    </section>
  );
};

export default Slide;
