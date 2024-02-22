import React from "react";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button className="text-pale-blue flex gap-1 items-center px-3 py-2 shadow-lift bg-light-gray active:scale-95 transition-all  rounded-lg font-semibold" 
    onClick={logoutHandler}
    >
      <IoPowerOutline /> <span className="hidden md:block">logout</span>
    </button>
  );
};

export default LogoutBtn;
