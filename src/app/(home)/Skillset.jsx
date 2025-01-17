import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Skillset = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  });
  const skillsetRef = useRef(null);
  useGSAP(() => {
    const elements = document.querySelectorAll(".skillElement");

    // Convert NodeList to Array and shuffle elements randomly
    const randomizedElements = Array.from(elements).sort(() => Math.random() - 0.5);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillsetRef.current,
        // pin: true,
        start: "top top",
        end: "bottom center",
        scrub: true,
        pin: true,
      },
    });

    // Add animations to the timeline with stagger
    timeline.to(randomizedElements, {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.2, // Add a stagger delay between animations
    });

    const lineTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: skillsetRef.current,
        start: "top top+=25%",
        end: "10% 5%",
        scrub: true,
        markers: true,
      },
    });
    lineTimeline.to(".h1_3", {
      y: 0,
    });
    lineTimeline.to(".h1_line", {
      width: "90%",
      delay: 0.2,
      ease: "power4.out",
    });
  });
  return (
    <div className="skillset-section d-flex" ref={skillsetRef}>
      <div className="header line">
        <h1 className="h1_3">Skills</h1>
        <hr className="h1_line" />
      </div>
      <div className="skills d-flex">
        <h2 className="skillElement" id="figma">
          Figma
        </h2>
        <h2 className="skillElement" id="adobe">
          Adobe XD
        </h2>
        <h2 className="skillElement" id="html">
          HTML
        </h2>
        <h2 className="skillElement" id="css">
          CSS
        </h2>
        <h2 className="skillElement" id="javascript">
          JavaScript
        </h2>
        <h2 className="skillElement" id="webflow">
          WebFlow
        </h2>
        <h2 className="skillElement" id="wordpress">
          Wordpress
        </h2>
        <h2 className="skillElement" id="seo">
          SEO
        </h2>
        <h2 className="skillElement" id="digital">
          Digital Marketing
        </h2>
        <h2 className="skillElement" id="logo">
          Logo & Branding
        </h2>
        <h2 className="skillElement" id="animation">
          Animation and 3D
        </h2>
        <h2 className="skillElement" id="social">
          Social Media Design
        </h2>
        <h2 className="skillElement" id="reels">
          Reels for Instagram
        </h2>
      </div>
    </div>
  );
};

export default Skillset;
