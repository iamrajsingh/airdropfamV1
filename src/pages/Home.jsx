import React, { useEffect, useState } from "react";
import { AirdropSection, CardsSection, Footer, Header } from "../components";
import RingLoader from "react-spinners/RingLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const interval = setInterval(() => {
    setLoading(false);
   }, 1000) 

   return () => clearInterval(interval)
  }, []);

  return !loading ? (
    <section className="flex flex-col gap-5 ">
      <Header />
      <CardsSection />
      <AirdropSection />
      <Footer />
    </section>
  ) : (
    <div className=" h-screen flex items-center justify-center flex-col gap-4">
      <RingLoader color="#366bd6" size={100} />
      <p className="text-4xl font-semibold font-montserrat text-pale-blue">
        AirdropFam
      </p>
    </div>
  );
};

export default Home;
