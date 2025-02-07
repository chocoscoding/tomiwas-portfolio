import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useLayoutEffect, useRef } from "react";
import ElasticLine from "../../components/physics/ElasticLine";
import ServiceCard from "./ServiceCard";
const Projects = () => {
  const mainRef = useRef(null);
  const projectHeadingRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);

  useGSAP(
    () => {
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
            start: "top bottom",
            end: "5% center",
            scrub: true,
            markers: true,
          },
        }
      );

      gsap.to(mainRef.current, {
        scale: 0.9,
        scrollTrigger: {
          trigger: "aboutWrapper",
          start: "center bottom",
          scrub: true,
        },
      });
    },
    { scope: mainRef.current }
  );
  return (
    <section className="projects" ref={mainRef}>
      <h2 ref={projectHeadingRef} className="projects_heading">
        Projects
      </h2>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </section>
  );
};

export default Projects;

const services = [
  {
    title1: "Jomor",
    title2: "Design",
    image: "/assets/img1.jpg",
    alt: "Web Development",
  },
  {
    title1: "Jomor",
    title2: "Design",
    image: "/assets/img2.jpg",
    alt: "App Development",
  },
  {
    title1: "Jomor",
    title2: "Design",
    image: "/assets/img3.jpg",
    alt: "Digital Marketing",
  },
  {
    title1: "Jomor",
    title2: "Design",
    image: "/assets/img4.jpg",
    alt: "Cloud Solutions",
  },
  {
    title1: "Jomor",
    title2: "Design",
    image: "/assets/img4.jpg",
    alt: "IT Consultancy",
  },
];
