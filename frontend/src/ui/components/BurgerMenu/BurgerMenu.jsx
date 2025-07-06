import React from "react";
import { Link } from "react-router-dom";
import NavLinkItem from "./../NavLinkItem/NavLinkItem";
import { useDispatch } from "react-redux";
import { setShowPopup } from "../../../core/redux/UiSlice/UiSlice";
import { logout } from "../../../core/redux/AuthSlice/AuthSlice";

const BurgerMenu = ({ open, setOpen, activeSection, onSectionClick, loggedIn }) => {
  const dispatch = useDispatch();

  return (
    <div className="alternate sm:hidden my-auto relative cursor-pointer mr-3" onClick={() => setOpen(!open)}>
      Menu
      <div className="absolute top-12 right-0 h-fit bg-tertiary rounded-md w-40">
        <ul className={`flex-col text-primary items-center gap-3 ${open ? "flex" : "hidden"}`}>
          {["tobacco", "shisha", "parts", "contact"].map((section) => (
            <NavLinkItem
              key={section}
              sectionId={section}
              active={activeSection === section}
              handleClick={onSectionClick}
            />
          ))}
          <Link
            to="/cart"
            className={`${activeSection === "cart" ? "active" : ""} cursor-pointer`}
            onClick={() => onSectionClick("cart")}
          >
            Cart
          </Link>
          {loggedIn ? (
            <li>
              <div className="ppContaier h-8 w-8 bg-tertiary rounded-2xl relative">s</div>
              <ul className="options absolute top-10 h-screen w-screen bg-tertiary cursor-pointer">
                <li className="text-primary">Profile</li>
                <li className="text-primary" onClick={() => dispatch(logout())}>
                  Logout
                </li>
              </ul>
            </li>
          ) : (
            <li className="cursor-pointer rounded-xl p-1" onClick={() => dispatch(setShowPopup(true))}>
              Log in
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
