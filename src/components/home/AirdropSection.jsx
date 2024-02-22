import React, { useEffect, useState } from "react";
import { airdropFilterData } from "../../utils";
import appwriteService from "../../appwrite/config";
import { AirDropCards } from "..";

const AirdropSection = () => {
  const [activeMenu, setActiveMenu] = useState(airdropFilterData[0]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [count, setCount] = useState(1);

  const gettingPost = async () => {
    if (activeMenu === airdropFilterData[0]) {
      await appwriteService.getAirdrops(offset, "active").then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }

        if (posts?.documents.length === 0) {
          setCount(count - 1)
        }
      });
    } else {
      await appwriteService
        .getAirdropByCategory(offset, activeMenu)
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }

          if (posts?.documents.length === 0) {
            setCount(count - 1)
          }
        });
    }
  };

  const handlePagination = (page) => {
    const items = 9;
    setPageNumber(page);
    if (page === 1) {
      setOffset(0);
    } else {
      const calculatedOffset = (page - 1) * items;
      console.log(calculatedOffset);
      setOffset(calculatedOffset);
    }
  };

  useEffect(()=> {

    handlePagination(count)

  },[count])

  const handleCategoryChange = (category) => {
    setActiveMenu(category);
  };

  const handlePages = () => {
    const totalPage = Math.ceil(Number(posts.length) / 9);
    const newArray = [];

    for (let i = 1; i <= totalPage; i++) {
      newArray.push(i);
    }
    setTotalPage(newArray);
  };

  useEffect(() => {
    handlePages();
  }, [posts]);

  useEffect(() => {
    gettingPost();
    return () => {};
  }, [activeMenu, offset]);

  return (
    <div className=" flex flex-col gap-5">
      <div className="w-full flex justify-center">
        <h2 className="text-5xl font-montserrat select-none font-semibold uppercase shadow-lift px-4 py-1 rounded-2xl text-gray-500">
          Airdrops
        </h2>
      </div>

      {/*Airdrop filters*/}
      <div className="lg:flex hidden flex-row justify-evenly mb-3">
        {airdropFilterData.map((i) => (
          <button
            className={`text-lg font-montserrat font-semibold text-pale-blue px-3 py-2 text-nowrap rounded-2xl hover:scale-105 transition-all ${
              activeMenu === i && "shadow-lift bg-light-gray"
            }`}
            onClick={() => handleCategoryChange(i)}
            key={i}
          >
            {i}
          </button>
        ))}
      </div>

      {/* Airdrops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 min-h-52">
        {posts.length > 0 && posts.map((i) => (
          <AirDropCards key={i} {...i} />
        ))}
      </div>

      {/* pagination */}
      <div className="w-full flex justify-center gap-2">
        {/* {
          [1,2,3].map((i) => ( */}
          {
            count > 1 && (
               <p
              className={` h-8 px-4  rounded  flex items-center justify-center cursor-pointer font-semibold ${
          
                  "shadow-lift bg-light-gray text-pale-blue"
               
              }  text-gray-500`}
              // key={i}
              onClick={() => setCount(count - 1)}
            >
              Previous
            </p>
            )
          }
           
            <p
              className={` h-8 px-4  rounded  flex items-center justify-center cursor-pointer font-semibold ${
          
                  "shadow-lift bg-light-gray text-pale-blue"
               
              }  text-gray-500`}
              // key={i}
              onClick={() => setCount(count + 1)}
            >
              Next
            </p>
          {/* ))} */}
      </div>
    </div>
  );
};

export default AirdropSection;
