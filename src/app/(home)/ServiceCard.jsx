"use client";
import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const anim = {
  initial: { width: 0 },
  open: { width: "auto", transition: { duration: 0.35, type: "ease", bounce: 0 } },
  closed: { width: 0 },
};
const ServiceCard = (props) => {
  const imageContainerRef = useRef(null);
  const { title, title2, image, slug } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <Link
      href={`/portfolio/${slug}`}
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
      className="projects_card">
      <p>{title}</p>

      <motion.div variants={anim} animate={isActive ? "open" : "closed"} className="imgContainer" ref={imageContainerRef}>
        <img src={image} loading="eager" alt={title} />
      </motion.div>

      <p>{title2}</p>
    </Link>
  );
};
export default memo(ServiceCard);
