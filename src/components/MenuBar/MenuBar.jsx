import React from "react";
import Link from "next/link";
import "./MenuBar.css";
import MenuBtn from "../MenuBtn/MenuBtn";

const MenuBar = ({ isOpen, toggleMenu, closeMenu }) => {
  return (
    <div className="menu-bar">
      <div className="menu-toggle-wrapper">
        <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>

      <div className="logo cursor-pointer" onClick={closeMenu}>
        <Link href="/">SA</Link>
      </div>

      <div className="portfolio-year">
        <p>&copy; 2024</p>
      </div>
    </div>
  );
};

export default MenuBar;
