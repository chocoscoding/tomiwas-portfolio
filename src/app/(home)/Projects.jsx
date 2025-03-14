import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import ServiceCard from "./ServiceCard";
const Projects = ({ featured }) => {
  const mainRef = useRef(null);
  const projectHeadingRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    var split = new SplitText(projectHeadingRef.current, { type: "lines", linesClass: "projectHeadingLine" });
    var split2 = new SplitText(".projectHeadingLine", { type: "lines", linesClass: "aboutLine2" });
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
          start: "top+=40px bottom",
          end: "5% center",
          scrub: true,
        },
      }
    );

    gsap.to(mainRef.current, {
      scale: 0.9,
      scrollTrigger: {
        trigger: ".aboutWrapper",
        start: "center bottom",
        scrub: true,
      },
    });
  }, {});
  return (
    <section className="projects" ref={mainRef}>
      <h2 ref={projectHeadingRef} className="projects_heading">
        Projects
      </h2>
      {featured.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </section>
  );
};

export default Projects;
