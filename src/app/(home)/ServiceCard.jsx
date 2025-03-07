"use client";
import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";

const anim = {
  initial: { width: 0 },
  open: { width: "auto", transition: { duration: 0.4, type: "spring", bounce: 0 } },
  closed: { width: 0 },
};
const ServiceCard = (props) => {
  const imageContainerRef = useRef(null);
  const { title1, title2, image } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      className="projects_card">
      <p>{title1}</p>

      <motion.div variants={anim} animate={isActive ? "open" : "closed"} className="imgContainer" ref={imageContainerRef}>
        <img src={image} alt={title1} />
      </motion.div>

      <p>{title2}</p>
    </div>
  );
};
export default memo(ServiceCard);
