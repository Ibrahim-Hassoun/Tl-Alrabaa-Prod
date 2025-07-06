import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowPopup } from "../../../core/redux/UiSlice/UiSlice";
import NavLinkItem from "./../../components/NavLinkItem/NavLinkItem";
import UserDropdown from "./../../components//UserDropdown/UserDropdown";
import BurgerMenu from "./../../components//BurgerMenu/BurgerMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const [activeSection, setActiveSection] = useState("home");
  const [userOptionsVisible, setUserOptionsVisible] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const y = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (window.location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      setTimeout(() => scrollToSection(sectionId), 0);
    }
    dispatch(setShowPopup(false));
  };

  return (
    <div className="bg-primary Navbar fixed top-0 w-full z-10 h-20 font-primary font-medium text-2xl flex">
      <div className="m-auto flex containers justify-between w-full h-16 text-tertiary">
        <Link to="/" className="left-nav mr-auto sm:mr-0" onClick={() => handleNavClick("home")}>
          <img src='https://tl-alrabaa-assets.s3.eu-north-1.amazonaws.com/products/black-bg-logo.jpg' alt="logo" className="w-full h-full object-contain cursor-pointer" />
        </Link>

        <div className="center-nav hidden sm:flex items-center pl-24">
          <ul className="flex gap-3" onClick={() => dispatch(setShowPopup(false))}>
            {["tobacco", "shisha", "parts", "contact"].map((section) => (
              <NavLinkItem
                key={section}
                sectionId={section}
                active={activeSection === section}
                handleClick={handleNavClick}
              />
            ))}
          </ul>
        </div>

        <div className="right-nav hidden sm:flex items-center">
          <ul className="flex items-center gap-3">
            <Link
              to="/cart"
              className={`${activeSection === "cart" ? "active" : ""} cursor-pointer`}
              onClick={() => handleNavClick("cart")}
            >
              Cart
            </Link>
            {loggedIn ? (
              <UserDropdown
                visible={userOptionsVisible}
                toggleVisible={() => setUserOptionsVisible(!userOptionsVisible)}
              />
            ) : (
              <li className="cursor-pointer bg-secondary rounded-xl p-1" onClick={() => dispatch(setShowPopup(true))}>
                Log in
              </li>
            )}
          </ul>
        </div>

        <BurgerMenu
          open={burgerOpen}
          setOpen={setBurgerOpen}
          activeSection={activeSection}
          onSectionClick={handleNavClick}
          loggedIn={loggedIn}
        />
      </div>
    </div>
  );
};

export default Navbar;
