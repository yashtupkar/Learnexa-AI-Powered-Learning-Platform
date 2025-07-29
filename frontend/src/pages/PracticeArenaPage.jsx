import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sword,
  Shield,
  Trophy,
  Flame,
 
  BrainCircuit,
  Calculator,
  Code2,
  Database,
  Globe2,
  Languages,
  Network,
  ScrollText,
  BookOpenText,
  Clock,
  BarChart2,
  ChevronRight,
  Search,
  Filter,
  LayoutGrid,
  List,
  Zap,
  Skull,
  Medal,
  Crown,
  Target,
  Award,
  Star,
} from "lucide-react";
import Confetti from "react-confetti";
import Layout from "../components/layouts/layout";

const PracticeArena = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const categories = [
    {
      id: "all",
      name: "All Battlegrounds",
      icon: <Sword size={18} />,
      color: "bg-gray-800",
    },
    {
      id: "aptitude",
      name: "Math Arena",
      icon: <Calculator size={18} />,
      color: "bg-blue-600",
    },
    {
      id: "reasoning",
      name: "Logic Dojo",
      icon: <BrainCircuit size={18} />,
      color: "bg-purple-600",
    },
    {
      id: "verbal",
      name: "Word Colosseum",
      icon: <Languages size={18} />,
      color: "bg-green-600",
    },
    {
      id: "programming",
      name: "Code Gauntlet",
      icon: <Code2 size={18} />,
      color: "bg-red-600",
    },
    {
      id: "database",
      name: "Data Dungeon",
      icon: <Database size={18} />,
      color: "bg-yellow-600",
    },
    {
      id: "networking",
      name: "Net Battlefield",
      icon: <Network size={18} />,
      color: "bg-indigo-600",
    },
    {
      id: "gk",
      name: "Knowledge Pit",
      icon: <Globe2 size={18} />,
      color: "bg-teal-600",
    },
    {
      id: "company",
      name: "Boss Fights",
      icon: <Skull size={18} />,
      color: "bg-pink-600",
    },
  ];

  const practiceTopics = [
    {
      id: 1,
      title: "Quantitative Arena",
      category: "aptitude",
      questions: 150,
      time: 60,
      difficulty: "Challenger",
      completed: 45,
      description: "Prove your might in numerical combat",
      icon: <Calculator className="text-blue-400" size={24} />,
      xp: 250,
      streak: 8,
      enemies: ["Math Goblins", "Algebra Dragons", "Calculus Titans"],
    },
    {
      id: 2,
      title: "Logic Colosseum",
      category: "reasoning",
      questions: 120,
      time: 45,
      difficulty: "Gladiator",
      completed: 32,
      description: "Outsmart cunning puzzles and traps",
      icon: <BrainCircuit className="text-purple-400" size={24} />,
      xp: 180,
      streak: 5,
      enemies: ["Puzzle Phantoms", "Riddle Wraiths", "Pattern Specters"],
    },
    {
      id: 3,
      title: "Verbal Gauntlet",
      category: "verbal",
      questions: 200,
      time: 75,
      difficulty: "Champion",
      completed: 68,
      description: "Master the art of linguistic warfare",
      icon: <Languages className="text-green-400" size={24} />,
      xp: 320,
      streak: 12,
      enemies: ["Grammar Ghouls", "Vocab Vampires", "Comprehension Cyclops"],
    },
    {
      id: 4,
      title: "Code Battlefield",
      category: "programming",
      questions: 180,
      time: 90,
      difficulty: "Legend",
      completed: 92,
      description: "Survive the algorithm onslaught",
      icon: <Code2 className="text-red-400" size={24} />,
      xp: 450,
      streak: 15,
      enemies: ["Bug Bears", "Syntax Serpents", "Runtime Reapers"],
    },
    {
      id: 5,
      title: "Database Dungeon",
      category: "database",
      questions: 80,
      time: 40,
      difficulty: "Warrior",
      completed: 25,
      description: "Navigate the query labyrinth",
      icon: <Database className="text-yellow-400" size={24} />,
      xp: 150,
      streak: 3,
      enemies: ["Null Knights", "Join Jesters", "Index Imps"],
    },
    {
      id: 6,
      title: "Network Nexus",
      category: "networking",
      questions: 95,
      time: 50,
      difficulty: "Elite",
      completed: 38,
      description: "Conquer the protocol wars",
      icon: <Network className="text-indigo-400" size={24} />,
      xp: 200,
      streak: 7,
      enemies: ["Packet Pirates", "Latency Lizards", "Firewall Fiends"],
    },
    {
      id: 7,
      title: "Trivia Thunderdome",
      category: "gk",
      questions: 250,
      time: 60,
      difficulty: "Contender",
      completed: 110,
      description: "Two enter, one leaves with knowledge",
      icon: <Globe2 className="text-teal-400" size={24} />,
      xp: 380,
      streak: 10,
      enemies: ["Fact Phantoms", "Current Event Chimeras", "History Hydras"],
    },
    {
      id: 8,
      title: "FAANG Fortress",
      category: "company",
      questions: 75,
      time: 45,
      difficulty: "Mythic",
      completed: 15,
      description: "Storm the tech giant strongholds",
      icon: <Crown className="text-pink-400" size={24} />,
      xp: 500,
      streak: 20,
      enemies: ["Google Golems", "Amazon Ancients", "Meta Monoliths"],
    },
  ];

  const filteredTopics = practiceTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || topic.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const startPractice = (topicId) => {
    navigate(`/practice/${topicId}`);
  };

    return (
      <Layout>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
            />
          )}

          {/* Arena Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://assets.codepen.io/3364143/7N3P.gif')] bg-cover opacity-20"></div>
            <div className="container mx-auto px-4 py-12 relative">
              <div className="text-center mb-8">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
                  PRACTICE ARENA
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Enter the battlegrounds of knowledge. Train. Fight. Conquer.
                </p>
              </div>

              {/* XP Progress */}
              <div className="max-w-2xl mx-auto bg-gray-800 rounded-full h-4 mb-6">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-12 max-w-2xl mx-auto">
                <span>Level 7 Gladiator</span>
                <span>2,450/3,000 XP</span>
              </div>
            </div>
          </div>

          {/* Main Arena Content */}
          <div className="container mx-auto px-4 pb-16 relative -mt-8">
            {/* Search and Filter */}
            <div className="mb-8 bg-gray-800/50 backdrop-blur-md rounded-xl p-4 border border-gray-700 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-purple-400" size={18} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search battlefields..."
                    className="block w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <select className="appearance-none bg-gray-900 border border-gray-700 rounded-lg px-3 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm">
                      <option>Sort by: Difficulty</option>
                      <option>Sort by: XP Reward</option>
                      <option>Sort by: Completion</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Filter size={16} className="text-purple-400" />
                    </div>
                  </div>

                  <div className="flex bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 ${
                        viewMode === "grid"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 ${
                        viewMode === "list"
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? `${category.color} text-white shadow-lg`
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Battlefield Cards */}
            {filteredTopics.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => startPractice(topic.id)}
                      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl hover:shadow-2xl border-2 border-gray-700 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 relative"
                    >
                      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/3364143/7N3P.gif')] bg-cover opacity-5 group-hover:opacity-10 transition-opacity"></div>
                      <div className="p-5 relative">
                        {/* Difficulty Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              topic.difficulty === "Contender"
                                ? "bg-green-900/80 text-green-300 border border-green-500"
                                : topic.difficulty === "Gladiator"
                                ? "bg-blue-900/80 text-blue-300 border border-blue-500"
                                : topic.difficulty === "Champion"
                                ? "bg-purple-900/80 text-purple-300 border border-purple-500"
                                : "bg-red-900/80 text-red-300 border border-red-500"
                            }`}
                          >
                            {topic.difficulty}
                          </span>
                        </div>

                        {/* Icon */}
                        <div className="p-3 rounded-lg bg-gray-700/50 backdrop-blur-sm border border-gray-600 w-fit mb-4 group-hover:bg-purple-900/30 group-hover:border-purple-500 transition-colors">
                          {topic.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                          {topic.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                          {topic.description}
                        </p>

                        {/* XP and Streak */}
                        <div className="flex gap-3 mb-4">
                          <div className="flex items-center gap-1 text-xs bg-gray-700/50 px-2 py-1 rounded">
                            <Zap className="text-yellow-400" size={14} />
                            <span className="text-yellow-400">
                              {topic.xp} XP
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs bg-gray-700/50 px-2 py-1 rounded">
                            <Flame className="text-orange-400" size={14} />
                            <span className="text-orange-400">
                              Streak: {topic.streak}
                            </span>
                          </div>
                        </div>

                        {/* Enemies */}
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-1">
                            FEATURED ENEMIES:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {topic.enemies.slice(0, 2).map((enemy, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-700/70 text-gray-300 px-2 py-1 rounded"
                              >
                                {enemy}
                              </span>
                            ))}
                            {topic.enemies.length > 2 && (
                              <span className="text-xs bg-gray-700/70 text-gray-300 px-2 py-1 rounded">
                                +{topic.enemies.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{
                              width: `${
                                (topic.completed / topic.questions) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Conquered</span>
                          <span>
                            {Math.round(
                              (topic.completed / topic.questions) * 100
                            )}
                            %
                          </span>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerConfetti();
                            startPractice(topic.id);
                          }}
                          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 px-4 rounded-lg transition-all group-hover:shadow-purple-500/30 group-hover:shadow-lg"
                        >
                          {topic.completed > 0
                            ? "Continue Battle"
                            : "Enter Arena"}
                          <ChevronRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => startPractice(topic.id)}
                      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-700 cursor-pointer overflow-hidden transition-all hover:border-purple-500"
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-5">
                          <div className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 flex-shrink-0 group-hover:bg-purple-900/30 group-hover:border-purple-500 transition-colors">
                            {topic.icon}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                                  {topic.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                  {topic.description}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  topic.difficulty === "Contender"
                                    ? "bg-green-900/80 text-green-300 border border-green-500"
                                    : topic.difficulty === "Gladiator"
                                    ? "bg-blue-900/80 text-blue-300 border border-blue-500"
                                    : topic.difficulty === "Champion"
                                    ? "bg-purple-900/80 text-purple-300 border border-purple-500"
                                    : "bg-red-900/80 text-red-300 border border-red-500"
                                }`}
                              >
                                {topic.difficulty}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-3">
                              <div className="flex items-center gap-1 text-sm bg-gray-700/50 px-3 py-1 rounded">
                                <Zap className="text-yellow-400" size={14} />
                                <span className="text-yellow-400">
                                  {topic.xp} XP
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm bg-gray-700/50 px-3 py-1 rounded">
                                <Flame className="text-orange-400" size={14} />
                                <span className="text-orange-400">
                                  Streak: {topic.streak}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm bg-gray-700/50 px-3 py-1 rounded">
                                <Clock className="text-blue-400" size={14} />
                                <span className="text-blue-400">
                                  {topic.time} min
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm bg-gray-700/50 px-3 py-1 rounded">
                                <Target className="text-green-400" size={14} />
                                <span className="text-green-400">
                                  {topic.questions} challenges
                                </span>
                              </div>
                            </div>

                            <div className="mb-2">
                              <p className="text-xs text-gray-500 mb-1">
                                FEATURED OPPONENTS:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {topic.enemies.slice(0, 4).map((enemy, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-gray-700/70 text-gray-300 px-3 py-1 rounded-full border border-gray-600"
                                  >
                                    {enemy}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (topic.completed / topic.questions) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>{topic.completed} battles won</span>
                              <span>
                                {Math.round(
                                  (topic.completed / topic.questions) * 100
                                )}
                                % conquered
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
                <Shield className="mx-auto text-5xl text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Battlefields Found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {searchQuery.trim()
                    ? `No arenas match your search for "${searchQuery}"`
                    : "Prepare for new challenges - more battlefields coming soon!"}
                </p>
                {searchQuery.trim() ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Clear Search
                  </button>
                ) : (
                  <button
                    onClick={triggerConfetti}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition-all shadow-lg hover:shadow-purple-500/30"
                  >
                    <span className="flex items-center gap-2">
                      <Flame size={16} /> Check Back Later
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Arena Leaderboard */}
            <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border-2 border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  CHAMPION'S HALL
                </h2>
                <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm">
                  View Full Leaderboard <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 2nd Place */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center transform translate-y-4">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                    <Medal
                      className="absolute -top-2 -right-2 text-gray-300"
                      size={24}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                      2
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    LogicSlayer
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">Gladiator Rank</p>
                  <div className="flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold">1,240</div>
                      <div className="text-xs text-gray-400">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">87%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">32</div>
                      <div className="text-xs text-gray-400">Streak</div>
                    </div>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center relative -translate-y-4 shadow-lg shadow-yellow-500/10">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="text-yellow-400" size={28} />
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                      1
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    CodeWarden
                  </h3>
                  <p className="text-sm text-yellow-300 mb-3">Legend Rank</p>
                  <div className="flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-yellow-300 font-bold">2,450</div>
                      <div className="text-xs text-yellow-200/70">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-300 font-bold">94%</div>
                      <div className="text-xs text-yellow-200/70">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-300 font-bold">58</div>
                      <div className="text-xs text-yellow-200/70">Streak</div>
                    </div>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center transform translate-y-4">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                    <Award
                      className="absolute -top-2 -right-2 text-amber-300"
                      size={24}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                      3
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    DataKnight
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">Champion Rank</p>
                  <div className="flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold">980</div>
                      <div className="text-xs text-gray-400">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">82%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">27</div>
                      <div className="text-xs text-gray-400">Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join the Arena?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Test your skills against thousands of challengers and climb the
                leaderboards!
              </p>
              <button
                onClick={triggerConfetti}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-purple-500/30 animate-pulse hover:animate-none"
              >
                <span className="flex items-center gap-2">
                  <Sword size={20} /> Enter The Arena Now
                </span>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default PracticeArena;
