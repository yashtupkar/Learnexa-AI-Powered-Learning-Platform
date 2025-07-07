import { useState, useEffect } from "react";
import {
  Search,
  Play,
  Bookmark,
  AlertTriangle,
  User,
  Loader2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeTogler";


const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [savedVideos, setSavedVideos] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const YOUTUBE_API_KEY = "AIzaSyBhUSnmEl7OcyFfuB4K88CH1nKCu6BSndc";

  // Extract query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    if (query) {
      setSearchTerm(query);
      setHasSearched(true);
      fetchVideos(query);
    }
  }, [location]);

  // Format view count
  const formatViewCount = (count) => {
    if (!count) return "No views";
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  };

  // Format video duration
  const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = matches[1] ? matches[1].replace("H", "") : "0";
    const minutes = matches[2] ? matches[2].replace("M", "") : "0";
    const seconds = matches[3] ? matches[3].replace("S", "") : "0";
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  };

  // Check if video is saved
  const isVideoSaved = (videoId) => {
    return savedVideos.some((video) => video.id.videoId === videoId);
  };

  // Toggle save video
  const toggleSaveVideo = (video) => {
    if (isVideoSaved(video.id.videoId)) {
      setSavedVideos(
        savedVideos.filter((v) => v.id.videoId !== video.id.videoId)
      );
    } else {
      setSavedVideos([...savedVideos, video]);
    }
  };

  // Handle video click
  const handleVideoClick = (video) => {
    navigate(`/study-tube/watch?v=${video.id.videoId}`);
  };

  // Fetch videos from YouTube API
  const fetchVideos = async (query = searchTerm) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setShowWarning(false);

    try {
      // YouTube API call
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=20&` +
          `q=${encodeURIComponent(query)}&` +
          `type=video&` +
          `order=relevance&` +
          `videoDuration=medium&` + // Filters out shorts
          `videoEmbeddable=true&` +
          `videoSyndicated=true&` +
          `relevanceLanguage=en&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!youtubeResponse.ok) throw new Error("YouTube API error");

      const youtubeData = await youtubeResponse.json();

      // Get video details in batch
      if (youtubeData.items?.length > 0) {
        const videoIds = youtubeData.items
          .map((video) => video.id.videoId)
          .join(",");
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?` +
            `part=contentDetails,statistics,snippet&` +
            `id=${videoIds}&` +
            `key=${YOUTUBE_API_KEY}`
        );

        const detailsData = await detailsResponse.json();

        // Filter out shorts
        const filteredVideos = youtubeData.items
          .filter((video) => {
            const details = detailsData.items.find(
              (item) => item.id === video.id.videoId
            );
            if (!details) return false;

            const duration = details.contentDetails.duration;
            const isShort =
              duration.includes("M0S") || duration.includes("M1S");

            return !isShort;
          })
          .map((video) => {
            const details = detailsData.items.find(
              (item) => item.id === video.id.videoId
            );
            return {
              ...video,
              contentDetails: details.contentDetails,
              statistics: details.statistics,
              fullSnippet: details.snippet,
            };
          });

        if (filteredVideos.length === 0) {
          setWarningMessage(
            "No high-quality educational content found. Try different terms."
          );
          setShowWarning(true);
        }

        setVideos(filteredVideos);
        setHasSearched(true);
      } else {
        setWarningMessage("No videos found for this search");
        setShowWarning(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setWarningMessage(`Error: ${error.message}`);
      setShowWarning(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowWarning(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all duration-300">
      {showWarning && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center backdrop-blur-sm">
            <AlertTriangle className="mr-2 animate-pulse" />
            <span className="font-medium">{warningMessage}</span>
          </div>
        </div>
      )}

      <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold flex items-center dark:text-white">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-2">
                <Play className="text-white" size={20} />
              </div>
              StudyTube
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle/>
            <div className="relative w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
                placeholder="Search educational videos..."
                className="w-full text-sm p-3 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
              />
              <Search
                className="absolute left-3 text-sm top-3.5 text-gray-400"
                size={18}
              />
            </div>
            <button
              onClick={fetchVideos}
              className="bg-gradient-to-r text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loader2 className="text-red-500 animate-spin" size={24} />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Finding the best educational content...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold dark:text-white mb-2">
                  Study Content for "{searchTerm}"
                </h2>
                <span className="text-gray-600 dark:text-gray-400">
                  {videos.length} educational videos found
                </span>
              </div>
              <button
                onClick={() => navigate("/study-tube")}
                className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl transition-all"
              >
                New Search
              </button>
            </div>

            {videos.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/80 dark:bg-zinc-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                  <AlertTriangle
                    className="mx-auto mb-4 text-red-500"
                    size={48}
                  />
                  <h3 className="text-xl font-bold dark:text-white mb-2">
                    No study content found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try searching with more academic terms
                  </p>
                  <button
                    onClick={() => navigate("/study-tube")}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    Back to Study Topics
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <div
                    key={`${video.id.videoId}-${index}`}
                    className="group bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-700 cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative pb-[56.25%]">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="absolute top-0 left-0 w-full h-full rounded-t-2xl object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {formatDuration(video.contentDetails?.duration)}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 rounded-full p-4">
                          <Play className="text-white" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg line-clamp-2 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
                        {video.snippet.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {video.snippet.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="text-white" size={16} />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {video.snippet.channelTitle}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveVideo(video);
                          }}
                          className={`transition-colors ${
                            isVideoSaved(video.id.videoId)
                              ? "text-red-500 dark:text-red-400"
                              : "text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                          }`}
                        >
                          <Bookmark
                            size={20}
                            fill={
                              isVideoSaved(video.id.videoId)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {formatViewCount(video.statistics?.viewCount)}
                        </span>
                        <span>
                          {new Date(
                            video.snippet.publishedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
              <Play className="text-white" size={16} />
            </div>
            <span className="font-bold text-gray-800 dark:text-white">
              StudyTube
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} StudyTube - Focused Learning
            Environment
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
