"use client";
import {
  Atom,
  AudioLines,
  BatteryCharging,
  Brain,
  Cloud,
  Cog,
  Cpu,
  Cuboid,
  Database,
  Earth,
  Eye,
  Globe,
  HandMetal,
  Heart,
  Laptop,
  Layers,
  MessageCircle,
  Microscope,
  Move,
  Paintbrush,
  PaintRoller,
  PersonStanding,
  Pyramid,
  Regex,
  Rocket,
  Satellite,
  Save,
  ScanFace,
  Settings,
  Sigma,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import Gravity, { MatterBody } from "../../components/physics/Gravity";
import { Framer, Html, Css, Webflow, Figma } from "../../components/Icons";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Preview() {
  const skillRef = useRef(null);
  const [start, setStart] = useState(false);
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
        start: "top-=8% center",
        end: "top+=10% center",
        markers: true,
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
    { icon: Paintbrush, size: 100 },
  ];

  return (
    <section className="skillset_section" ref={skillRef}>
      <h2 className="skillset_title">My skills</h2>

      <div className="skillset_container">
        <Gravity autoStart={start} gravity={{ x: 0, y: 1 }} resetOnResize className="skillset_gravity">
          {icons.map((IconData, index) => {
            const incrementAmount = 100 / (icons.length / 2);
            const row = Math.floor(index / (icons.length / 2));
            const col = index % (icons.length / 2);
            const randomX = col * incrementAmount; // Increment x position
            const Icon = IconData.icon;
            // const randomX = Math.random() * 60 + 20; // Random x between 20-80%
            const randomY = Math.random() * 20 + 35; // Random y between 5-25%
            const randomAngle = Math.random() * 80; // Random deg between 0-40

            const bodyType = Math.random() > 0.7 ? "rectangle" : "rectangle";

            return (
              <MatterBody
                angle={randomAngle}
                key={index}
                matterBodyOptions={{ friction: 0.7, restitution: 0.5 }}
                bodyType={bodyType}
                x={`${randomX}%`}
                y={`${randomY}%`}>
                <div className={`skillset_icon ${bodyType === "circle" ? "circle" : "rectangle"}`}>
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
