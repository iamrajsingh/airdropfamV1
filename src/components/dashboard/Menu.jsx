import React from "react";
import { dashboardMenuData } from "../../utils";

const Menu = ({ setActiveMenu, activeMenu }) => {
  return (
    <div className="w-full flex flex-col gap-2 py-2">
      {dashboardMenuData.map((i) => (
        <div
          className={`w-full ${
            activeMenu === i.text ? "shadow-lift" : "shadow-inner"
          } cursor-pointer active:scale-95 transition-all shadow-inner flex items-center justify-center py-3 rounded-lg  text-pale-blue font-semibold font-montserrat`}
          key={i.text}
          onClick={() => setActiveMenu(i.text)}
        >
          {i.text}
        </div>
      ))}
    </div>
  );
};

export default Menu;
