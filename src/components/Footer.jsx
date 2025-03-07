import React from "react";
import Button from "./Main/Button";
import TextSkew from "./Main/TextSkew";
import FooterWithParticle from "./blocks/Backgrounds/Particles2/Particles2";
const Footer = () => {
  return (
    <FooterWithParticle
      particleColors={["#221a1a"]}
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
              <Button>Mail: chocoscoding@gmail.com</Button>
            </li>
            <li>
              <Button>LinkedIn</Button>
            </li>
            <li>
              <Button>Instagram</Button>
            </li>
            <li>
              <Button>X/Twitter</Button>
            </li>
          </ul>
        </div>
      </div>
    </FooterWithParticle>
  );
};

export default Footer;
