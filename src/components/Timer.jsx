import React, { useEffect, useState } from "react";
import { calculateTimeLeft } from "../utils/timer";

const Timer = ({ EndDate }) => {
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(EndDate));


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(EndDate));
    }, 1000);

    // Simulate a delay for loading, you can adjust the duration
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="flex gap-1 items-center bg-light-gray rounded-lg px-2  font-montserrat font-semibold text-gray-500 shadow-inner">
      <p className=" font-montserrat font-semibold text-pale-blue md:text-sm text-xs">
        Time Left -{" "}
      </p>
      <p className="select-none md:text-sm text-xs">
        {timeLeft.days} days {timeLeft.hours} hours
      </p>
    </div>
  );
};

export default Timer;
