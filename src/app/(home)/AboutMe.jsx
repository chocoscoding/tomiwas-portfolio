"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

const AboutMe = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  return (
    <div className="aboutme">
      <h2>Hi, I am Ayo. I am a creative designer and animator that does this and that and those...I no sabi copywrite 🤣</h2>
    </div>
  );
};

export default AboutMe;
