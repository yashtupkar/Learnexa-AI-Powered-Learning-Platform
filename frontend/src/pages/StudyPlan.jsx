// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Search, Bookmark, History, Play, Clock, User } from "lucide-react";

// const StudyTube = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const API_KEY = "AIzaSyBhUSnmEl7OcyFfuB4K88CH1nKCu6BSndc";

//   const fetchVideos = async () => {
//     if (!searchTerm.trim()) return;

//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchTerm}+educational+lecture+tutorial&type=video&key=${API_KEY}`
//       );
//       setVideos(response.data.items);
//       setHasSearched(true);
//     } catch (error) {
//       console.error("Error fetching videos:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-200 ${
//         hasSearched
//           ? "bg-gray-50 dark:bg-gray-900"
//           : "bg-white dark:bg-gray-950"
//       }`}
//     >
//       {/* Header appears only after search */}
//       {hasSearched && (
//         <header className="bg-white dark:bg-gray-900 shadow-sm p-4 sticky top-0 z-10">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-xl font-bold flex items-center dark:text-white">
//               <Play className="mr-2 text-red-500" /> StudyTube
//             </h1>
//             <div className="relative w-1/3">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
//                 placeholder="Search educational videos..."
//                 className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
//               />
//               <Search className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>
//         </header>
//       )}

//       <main className="container mx-auto px-4">
//         {!hasSearched ? (
//           <div className="flex flex-col items-center justify-center h-screen -mt-16">
//             <div className="text-center max-w-2xl">
//               <h1 className="text-4xl font-bold mb-4 dark:text-white">
//                 <span className="text-red-500">Distraction-Free</span> YouTube
//               </h1>
//               <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
//                 Focused learning environment for students and professionals
//               </p>

//               <div className="relative w-full max-w-xl mx-auto">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
//                   placeholder="What would you like to learn today?"
//                   className="w-full p-4 pl-12 text-lg rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg dark:text-white"
//                 />
//                 <Search
//                   className="absolute left-4 top-5 text-gray-400"
//                   size={24}
//                 />
//                 <button
//                   onClick={fetchVideos}
//                   className="absolute right-2 top-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Search
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mt-12 text-left">
//                 <div
//                   className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => setSearchTerm("Computer Science Lectures")}
//                 >
//                   <h3 className="font-medium flex items-center dark:text-white">
//                     <Play className="mr-2 text-red-500" /> Computer Science
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     1,240 videos
//                   </p>
//                 </div>
//                 <div
//                   className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => setSearchTerm("Mathematics Tutorials")}
//                 >
//                   <h3 className="font-medium flex items-center dark:text-white">
//                     <Play className="mr-2 text-red-500" /> Mathematics
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     980 videos
//                   </p>
//                 </div>
//                 <div
//                   className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => setSearchTerm("Physics Concepts")}
//                 >
//                   <h3 className="font-medium flex items-center dark:text-white">
//                     <Play className="mr-2 text-red-500" /> Physics
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     750 videos
//                   </p>
//                 </div>
//                 <div
//                   className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                   onClick={() => setSearchTerm("Programming Tutorials")}
//                 >
//                   <h3 className="font-medium flex items-center dark:text-white">
//                     <Play className="mr-2 text-red-500" /> Programming
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     2,150 videos
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="py-8">
//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
//               </div>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold mb-6 dark:text-white">
//                   Results for "{searchTerm}"
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {videos.map((video) => (
//                     <div
//                       key={video.id.videoId}
//                       className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                     >
//                       <div className="relative pb-[56.25%]">
//                         <iframe
//                           className="absolute top-0 left-0 w-full h-full"
//                           src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                           title={video.snippet.title}
//                           frameBorder="0"
//                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                           allowFullScreen
//                         ></iframe>
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-medium line-clamp-2 dark:text-white">
//                           {video.snippet.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
//                           {video.snippet.description}
//                         </p>
//                         <div className="flex items-center justify-between mt-4">
//                           <span className="text-xs text-gray-500 dark:text-gray-300 flex items-center">
//                             <User className="mr-1" size={14} />{" "}
//                             {video.snippet.channelTitle}
//                           </span>
//                           <div className="flex space-x-3">
//                             <span className="text-xs text-gray-500 dark:text-gray-300 flex items-center">
//                               <Clock className="mr-1" size={14} /> 12:45
//                             </span>
//                             <button className="text-red-500 hover:text-red-600">
//                               <Bookmark size={18} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </main>

//       {hasSearched && (
//         <footer className="bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800 mt-8">
//           <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
//             <p>
//               © {new Date().getFullYear()} StudyTube - Focused Learning
//               Environment
//             </p>
//           </div>
//         </footer>
//       )}
//     </div>
//   );
// };

// export default StudyTube;
