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
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate the maximum slide index based on visible items
  const maxSlideIndex = Math.max(0, news.length - visibleItems);
  
  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">Latest Updates</h2>
        <a
          href="/current-affairs" // Link to your full news page
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          See All
          <ChevronRight className="ml-1" size={18} />
        </a>
      </div>

      <div className="relative">
        {/* Slider Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-zinc-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-blue-600 dark:text-blue-400" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-zinc-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-blue-600 dark:text-blue-400" />
        </button>

        {/* Slider Container */}
        <div 
          className="relative overflow-hidden w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100/visibleItems)}%)` }}
          >
          {news.map((item, index) => (
            <div
              key={item._id || index}
              style={{ width: `${100/visibleItems}%`, minWidth: `${100/visibleItems}%` }}
              className={`transition-all flex  justify-center px-2 duration-300  ${
                index >= currentSlide && index < currentSlide + visibleItems ? "scale-100" : "scale-95 opacity-80"
              }`}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group w-full max-w-xs mx-auto hover:no-underline"
              >
                <div className="relative h-40 overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={item.urlToImage || "/placeholder-news.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <h3 className="text-white text-sm font-medium line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {item.category ? item.category.split(" & ")[0] : "News"}
                  </div>
                </div>
              </a>
            </div>
          ))}
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide
                  ? "bg-blue-600 w-4"
                  : "bg-gray-300 dark:bg-gray-600"
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
