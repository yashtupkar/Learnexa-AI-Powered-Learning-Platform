
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/layouts/layout";
import { Search, ChevronLeft, ChevronRight, X, Bookmark, Share2, MessageSquare, Heart } from "lucide-react";
import Avatar from "react-avatar";
import { Helmet } from "react-helmet-async";

const CurrentAffairs = () => {
  const newsGridRef = useRef(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullScreenSlider, setShowFullScreenSlider] = useState(false);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);
  const { backend_URL } = useContext(AppContext);

  const categories = [
    "All",
    "Economics",
    "International Relations",
    "Environment",
    "Science & Technology",
    "Polity & Governance",
    "Defense & Security",
    "Geography & Disaster Management",
    "Sports & Awards",
    "Art & Culture",
    "Agriculture & Rural Development",
    "General Studies",
  ];

  // Get top 10 news items for the slider
  const topNews = news.slice(0, 10);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backend_URL}/api/news/fetch-all`);
        const data = await response.json();

        const sortedData = data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        const categorizedData = sortedData.map((item) => ({
          ...item,
          category: categorizeForExams(item),
        }));
        setNews(categorizedData);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [backend_URL]);

  const categorizeForExams = (article) => {
    const content = (
      article.title +
      " " +
      (article.description || "")
    ).toLowerCase();

    if (
      content.includes("economy") ||
      content.includes("gdp") ||
      content.includes("inflation")
    ) {
      return "Economics";
    }
    if (
      content.includes("international") ||
      content.includes("foreign policy")
    ) {
      return "International Relations";
    }
    if (content.includes("environment") || content.includes("climate")) {
      return "Environment";
    }
    if (content.includes("science") || content.includes("technology")) {
      return "Science & Technology";
    }
    if (content.includes("government") || content.includes("policy")) {
      return "Polity & Governance";
    }
    if (content.includes("security") || content.includes("defense")) {
      return "Defense & Security";
    }
    if (content.includes("geography") || content.includes("disaster")) {
      return "Geography & Disaster Management";
    }
    if (content.includes("sports") || content.includes("olympics")) {
      return "Sports & Awards";
    }
    if (content.includes("culture") || content.includes("heritage")) {
      return "Art & Culture";
    }
    if (content.includes("agriculture") || content.includes("farmer")) {
      return "Agriculture & Rural Development";
    }

    return "General Studies";
  };

  const filteredNews = news.filter(
    (item) =>
      (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null ||
        selectedCategory === "All" ||
        item.category === selectedCategory)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber),
    newsGridRef.current?.scrollIntoView({ behavior: "smooth" });
  };
const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    newsGridRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  };
const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
    newsGridRef.current?.scrollIntoView({ behavior: "smooth" });
  }
};


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === topNews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? topNews.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (showFullScreenSlider) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showFullScreenSlider]);

  // Auto slide effect
  useEffect(() => {
    if (topNews.length > 0 && !showFullScreenSlider) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
      setAutoSlideInterval(interval);

      return () => clearInterval(interval);
    }
  }, [topNews.length, currentSlide, showFullScreenSlider]);

  // Pause auto-slide when user interacts with slider
  const pauseAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      setAutoSlideInterval(null);
    }
  };

  const resumeAutoSlide = () => {
    if (!autoSlideInterval && topNews.length > 0 && !showFullScreenSlider) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      setAutoSlideInterval(interval);
    }
  };

  const FullScreenSlider = () => {
    if (!showFullScreenSlider) return null;

    useEffect(() => {
      pauseAutoSlide();
      return () => resumeAutoSlide();
    }, []);

    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
        <button
          onClick={() => setShowFullScreenSlider(false)}
          className="absolute top-4 right-4 z-50 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            {topNews[currentSlide] && (
              <div className="w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                  <img
                    src={
                      topNews[currentSlide].urlToImage ||
                      "/placeholder-news.jpg"
                    }
                    alt={topNews[currentSlide].title}
                    className="w-full h-full object-cover rounded-lg shadow-xl"
                  />
                </div>
                <div className="w-full md:w-1/2 text-white space-y-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm">
                    {topNews[currentSlide].category}
                  </span>
                  <h2 className="text-2xl font-bold">
                    {topNews[currentSlide].title}
                  </h2>
                  <p className="text-lg opacity-80">
                    {topNews[currentSlide].description}
                  </p>
                  <p className="text-sm opacity-60">
                    {new Date(
                      topNews[currentSlide].publishedAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <a
                    href={topNews[currentSlide].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Read Full Story
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {topNews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                pauseAutoSlide();
                goToSlide(index);
                setTimeout(resumeAutoSlide, 10000); // Resume after 10 seconds
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Skeleton Loader Components
  const HeroSkeleton = () => (
    <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden bg-gray-200 dark:bg-zinc-800 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-8 md:p-12">
        <div className="h-6 w-32 bg-gray-300 dark:bg-zinc-700 rounded-full mb-4"></div>
        <div className="h-8 w-full bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-zinc-700 rounded mb-6"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-300 dark:bg-zinc-700 rounded-lg"></div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-zinc-700 rounded-lg"></div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-2 w-2 bg-gray-300 dark:bg-zinc-700 rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="container max-w-6xl mx-auto px-4 py-4">
      <div className="flex flex-wrap justify-center gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 bg-gray-200 dark:bg-zinc-700 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );

  const NewsGridSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative h-48 bg-gray-200 dark:bg-zinc-700 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-700 rounded-lg animate-pulse mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <Helmet>
        <title>Current Affairs | Learnexa</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        {/* Full Screen Slider */}
        <FullScreenSlider />

        {/* Hero Section with Search */}
        <div className="relative">
          {/* Top News Slider (Netflix style) */}
          {loading ? (
            <HeroSkeleton />
          ) : topNews.length > 0 ? (
            <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <img
                src={
                  topNews[currentSlide]?.urlToImage || "/placeholder-news.jpg"
                }
                alt={topNews[currentSlide]?.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-4 left-0 right-0 z-20 px-4 py-8 md:p-12 text-white">
                <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs sm:text-sm mb-4">
                  {topNews[currentSlide]?.category}
                </span>
                <h1 className="text-xl  md:text-4xl font-semibold mb-4 line-clamp-2">
                  {topNews[currentSlide]?.title}
                </h1>
                <p className="text-lg hidden md:block md:text-xl mb-6 line-clamp-2">
                  {topNews[currentSlide]?.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowFullScreenSlider(true)}
                    className="px-2 py-1 text-xs cursor-pointer sm:text-sm md:text-base md:px-6 md:py-3  bg-blue-600 hover:bg-blue-700 rounded md:rounded-lg font-medium transition-colors"
                  >
                    View Full Story
                  </button>
                  <button
                    onClick={() =>
                      window.open(topNews[currentSlide]?.url, "_blank")
                    }
                    className="px-2 py-1 text-xs cursor-pointer  sm:text-sm md:text-base md:px-6 md:py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                  >
                    Read on Source
                  </button>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {topNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-white w-6" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Search Bar */}
          <div className="relative container mx-auto px-4 -mt-0 z-30">
            <div className="relative max-w-4xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Current Affairs..."
                className="w-full p-4 pl-12 text-sm md:text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 shadow-xl dark:text-white transition-all"
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        {loading ? (
          <CategorySkeleton />
        ) : (
          <div className="container max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category === "All" ? null : category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-xs md:text-sm rounded-full  font-medium transition-colors ${
                    (selectedCategory === null && category === "All") ||
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* News Grid */}
        <main
          id="all-news"
          className="container mx-auto px-0 sm:px-4 py-8"
          ref={newsGridRef}
        >
          {" "}
          {loading ? (
            <NewsGridSkeleton />
          ) : currentItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                {searchQuery
                  ? "No matching news found"
                  : selectedCategory
                  ? `No news available in ${selectedCategory} category`
                  : "No news available"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {searchQuery
                  ? "Try a different search term"
                  : "Please check back later"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                {selectedCategory && (
                  <h2 className="text-xl font-bold dark:text-white">
                    Category: {selectedCategory}
                  </h2>
                )}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, filteredNews.length)} of{" "}
                  {filteredNews.length} items
                </div>
              </div>
              {/* Mobile Feed (Instagram/Twitter style) */}
              <div className="block sm:hidden ">
                {currentItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-zinc-800  overflow-hidden border border-gray-200 dark:border-zinc-700"
                  >
                    {/* Header with source and time */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center space-x-2">
                        <Avatar
                          name={item.source || "News Source"}
                          size={32}
                          round={true}
                        />
                        <span className="font-medium text-sm dark:text-white">
                          {item.source || "News Source"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-fit bg-gray-100 dark:bg-zinc-700">
                      <img
                        src={item.urlToImage || "/placeholder-news.jpg"}
                        alt={item.title}
                        className="w-full h-auto max-h-[400px]"
                        onError={(e) => {
                          e.target.src = "/placeholder-news.jpg";
                          e.target.className =
                            "w-full h-auto max-h-[400px] object-cover bg-gray-200 dark:bg-zinc-700";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-xs font-medium text-white bg-blue-600/70 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-3 flex justify-between items-center border-b border-gray-100 dark:border-zinc-700">
                      <div className="flex space-x-4">
                        <button className="text-gray-700 dark:text-gray-300 hover:text-red-500">
                          <Heart size={20} />
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                          <MessageSquare size={20} />
                        </button>
                        <button className="text-gray-700 dark:text-gray-300 hover:text-green-500">
                          <Share2 size={20} />
                        </button>
                      </div>
                      <button className="text-gray-700 dark:text-gray-300 hover:text-yellow-500">
                        <Bookmark size={20} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {item.description}
                      </p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                      >
                        Read full story →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {" "}
                {currentItems.map((item) => (
                  <article
                    key={item._id}
                    className="group bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-zinc-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.urlToImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder-news.jpg";
                          e.target.className =
                            "w-full h-full object-cover bg-gray-200 dark:bg-zinc-700";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <span className="text-xs font-medium text-gray-600 bg-gray-50/70 px-2 py-1 rounded">
                          {item.source || "Unknown"}
                        </span>
                        <span className="ml-2 text-xs font-medium text-white bg-blue-600/70 px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="block mt-1 text-xs mb-2 dark:text-gray-300 text-gray-600">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
                        >
                          Read More
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 flex gap-2 rounded-md bg-white shadow dark:bg-zinc-900 ${
                        currentPage === 1
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      &laquo; <span className="hidden md:block">Previous</span>
                    </button>

                    {totalPages > 3 ? (
                      <>
                        {/* First page */}
                        <button
                          onClick={() => paginate(1)}
                          className={`px-3 py-1  shadow  rounded-md ${
                            currentPage === 1
                              ? "bg-blue-600 text-white "
                              : "text-gray-700 dark:text-gray-300 dark:bg-zinc-900  bg-white hover:bg-gray-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          1
                        </button>

                        {/* Ellipsis or number */}
                        {currentPage > 2 && <span className="">...</span>}

                        {/* Current page and adjacent */}
                        {currentPage !== 1 && currentPage !== totalPages && (
                          <button
                            onClick={() => paginate(currentPage)}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white"
                          >
                            {currentPage}
                          </button>
                        )}

                        {/* Ellipsis or number */}
                        {currentPage < totalPages - 1 && (
                          <span className="">...</span>
                        )}

                        {/* Last page */}
                        <button
                          onClick={() => paginate(totalPages)}
                          className={`px-3 py-1 shadow rounded-md ${
                            currentPage === totalPages
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900  hover:bg-gray-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    ) : (
                      // Show all pages if total pages <= 3
                      Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={` py-1 rounded-md ${
                              currentPage === number
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )
                    )}

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 flex gap-2 shadow rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-900  hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      <span className="hidden md:block">Next</span> &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default CurrentAffairs;