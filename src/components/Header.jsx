import React, { useState } from "react";
import Logo from "./Logo";
import { navData } from "./../utils/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../Routes";
import { IoMdClose } from "react-icons/io";
import { TiThMenuOutline } from "react-icons/ti";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeRoute = () => {
    navigate(routes.dashboard);
    setIsMenuOpen(false);
  };

  return (
    <nav className="h-16 rounded-full sticky shadow-lift top-1 z-50 transition-all duration-500 flex items-center px-10 justify-between bg-light-gray">
      <Logo />
      <div className=" gap-10 hidden lg:flex items-center">
        {navData.map((i) => (
          <Link
            to="#"
            key={i.text}
            className="text-sm font-semibold text-pale-blue font-montserrat"
          >
            {i.text}
          </Link>
        ))}
        {authStatus && (
          <button className=" px-4 cursor-pointer py-2 rounded-full flex items-center justify-center text-pale-lue font-semibold shadow-lift bg-light-gray active:scale-95 transition-all">
            <p onClick={changeRoute} rel="noopener noreferrer">
              Dashboard
            </p>
          </button>
        )}
      </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
        <button
          className="text-pale-blue focus:outline-none"
          onClick={handleMenuToggle}
        >
          <TiThMenuOutline size={25}/>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 right-0 bottom-0 left-0  bg-light-gray transition-all duration-500 transform translate-x-0">
          {/* Add your mobile navigation links here */}
         <div className="flex justify-center items-center flex-col gap-5 h-full w-full relative">
          <div className="absolute top-5 right-5 " onClick={() => handleMenuToggle()}>
          <IoMdClose size={35}/>

          </div>
          {navData.map((i) => (
            <Link
              to="#"
              key={i.text}
              className="block px-4 py-2 text-lg text-pale-blue font-montserrat"
            >
              {i.text}
            </Link>
          ))}
          {authStatus && (
            <button
              className="block px-4 py-2 text-lg text-pale-blue font-montserrat"
              onClick={changeRoute}
            >
              Dashboard
            </button>
          )}

         </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
