import React, { useState } from "react";
import {
  Check,
  Zap,
  Star,
  Gem,
  Crown,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../components/layouts/layout";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/NavigationBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlansAndPricing from "../components/PlansAndPricing";
import Footer from "../components/footer";

function Pricing() {

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Plans and Pricing | Learnexa</title>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
       <PlansAndPricing/>
      </div>
      <Footer/>
    </>
  );
}

export default Pricing;