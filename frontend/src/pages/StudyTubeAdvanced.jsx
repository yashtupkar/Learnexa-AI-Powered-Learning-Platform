import { useState, useEffect } from "react";
import {
  Search,
  Bookmark,
  History,
  Play,
  Clock,
  User,
  AlertTriangle,
  BookOpen,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Star,
  Filter,
  ArrowLeft,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeTogler";
import { GoogleLogin, googleLogout } from 'react-google-login';
import { FaYoutube } from "react-icons/fa";

const StudyTubeAdvanced = () => {

  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [studyScore, setStudyScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [savedVideos, setSavedVideos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const navigate = useNavigate();

  // Replace with your actual keys
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Study keywords for relevance check
  const STUDY_KEYWORDS = [
    "math",
    "mathematics",
    "algebra",
    "calculus",
    "geometry",
    "trigonometry",
    "science",
    "physics",
    "chemistry",
    "biology",
    "astronomy",
    "geology",
    "history",
    "world history",
    "us history",
    "european history",
    "geography",
    "social studies",
    "economics",
    "psychology",
    "sociology",
    "philosophy",
    "literature",
    "english",
    "grammar",
    "writing",
    "reading",
    "computer science",
    "programming",
    "coding",
    "algorithm",
    "data structure",
    "engineering",
    "electrical",
    "mechanical",
    "civil",
    "chemical",
    "medicine",
    "anatomy",
    "physiology",
    "biochemistry",
    "study",
    "learn",
    "tutorial",
    "lecture",
    "course",
    "class",
    "education",
    "homework",
    "assignment",
    "exam",
    "test",
    "quiz",
    "review",
    "notes",
    "textbook",
    "research",
    "theory",
    "concept",
    "principle",
    "formula",
    "equation",
    "proof",
    "theorem",
    "experiment",
    "lab",
    "interview",
    "demonstration",
    "quantum",
    "thermodynamics",
    "organic chemistry",
    "cell biology",
    "linear algebra",
    "probability",
    "statistics",
    "machine learning",
    "artificial intelligence",
    "neural networks",
    "world war",
    "renaissance",
    "industrial revolution",
    "ancient civilization",
    "shakespeare",
    "poetry",
    "essay",
    "thesis",
    "dissertation",
  ];

  // Handle Google login success
  const handleLoginSuccess = (response) => {
    setIsAuthenticated(true);
    setUserAccessToken(response.accessToken);
    setUserProfile(response.profileObj);
  };

  // Handle Google login failure
  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    setWarningMessage(
      "Failed to connect to YouTube. Using StudyTube search instead."
    );
    setShowWarning(true);
  };

  // Handle logout
  const handleLogout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUserAccessToken("");
    setUserProfile(null);
    setUserSubscriptions([]);
    setUserHistory([]);
  };

  // Fetch user's YouTube data (subscriptions and history)
  const fetchUserYouTubeData = async () => {
    if (!isAuthenticated || !userAccessToken) return;

    try {
      // Get subscriptions
      const subsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/subscriptions?` +
          `part=snippet,contentDetails&` +
          `mine=true&` +
          `maxResults=10`,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );

      if (subsResponse.ok) {
        const subsData = await subsResponse.json();
        setUserSubscriptions(subsData.items || []);
      }

      // Get watch history (requires additional scope)
      const historyResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/activities?` +
          `part=snippet,contentDetails&` +
          `mine=true&` +
          `maxResults=10`,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );

      if (historyResponse.ok) {
        const historyData = await historyResponse.json();
        setUserHistory(historyData.items || []);
      }
    } catch (error) {
      console.error("Error fetching user YouTube data:", error);
    }
  };

  // Load saved and watched videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("studyTubeSavedVideos");
    const watched = localStorage.getItem("studyTubeWatchedVideos");
    if (saved) setSavedVideos(JSON.parse(saved));
    if (watched) setWatchedVideos(JSON.parse(watched));
  }, []);

  // Save videos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("studyTubeSavedVideos", JSON.stringify(savedVideos));
    localStorage.setItem(
      "studyTubeWatchedVideos",
      JSON.stringify(watchedVideos)
    );
  }, [savedVideos, watchedVideos]);

  // Fetch user data when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserYouTubeData();
    }
  }, [isAuthenticated]);

  // Check if video is saved
  const isVideoSaved = (videoId) => {
    return savedVideos.some((v) => v.id.videoId === videoId);
  };

  // Toggle save video
  const toggleSaveVideo = (video) => {
    setSavedVideos((prev) => {
      const isSaved = prev.some((v) => v.id.videoId === video.id.videoId);
      if (isSaved) {
        return prev.filter((v) => v.id.videoId !== video.id.videoId);
      } else {
        return [...prev, video];
      }
    });
  };

  // Add to watched history
  const addToWatchedHistory = (video) => {
    setWatchedVideos((prev) => {
      const filtered = prev.filter((v) => v.id.videoId !== video.id.videoId);
      return [video, ...filtered].slice(0, 20);
    });
  };

  // AI-powered study relevance check
  const checkStudyRelevance = async (query) => {
    setIsAiAnalyzing(true);
    const fallbackResponse = {
      isStudyRelated: true,
      confidenceScore: 50,
      suggestedQuery: query,
      reason: "API unavailable - proceeding with search",
    };

    try {
      // First check for keywords in the query
      const lowerQuery = query.toLowerCase();
      const hasKeyword = STUDY_KEYWORDS.some((keyword) =>
        lowerQuery.includes(keyword.toLowerCase())
      );

      if (hasKeyword) {
        return {
          isStudyRelated: true,
          confidenceScore: 90,
          suggestedQuery: query,
          reason: "Contains known study-related keywords",
        };
      }

      // If no keywords found, proceed with AI analysis
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.href,
            "X-Title": "StudyTube",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "system",
                content: `You are an educational content analyzer. Respond STRICTLY with ONLY a valid JSON object in this exact format:
  {
    "isStudyRelated": boolean,
    "confidenceScore": number,
    "suggestedQuery": "string",
    "reason": "string"
  }
  DO NOT include any markdown formatting, additional text, or explanations. ONLY the JSON object.`,
              },
              {
                role: "user",
                content: `Analyze this search query: "${query}"`,
              },
            ],
            temperature: 0.3,
            max_tokens: 150,
            response_format: { type: "json_object" },
          }),
        }
      );

      if (!response.ok) {
        console.error("API error:", response.status, await response.text());
        return fallbackResponse;
      }

      const data = await response.json();

      if (data.choices?.[0]?.message?.content) {
        let content = data.choices[0].message.content;

        if (content.startsWith("```json")) {
          content = content.replace(/```json|```/g, "").trim();
        }

        try {
          const result = JSON.parse(content);
          return {
            isStudyRelated: result.isStudyRelated ?? true,
            confidenceScore: result.confidenceScore ?? 50,
            suggestedQuery: result.suggestedQuery || query,
            reason: result.reason || "Analyzed by DeepSeek R1",
          };
        } catch (e) {
          console.error("Parsing failed. Raw content:", content);
          return fallbackResponse;
        }
      }

      return fallbackResponse;
    } catch (error) {
      console.error("API request failed:", error);
      return fallbackResponse;
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Fetch videos from YouTube
  const fetchVideos = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setShowWarning(false);
    setSelectedVideo(null);

    try {
      // AI relevance check
      const { isStudyRelated, confidenceScore, suggestedQuery, reason } =
        await checkStudyRelevance(searchTerm);

      setStudyScore(confidenceScore);

      if (!isStudyRelated) {
        setWarningMessage(
          `This search doesn't appear study-related (${Math.round(
            confidenceScore
          )}% confidence). ${reason}`
        );
        setShowWarning(true);
        setIsLoading(false);
        return;
      }

      const finalQuery =
        suggestedQuery && suggestedQuery !== searchTerm
          ? suggestedQuery
          : searchTerm;

      let youtubeResponse;

      if (isAuthenticated && userAccessToken) {
        // Use user's YouTube account for search
        youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&` +
            `maxResults=20&` +
            `q=${encodeURIComponent(finalQuery)}&` +
            `type=video&` +
            `order=relevance&` +
            `videoDuration=medium&` +
            `videoEmbeddable=true&` +
            `videoSyndicated=true&` +
            `videoDefinition=high&` +
            `videoCaption=closedCaption&` +
            `relevanceLanguage=en&` +
            `topicId=/m/01k8wb`,
          {
            headers: {
              Authorization: `Bearer ${userAccessToken}`,
            },
          }
          );
          console.log("fetch from youtube")
      } else {
        // Fall back to API key
        youtubeResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&` +
            `maxResults=20&` +
            `q=${encodeURIComponent(finalQuery)}&` +
            `type=video&` +
            `order=relevance&` +
            `videoDuration=medium&` +
            `videoEmbeddable=true&` +
            `videoSyndicated=true&` +
            `videoDefinition=high&` +
            `videoCaption=closedCaption&` +
            `relevanceLanguage=en&` +
            `topicId=/m/01k8wb&` +
            `key=${YOUTUBE_API_KEY}`
          );
          console.log("fetch from api");

      }

      if (!youtubeResponse.ok) throw new Error("YouTube API error");

      const youtubeData = await youtubeResponse.json();

      // Get video details in batch for better filtering
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

        // Filter out shorts and non-educational content
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

  // Fetch related videos
  const fetchRelatedVideos = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=10&` +
          `type=video&` +
          `relatedToVideoId=${videoId}&` +
          `videoDuration=medium&` +
          `videoEmbeddable=true&` +
          `videoSyndicated=true&` +
          `relevanceLanguage=en&` +
          `key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) throw new Error("YouTube API error");

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching related videos:", error);
      return [];
    }
  };

  // Format duration
  const formatDuration = (duration) => {
    if (!duration) return "0:00";

    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  // Format view count
  const formatViewCount = (count) => {
    if (!count) return "0 views";

    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    } else {
      return `${num} views`;
    }
  };

  // Handle video click
  const handleVideoClick = async (video) => {
    setIsLoading(true);
    setSelectedVideo(video);
    addToWatchedHistory(video);

    // Fetch related videos
    const relatedVideos = await fetchRelatedVideos(video.id.videoId);

    // Get details for the related videos
    if (relatedVideos.length > 0) {
      const videoIds = relatedVideos.map((v) => v.id.videoId).join(",");
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
          `part=contentDetails,statistics,snippet&` +
          `id=${videoIds}&` +
          `key=${YOUTUBE_API_KEY}`
      );

      const detailsData = await detailsResponse.json();

      // Combine the data
      const enhancedVideos = relatedVideos.map((video) => {
        const details = detailsData.items.find(
          (item) => item.id === video.id.videoId
        );
        return {
          ...video,
          contentDetails: details?.contentDetails,
          statistics: details?.statistics,
          fullSnippet: details?.snippet,
        };
      });

      setVideos(enhancedVideos);
    }

    setIsLoading(false);
    navigate(`/video/${video.id.videoId}`);
  };

  // Handle back to results
  const handleBackToResults = () => {
    setSelectedVideo(null);
    navigate("/study-tube");
  };

  // Study categories
  const studyCategories = [
    { id: "all", name: "All Topics", icon: BookOpen, color: "bg-blue-500" },
    {
      id: "computer-science",
      name: "Computer Science",
      icon: Brain,
      color: "bg-purple-500",
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Target,
      color: "bg-green-500",
    },
    { id: "physics", name: "Physics", icon: Zap, color: "bg-yellow-500" },
    {
      id: "programming",
      name: "Programming",
      icon: Brain,
      color: "bg-red-500",
    },
    {
      id: "business",
      name: "Business",
      icon: TrendingUp,
      color: "bg-indigo-500",
    },
  ];

  // Quick search terms
  const quickSearchTerms = [
    "Machine Learning Tutorial",
    "Calculus Derivatives",
    "React.js Fundamentals",
    "Data Structures",
    "Quantum Physics",
    "Financial Analysis",
  ];

  // If we have a selected video, render the single video view
  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
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
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <img
                    src={userProfile.imageUrl}
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Sign in with YouTube"
                  onSuccess={handleLoginSuccess}
                  onFailure={handleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  scope="https://www.googleapis.com/auth/youtube.readonly"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all transform hover:scale-105 shadow-md flex items-center space-x-2"
                    >
                      <FaYoutube className="text-red-500" size={18} />
                      <span>Sign in with YouTube</span>
                    </button>
                  )}
                />
              )}
              <div className="relative w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchVideos();
                      handleBackToResults();
                    }
                  }}
                  placeholder="Search educational videos..."
                  className="w-full text-sm p-3 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
                />
                <Search
                  className="absolute left-3 text-sm top-3.5 text-gray-400"
                  size={18}
                />
              </div>
              <button
                onClick={() => {
                  fetchVideos();
                  handleBackToResults();
                }}
                className="bg-gradient-to-r text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
        </header>

        <button
          onClick={handleBackToResults}
          className="flex bg-gray-200 dark:bg-zinc-800 rounded-lg px-3 py-2 text-sm cursor-pointer m-4 items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to results</span>
        </button>

        <main className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-6 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold dark:text-white mb-2">
                  {selectedVideo.snippet.title}
                </h1>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <span className="font-medium dark:text-white">
                        {selectedVideo.fullSnippet.channelTitle}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(
                        selectedVideo.snippet.publishedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleSaveVideo(selectedVideo)}
                      className={`flex items-center space-x-1 transition-colors ${
                        isVideoSaved(selectedVideo.id.videoId)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                      }`}
                    >
                      <Bookmark
                        size={18}
                        fill={
                          isVideoSaved(selectedVideo.id.videoId)
                            ? "currentColor"
                            : "none"
                        }
                      />
                      <span>
                        {isVideoSaved(selectedVideo.id.videoId)
                          ? "Saved"
                          : "Save"}
                      </span>
                    </button>
                    <a
                      href={`https://youtube.com/watch?v=${selectedVideo.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Open in YouTube</span>
                    </a>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                      <Play size={16} />
                      <span>
                        {formatViewCount(selectedVideo.statistics?.viewCount)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                      <Clock size={16} />
                      <span>
                        {formatDuration(selectedVideo.contentDetails?.duration)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedVideo.fullSnippet.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
                <h3 className="font-bold text-lg dark:text-white mb-4">
                  Related Videos
                </h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="animate-spin text-red-500" size={24} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {videos
                      .filter((v) => v.id.videoId !== selectedVideo.id.videoId)
                      .slice(0, 8)
                      .map((video) => (
                        <div
                          key={video.id.videoId}
                          className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
                          onClick={() => handleVideoClick(video)}
                        >
                          <div className="relative w-1/3 min-w-[120px]">
                            <img
                              src={video.snippet.thumbnails.medium.url}
                              alt={video.snippet.title}
                              className="rounded-lg aspect-video object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {formatDuration(video.contentDetails?.duration)}
                            </div>
                          </div>
                          <div className="w-2/3">
                            <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
                              {video.snippet.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {video.snippet.channelTitle}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatViewCount(video.statistics?.viewCount)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                {/* Saved Videos Component */}
                {savedVideos.length > 0 && (
                  <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mt-4">
                    <h3 className="font-bold text-lg dark:text-white mb-4">
                      Saved Videos
                    </h3>
                    <div className="space-y-4">
                      {savedVideos.slice(0, 3).map((video) => (
                        <div
                          key={`saved-${video.id.videoId}`}
                          className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
                          onClick={() => handleVideoClick(video)}
                        >
                          <div className="relative w-1/3 min-w-[120px]">
                            <img
                              src={video.snippet.thumbnails.medium.url}
                              alt={video.snippet.title}
                              className="rounded-lg aspect-video object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {formatDuration(video.contentDetails?.duration)}
                            </div>
                          </div>
                          <div className="w-2/3">
                            <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
                              {video.snippet.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {video.snippet.channelTitle}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatViewCount(video.statistics?.viewCount)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        hasSearched
          ? "bg-white dark:bg-black"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
      }`}
    >
      {showWarning && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center backdrop-blur-sm">
            <AlertTriangle className="mr-2 animate-pulse" />
            <span className="font-medium">{warningMessage}</span>
          </div>
        </div>
      )}

      {hasSearched ? (
        <>
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
                <ThemeToggle />
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={userProfile.imageUrl}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <button
                      onClick={handleLogout}
                      className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Sign in with YouTube"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    scope="https://www.googleapis.com/auth/youtube.readonly"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all transform hover:scale-105 shadow-md flex items-center space-x-2"
                      >
                        <FaYoutube className="text-red-500" size={18} />
                        <span>Sign in with YouTube</span>
                      </button>
                    )}
                  />
                )}
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
                    <div className="absolute top-1/2 left-1/2 transform                     -translate-y-1/2">
                      <Brain className="text-red-500 animate-pulse" size={24} />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium dark:text-white mb-2">
                    {isAiAnalyzing
                      ? "Analyzing study relevance..."
                      : "Finding best educational content..."}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {isAiAnalyzing
                      ? "Using AI to filter for high-quality study material"
                      : "Searching YouTube for relevant videos"}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold dark:text-white">
                    Search Results for "{searchTerm}"
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="text-gray-500 dark:text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white"
                    >
                      <option value="all">All Categories</option>
                      {studyCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video) => (
                    <div
                      key={video.id.videoId}
                      className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="relative">
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(video.contentDetails?.duration)}
                        </div>
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveVideo(video);
                            }}
                            className={`p-2 rounded-full backdrop-blur-sm ${
                              isVideoSaved(video.id.videoId)
                                ? "text-red-500 bg-white/90"
                                : "text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70"
                            }`}
                          >
                            <Bookmark
                              size={18}
                              fill={
                                isVideoSaved(video.id.videoId)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg line-clamp-2 dark:text-white mb-2">
                          {video.snippet.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {video.snippet.channelTitle}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
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
              </>
            )}
          </main>
        </>
      ) : (
        <>
          <header className="bg-transparent p-6">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-3xl font-bold flex items-center dark:text-white">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-2">
                  <Play className="text-white" size={24} />
                </div>
                StudyTube
              </h1>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={userProfile.imageUrl}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <button
                      onClick={handleLogout}
                      className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Sign in with YouTube"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    cookiePolicy={"single_host_origin"}
                    scope="https://www.googleapis.com/auth/youtube.readonly"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all transform hover:scale-105 shadow-md flex items-center space-x-2"
                      >
                        <FaYoutube className="text-red-500" size={18} />
                        <span>Sign in with YouTube</span>
                      </button>
                    )}
                  />
                )}
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 dark:text-white">
                Learn Smarter with{" "}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  StudyTube
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
                AI-powered educational content discovery for focused learning
              </p>

              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
                  placeholder="Search for educational videos (e.g., 'Quantum Physics')"
                  className="w-full text-lg p-5 pl-14 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-transparent dark:text-white transition-all shadow-xl"
                />
                <Search
                  className="absolute left-5 top-5 text-gray-500 dark:text-gray-400"
                  size={24}
                />
                <button
                  onClick={fetchVideos}
                  className="absolute right-2 top-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">
                Popular Study Topics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {studyCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`${category.color} p-6 rounded-xl text-white cursor-pointer transition-all transform hover:scale-105 shadow-lg`}
                    onClick={() => {
                      setSearchTerm(category.name);
                      fetchVideos();
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <category.icon size={32} className="mb-3" />
                      <h3 className="font-bold">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">
                Quick Searches
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {quickSearchTerms.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchTerm(term);
                      fetchVideos();
                    }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 transition-all transform hover:scale-105 shadow-md"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {savedVideos.length > 0 && (
              <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">
                  Your Saved Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedVideos.slice(0, 4).map((video) => (
                    <div
                      key={`saved-${video.id.videoId}`}
                      className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="relative">
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(video.contentDetails?.duration)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg line-clamp-2 dark:text-white mb-2">
                          {video.snippet.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {video.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {watchedVideos.length > 0 && (
              <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">
                  Recently Watched
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {watchedVideos.slice(0, 4).map((video) => (
                    <div
                      key={`watched-${video.id.videoId}`}
                      className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="relative">
                        <img
                          src={video.snippet.thumbnails.medium.url}
                          alt={video.snippet.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(video.contentDetails?.duration)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg line-clamp-2 dark:text-white mb-2">
                          {video.snippet.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {video.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default StudyTubeAdvanced;
