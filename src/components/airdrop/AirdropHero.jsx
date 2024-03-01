import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import appwriteService from "../../appwrite/config";

const AirdropHero = ({ banner, title, description, category }) => {



  return (
    <div className="min-h-96 flex flex-col lg:flex-row gap-10">
      <div className={`w-full lg:w-1/2 h-min lg:sticky lg:top-24 `}>
        <img
          src={banner && appwriteService.getFilePreview(banner)}
          alt={title}
          className="object-fill rounded-lg shadow-inner"
        />
      </div>

      <div className="flex flex-col px-1 w-full lg:w-1/2 gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-montserrat font-semibold text-pale-blue capitalize">
            {title}
          </h2>
          <p className="text-sm font-bold font-montserrat text-gray-500">
            {category}
          </p>
        </div>
        {description && parse(description)}
      </div>
    </div>
  );
  // ): (
  //   <div className="w-full flex items-center justify-center h-[80vh]">

  //   <BounceLoader color="#366bd6" />
  //   </div>
  // );
};

export default AirdropHero;
