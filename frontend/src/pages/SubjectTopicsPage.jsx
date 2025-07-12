import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Layout from "../components/layouts/layout";
import { ChevronsRight } from "lucide-react";

const SubjectTopicsPage = () => {
  const { subject } = useParams();

  // Color palette for topic cards
  const colorPalette = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-amber-500",
  ];
  const lightColorPalette = [
    "bg-blue-200",   // Soft blue
    "bg-green-200",  // Mint green
    "bg-yellow-200", // Pale yellow
    "bg-pink-200",   // Blush pink
    "bg-purple-200", // Lavender
    "bg-indigo-200", // Soft indigo
    "bg-teal-200",   // Pale teal
    "bg-orange-200", // Peach
    "bg-cyan-200",   // Sky blue
    "bg-lime-200",   // Light lime
    "bg-amber-200",  // Light amber
    "bg-fuchsia-200" // Soft fuchsia
  ];

  // Define topics for different subjects
  const subjectTopics = {
    aptitude: [
      {
        title: "Permutation & Combination",
        description: "Arrangements and selections of objects",
        link: "/aptitude/permutation-and-combination",
      },
      {
        title: "Probability",
        description: "Likelihood of events occurring",
        link: "/aptitude/probability",
      },
      {
        title: "Problems on trains",
        description: "Time and distance problem on trains",
        link: "/aptitude/problems-on-trains",
      },
      {
        title: "Time and Distance",
        description: "Equations and algebraic expressions",
        link: "/aptitude/time-and-distance",
      },
      {
        title: "Time and Work",
        description: "Shapes, sizes and properties of space",
        link: "/aptitude/time-and-work",
      },
      {
        title: "Simple Intrest",
        description: "Shapes, sizes and properties of space",
        link: "/aptitude/simple-interest",
      },
      {
        title: "Problems on ages",
        description: "Shapes, sizes and properties of space",
        link: "/aptitude/problems-on-ages",
      },
    ],
    "logical-reasoning": [
      {
        title: "Logical Puzzles",
        description: "Solve complex logical puzzles",
        link: "/questions/logical-puzzles",
      },
      {
        title: "Deductive Reasoning",
        description: "Draw conclusions from given information",
        link: "/questions/deductive-reasoning",
      },
      {
        title: "Pattern Recognition",
        description: "Identify patterns in sequences",
        link: "/questions/pattern-recognition",
      },
    ],
    "verbal-reasoning": [
      {
        title: "Blood Relations",
        description: "Analyze family relationships",
        link: "/verbal-reasoning/blood-relation-test",
      },
      {
        title: "Direction Sense",
        description: "Solve direction-based problems",
        link: "/questions/direction-sense",
      },
      {
        title: "Coding-Decoding",
        description: "Decipher coded messages",
        link: "/questions/coding-decoding",
      },
    ],
    "verbal-ability": [
      {
        title: "Vocabulary",
        description: "Word meanings and usage",
        link: "/questions/vocabulary",
      },
      {
        title: "Grammar",
        description: "Rules of language structure",
        link: "/questions/grammar",
      },
      {
        title: "Reading Comprehension",
        description: "Understand and analyze passages",
        link: "/questions/reading-comprehension",
      },
    ],
  };

  // Get the topics for the current subject or default to aptitude
  const topics = (subjectTopics[subject] || subjectTopics.aptitude).map(
    (topic, index) => ({
      ...topic,
      color: colorPalette[index % colorPalette.length],
    })
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl text-gray-600 dark:text-white capitalize">
              {subject || "Aptitude"} Topics
            </h1>
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-zinc-800 dark:text-white my-4 rounded-sm p-4">
            <h1 className="capitalize flex gap-2 items-center">
              <a href="/dashboard">Dashboard</a>{" "}
              <ChevronsRight className="text-green-500" />{" "}
              <a href={`/${subject}`}>{subject}</a>
            </h1>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {topics.map((topic, index) => (
              <motion.a
                key={index}
                href={topic.link}
                variants={cardVariants}
                whileHover="hover"
                className={`block rounded-xl p-6 shadow-lg ${topic.color} text-white`}
              >
                <h2 className="text-xl  mb-2">{topic.title}</h2>
                <p className="opacity-90 font-light">{topic.description}</p>
            
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SubjectTopicsPage;
