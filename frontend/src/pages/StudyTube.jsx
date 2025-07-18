// import { useState, useEffect } from "react";
// import {
//   Search,
//   Bookmark,
//   History,
//   Play,
//   Clock,
//   User,
//   AlertTriangle,
//   BookOpen,
//   Brain,
//   Zap,
//   Target,
//   TrendingUp,
//   Star,
//   Filter,
//   ArrowLeft,
//   ExternalLink,
//   Loader2,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ThemeToggle } from "../components/ThemeTogler";

// const StudyTube = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
//   const [showWarning, setShowWarning] = useState(false);
//   const [warningMessage, setWarningMessage] = useState("");
//   const [studyScore, setStudyScore] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const navigate = useNavigate();

//   // Replace this with your actual YouTube API key
//   // const YOUTUBE_API_KEY = "AIzaSyBhUSnmEl7OcyFfuB4K88CH1nKCu6BSndc";
//   const YOUTUBE_API_KEY = "AIzaSyCaDKCk_mCzo-e1sbbeOun3LnRq6py9saw";
//   // const OPENROUTER_API_KEY =
//   //   "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";
//     const OPENROUTER_API_KEY =
//       "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";
//   const GEMINI_MODEL = "deepseek/deepseek-r1:free";

//   // AI-powered study relevance check using OpenRouter Gemini
//   const checkStudyRelevance = async (query) => {
//     setIsAiAnalyzing(true);
//     const fallbackResponse = {
//       isStudyRelated: true,
//       confidenceScore: 50,
//       suggestedQuery: query,
//       reason: "API unavailable - proceeding with search",
//     };

//     try {
//       const response = await fetch(
//         "https://openrouter.ai/api/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//             "HTTP-Referer": window.location.href,
//             "X-Title": "StudyTube",
//           },
//           body: JSON.stringify({
//             model: "deepseek/deepseek-r1:free",
//             messages: [
//               {
//                 role: "system",
//                 content: `You are an educational content analyzer. Respond STRICTLY with ONLY a valid JSON object in this exact format:
//   {
//     "isStudyRelated": boolean,
//     "confidenceScore": number,
//     "suggestedQuery": "string",
//     "reason": "string"
//   }
//   DO NOT include any markdown formatting, additional text, or explanations. ONLY the JSON object.`,
//               },
//               {
//                 role: "user",
//                 content: `Analyze this search query: "${query}"`,
//               },
//             ],
//             temperature: 0.3, // Lower temperature for more consistent responses
//             max_tokens: 150,
//             response_format: { type: "json_object" }, // Request JSON format
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.error("API error:", response.status, await response.text());
//         return fallbackResponse;
//       }

//       const data = await response.json();

//       if (data.choices?.[0]?.message?.content) {
//         let content = data.choices[0].message.content;

//         // Clean the response if it includes markdown formatting
//         if (content.startsWith("```json")) {
//           content = content.replace(/```json|```/g, "").trim();
//         }

//         try {
//           const result = JSON.parse(content);
//           return {
//             isStudyRelated: result.isStudyRelated ?? true,
//             confidenceScore: result.confidenceScore ?? 50,
//             suggestedQuery: result.suggestedQuery || query,
//             reason: result.reason || "Analyzed by DeepSeek R1",
//           };
//         } catch (e) {
//           console.error("Parsing failed. Raw content:", content);
//           return fallbackResponse;
//         }
//       }

//       return fallbackResponse;
//     } catch (error) {
//       console.error("API request failed:", error);
//       return fallbackResponse;
//     } finally {
//       setIsAiAnalyzing(false);
//     }
//   };

//   const fetchVideos = async () => {
//     if (!searchTerm.trim()) return;

//     setIsLoading(true);
//     setShowWarning(false);

//     try {
//       // AI relevance check
//       const { isStudyRelated, confidenceScore, suggestedQuery, reason } =
//         await checkStudyRelevance(searchTerm);

//       setStudyScore(confidenceScore);

//       if (!isStudyRelated) {
//         setWarningMessage(
//           `This search doesn't appear study-related (${Math.round(
//             confidenceScore
//           )}% confidence). ${reason}`
//         );
//         setShowWarning(true);
//         setIsLoading(false);
//         return;
//       }

//       // Use the AI-suggested query if available and different
//       const finalQuery =
//         suggestedQuery && suggestedQuery !== searchTerm
//           ? suggestedQuery
//           : searchTerm;

//       // Enhanced YouTube API parameters for educational content
//       const youtubeResponse = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?` +
//           `part=snippet&` +
//           `maxResults=20&` +
//           `q=${encodeURIComponent(finalQuery)}&` +
//           `type=video&` +
//           `order=relevance&` +
//           `videoDuration=medium&` + // Filters out shorts
//           `videoEmbeddable=true&` +
//           `videoSyndicated=true&` +
//           `relevanceLanguage=en&` +
//           `key=${YOUTUBE_API_KEY}`
//       );

//       if (!youtubeResponse.ok) throw new Error("YouTube API error");

//       const youtubeData = await youtubeResponse.json();

//       // Get video details in batch for better filtering
//       if (youtubeData.items?.length > 0) {
//         const videoIds = youtubeData.items
//           .map((video) => video.id.videoId)
//           .join(",");
//         const detailsResponse = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?` +
//             `part=contentDetails,statistics,snippet&` +
//             `id=${videoIds}&` +
//             `key=${YOUTUBE_API_KEY}`
//         );

//         const detailsData = await detailsResponse.json();

//         // Filter out shorts and non-educational content
//         const filteredVideos = youtubeData.items
//           .filter((video) => {
//             const details = detailsData.items.find(
//               (item) => item.id === video.id.videoId
//             );
//             if (!details) return false;

//             const duration = details.contentDetails.duration;
//             const isShort = duration.includes("M0S") || duration.includes("M1S");

//             return !isShort;
//           })
//           .map((video) => {
//             const details = detailsData.items.find(
//               (item) => item.id === video.id.videoId
//             );
//             return {
//               ...video,
//               contentDetails: details.contentDetails,
//               statistics: details.statistics,
//               fullSnippet: details.snippet,
//             };
//           });

//         if (filteredVideos.length === 0) {
//           setWarningMessage(
//             "No high-quality educational content found. Try different terms."
//           );
//           setShowWarning(true);
//         }

//         setVideos(filteredVideos);
//         setHasSearched(true);
//       } else {
//         setWarningMessage("No videos found for this search");
//         setShowWarning(true);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setWarningMessage(`Error: ${error.message}`);
//       setShowWarning(true);
//     } finally {
//       setIsLoading(false);
//       setTimeout(() => setShowWarning(false), 5000);
//     }
//   };

//   const formatDuration = (duration) => {
//     if (!duration) return "0:00";

//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     if (!match) return "0:00";

//     const hours = parseInt(match[1]) || 0;
//     const minutes = parseInt(match[2]) || 0;
//     const seconds = parseInt(match[3]) || 0;

//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//     } else {
//       return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//     }
//   };

//   const formatViewCount = (count) => {
//     if (!count) return "0 views";

//     const num = parseInt(count);
//     if (num >= 1000000) {
//       return `${(num / 1000000).toFixed(1)}M views`;
//     } else if (num >= 1000) {
//       return `${(num / 1000).toFixed(1)}K views`;
//     } else {
//       return `${num} views`;
//     }
//   };

//   const handleVideoClick = (video) => {
//     setSelectedVideo(video);
//     navigate(`/video/${video.id.videoId}`);
//   };

//   const handleBackToResults = () => {
//     setSelectedVideo(null);
//     navigate("/study-tube");
//   };

//   const studyCategories = [
//     { id: "all", name: "All Topics", icon: BookOpen, color: "bg-blue-500" },
//     {
//       id: "computer-science",
//       name: "Computer Science",
//       icon: Brain,
//       color: "bg-purple-500",
//     },
//     {
//       id: "mathematics",
//       name: "Mathematics",
//       icon: Target,
//       color: "bg-green-500",
//     },
//     { id: "physics", name: "Physics", icon: Zap, color: "bg-yellow-500" },
//     {
//       id: "programming",
//       name: "Programming",
//       icon: Brain,
//       color: "bg-red-500",
//     },
//     {
//       id: "business",
//       name: "Business",
//       icon: TrendingUp,
//       color: "bg-indigo-500",
//     },
//   ];

//   const quickSearchTerms = [
//     "Machine Learning Tutorial",
//     "Calculus Derivatives",
//     "React.js Fundamentals",
//     "Data Structures",
//     "Quantum Physics",
//     "Financial Analysis",
//   ];

//   // If we have a selected video, render the single video view
//   if (selectedVideo) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
//         <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-2xl font-bold flex items-center dark:text-white">
//                 <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-2">
//                   <Play className="text-white" size={20} />
//                 </div>
//                 StudyTube
//               </h1>
            
//             </div>

//             <div className="flex items-center space-x-4">
//               <ThemeToggle/>
//               <div className="relative w-80">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
//                   placeholder="Search educational videos..."
//                   className="w-full text-sm p-3 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
//                 />
//                 <Search
//                   className="absolute left-3 text-sm top-3.5 text-gray-400"
//                   size={18}
//                 />
//               </div>
//               <button
//                 onClick={() => {
                  
//                   fetchVideos()
//                   handleBackToResults()
//                 }}
//                 className="bg-gradient-to-r text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </header>

//             <button
//               onClick={handleBackToResults}
//               className="flex bg-gray-200 dark:bg-zinc-800 rounded-lg px-3 py-2 text-sm cursor-pointer m-4  items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
//             >
//               <ArrowLeft size={20} />
//               <span>Back </span>
//             </button>
         
         
    

//         <main className="container mx-auto px-4 ">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-2/3">
//               <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-xl bg-black">
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full"
//                   src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
//                   title={selectedVideo.snippet.title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>

//               <div className="mt-6 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
//                 <h1 className="text-2xl font-bold dark:text-white mb-2">
//                   {selectedVideo.snippet.title}
//                 </h1>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                         <User className="text-white" size={20} />
//                       </div>
//                       <span className="font-medium dark:text-white">
//                         {selectedVideo.fullSnippet.channelTitle}
//                       </span>
//                     </div>
//                     <span className="text-sm text-gray-500 dark:text-gray-400">
//                       {new Date(
//                         selectedVideo.snippet.publishedAt
//                       ).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
//                       <Bookmark size={18} />
//                       <span>Save</span>
//                     </button>
//                     <a
//                       href={`https://youtube.com/watch?v=${selectedVideo.id.videoId}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
//                     >
//                       <ExternalLink size={18} />
//                       <span>Open in YouTube</span>
//                     </a>
//                   </div>
//                 </div>

//                 <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 mb-6">
//                   <div className="flex items-center space-x-4 mb-2">
//                     <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
//                       <Play size={16} />
//                       <span>
//                         {formatViewCount(selectedVideo.statistics?.viewCount)}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
//                       <Clock size={16} />
//                       <span>
//                         {formatDuration(selectedVideo.contentDetails?.duration)}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
//                     {selectedVideo.fullSnippet.description}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:w-1/3">
//               <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
//                 <h3 className="font-bold text-lg dark:text-white mb-4">
//                   Related Videos
//                 </h3>
//                 <div className="space-y-4">
//                   {videos.slice(0, 5).map((video) => (
//                     <div
//                       key={video.id.videoId}
//                       className="flex gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700/50 dark:bg-zinc-800/50 p-2 rounded-lg transition-colors"
//                       onClick={() => handleVideoClick(video)}
//                     >
//                       <div className="relative w-1/3 min-w-[120px]">
//                         <img
//                           src={video.snippet.thumbnails.medium.url}
//                           alt={video.snippet.title}
//                           className="rounded-lg aspect-video object-cover"
//                         />
//                         <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
//                           {formatDuration(video.contentDetails?.duration)}
//                         </div>
//                       </div>
//                       <div className="w-2/3">
//                         <h4 className="font-medium text-sm line-clamp-2 dark:text-white">
//                           {video.snippet.title}
//                         </h4>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {video.snippet.channelTitle}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {formatViewCount(video.statistics?.viewCount)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-300 ${
//         hasSearched
//           ? "bg-white dark:bg-black"
//           : "bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
//       }`}
//     >
//       {showWarning && (
//         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
//           <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center backdrop-blur-sm">
//             <AlertTriangle className="mr-2 animate-pulse" />
//             <span className="font-medium">{warningMessage}</span>
//           </div>
//         </div>
//       )}

//       {hasSearched ? (
//         <>
//           <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
//             <div className="container mx-auto flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <h1 className="text-2xl font-bold flex items-center dark:text-white">
//                   <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-2">
//                     <Play className="text-white" size={20} />
//                   </div>
//                   StudyTube
//                 </h1>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <ThemeToggle />
//                 <div className="relative w-80">
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
//                     placeholder="Search educational videos..."
//                     className="w-full text-sm p-3 pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
//                   />
//                   <Search
//                     className="absolute left-3 text-sm top-3.5 text-gray-400"
//                     size={18}
//                   />
//                 </div>
//                 <button
//                   onClick={fetchVideos}
//                   className="bg-gradient-to-r text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </header>

//           <main className="container mx-auto px-4 py-8">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                       {isAiAnalyzing ? (
//                         <Brain
//                           className="text-red-500 animate-pulse"
//                           size={24}
//                         />
//                       ) : (
//                         <Loader2
//                           className="text-red-500 animate-spin"
//                           size={24}
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     {isAiAnalyzing
//                       ? "Analyzing search for study relevance..."
//                       : "Finding the best educational content..."}
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className="flex justify-between items-center mb-8">
//                   <div>
//                     <h2 className="text-3xl font-bold dark:text-white mb-2">
//                       Study Content for "{searchTerm}"
//                     </h2>
//                     <div className="flex items-center space-x-4">
//                       <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
//                         <span className="text-green-800 dark:text-green-200 text-sm font-medium">
//                           Study Score: {Math.round(studyScore)}%
//                         </span>
//                       </div>
//                       <span className="text-gray-600 dark:text-gray-400">
//                         {videos.length} educational videos found
//                       </span>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setHasSearched(false);
//                       setVideos([]);
//                       setSearchTerm("");
//                     }}
//                     className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl transition-all"
//                   >
//                     New Search
//                   </button>
//                 </div>

//                 {videos.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="bg-white/80 dark:bg-zinc-800 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
//                       <AlertTriangle
//                         className="mx-auto mb-4 text-red-500"
//                         size={48}
//                       />
//                       <h3 className="text-xl font-bold dark:text-white mb-2">
//                         No study content found
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 mb-6">
//                         Try searching with more academic terms
//                       </p>
//                       <button
//                         onClick={() => {
//                           setHasSearched(false);
//                           setVideos([]);
//                           setSearchTerm("");
//                         }}
//                         className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
//                       >
//                         Back to Study Topics
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {videos.map((video, index) => (
//                       <div
//                         key={`${video.id.videoId}-${index}`}
//                         className="group bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-700 cursor-pointer"
//                         onClick={() => handleVideoClick(video)}
//                       >
//                         <div className="relative pb-[56.25%]">
//                           <img
//                             src={video.snippet.thumbnails.medium.url}
//                             alt={video.snippet.title}
//                             className="absolute top-0 left-0 w-full h-full rounded-t-2xl object-cover"
//                           />
//                           <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
//                             {formatDuration(video.contentDetails?.duration)}
//                           </div>
//                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <div className="bg-black/50 rounded-full p-4">
//                               <Play className="text-white" size={24} />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="p-6">
//                           <h3 className="font-bold text-lg line-clamp-2 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
//                             {video.snippet.title}
//                           </h3>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
//                             {video.snippet.description}
//                           </p>
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center space-x-2">
//                               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                                 <User className="text-white" size={16} />
//                               </div>
//                               <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                                 {video.snippet.channelTitle}
//                               </span>
//                             </div>
//                             <button className="text-red-500 hover:text-red-600 transition-colors">
//                               <Bookmark size={20} />
//                             </button>
//                           </div>
//                           <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//                             <span>
//                               {formatViewCount(video.statistics?.viewCount)}
//                             </span>
//                             <span>
//                               {new Date(
//                                 video.snippet.publishedAt
//                               ).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </main>

//           <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 border-t border-gray-200 dark:border-gray-700 mt-12">
//             <div className="container mx-auto text-center">
//               <div className="flex items-center justify-center space-x-2 mb-2">
//                 <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
//                   <Play className="text-white" size={16} />
//                 </div>
//                 <span className="font-bold text-gray-800 dark:text-white">
//                   StudyTube
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 © {new Date().getFullYear()} StudyTube - AI-Powered Learning
//                 Environment
//               </p>
//             </div>
//           </footer>
//         </>
//       ) : (
//         <main className="container mx-auto px-4">
//           <div className="flex flex-col items-center justify-center min-h-screen">
//             <div className="text-center max-w-4xl">
//               <div className="mb-12">
//                 <h1 className="text-6xl font-bold mb-6 dark:text-white">
//                   <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
//                     Distraction Free
//                   </span>
//                   <br />
//                   YouTube
//                 </h1>
//                 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//                   AI-powered educational content filtering for focused learning.
//                 </p>
//               </div>

//               <div className="relative w-full max-w-2xl mx-auto mb-8">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
//                   placeholder="What would you like to learn today?"
//                   className="w-full p-6 pl-14 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-2xl dark:text-white transition-all"
//                 />
//                 <Search
//                   className="absolute left-5 top-7 text-gray-400"
//                   size={24}
//                 />
//                 <button
//                   onClick={fetchVideos}
//                   disabled={isLoading || isAiAnalyzing}
//                   className={`absolute right-3 top-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg ${
//                     isLoading || isAiAnalyzing
//                       ? "opacity-50 cursor-not-allowed"
//                       : ""
//                   }`}
//                 >
//                   {isAiAnalyzing ? "Analyzing..." : "Search"}
//                 </button>
//               </div>

//               {(isLoading || isAiAnalyzing) && (
//                 <div className="mb-8">
//                   <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 inline-block">
//                     <div className="flex items-center space-x-3">
//                       {isAiAnalyzing ? (
//                         <>
//                           <Brain
//                             className="text-purple-500 animate-pulse"
//                             size={20}
//                           />
//                           <span className="text-gray-700 dark:text-gray-300">
//                             Analyzing search for study relevance...
//                           </span>
//                         </>
//                       ) : (
//                         <>
//                           <Loader2
//                             className="text-red-500 animate-spin"
//                             size={20}
//                           />
//                           <span className="text-gray-700 dark:text-gray-300">
//                             Finding the best educational content...
//                           </span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mb-12">
//                 <h3 className="text-lg font-semibold mb-4 dark:text-white">
//                   Quick Search Suggestions
//                 </h3>
//                 <div className="flex flex-wrap gap-2 justify-center">
//                   {quickSearchTerms.map((term, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSearchTerm(term)}
//                       className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all transform hover:scale-105 shadow-md"
//                     >
//                       {term}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// };

// export default StudyTube;

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
  Youtube,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeTogler";
import { FaYoutube, FaYoutubeSquare } from "react-icons/fa";

const StudyTube = () => {
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
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  // Add to your existing state declarations


  // Add these useEffect hooks for localStorage persistence
  useEffect(() => {
    const watched = localStorage.getItem("studyTubeWatchedVideos");
    if (watched) {
      setWatchedVideos(JSON.parse(watched));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studyTubeWatchedVideos",
      JSON.stringify(watchedVideos)
    );
  }, [watchedVideos]);

  const addToWatchedHistory = (video) => {
    setWatchedVideos((prev) => {
      // Remove if already exists
      const filtered = prev.filter((v) => v.id.videoId !== video.id.videoId);
      // Add to beginning of array
      return [video, ...filtered].slice(0, 20); // Keep last 20 watched videos
    });
  };

  // Load saved videos from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("studyTubeSavedVideos");
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }
  }, []);

  // Save videos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("studyTubeSavedVideos", JSON.stringify(savedVideos));
  }, [savedVideos]);

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

  const isVideoSaved = (videoId) => {
    return savedVideos.some((v) => v.id.videoId === videoId);
  };

  const STUDY_KEYWORDS = [
    // Academic subjects
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

    // Study-related terms
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
    "lab","interview",
    "demonstration",

    // Common educational topics
    "quantum",
    "thermodynamics",
    "organic chemistry",
    "cell biology",
    "calculus",
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
          confidenceScore: 90, // High confidence for keyword matches
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

        // Clean the response if it includes markdown formatting
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

  // AI-powered study relevance check using OpenRouter Gemini
  // const checkStudyRelevance = async (query) => {
  //   setIsAiAnalyzing(true);
  //   const fallbackResponse = {
  //     isStudyRelated: true,
  //     confidenceScore: 50,
  //     suggestedQuery: query,
  //     reason: "API unavailable - proceeding with search",
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://openrouter.ai/api/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
  //           "HTTP-Referer": window.location.href,
  //           "X-Title": "StudyTube",
  //         },
  //         body: JSON.stringify({
  //           model: "deepseek/deepseek-r1:free",
  //           messages: [
  //             {
  //               role: "system",
  //               content: `You are an educational content analyzer. Respond STRICTLY with ONLY a valid JSON object in this exact format:
  // {
  //   "isStudyRelated": boolean,
  //   "confidenceScore": number,
  //   "suggestedQuery": "string",
  //   "reason": "string"
  // }
  // DO NOT include any markdown formatting, additional text, or explanations. ONLY the JSON object.`,
  //             },
  //             {
  //               role: "user",
  //               content: `Analyze this search query: "${query}"`,
  //             },
  //           ],
  //           temperature: 0.3, // Lower temperature for more consistent responses
  //           max_tokens: 150,
  //           response_format: { type: "json_object" }, // Request JSON format
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       console.error("API error:", response.status, await response.text());
  //       return fallbackResponse;
  //     }

  //     const data = await response.json();

  //     if (data.choices?.[0]?.message?.content) {
  //       let content = data.choices[0].message.content;

  //       // Clean the response if it includes markdown formatting
  //       if (content.startsWith("```json")) {
  //         content = content.replace(/```json|```/g, "").trim();
  //       }

  //       try {
  //         const result = JSON.parse(content);
  //         return {
  //           isStudyRelated: result.isStudyRelated ?? true,
  //           confidenceScore: result.confidenceScore ?? 50,
  //           suggestedQuery: result.suggestedQuery || query,
  //           reason: result.reason || "Analyzed by DeepSeek R1",
  //         };
  //       } catch (e) {
  //         console.error("Parsing failed. Raw content:", content);
  //         return fallbackResponse;
  //       }
  //     }

  //     return fallbackResponse;
  //   } catch (error) {
  //     console.error("API request failed:", error);
  //     return fallbackResponse;
  //   } finally {
  //     setIsAiAnalyzing(false);
  //   }
  // };

  const fetchVideos = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setShowWarning(false);
    setSelectedVideo(null); // Clear selected video when doing a new search

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

      // Use the AI-suggested query if available and different
      const finalQuery =
        suggestedQuery && suggestedQuery !== searchTerm
          ? suggestedQuery
          : searchTerm;

      // Enhanced YouTube API parameters for educational content
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=20&` +
          `q=${encodeURIComponent(finalQuery)}&` +
          `type=video&` +
          `order=relevance&` +
          `videoDuration=medium&` + // Filters out shorts
          `videoEmbeddable=true&` +
          `videoSyndicated=true&` +
          `videoDefinition=high&` + // Prefer HD
          `videoCaption=closedCaption&` +
          `relevanceLanguage=en&` +
          `topicId=/m/01k8wb&` +
          `key=${YOUTUBE_API_KEY}`
      );

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
    } else {
      return `${num} views`;
    }
  };

  const fetchRelatedVideos = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&` +
          `maxResults=10&` +
          `type=video&` +
          `relatedToVideoId=${videoId}&` +
          `videoDuration=medium&` + // Filters out shorts
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

  // Update the handleVideoClick function to fetch related videos
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

  const handleBackToResults = () => {
    setSelectedVideo(null);
    navigate("/study-tube");
  };

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

  const quickSearchTerms = [
    "Machine Learning Tutorial",
    "Calculus Derivatives",
    "React.js Fundamentals",
    "Data Structures",
    "Quantum Physics",
  ];

  // If we have a selected video, render the single video view
  if (selectedVideo) {
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <header className="bg-white/80 hidden dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-2 sm:p-4 sticky top-0 z-10">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl hidden    sm:text-2xl font-bold md:flex items-center dark:text-white">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-1.5 sm:p-2 rounded-lg mr-2">
                  <Play className="text-white" size={16} sm:size={20} />
                </div>
                StudyTube
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
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
                  className="w-full text-xs sm:text-sm p-2 sm:p-3 pl-8 sm:pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
                />
                <Search
                  className="absolute left-2 sm:left-3 top-2.5 sm:top-3.5 text-gray-400"
                  size={14}
                  sm:size={18}
                />
              </div>
              <button
                onClick={() => {
                  fetchVideos();
                  handleBackToResults();
                }}
                className="bg-gradient-to-r text-xs sm:text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </header>

        <button
          onClick={handleBackToResults}
          className="flex bg-gray-200 dark:bg-zinc-800 rounded-lg px-2 py-1 text-sm cursor-pointer m-2 items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="flex gap-1">Back</span>
        </button>

        <main className="container sm:mx-auto px-2 sm:px-4">
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

              <div className="mt-2 sm:mt-6 bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-white mb-2">
                  {selectedVideo.snippet.title}
                </h1>
                <div className="flex flex-col w-full  items-center justify-between mb-4">
                  <div className="flex items-center w-full justify-between space-x-4">
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
                  <div className="flex items-center mt-2 w-full justify-between space-x-4">
                    <button
                      onClick={() => toggleSaveVideo(selectedVideo)}
                      className={`flex text-sm sm:text-base items-center space-x-1 transition-colors ${
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
                      className="flex items-center text-sm sm:text-base space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                <div
                  className={`bg-gray-100  ${
                    !showFullDescription ? "h-[30px]" : "h-auto"
                  } sm:h-auto overflow-y-hidden dark:bg-zinc-800 rounded-lg p-2 sm:p-4 sm:mb-6`}
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <Play size={16} />
                      <span>
                        {formatViewCount(selectedVideo.statistics?.viewCount)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <Clock size={16} />
                      <span>
                        {formatDuration(selectedVideo.contentDetails?.duration)}
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setShowFullDescription(!showFullDescription);
                      }}
                      className="flex sm:hidden items-center space-x-1 text-xs sm:text-sm cursor-pointer text-blue-500"
                    >
                      <span>
                        {showFullDescription ? "Show Less" : "Show More"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm overflow-x-hidden dark:text-gray-300 whitespace-pre-line">
                    {selectedVideo.fullSnippet.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="flex items-center mb-4 sticky top-10 space-x-2 sm:space-x-4 w-full sm:w-auto">
                <div className="relative flex-1  sm:w-80">
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
                    className="w-full text-xs sm:text-sm p-2 sm:p-3 pl-8 sm:pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
                  />
                  <Search
                    className="absolute left-2 sm:left-3 top-2.5 sm:top-3.5 text-gray-400"
                    size={14}
                    sm:size={18}
                  />
                </div>
                <button
                  onClick={() => {
                    fetchVideos();
                    handleBackToResults();
                  }}
                  className="bg-gradient-to-r text-xs sm:text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
                >
                  Search
                </button>
              </div>
              <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-25">
                <h3 className=" text-lg dark:text-white mb-4">
                  Related Videos
                </h3>
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="animate-spin text-red-500" size={24} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {videos
                      .filter((v) => v.id.videoId !== selectedVideo.id.videoId) // Exclude current video
                      .slice(0, 8) // Show more videos
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
                  <div className="bg-white/80 dark:bg-zinc-900 backdrop-blur-sm rounded-xl p-2 sm:p-4  border border-gray-200 dark:border-gray-700 mt-4">
                    <h3 className=" text-lg dark:text-white mb-4">
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
      hasSearched ? "bg-white dark:bg-black" : "bg-white dark:bg-black"
    }`}
  >
    {showWarning && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce w-full px-4 sm:w-auto">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-2xl flex items-center backdrop-blur-sm">
          <AlertTriangle className="mr-2 animate-pulse" />
          <span className="font-medium text-sm sm:text-base">
            {warningMessage}
          </span>
        </div>
      </div>
    )}

    {hasSearched ? (
      <>
        <header className="bg-white/80 dark:bg-zinc-900 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 p-2 sm:p-4 sticky top-0 z-10">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="md:flex hidden items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold flex items-center dark:text-white">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-2">
                  <Play className="text-white" size={16} sm:size={20} />
                </div>
                StudyTube
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            
              <div className="relative flex-1 sm:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
                  placeholder="Search educational videos..."
                  className="w-full text-sm p-2 sm:p-3 pl-8 sm:pl-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:text-white transition-all"
                />
                <Search
                  className="absolute left-2 sm:left-3 text-sm top-2.5 sm:top-3.5 text-gray-400"
                  size={16}
                  sm:size={18}
                />
              </div>
              <button
                onClick={fetchVideos}
                className="bg-gradient-to-r text-sm from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-4 sm:py-8">
          {isLoading ? (
            <div className="flex justify-center h-[70vh] items-center">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {isAiAnalyzing ? (
                      <Brain
                        className="text-red-500 animate-pulse"
                        size={20}
                        sm:size={24}
                      />
                    ) : (
                      <Loader2
                        className="text-red-500 animate-spin"
                        size={20}
                        sm:size={24}
                      />
                    )}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {isAiAnalyzing
                    ? "Analyzing search for study relevance..."
                    : "Finding the best educational content..."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
                <div>
                  <h2 className="text-xl sm:text-3xl  dark:text-white mb-2">
                    Study Content for "{searchTerm}"
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                      <span className="text-green-800 dark:text-green-200 text-xs sm:text-sm font-medium">
                        Study Score: {Math.round(studyScore)}%
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {videos.length} educational videos found
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setVideos([]);
                    setSearchTerm("");
                  }}
                  className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base"
                >
                  New Search
                </button>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-8 sm:py-16">
                  <div className="bg-white/80 dark:bg-zinc-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
                    <AlertTriangle
                      className="mx-auto mb-4 text-red-500"
                      size={36}
                      sm:size={48}
                    />
                    <h3 className="text-lg sm:text-xl font-bold dark:text-white mb-2">
                      No study content found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                      Try searching with more academic terms
                    </p>
                    <button
                      onClick={() => {
                        setHasSearched(false);
                        setVideos([]);
                        setSearchTerm("");
                      }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                    >
                      Back to Study Topics
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                          <div className="bg-black/50 rounded-full p-3 sm:p-4">
                            <Play
                              className="text-white"
                              size={20}
                              sm:size={24}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="font-bold text-base sm:text-lg line-clamp-2 dark:text-white mb-2 group-hover:text-red-500 transition-colors">
                          {video.snippet.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {video.snippet.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <User
                                className="text-white"
                                size={12}
                                sm:size={16}
                              />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
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
                              size={16}
                              sm:size={20}
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

        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-12">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-1.5 sm:p-2 rounded-lg">
                <Play className="text-white" size={14} sm:size={16} />
              </div>
              <span className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                StudyTube
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} StudyTube - AI-Powered Learning
              Environment
            </p>
          </div>
        </footer>
      </>
    ) : (
      <main className="container mx-auto px-4">
        <div className="flex relative flex-col items-center justify-center min-h-screen py-4 sm:py-8">
          <div className="text-center w-full max-w-4xl">
            {/* Hero Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 dark:text-white">
                <span className="bg-gradient-to-r text-lg sm:text-xl from-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  Distraction Free
                </span>
                <br />
                <span className="flex items-center gap-2 sm:gap-3 justify-center mt-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg">
                    <Play className="text-white" size={25} sm:size={35} />
                  </div>
                  StudyTube
                </span>
              </h1>
              <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                AI-powered educational content filtering for{" "}
                <span className="font-medium text-red-500 dark:text-pink-400">
                  focused learning
                </span>
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-all"></div>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
                  placeholder="What would you like to learn today?"
                  className="w-full p-4 sm:p-6 am:pl-12 sm:pl-14 text-sm sm:text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-lg dark:text-white transition-all duration-200"
                />
                <Search
                  className="absolute hidden sm:block left-4 sm:left-5 top-5 sm:top-7 text-gray-500 dark:text-gray-400"
                  size={20}
                  sm:size={24}
                />
                <button
                  onClick={fetchVideos}
                  disabled={isLoading || isAiAnalyzing}
                  className={`absolute right-2 sm:right-3 top-2 sm:top-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white cursor-pointer px-2 sm:px-8 py-2 sm:py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/20 text-sm sm:text-base ${
                    isLoading || isAiAnalyzing
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                > <Search
                    className=" sm:hidden text-white"
                    size={20}
                    sm:size={24}
                  />
                    <span className="hidden sm:block">{isAiAnalyzing ? "Analyzing..." : "Search"}</span>{" "}
                 
                </button>
              </div>
            </div>

            {/* Loading/Analyzing State */}
            {(isLoading || isAiAnalyzing) && (
              <div className="mb-6 sm:mb-8">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200 dark:border-gray-700 inline-block">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {isAiAnalyzing ? (
                      <>
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 sm:p-1.5 rounded-full">
                          <Brain
                            className="text-white animate-pulse"
                            size={16}
                            sm:size={20}
                          />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          Analyzing search for study relevance...
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-1 sm:p-1.5 rounded-full animate-spin">
                          <Loader2
                            className="text-white"
                            size={16}
                            sm:size={20}
                          />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          Finding the best educational content...
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Search Terms */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {quickSearchTerms.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(term)}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-xs sm:text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Watching Section */}
            <div className="mx-auto w-full max-w-4xl sm:px-4">
              {watchedVideos.length > 0 && !hasSearched && (
                <div className="bg-gradient-to-r from-red-500/5 to-pink-500/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold dark:text-white flex items-center gap-2">
                      <History
                        size={16}
                        sm:size={20}
                        className="text-red-500"
                      />
                      Continue Watching
                    </h3>
                    <button
                      onClick={() => {
                        setWatchedVideos([]);
                        localStorage.removeItem("studyTubeWatchedVideos");
                      }}
                      className="text-xs bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-300 px-2 sm:px-3 py-1 rounded-full transition-all flex items-center gap-1"
                    >
                      <Trash2 size={12} sm:size={14} />
                      Clear History
                    </button>
                  </div>
                  <div className="relative">
                    <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                      {watchedVideos.map((video, index) => (
                        <div
                          key={`watched-${video.id.videoId}-${index}`}
                          className="flex-shrink-0 w-32 sm:w-44 cursor-pointer group transition-transform duration-200 hover:-translate-y-1"
                          onClick={() => handleVideoClick(video)}
                        >
                          <div className="relative rounded-xl overflow-hidden mb-2 shadow-md group-hover:shadow-lg transition-shadow">
                            <img
                              src={video.snippet.thumbnails.medium.url}
                              alt={video.snippet.title}
                              className="w-full h-20 sm:h-24 object-cover group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/80 text-white px-1 sm:px-1.5 py-0.5 sm:py-1 rounded text-xs">
                              {formatDuration(video.contentDetails?.duration)}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-red-500 rounded-full p-2 sm:p-3 shadow-lg transform group-hover:scale-110 transition-transform">
                                <Play
                                  className="text-white"
                                  size={16}
                                  sm:size={20}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-red-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </main>
    )}
  </div>
);
};

export default StudyTube;