import React, { useState } from "react";
import {
  AddAirdropForm,
  Logo,
  LogoutBtn,
  Menu,
  AllAirdrops,
} from "../components";
import { dashboardMenuData } from "../utils";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState(dashboardMenuData[0].text);

  return (
    <section className="min-h-[96vh]  relative flex gap-2">
      <div className=" w-52 flex-col gap-5 justify-stat items-center hidden md:flex shadow-lift rounded-md bg-light-gray py-2 px-2">
        <div className="w-full flex gap-2 justify-start items-center">
          <Logo />{" "}
          <h2 className="text-lg tracking-wide font-semibold font-palanquin text-pale-blue uppercase">
            Airdropfam
          </h2>
        </div>
        <Menu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      </div>

      <div className=" w-full md:w-[90%] flex flex-col rounded-md shadow-lift bg-light-gray p-2">
        <div className="w-full flex justify-end">
          <LogoutBtn />
        </div>

        {activeMenu === dashboardMenuData[0].text && <AllAirdrops />}
        {activeMenu === dashboardMenuData[1].text && (
          <div>
            <AddAirdropForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
