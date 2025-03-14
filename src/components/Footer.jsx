import React from "react";
import Button from "./Main/Button";
import FooterWithParticle from "./blocks/Backgrounds/Particles2/Particles2";
import { getContactInfo } from "../sanity/lib/query";
const Footer = async () => {
  const contactInfo = await getContactInfo();
  return (
    <FooterWithParticle
      particleColors={["#0f0f0f"]}
      particleCount={500}
      particleSpread={15}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={true}
      alphaParticles={false}
      disableRotation={true}>
      <div className="footer_container_nested">
        <div className="footer_container_sticky_container">
          <br />
          <p className="big">CONTACT</p>
          <br />
          <p className="normal">{`Let's build something awesome like never before`}</p>
          <ul>
            <li>
              <Button href={`mailto:${contactInfo.mail}`}>{`Mail: ${contactInfo.mail}`}</Button>
            </li>
            <li>
              <Button href={contactInfo.linkedin}>LinkedIn</Button>
            </li>
            <li>
              <Button href={contactInfo.instagram}>Instagram</Button>
            </li>
            <li>
              <Button href={contactInfo.x}>X/Twitter</Button>
            </li>
          </ul>
        </div>
      </div>
    </FooterWithParticle>
  );
};

export default Footer;
