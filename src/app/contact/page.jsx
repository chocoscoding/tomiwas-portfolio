"use client";
import React, { useEffect, useRef } from "react";
import "./contact.css";

import { gsap } from "gsap";
import { ReactLenis } from "@studio-freight/react-lenis";
import Button2 from "../../components/Main/Button2";
import Skewwer from "../../components/Main/TextSkew";

const Page = () => {
  const container = useRef();
  const headerRef = useRef();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.delayedCall(1.1, () => {
        sectionsRef.current.forEach((section) => {
          gsap.to(section.querySelectorAll("p"), {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={container}>
      <div className="container">
        <div className="footer_container_sticky_container">
          <br />
          <Skewwer perspective={1000}>
            <p className="big">CONTACT</p>
          </Skewwer>
          <br />
          <p className="normal">{`Let's build something awesome like never before`}</p>
          <ul>
            <li>
              <Button2 href="mailto:solarinthomz.st@gmail.com">Mail: solarinthomz.st@gmail.com</Button2>
            </li>
            <li>
              <Button2 href="https://www.linkedin.com">LinkedIn</Button2>
            </li>
            <li>
              <Button2 href="https://www.instagram.com">Instagram</Button2>
            </li>
            <li>
              <Button2 href="https://www.twitter.com">X/Twitter</Button2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
