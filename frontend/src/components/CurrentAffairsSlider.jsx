
import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppContext } from "../context/AppContext";


const CurrentAffairsSlider = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { backend_URL } = useContext(AppContext);


  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backend_URL}/api/news/fetch-all`);
        const data = await response.json();

        // Get latest 5 news items by reversing and slicing
        const latestNews = [...data].reverse().slice(0, 8);
        setNews(latestNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [backend_URL]);
  // Calculate visible items based on screen size
  const [visibleItems, setVisibleItems] = useState(3);

  // Update visible items on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate the maximum slide index based on visible items
  const maxSlideIndex = Math.max(0, news.length - visibleItems);

  // Slider navigation
  const nextSlide = async () => {

    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));


  };

  const prevSlide = async() => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlideIndex : prev - 1));
 
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [news.length, isPaused]);

  if (loading) {
    return (
      <div className="w-full  bg-white shadow-sm dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-4 sm:p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-100 tracking-tight text-center sm:text-left">
            Current Affairs
          </h2>
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-24"></div>
        </div>

        <div className="relative">
          {/* Skeleton Navigation Arrows */}
          <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 p-2 sm:p-3 rounded-full shadow-lg"></div>
          <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-200 dark:bg-gray-700 p-2 sm:p-3 rounded-full shadow-lg"></div>

          {/* Skeleton Slider Container */}
          <div className="relative overflow-hidden w-full px-2 sm:px-4">
            <div className="flex">
              {[...Array(visibleItems)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: `${100 / visibleItems}%`,
                    minWidth: `${100 / visibleItems}%`,
                  }}
                  className="px-2 sm:px-3"
                >
                  <div className="w-full max-w-sm mx-auto">
                    <div className="relative h-50 sm:h-48 overflow-hidden rounded-xl shadow-md bg-gray-200 dark:bg-gray-700 animate-pulse">
                      <div className="absolute inset-0 flex items-end p-3 sm:p-4">
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      </div>
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gray-300 dark:bg-gray-600 text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton Indicators */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          No news available
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please check back later
        </p>
      </div>
    );
  }

  return (
    <div className="w-full  bg-white shadow-sm dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-4 sm:p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl  text-gray-600 dark:text-gray-100 tracking-tight text-center sm:text-left">
          Current Affairs
        </h2>
        <a
          href="/current-affairs"
          className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 text-sm sm:text-base"
        >
          See All
          <ChevronRight
            className="ml-1 transition-transform group-hover:translate-x-1"
            size={16}
          />
        </a>
      </div>

      <div className="relative">
        {/* Slider Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="text-blue-600 dark:text-blue-400" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute cursor-pointer -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Next slide"
        >
          <ChevronRight
            size={20}
            className="text-blue-600 dark:text-blue-400"
          />
        </button>

        {/* Slider Container */}
        <div
          className="relative overflow-hidden w-full px-2 sm:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / visibleItems)}%)`,
            }}
          >
            {news.map((item, index) => (
              <div
                key={item._id || index}
                style={{
                  width: `${100 / visibleItems}%`,
                  minWidth: `${100 / visibleItems}%`,
                }}
                className={`transition-all flex justify-center px-2 sm:px-3 duration-500 ${
                  index >= currentSlide && index < currentSlide + visibleItems
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-60"
                }`}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group w-full max-w-sm mx-auto hover:no-underline transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-50 sm:h-48 overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                    <img
                      src={item.urlToImage || "/placeholder-news.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-3 sm:p-4">
                      <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                      {item.category ? item.category.split(" & ")[0] : "News"}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2">
          {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 sm:w-8 bg-blue-600 dark:bg-blue-500"
                  : "w-1.5 sm:w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsSlider;