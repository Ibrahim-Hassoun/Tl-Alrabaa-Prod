import React from "react";
import { Link } from "react-router-dom";

const NavLinkItem = ({ sectionId, active, handleClick }) => {
  return (
    <Link
      to="/"
      className={`${active ? "active" : ""} cursor-pointer`}
      onClick={() => handleClick(sectionId)}
    >
      {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
    </Link>
  );
};

export default NavLinkItem;
