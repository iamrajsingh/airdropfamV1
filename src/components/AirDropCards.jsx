import banner2 from "../assets/bannerDemo2.jpeg";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import routes from "../Routes";
import Timer from "./Timer";
import { calculateTimeLeft } from "../utils/timer";
import { useEffect, useState } from "react";

const AirDropCards = ({ banner, $id, endDate }) => {
  const navigate = useNavigate();

  const endTimer = new Date(endDate).getTime();

  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTimer));
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTimer));
    }, 3000);

    // Simulate a delay for loading, you can adjust the duration
    setTimeout(() => {
      setLoading(false);
    }, 8000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    const updateStatus = setInterval(() => {
      if (Number(timeLeft.days) === 0 ) {
        if (Number(timeLeft.hours) === 0) {
          setStatus("inactive");
        }
      }
    }, 5000);

    return () => clearInterval(updateStatus);
  }, []);

  useEffect(() => {
    const checkStatus = setInterval(() => {
      if (status === "inactive") {
        handleInactiveAirdrop();
      }
    }, 10000);

    return () => clearInterval(checkStatus);
  }, [status]);

  const handleInactiveAirdrop = async () => {
    try {
      await appwriteService.updateAirdropStatus($id, {
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2  items-center">
      <div className="p-3 shadow-lift bg-light-gray  rounded-lg flex flex-col gap-2 ">
        <img
          src={banner ? appwriteService.getFilePreview(banner) : banner2}
          alt=""
          className=" object-fill  w-[26rem] lg:w-[30rem] h-48 md:h-52 rounded-lg shadow-inner"
        />

        <div className="w-full flex justify-between  py-1">
          <Timer EndDate={endTimer} />

          <button
            className="px-4 py-1 rounded-lg shadow-lift text-pale-blue font-semibold bg-light-gray hover:scale-105 transition-all"
            onClick={() => navigate(`${routes.airdrop}${$id}`)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirDropCards;
