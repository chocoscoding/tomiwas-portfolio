import { Framer, Html, Css, Webflow, Figma } from "../../components/Icons";
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
        start: "top-=15% center",
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
    { icon: Microscope, size: 24 },
    { icon: Globe, size: 24 },
    { icon: Laptop, size: 24 },
    { icon: Rocket, size: 24 },
    { icon: PaintRoller, size: 24 },
    { icon: Eye, size: 24 },
    { icon: ScanFace, size: 24 },
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
          {icons.map((IconData, index) => {
            const { incrementAmount, itemsPerRow, isLargeScreen } = layoutConfig;
            const row = Math.floor(index / itemsPerRow);
            const col = index % itemsPerRow;
            const randomX = col * incrementAmount;
            const randomY = isLargeScreen ? row * 20 + Math.random() * 10 + 20 : row * 30 + Math.random() * 10 + 30;
            const randomAngle = Math.random() * 80;
            const Icon = IconData.icon;

            return (
              <MatterBody
                angle={randomAngle}
                key={index}
                matterBodyOptions={{ friction: 0.7, restitution: 0.5 }}
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
