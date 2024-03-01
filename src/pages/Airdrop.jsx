import React, { useEffect, useState } from "react";
import { AirdropHero, Footer, Header, OtherAirdrop } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import  BounceLoader  from "react-spinners/BounceLoader";


const Airdrop = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const interval = setInterval(()=> {
    setLoading(false)
    }, 1000)
    
    return () => clearInterval(interval)
  },[])

  const getPostMethod = async () => {
    if (slug) {
      await appwriteService.getAirdrop(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    getPostMethod();
  }, [slug, navigate]);

  return (
    <section className="flex flex-col gap-5 min-h-[95vh]">
      <Header />
      {
        !loading ? (
           <AirdropHero {...post} />
        ): (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <BounceLoader color="#366bd6" />
          </div>
        )
      }
     
      <Footer />
    </section>
  );
};

export default Airdrop;
