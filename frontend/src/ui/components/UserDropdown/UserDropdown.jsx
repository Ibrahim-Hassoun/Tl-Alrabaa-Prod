import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../core/redux/AuthSlice/AuthSlice";


const UserDropdown = ({ visible, toggleVisible }) => {
  const dispatch = useDispatch();

  return (
    <li className="relative">
      <div className="ppContaier h-8 w-8 bg-tertiary rounded-2xl cursor-pointer" onClick={toggleVisible}></div>
      {visible && (
        <ul className="h-16 w-36 bg-tertiary -bottom-20 right-0 absolute">
          <li className="text-primary cursor-pointer">Profile</li>
          <li
            className="text-red-700 cursor-pointer"
            onClick={() => {
              dispatch(logout());
              window.location.reload();
            }}
          >
            Log Out
          </li>
        </ul>
      )}
    </li>
  );
};

export default UserDropdown;
