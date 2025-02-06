import { Framer, Html, Css, Webflow, Figma, Xd, Photoshop, Ai, An, Ae, Blender } from "../../components/Icons";
import { Microscope, Globe, Laptop, Rocket, PaintRoller, Eye, ScanFace, PersonStanding, Sun } from "lucide-react";
import Gravity, { MatterBody } from "../../components/physics/Gravity";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Preview() {
  const skillRef = useRef(null);
  const [start, setStart] = useState(false);
  const [layoutConfig, setLayoutConfig] = useState({ incrementAmount: 0, itemsPerRow: 0, isLargeScreen: false });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);

  useGSAP(
    () => {
      var split = new SplitText(".skillset_title", { type: "lines", linesClass: "skillH2" });
      var split2 = new SplitText(".skillH2", { type: "words" });

      gsap.set(split2.words, {
        y: 200,
      });
      ScrollTrigger.create({
        trigger: skillRef.current,
        start: "top-=20% center",
        end: "top+=10% center",
        onEnter: () => {
          gsap.to(split2.words, {
            duration: 0.5,
            stagger: 0.05,
            y: 0,
          });
        },
        onLeave: () => {
          setStart(true);
        },
      });
    },
    { scope: skillRef.current }
  );

  const icons = [
    { icon: Xd, size: 24 },
    { icon: Photoshop, size: 24 },
    { icon: Ai, size: 24 },
    { icon: An, size: 24 },
    { icon: Ae, size: 24 },
    { icon: Eye, size: 24 },
    { icon: Blender, size: 24 },
    { icon: PersonStanding, size: 24 },
    { icon: Sun, size: 24 },
    { icon: Framer, size: 24 },
    { icon: Html, size: 24 },
    { icon: Css, size: 24 },
    { icon: Webflow, size: 24 },
    { icon: Figma, size: 24 },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this only runs on the client side

    const updateLayoutConfig = () => {
      const isLargeScreen = window.innerWidth >= 1400;
      const incrementAmount = window.innerWidth >= 1200 ? 100 / (icons.length / 2) : 100 / 6;
      const itemsPerRow = isLargeScreen ? icons.length / 2 : 6;

      setLayoutConfig({ incrementAmount, itemsPerRow, isLargeScreen });
    };

    updateLayoutConfig();
    window.addEventListener("resize", updateLayoutConfig);

    return () => window.removeEventListener("resize", updateLayoutConfig);
  }, []);

  return (
    <section className="skillset_section" ref={skillRef}>
      <h2 className="skillset_title">My skills</h2>

      <div className="skillset_container">
        <Gravity autoStart={start} gravity={{ x: 0, y: 1 }} resetOnResize className="skillset_gravity">
          <MatterBody
            isDraggable={true}
            matterBodyOptions={{ friction: 1, restitution: 0.1, angle: 0 }}
            bodyType="rectangle"
            x={`${50}%`}
            y={`${15}%`}
            angle={0}>
            <div className="skillset_icon circle image">
              <img src="/thomz.jpg" alt="main image" />
            </div>
          </MatterBody>
          {icons.map((IconData, index) => {
            const randomX = Math.random() * 60 + 20; // Random x between 20-80%
            const randomY = Math.random() * 20 + 50; // Random y between 5-25%
            // const randomAngle = Math.random() * 80;
            const Icon = IconData.icon;

            return (
              <MatterBody
                // angle={randomAngle}
                key={index}
                isDraggable={false}
                matterBodyOptions={{ friction: 0.7, restitution: 0.5, frictionAir: 0.05 }}
                bodyType="rectangle"
                x={`${randomX}%`}
                y={`${randomY}%`}>
                <div className="skillset_icon">
                  <Icon size={IconData.size} />
                </div>
              </MatterBody>
            );
          })}
        </Gravity>
      </div>
    </section>
  );
}
