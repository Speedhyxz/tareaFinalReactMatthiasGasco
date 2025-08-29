import React, { useState } from "react";
import { NavLink } from "react-router";  
import { RiSpaceShipFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import CartWidget from "../Cart/CartWidget"; 


import "./Navbar.css";

const Navbar = ({ bwMode, toggleMode }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const closeDropdown = () => setOpenDropdown(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <RiSpaceShipFill className="logo-icon" />
        <span>GorrasX</span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end onClick={closeDropdown}>
            Inicio
          </NavLink>
        </li>
        <li className="dropdown">
          <button className="dropdown-btn" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={openDropdown}>
            Categorías
          </button>
          {openDropdown && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/categoria/gorras-planas" onClick={closeDropdown}>
                  Gorras Planas
                </NavLink>
              </li>
              <li>
                <NavLink to="/categoria/snapback" onClick={closeDropdown}>
                  Snapback
                </NavLink>
              </li>
              <li>
                <NavLink to="/categoria/trucker" onClick={closeDropdown}>
                  Trucker
                </NavLink>
              </li>
                 <li>
                <NavLink to="/categoria/deportivas" onClick={closeDropdown}>
                  Deportivas
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <NavLink to="/carrito" onClick={closeDropdown}>
            <FaCartShopping />
            <CartWidget />
          </NavLink>
        </li>
        <li>
          {}
          <button className="mode-btn" onClick={toggleMode}>
            {bwMode ? <FaSun /> : <FaRegMoon />  }
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
