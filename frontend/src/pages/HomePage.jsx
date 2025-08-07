import React from 'react'
import Navbar from '../components/NavigationBar'
import HeroHeader from '../components/HeroHeader'
import CallToAction from '../components/HomePageComponents/CallToAction'
import Features from '../components/HomePageComponents/Features'
import Hero from '../components/HomePageComponents/Hero'
import Footer from '../components/footer'
import { Helmet } from "react-helmet-async";
import VideoPlayer from '../components/HomePageComponents/VideoComponent'
import Testimonial from '../components/HomePageComponents/Testimonial'
import FAQSection from '../components/HomePageComponents/FAQSection'
import ContactForm from '../components/HomePageComponents/ContactForm'

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Learnexa</title>
      </Helmet>

      <Navbar />
      <Hero />
      <VideoPlayer/>
      <Features />
      <CallToAction />
      <Testimonial />
      <FAQSection />
      <ContactForm/>
      <Footer />
    </div>
  );
}

export default HomePage