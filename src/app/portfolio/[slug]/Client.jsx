"use client";
import React, { useEffect, useLayoutEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import "./project.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PortableText } from "next-sanity";
import Button from "../../../components/Main/Button2";
import { InsertLink } from "../../../components/Icons";

const ForwardedPortableText = forwardRef((props, ref) => <PortableText {...props} ref={ref} />);
ForwardedPortableText.displayName = "ForwardedPortableText";

const Page = (props) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const firstImgRef = useRef(null);
  const imgRefs = useRef([]);
  const copyH3Refs = useRef([]);
  const nextProjectRef = useRef(null);
  const nextProjectTitleRef = useRef(null);

  const {
    textTwo,
    textOne,
    textThree,
    title,
    link,
    dateRange,
    publishedAt,
    mainImageUrl,
    imagesOneUrls,
    imagesTwoUrls,
    imagesThreeUrls,
    nextProject,
  } = props;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current, { y: 100 }, { y: -3, duration: 1.5, ease: "power4.out" });

      tl.fromTo(dateRef.current, { y: 100 }, { y: 0, duration: 1.5, ease: "power4.out" }, "-=1.4");

      tl.fromTo(
        firstImgRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1"
      );

      imgRefs.current.forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: img,
              start: "top 50%",
            },
          }
        );
      });

      const copies = document.querySelectorAll(".copy");

      copies.forEach((h3) => {
        gsap.from(h3, {
          y: 36,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: h3,
            start: "top 80%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="project-page" ref={containerRef}>
      <div className="container">
        <div className="project-page-title">
          <h1 ref={titleRef}>{title}</h1>
        </div>
        <div className="project-date">
          <p ref={dateRef}>{dateRange}</p>
        </div>
        {link && (
          <div className="project-url">
            <Button>
              <InsertLink />
            </Button>
          </div>
        )}

        <div className="project-content">
          <div className="img img-1" ref={firstImgRef}>
            <img loading="eager" src={mainImageUrl} alt="" />
          </div>

          {textOne && (
            <div className="copy">
              <ForwardedPortableText value={textOne} ref={(el) => (copyH3Refs.current[0] = el)} />
            </div>
          )}

          {imagesOneUrls.map((url, index) => (
            <div className={`img img-${index + imagesOneUrls.length}`} ref={(el) => (imgRefs.current[index] = el)} key={index}>
              <img loading="eager" src={url} alt="" />
            </div>
          ))}

          {textTwo && (
            <div className="copy">
              <ForwardedPortableText value={textTwo} ref={(el) => (copyH3Refs.current[1] = el)} />
            </div>
          )}

          {imagesTwoUrls.map((url, index) => (
            <div
              className={`img img-${index + imagesTwoUrls.length + imagesOneUrls.length}`}
              ref={(el) => (imgRefs.current[index + imagesOneUrls.length] = el)}
              key={index}>
              <img loading="eager" src={url} alt="" />
            </div>
          ))}

          {textThree && (
            <div className="copy">
              <ForwardedPortableText value={textThree} ref={(el) => (copyH3Refs.current[2] = el)} />
            </div>
          )}

          {imagesThreeUrls.map((url, index) => (
            <div
              className={`img img-${index + imagesThreeUrls.length + imagesOneUrls.length + imagesTwoUrls.length}`}
              ref={(el) => (imgRefs.current[index + imagesOneUrls.length + imagesTwoUrls.length] = el)}
              key={index}>
              <img loading="eager" src={url} alt="" />
            </div>
          ))}

          <div className="next-project" ref={nextProjectRef}>
            <p>Next Project</p>
          </div>
          <div className="next-project-title" ref={nextProjectTitleRef}>
            <Link href={`/portfolio/${nextProject.slug}`}>
              <h2>{nextProject.title}</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
