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

      /*
      tlForHand.fromTo(
        split.chars[3],
        {
          width: 0,
        },
        {
          ease: "none",
          width: "auto",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top bottom-=60%",
            end: "top+=12% center",
            scrub: true,
          },
        }
      );
      tlForHand.to(
        split.chars[split.chars.length - 1],
        {
          position: "absolute",
          left: "+50%",
          transform: "translate(-50%, 0%)",
          scale: 40,
          borderRadius: "10px",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top+=10%",
            end: "center center-=50%",
            scrub: true,
            },
        },
        ">"
      );
      tlForHand.to(
        split.chars[split.chars.length - 1],
        {
          scale: 200,
          scrollTrigger: {
            markers: true,
            scrub: true,
          },
        },
        ">"
      );
      */

      // ScrollTrigger.create({
      //   trigger: ".pinned",
      //   start: "top top",
      //   endTrigger: ".whitespace",
      //   end: "bottom top",
      //   pin: true,
      //   pinSpacing: false,
      //   markers: true,
      // });

      // ScrollTrigger.create({
      //   trigger: ".header-info",
      //   start: "top top",
      //   endTrigger: ".whitespace",
      //   end: "bottom top",
      //   pin: true,
      //   pinSpacing: false,
      // });

      // ScrollTrigger.create({
      //   trigger: ".pinned",
      //   start: "top top",
      //   endTrigger: ".header-info",
      //   end: "bottom bottom",
      //   onUpdate: (self) => {
      //     const rotation = self.progress * 360;
      //     gsap.to(".revealer", { rotation });
      //   },
      // });

      // ScrollTrigger.create({
      //   trigger: ".pinned",
      //   start: "top top",
      //   endTrigger: ".header-info",
      //   end: "bottom bottom",
      //   onUpdate: (self) => {
      //     const progress = self.progress;
      //     const clipPath = `polygon(
      //    ${45 - 45 * progress}% ${0 + 0 * progress}%,
      //    ${55 + 45 * progress}% ${0 + 0 * progress}%,
      //    ${55 + 45 * progress}% ${100 - 0 * progress}%,
      //    ${45 - 45 * progress}% ${100 - 0 * progress}%
      //  )`;
      //     gsap.to(".revealer-1, .revealer-2", {
      //       clipPath: clipPath,
      //       ease: "none",
      //       duration: 0,
      //     });
      //   },
      // });

      // ScrollTrigger.create({
      //   trigger: ".header-info",
      //   start: "top top",
      //   end: "bottom 50%",
      //   scrub: 1,
      //   onUpdate: (self) => {
      //     const progress = self.progress;
      //     const left = 35 + (50 - 35) * progress;
      //     gsap.to(".revealer", {
      //       left: `${left}%`,
      //       ease: "none",
      //       duration: 0,
      //     });
      //   },
      // });

      // ScrollTrigger.create({
      //   trigger: ".whitespace",
      //   start: "top 50%",
      //   end: "bottom bottom",
      //   scrub: 1,
      //   onUpdate: (self) => {
      //     const scale = 1 + 12 * self.progress;
      //     gsap.to(".revealer", {
      //       scale: scale,
      //       ease: "none",
      //       duration: 0,
      //     });
      //   },
      // });
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
