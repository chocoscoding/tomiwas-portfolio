import React from "react";
import Button from "../../components/Main/Button";
const Footer = () => {
  return (
    <footer className="footer_container">
      <div className="footer_container_nested">
        <div className="footer_container_sticky_container">
          <p className="big">CONTACT</p>
          <p className="normal">{`Let's build something awesome like never before`}</p>
          <ul>
            <li>
              <Button>Mail: thomz@gmail.com</Button>
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
