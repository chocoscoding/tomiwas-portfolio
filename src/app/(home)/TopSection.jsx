import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const DynamicWebGLSphere = dynamic(() => import("../../components/WebGLSphere/WebGLSphere"), {
  suspense: false,
  ssr: false,
});

const TopSection = ({ showPreloader }) => {
  const topSectionRef = useRef(null);
  const containerRef = useRef(null);
  const particleContainerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(
    () => {
      if (showPreloader) {
        const tl = gsap.timeline({});
        let q = gsap.utils.selector(middleLineRef);
        const h3Elements = q("h3");

        tl.to(h3Elements[0], {
          opacity: 1,
          duration: 0.55,
        });
        tl.to(h3Elements[0], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[1],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to(h3Elements[1], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[2],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to(h3Elements[2], {
          opacity: 0,
          duration: 0.25,
        });
        tl.to(
          h3Elements[3],
          {
            opacity: 1,
            duration: 0.55,
          },
          "<0.2"
        );
        tl.to([h3Elements[3], ".middleLine"], {
          delay: 0.5,
          opacity: 0,
          duration: 0.5,
        });
        tl.to(
          ".miniLogo",
          {
            opacity: 1,
            x: "-50%",
            y: "-50%",
            scale: 1,
            duration: 2.25,
            ease: "sine.inOut",
          },
          ">-1.3"
        );
      }
    },
    { scope: topSectionRef, dependencies: [showPreloader] }
  );

  useGSAP(
    () => {
      const tlMain = gsap.timeline({});

      tlMain.fromTo(
        [".hero-title .line h1", ".hero-title .line h2"],
        {
          y: 300,
        },
        {
          y: 0,
          stagger: 0.1,
          delay: showPreloader ? 6 : 1,
          duration: 1,
        }
      );
      tlMain.to(particleContainerRef.current, { opacity: 1, ease: "expo.in" }, ">-1");

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "10% top",
        end: "50% top",
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          const yAxis = 290 * self.progress * 1.4;
          gsap.to([".hero-title .line h1"], {
            y: yAxis,
          });
        },
      });
    },
    { scope: topSectionRef, dependencies: [showPreloader] }
  );

  return (
    <section ref={topSectionRef} className="topsection">
      <div className="particleCont" ref={particleContainerRef}>
        <Suspense fallback={<></>}>
          <DynamicWebGLSphere />
        </Suspense>
      </div>
      <section className="top-section">
        <div className="home-page" ref={containerRef}>
          <div className="hero-title">
            <div className="line">
              <h1 className="h1_1">Ayotomiwa</h1>
            </div>
            <div className="line">
              <h2>Creative Designer</h2>
            </div>
            <div className="line">
              <h1 className="h1_2">Solarin</h1>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TopSection;
