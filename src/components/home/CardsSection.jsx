import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Card = ({ image }) => {


  return (
    <div className="lg:h-80 h-60 flex items-center justify-center">
      <div className=" shadow-2xl rounded-lg">
        <Carousel autoPlay showThumbs = {false} showArrows={false} showStatus={false} infiniteLoop interval={4500} transitionTime={1000}>

      {
       image && image.map((i)=> (

          <img
          key={i.$id}
          src={appwriteService.getFilePreview(i.banner)}
            alt=""
            className=" object-fill h-[14rem] lg:h-[16rem] w-[28rem] lg:w-[30rem] rounded-lg "
          />
        ))
      }
        </Carousel>
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

  const banner1 = banners &&  banners.slice(0, midpointIndex);
const banner2 = banners && banners.slice(midpointIndex);

  console.log(banner1, "banner");

  useEffect(()=> {
    fetchBanner();
  },[])


  return (
    <div className="w-full my-5 grid lg:grid-cols-2 gap-8">
      <Card image={banner1} />
      <Card image={banner2} />
    </div>
  );
};

export default CardsSection;
