"use client";
import React, { useRef } from "react";
import "./about.css";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PortableText } from "next-sanity";

const AboutPage = (props) => {
  const { mainImageUrl, secondaryImageUrl, about, cv, education } = props;
  const container = useRef();
  const aboutCopyRef = useRef(null);
  const cvWrapperRef = useRef(null);
  const cvHeaderRef = useRef(null);
  const cvListRef = useRef(null);
  const heroImgRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);
    CustomEase.create("hop2", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1");

    if (aboutCopyRef.current) {
      new SplitText(".about-copy p", { type: "lines", linesClass: "aboutLine" });
      const split2 = new SplitText(".aboutLine", { type: "lines", linesClass: "aboutLine2" });
      gsap.fromTo(
        split2.lines,
        {
          y: 100,
        },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.05,
          delay: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );
    }

    if (cvWrapperRef.current) {
      new SplitText(".cv-item", { type: "lines", linesClass: "cvLine" });
      const split2 = new SplitText(".cvLine", { type: "words", linesClass: "cvNamee" });

      gsap.set([split2.words], { y: "100%" });

      ScrollTrigger.create({
        trigger: cvWrapperRef.current,
        start: "top 50%",
        onEnter: () => {
          gsap.to(split2.words, {
            y: 0,
            stagger: 0.01,
            duration: 1.4,
            ease: "power4.out",
          });
        },
      });
    }

    if (heroImgRef.current) {
      ScrollTrigger.create({
        trigger: heroImgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const scale = 1 + self.progress * 0.5;
          gsap.to(heroImgRef.current.querySelector("img"), {
            scale: scale,
            ease: "none",
            duration: 0.7,
          });
        },
      });
    }
  });

  useGSAP(
    () => {
      gsap.to(".about-portrait", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: 0.7,
        duration: 1.3,
        ease: "ease.in",
      });

      gsap.to(".about-copy-wrapper .about-copy-title h1", {
        y: 0,
        delay: 1,
        duration: 1.5,
        ease: "power4.out",
      });
    },
    { scope: container }
  );

  return (
    <div className="about-page" ref={container}>
      <div className="container">
        <div className="about-intro">
          <div className="col about-portrait-img">
            <div className="about-portrait">
              <img src={mainImageUrl} loading="eager" alt="Portrait" />
            </div>
          </div>
          <div className="col about-copy-wrapper">
            <div className="about-copy-title">
              <h1>Bio</h1>
            </div>

            <div className="about-copy" ref={aboutCopyRef}>
              <PortableText value={about} />
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="about-hero-img" ref={heroImgRef}>
        <img src={secondaryImageUrl} loading="eager" alt="Portrait" />
      </div>

      <div className="container-padding">
        <div className="cv-wrapper" ref={cvWrapperRef}>
          <div className="cv-header" ref={cvHeaderRef}>
            <h2>CV</h2>
          </div>

          <div className="cv-list" ref={cvListRef}>
            {cv.map((item, index) => (
              <div className="cv-item" key={item._key}>
                <div className="cv-name">
                  <h3>{item.name}</h3>
                </div>
                <div className="cv-year">
                  <h3>{item.year}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-padding">
        <div className="cv-wrapper">
          <div className="cv-header">
            <h2>Education</h2>
          </div>

          <div className="cv-list" ref={cvListRef}>
            {education.map((item, index) => (
              <div className="cv-item" key={item._key}>
                <div className="cv-name">
                  <h3>{item.name}</h3>
                </div>
                <div className="cv-year">
                  <h3>{item.year}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
