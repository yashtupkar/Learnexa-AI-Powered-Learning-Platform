import React from 'react'
import Lottie from "lottie-react";
import comingSoonAnimation from "../assets/comingSoon.json";
import Layout from '../components/layouts/layout';

const ComingSoonPage = () => {
  return (
    <Layout>
      <div className="flex flex-col h-[90vh] items-center justify-center">
        <Lottie
          animationData={comingSoonAnimation}
          loop
          className="w-64 dark:hidden h-44 sm:w-96 sm:h-66 md:w-[32rem] md:h-[22rem]"
        />
        <h1 className='text-xl sm:text-2xl md:text-4xl dark:text-white font-light'>We are Working On it...</h1>
      </div>
    </Layout>
  );
}

export default ComingSoonPage