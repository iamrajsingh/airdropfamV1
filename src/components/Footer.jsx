import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "../Routes";
import { FaTwitter } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="border-t border-gray-400 mt-10 flex flex-col gap-2 py-5">
      <div className="flex lg:flex-row flex-col justify-between flex-wrape border-b border-gray-400 pb-5 gap-8 ">
        <div className=" h-auto flex flex-col w-full lg:w-1/4 gap-2">
          <h2 className="text-3xl font-semibold">AirdropFam</h2>
          <p className="text-sm text-pale-blue font-palanquin tracking-tight">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            nihil consequatur nobis dignissimos reiciendis itaque quod,
            perferendis.
          </p>
        </div>
       
        <div className="h-auto flex flex-col justify-start gap-1">
          <h3 className="text-xl font-semibold font-palanquin text-pale-blue">
          Support
          </h3>
          <div className="text-pale-blue font-palanquin">
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              Help Centre
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              About
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              Contact Us
            </p>
          </div>
        </div>
        <div className="h-auto flex flex-col justify-start gap-1">
          <h3 className="text-xl font-semibold font-palanquin text-pale-blue">
            Help and Solution
          </h3>
          <div className="text-pale-blue font-palanquin">
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              Talk to support
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              Support Docs
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 capitalize tracking-tight">
              System Status
            </p>
          </div>
        </div>
        <div className=" h-auto flex flex-col justify-start gap-1">
          <h3 className="text-xl font-semibold font-palanquin text-pale-blue">
            Social Links
          </h3>
          <div className="text-pale-blue font-palanquin">
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 tracking-tight">
              <FaTwitter />
              Twitter
            </p>
            <p className="flex gap-2 items-center cursor-pointer hover:text-gray-600 tracking-tight">
              <BiLogoTelegram />
              Telegram
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => navigate(routes.login)}>login</button>
        <button onClick={() => navigate(routes.dashboard)}>Dashboard</button>
        <button onClick={() => navigate(routes.home)}>Home</button>
      </div>
    </div>
  );
};

export default Footer;
