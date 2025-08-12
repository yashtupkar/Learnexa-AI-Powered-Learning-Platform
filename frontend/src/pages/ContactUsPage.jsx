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

import { Helmet } from "react-helmet-async";
import Navbar from "../components/NavigationBar";

import Footer from "../components/footer";
import ContactForm from "../components/HomePageComponents/ContactForm";

function ContactUs() {

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Contact Us | Learnexa</title>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
