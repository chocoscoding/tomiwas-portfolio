"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./portfolio.css";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Page = ({ projects }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        const header = containerRef.current.querySelector(".portfolio-header h1");
        const cols = containerRef.current.querySelectorAll(".col");

        gsap.to(header, {
          y: 0,
          delay: 0.75,
          duration: 1.5,
          ease: "power4.out",
        });

        gsap.to(cols, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.5,
          delay: 0.9,
          ease: "power4.out",
          stagger: 0.1,
        });

        cols.forEach((col) => {
          const img = col.querySelector("img");
          const titleP = col.querySelector(".project-title h3");

          col.addEventListener("mouseenter", () => {
            gsap.to(img, {
              scale: 1.25,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 0,
              duration: 1,
              ease: "power4.out",
            });
          });

          col.addEventListener("mouseleave", () => {
            gsap.to(img, {
              scale: 1,
              duration: 2,
              ease: "power4.out",
            });
            gsap.to(titleP, {
              y: 24,
              duration: 1,
              ease: "power4.out",
            });
          });
        });
      }
    },
    { scope: containerRef }
  );

  const renderProjectRows = () => {
    console.log(projects);

    const rows = [];
    for (let i = 0; i < projects.length; i += 3) {
      rows.push(
        <div className="portfolio-row" key={i}>
          {projects.slice(i, i + 3).map((project, index) => (
            <div className={`col ${project.size}`} key={i + index}>
              <Link href={`/portfolio/${project.slug}`}>
                <img src={project.img} loading="eager" alt={project.name} />
                <div className="project-title">
                  <h3>{project.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={`portfolio-page loaded`} ref={containerRef}>
      <div className="container">
        <div className="portfolio-header">
          <h1>Portfolio</h1>
        </div>
        {renderProjectRows()}
      </div>
    </div>
  );
};

export default Page;
