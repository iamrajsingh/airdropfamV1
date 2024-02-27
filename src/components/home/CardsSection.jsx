import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Card = ({ image }) => {
  return (
    <div className="lg:h-80 h-52 flex items-center justify-center px-4">
      <div className=" shadow-2xl rounded-lg">
        {image && (
          <Carousel
            autoPlay
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            infiniteLoop
            interval={4500}
            transitionTime={1000}
          >
            {image.map((i) => (
              <img
                key={i.$id}
                src={appwriteService.getFilePreview(i.banner)}
                alt=""
                className=" object-fill h-[12rem] lg:h-[16rem] w-[28rem] lg:w-[33rem] rounded-lg select-none"
              />
            ))}
          </Carousel>
        )}

        {!image && (
          <div className="h-[11rem] lg:h-[16rem] w-[20rem] lg:w-[37rem] rounded-lg animate-pulse bg-gray-300"></div>
        )}
      </div>
    </div>
  );
};

const CardsSection = () => {
  const [banners, setBanners] = useState();

  const fetchBanner = async () => {
    await appwriteService.getBanners().then((posts) => {
      if (posts) {
        setBanners(posts.documents);
      }
    });
  };

  const midpointIndex = banners && Math.ceil(banners.length / 2);

  const banner1 = banners && banners.slice(0, midpointIndex);
  const banner2 = banners && banners.slice(midpointIndex);

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="w-full my-2 lg:my-5 grid lg:grid-cols-2 gap-1 lg:gap-4">
      <Card image={banner1} />
      <Card image={banner2} />
    </div>
  );
};

export default CardsSection;
