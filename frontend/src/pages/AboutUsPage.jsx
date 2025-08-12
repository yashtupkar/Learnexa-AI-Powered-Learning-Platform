import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  Target,
  Heart,
  Zap,
  Globe,
  Trophy,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Lightbulb,
  Rocket,
  Shield,
  TrendingUp,
  Brain,
  Code,
  GraduationCap,
  Medal,
  Clock,
} from "lucide-react";
import Navbar from "../components/NavigationBar";
import { Helmet } from "react-helmet-async";
import Footer from "../components/footer";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Active Learners",
      description: "Students trust our platform",
    },
    {
      icon: BookOpen,
      number: "500+",
      label: "Courses Available",
      description: "Across multiple domains",
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      description: "Students achieve their goals",
    },
    {
      icon: Globe,
      number: "100+",
      label: "Countries",
      description: "Global learning community",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style",
    },
    {
      icon: Code,
      title: "Hands-on Practice",
      description: "Real-world projects and coding challenges",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Learn together with peers and mentors",
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Track progress with badges and certificates",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Learn at your own pace, anytime, anywhere",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Curated content by industry experts",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former Google engineer with 10+ years in EdTech",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "AI researcher passionate about personalized learning",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Educational psychologist with curriculum expertise",
    },
    {
      name: "David Kumar",
      role: "Head of Engineering",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer building scalable platforms",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make puts learners first",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly evolving with latest technology",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description: "Making quality education accessible to all",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to delivering the highest quality",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Founded",
      description: "Started with a vision to revolutionize online learning",
    },
    {
      year: "2020",
      title: "First 1,000 Users",
      description: "Reached our first milestone during the pandemic",
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Launched personalized learning recommendations",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve students in 50+ countries",
    },
    {
      year: "2023",
      title: "50K+ Students",
      description: "Built a thriving community of learners",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Won Best EdTech Platform award",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "To democratize quality education by making it accessible, engaging, and effective for learners worldwide. We believe that everyone deserves the opportunity to learn, grow, and achieve their potential regardless of their background or circumstances.",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become the world's most trusted learning platform, empowering millions of learners to transform their lives through education. We envision a future where learning is personalized, interactive, and available to everyone, everywhere.",
    },
    story: {
      title: "Our Story",
      content:
        "Founded in 2019 by two passionate educators and technologists, our platform was born from the frustration of traditional one-size-fits-all education. We saw students struggling with outdated methods and decided to create something better - a platform that adapts to each learner's unique needs.",
    },
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>About Us | Learnexa</title>

</Helmet>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/about-bg.jpg')`,
          backgroundAttachment: 'fixed'
        }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-gray-100/90 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              >
                <Users className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                <span className="text-sm bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  About Learnexa
                </span>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                Empowering Learners
                <br />
                <span className="text-indigo-600 dark:text-indigo-400">
                  Worldwide
                </span>
              </h1>
              <p className="text-lg max-w-3xl mx-auto text-white  leading-relaxed">
                We're on a mission to make quality education accessible to
                everyone. Our AI-powered platform adapts to your learning style,
                helping you achieve your goals faster and more effectively.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Story Tabs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center mb-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tabContent[tab].title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl font-semibold mb-6">
                  {tabContent[activeTab].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tabContent[activeTab].content}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Why Choose Our Platform
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover what makes our learning platform unique and effective
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The passionate people behind our platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Key milestones in our mission to transform education
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-indigo-400 rounded-full"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="flex-1 px-8">
                      <div
                        className={`p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 ${
                          index % 2 === 0 ? "text-right" : "text-left"
                        }`}
                      >
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-950 z-10"></div>

                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8 text-indigo-100">
                Join thousands of learners who are already transforming their
                careers
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}
