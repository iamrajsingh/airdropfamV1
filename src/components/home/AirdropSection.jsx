import React, { useEffect, useState } from "react";
import { airdropFilterData } from "../../utils";
import appwriteService from "../../appwrite/config";
import { AirDropCards } from "..";
import AirdropCardSkeleton from "./../AirdropCardSkeleton";

const AirdropSection = () => {
  const [activeMenu, setActiveMenu] = useState(airdropFilterData[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [count, setCount] = useState(1);
  const [totalItems, setTotalItems] = useState();

  const fetchAirdrops = async () => {
    try {
      let result;

      if (activeMenu === airdropFilterData[0]) {
        result = await appwriteService.getAirdrops(offset, "active");
        setTotalItems(result?.total);
      } else {
        result = await appwriteService.getAirdropByCategory(offset, activeMenu);
        setTotalItems(result?.total);
      }

      if (result && result.documents) {
        setPosts(result.documents);
      }

      if (result && result.documents.length === 0) {
        count > 1 && setCount(count - 1);
      }
    } catch (error) {
      console.error("Error fetching airdrops:", error);
    }
  };

  useEffect(() => {
    fetchAirdrops();
  }, [activeMenu, offset]);

  const handlePagination = (page) => {
    const items = 9;
    setPageNumber(page);
    if (page === 1) {
      setOffset(0);
    } else {
      const calculatedOffset = (page - 1) * items;
      setOffset(calculatedOffset);
    }
  };

  useEffect(() => {
    handlePagination(count);
  }, [count]);

  const handleCategoryChange = (category) => {
    setActiveMenu(category);
  };

  const handlePages = () => {
    const totalPage = Math.ceil(Number(totalItems) / 9);
    const newArray = [];

    for (let i = 1; i <= totalPage; i++) {
      newArray.push(i);
    }
    setTotalPage(newArray);
  };

  useEffect(() => {
    setOffset(0);
  }, [activeMenu]);

  useEffect(() => {
    handlePages();
  }, [posts]);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex justify-center">
        <h2 className="lg:text-5xl text-3xl font-montserrat select-none font-semibold uppercase shadow-lift px-4 py-1 rounded-2xl text-gray-500">
          Airdrops
        </h2>
      </div>

      <div className="lg:flex hidden flex-row justify-evenly mb-3">
        {airdropFilterData.map((i) => (
          <button
            className={`text-lg font-montserrat font-semibold text-pale-blue px-3 py-2 text-nowrap rounded-2xl active:scale-95 transition-all ${
              activeMenu === i && "shadow-lift bg-light-gray"
            }`}
            onClick={() => handleCategoryChange(i)}
            key={i}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 min-h-52">
        {posts.length > 0 && posts.map((i) => <AirDropCards key={i} {...i} />)}

        {posts.length === 0 &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <AirdropCardSkeleton key={i} />
          ))}
      </div>

      <div className="w-full flex justify-center gap-2">
        {totalPage &&
          totalPage.map((i) => (
            <p
              className={`w-8 h-8  rounded-full  flex items-center justify-center cursor-pointer font-semibold ${
                i === pageNumber
                  ? "shadow-lift bg-light-gray text-pale-blue"
                  : "shadow-inner"
              }  text-gray-500`}
              key={i}
              onClick={() => handlePagination(i)}
            >
              {i}
            </p>
          ))}
      </div>
    </div>
  );
};

export default AirdropSection;
