import React from "react";
import Button from "../../components/Main/Button";
import TextSkew from "../../components/Main/TextSkew";
const Footer = () => {
  return (
    <footer className="footer_container">
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
    </footer>
  );
};

export default Footer;
