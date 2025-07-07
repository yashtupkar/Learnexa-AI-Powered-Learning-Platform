// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Bookmark,
//   Play,
//   Clock,
//   User,
//   ExternalLink,
//   ArrowLeft,
//   Loader2,
//   Search,
// } from "lucide-react";

// const VideoPage = () => {
//   const [video, setVideo] = useState(null);
//   const [relatedVideos, setRelatedVideos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [savedVideos, setSavedVideos] = useState([]);
//   const { videoId } = useParams();
//   const navigate = useNavigate();

//   const YOUTUBE_API_KEY = "AIzaSyBhUSnmEl7OcyFfuB4K88CH1nKCu6BSndc";

//   // Load saved videos from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("savedVideos");
//     if (saved) {
//       setSavedVideos(JSON.parse(saved));
//     }
//   }, []);

//   // Save videos to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
//   }, [savedVideos]);

//   const toggleSaveVideo = (videoToSave) => {
//     setSavedVideos((prev) => {
//       const isSaved = prev.some((v) => v.id === videoToSave.id);
//       if (isSaved) {
//         return prev.filter((v) => v.id !== videoToSave.id);
//       } else {
//         return [...prev, videoToSave];
//       }
//     });
//   };

//   const isVideoSaved = (id) => {
//     return savedVideos.some((v) => v.id === id);
//   };

//   const fetchVideoDetails = async (id) => {
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${YOUTUBE_API_KEY}`
//       );
//       const data = await response.json();
//       return data.items[0];
//     } catch (error) {
//       console.error("Error fetching video details:", error);
//       return null;
//     }
//   };

//   const fetchRelatedVideos = async (id) => {
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=8&key=${YOUTUBE_API_KEY}`
//       );
//       const data = await response.json();
//       return data.items;
//     } catch (error) {
//       console.error("Error fetching related videos:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       try {
//         const videoData = await fetchVideoDetails(videoId);
//         const relatedVideosData = await fetchRelatedVideos(videoId);

//         setVideo(videoData);
//         setRelatedVideos(relatedVideosData);
//       } catch (error) {
//         console.error("Error loading video data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (videoId) {
//       loadData();
//     }
//   }, [videoId]);

//   const formatDuration = (duration) => {
//     // Your existing duration formatting logic
//   };

//   const formatViewCount = (count) => {
//     // Your existing view count formatting logic
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="animate-spin text-red-500" size={32} />
//       </div>
//     );
//   }

//   if (!video) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Video not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
//       {/* Header with back button */}
//       <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
//           >
//             <ArrowLeft size={20} />
//             <span>Back</span>
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main video player */}
//           <div className="lg:w-2/3">
//             <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-black">
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full"
//                 src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
//                 title={video.snippet.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             </div>

//             {/* Video details */}
//             <div className="mt-6 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//               <h1 className="text-2xl font-bold dark:text-white mb-2">
//                 {video.snippet.title}
//               </h1>

//               {/* Video actions and metadata */}
//               <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <User className="text-white" size={20} />
//                     </div>
//                     <span className="font-medium dark:text-white">
//                       {video.snippet.channelTitle}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {new Date(video.snippet.publishedAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => toggleSaveVideo(video)}
//                     className={`flex items-center space-x-1 transition-colors ${
//                       isVideoSaved(video.id)
//                         ? "text-red-500 dark:text-red-400"
//                         : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
//                     }`}
//                   >
//                     <Bookmark
//                       size={18}
//                       fill={isVideoSaved(video.id) ? "currentColor" : "none"}
//                     />
//                     <span>{isVideoSaved(video.id) ? "Saved" : "Save"}</span>
//                   </button>

//                   <a
//                     href={`https://youtube.com/watch?v=${video.id}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
//                   >
//                     <ExternalLink size={18} />
//                     <span>Open in YouTube</span>
//                   </a>
//                 </div>
//               </div>

//               {/* Video stats and description */}
//               <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
//                 <div className="flex items-center space-x-4 mb-2">
//                   <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
//                     <Play size={16} />
//                     <span>
//                       {formatViewCount(video.statistics.viewCount)} views
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
//                     <Clock size={16} />
//                     <span>{formatDuration(video.contentDetails.duration)}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
//                   {video.snippet.description}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Related videos sidebar */}
//           <div className="lg:w-1/3 space-y-6">
//             <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
//               <h3 className="font-bold text-lg dark:text-white mb-4">
//                 Related Videos
//               </h3>

//               {relatedVideos.length > 0 ? (
//                 <div className="space-y-4">
//                   {relatedVideos.map((relatedVideo) => (
//                     <div
//                       key={relatedVideo.id.videoId}
//                       className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
//                       onClick={() =>
//                         navigate(`/video/${relatedVideo.id.videoId}`)
//                       }
//                     >
//                       <div className="relative w-1/3 min-w-[120px]">
//                         <img
//                           src={relatedVideo.snippet.thumbnails.medium.url}
//                           alt={relatedVideo.snippet.title}
//                           className="rounded-lg aspect-video object-cover"
//                         />
//                       </div>
//                       <div className="w-2/3">
//                         <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
//                           {relatedVideo.snippet.title}
//                         </h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {relatedVideo.snippet.channelTitle}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No related videos found
//                 </p>
//               )}
//             </div>

//             {/* Saved videos section */}
//             {savedVideos.length > 0 && (
//               <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
//                 <h3 className="font-bold text-lg dark:text-white mb-4">
//                   Your Saved Videos
//                 </h3>
//                 <div className="space-y-4">
//                   {savedVideos.slice(0, 3).map((savedVideo) => (
//                     <div
//                       key={`saved-${savedVideo.id}`}
//                       className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
//                       onClick={() => navigate(`/video/${savedVideo.id}`)}
//                     >
//                       <div className="relative w-1/3 min-w-[120px]">
//                         <img
//                           src={savedVideo.snippet.thumbnails.medium.url}
//                           alt={savedVideo.snippet.title}
//                           className="rounded-lg aspect-video object-cover"
//                         />
//                         <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
//                           {formatDuration(savedVideo.contentDetails.duration)}
//                         </div>
//                       </div>
//                       <div className="w-2/3">
//                         <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
//                           {savedVideo.snippet.title}
//                         </h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {savedVideo.snippet.channelTitle}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VideoPage;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Play,
  Clock,
  User,
  ExternalLink,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const VideoPage = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedVideos, setSavedVideos] = useState([]);
  const { videoId } = useParams();
  const navigate = useNavigate();

  // const YOUTUBE_API_KEY = "AIzaSyBhUSnmEl7OcyFfuB4K88CH1nKCu6BSndc";
  const YOUTUBE_API_KEY = "AIzaSyCaDKCk_mCzo-e1sbbeOun3LnRq6py9saw";
  // Load saved videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedVideos");
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }
  }, []);

  // Save videos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
  }, [savedVideos]);

  const toggleSaveVideo = (videoToSave) => {
    setSavedVideos((prev) => {
      const isSaved = prev.some((v) => v.id === videoToSave.id);
      if (isSaved) {
        return prev.filter((v) => v.id !== videoToSave.id);
      } else {
        return [...prev, videoToSave];
      }
    });
  };

  const isVideoSaved = (id) => {
    return savedVideos.some((v) => v.id === id);
  };

  const fetchVideoDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items?.[0] || null;
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError("Failed to load video details");
      return null;
    }
  };

  const fetchRelatedVideos = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(
          searchQuery
        )}&key=${YOUTUBE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching related videos:", error);
      setError("Failed to load related videos");
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const videoData = await fetchVideoDetails(videoId);
        if (!videoData) {
          setError("Video not found");
          setIsLoading(false);
          return;
        }

        setVideo(videoData);

        // Use video title or channel to find related videos
        const searchQuery = `${videoData.snippet.title} ${videoData.snippet.channelTitle}`;
        const relatedVideosData = await fetchRelatedVideos(searchQuery);
        setRelatedVideos(relatedVideosData);
      } catch (error) {
        console.error("Error loading video data:", error);
        setError("Failed to load video data");
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      loadData();
    }
  }, [videoId]);

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

  const formatViewCount = (count) => {
    if (!count) return "0 views";
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-red-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Header with back button */}
      <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main video player */}
          <div className="lg:w-2/3">
            <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video details */}
            <div className="mt-6 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h1 className="text-2xl font-bold dark:text-white mb-2">
                {video.snippet.title}
              </h1>

              {/* Video actions and metadata */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>
                    <span className="font-medium dark:text-white">
                      {video.snippet.channelTitle}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleSaveVideo(video)}
                    className={`flex items-center space-x-1 transition-colors ${
                      isVideoSaved(video.id)
                        ? "text-red-500 dark:text-red-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={isVideoSaved(video.id) ? "currentColor" : "none"}
                    />
                    <span>{isVideoSaved(video.id) ? "Saved" : "Save"}</span>
                  </button>

                  <a
                    href={`https://youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Open in YouTube</span>
                  </a>
                </div>
              </div>

              {/* Video stats and description */}
              <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <Play size={16} />
                    <span>
                      {formatViewCount(video.statistics.viewCount)} views
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={16} />
                    <span>{formatDuration(video.contentDetails.duration)}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {video.snippet.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related videos sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="font-bold text-lg dark:text-white mb-4">
                Related Videos
              </h3>

              {relatedVideos.length > 0 ? (
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <div
                      key={relatedVideo.id.videoId}
                      className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
                      onClick={() =>
                        navigate(`/video/${relatedVideo.id.videoId}`)
                      }
                    >
                      <div className="relative w-1/3 min-w-[120px]">
                        <img
                          src={
                            relatedVideo.snippet.thumbnails?.medium?.url || ""
                          }
                          alt={relatedVideo.snippet.title}
                          className="rounded-lg aspect-video object-cover"
                        />
                      </div>
                      <div className="w-2/3">
                        <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
                          {relatedVideo.snippet.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {relatedVideo.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No related videos found
                </p>
              )}
            </div>

            {/* Saved videos section */}
            {savedVideos.length > 0 && (
              <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg dark:text-white mb-4">
                  Your Saved Videos
                </h3>
                <div className="space-y-4">
                  {savedVideos.slice(0, 3).map((savedVideo) => (
                    <div
                      key={`saved-${savedVideo.id}`}
                      className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
                      onClick={() => navigate(`/video/${savedVideo.id}`)}
                    >
                      <div className="relative w-1/3 min-w-[120px]">
                        <img
                          src={savedVideo.snippet.thumbnails?.medium?.url || ""}
                          alt={savedVideo.snippet.title}
                          className="rounded-lg aspect-video object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {formatDuration(savedVideo.contentDetails?.duration)}
                        </div>
                      </div>
                      <div className="w-2/3">
                        <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
                          {savedVideo.snippet.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {savedVideo.snippet.channelTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;