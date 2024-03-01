import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import AirDropCards from "../AirDropCards";
import Button from "../Button";
import EditPostModal from "./EditPostModal";


const AllAirdrops = () => {
  const [status, seStatus] = useState("active");
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(1)
  const [totalPage, setTotalPage] = useState()

  const gettingPost = async () => {
    await appwriteService.getAirdrops(offset, status).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setTotalItems(posts.total)
      }
    });
  };

  const handlePagination = (page) => {
    const itemsPerPage = 9;
    setPageNumber(page);
    if (page === 1) {
      setOffset(0);
    } else {
      const calculatedOffset = (page - 1) * itemsPerPage;
      setOffset(calculatedOffset);
    }
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
    handlePages();
  }, [posts]);

  useEffect(() => {
    gettingPost();
  }, [status, refresh, offset]);

  return (
    <div className="flex flex-col pb-5">
      <div className="flex gap-3">
        <Button
          className={`text-lg font-montserrat font-semibold text-pale-blue px-3 py-2 text-nowrap rounded-2xl hover:scale-105 transition-all ${status === "active" ? "shadow-lift" : "shadow-inner"}`}
          onClick={() => seStatus("active")}
        >
          Active
        </Button>
        <Button
          className={`text-lg font-montserrat font-semibold text-pale-blue px-3 py-2 text-nowrap rounded-2xl hover:scale-105 transition-all ${status === "inactive" ? "shadow-lift" : "shadow-inner"}`}
          onClick={() => seStatus("inactive")}
        >
          Inactive
        </Button>
      </div>
      <div className="w-full py-4  h-full grid grid-cols-3 gap-3 min-h-[70vh]">

        {posts &&
          posts.map((i) => (
            <div key={i.$id} className="relative">
              <AirDropCards {...i} />

              <EditPostModal post = {i} heading={"Edit Airdrop"} isEdit setRefresh={setRefresh} refresh={refresh}/>
              <EditPostModal post = {i} heading={"Delete Airdrop"} isDelete setRefresh={setRefresh} refresh = {refresh}/>
             
            </div>
          ))}
      </div>
         <div className="w-full flex justify-center gap-2">
        {totalPage && totalPage.map((i) => (
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

export default AllAirdrops;
