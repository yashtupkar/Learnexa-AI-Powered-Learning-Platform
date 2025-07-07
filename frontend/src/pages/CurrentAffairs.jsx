// // import React, { useContext, useEffect, useState } from "react";
// // import { AppContext } from "../context/AppContext";
// // import Layout from "../components/layouts/layout";

// // const CurrentAffairs = () => {
// //   const [news, setNews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(12);
// //   const { backend_URL } = useContext(AppContext);

// //   // Categories for filtering
// //   const categories = [
// //     "All",
// //     "Economics",
// //     "International Relations",
// //     "Environment",
// //     "Science & Technology",
// //     "Polity & Governance",
// //     "Defense & Security",
// //     "Geography & Disaster Management",
// //     "Sports & Awards",
// //     "Art & Culture",
// //     "Agriculture & Rural Development",
// //     "General Studies",
// //   ];

// //   // Fetch news from backend
// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch(`${backend_URL}/api/news/fetch-all`);
// //         const data = await response.json();
// //         const categorizedData = data.map((item) => ({
// //           ...item,
// //           category: categorizeForExams(item),
// //         }));
// //         setNews(categorizedData);
// //         setCurrentPage(1);
// //       } catch (error) {
// //         console.error("Error fetching news:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchNews();
// //   }, [backend_URL]);

// //   // Categorize function
// //   const categorizeForExams = (article) => {
// //     const content = (
// //       article.title +
// //       " " +
// //       (article.description || "")
// //     ).toLowerCase();

// //     if (
// //       content.includes("economy") ||
// //       content.includes("gdp") ||
// //       content.includes("inflation") ||
// //       content.includes("budget") ||
// //       content.includes("banking") ||
// //       content.includes("rbi") ||
// //       content.includes("finance") ||
// //       content.includes("monetary") ||
// //       content.includes("fiscal")
// //     ) {
// //       return "Economics";
// //     }

// //     if (
// //       content.includes("international") ||
// //       content.includes("foreign policy") ||
// //       content.includes("diplomacy") ||
// //       content.includes("treaty") ||
// //       content.includes("summit") ||
// //       content.includes("bilateral") ||
// //       content.includes("multilateral")
// //     ) {
// //       return "International Relations";
// //     }

// //     if (
// //       content.includes("environment") ||
// //       content.includes("climate") ||
// //       content.includes("pollution") ||
// //       content.includes("renewable") ||
// //       content.includes("biodiversity") ||
// //       content.includes("conservation") ||
// //       content.includes("ecological")
// //     ) {
// //       return "Environment";
// //     }

// //     if (
// //       content.includes("science") ||
// //       content.includes("technology") ||
// //       content.includes("isro") ||
// //       content.includes("space") ||
// //       content.includes("research") ||
// //       content.includes("innovation") ||
// //       content.includes("artificial intelligence") ||
// //       content.includes("digital")
// //     ) {
// //       return "Science & Technology";
// //     }

// //     if (
// //       content.includes("government") ||
// //       content.includes("policy") ||
// //       content.includes("parliament") ||
// //       content.includes("constitutional") ||
// //       content.includes("judiciary") ||
// //       content.includes("supreme court") ||
// //       content.includes("high court") ||
// //       content.includes("election")
// //     ) {
// //       return "Polity & Governance";
// //     }

// //     if (
// //       content.includes("security") ||
// //       content.includes("defense") ||
// //       content.includes("military") ||
// //       content.includes("border") ||
// //       content.includes("terrorism") ||
// //       content.includes("cyber security") ||
// //       content.includes("national security")
// //     ) {
// //       return "Defense & Security";
// //     }

// //     if (
// //       content.includes("geography") ||
// //       content.includes("disaster") ||
// //       content.includes("cyclone") ||
// //       content.includes("earthquake") ||
// //       content.includes("flood") ||
// //       content.includes("drought") ||
// //       content.includes("mountain") ||
// //       content.includes("river")
// //     ) {
// //       return "Geography & Disaster Management";
// //     }

// //     if (
// //       content.includes("sports") ||
// //       content.includes("olympics") ||
// //       content.includes("award") ||
// //       content.includes("medal") ||
// //       content.includes("championship") ||
// //       content.includes("achievement") ||
// //       content.includes("recognition")
// //     ) {
// //       return "Sports & Awards";
// //     }

// //     if (
// //       content.includes("culture") ||
// //       content.includes("heritage") ||
// //       content.includes("tradition") ||
// //       content.includes("festival") ||
// //       content.includes("unesco") ||
// //       content.includes("archaeological") ||
// //       content.includes("monument")
// //     ) {
// //       return "Art & Culture";
// //     }

// //     if (
// //       content.includes("agriculture") ||
// //       content.includes("farmer") ||
// //       content.includes("rural") ||
// //       content.includes("crop") ||
// //       content.includes("irrigation") ||
// //       content.includes("farming")
// //     ) {
// //       return "Agriculture & Rural Development";
// //     }

// //     return "General Studies";
// //   };

// //   // Filter news by search query and category
// //   const filteredNews = news.filter(
// //     (item) =>
// //       (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
// //       (selectedCategory === null ||
// //         selectedCategory === "All" ||
// //         item.category === selectedCategory)
// //   );

// //   // Pagination logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

// //   // Change page
// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   // Previous page
// //   const prevPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   // Next page
// //   const nextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
// //         {/* Header with search */}
// //         <header className="bg-white/95 dark:bg-zinc-900 backdrop-blur-sm shadow-sm">
// //           <div className="container mx-auto px-4 py-4">
// //             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //               <h1 className="text-2xl font-bold dark:text-white text-black">
// //                 Indian Current Affairs
// //               </h1>
// //               <div className="relative w-full md:w-64">
// //                 <input
// //                   type="text"
// //                   placeholder="Search news..."
// //                   className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={searchQuery}
// //                   onChange={(e) => {
// //                     setSearchQuery(e.target.value);
// //                     setCurrentPage(1);
// //                   }}
// //                 />
// //                 <svg
// //                   className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                   />
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Category Filter */}
// //         <div className="container mx-auto px-4 py-4">
// //           <div className="flex flex-wrap gap-2">
// //             {categories.map((category) => (
// //               <button
// //                 key={category}
// //                 onClick={() => {
// //                   setSelectedCategory(category === "All" ? null : category);
// //                   setCurrentPage(1);
// //                 }}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                   (selectedCategory === null && category === "All") ||
// //                   selectedCategory === category
// //                     ? "bg-blue-600 text-white"
// //                     : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600"
// //                 }`}
// //               >
// //                 {category}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         <main className="container mx-auto px-4 py-8">
// //           {loading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //             </div>
// //           ) : currentItems.length === 0 ? (
// //             <div className="text-center py-12">
// //               <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
// //                 {searchQuery
// //                   ? "No matching news found"
// //                   : selectedCategory
// //                   ? `No news available in ${selectedCategory} category`
// //                   : "No news available"}
// //               </h3>
// //               <p className="text-gray-500 dark:text-gray-400 mt-2">
// //                 {searchQuery
// //                   ? "Try a different search term"
// //                   : "Please check back later"}
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="flex justify-between items-center mb-6">
// //                 {selectedCategory && (
// //                   <h2 className="text-xl font-bold dark:text-white">
// //                     Category: {selectedCategory}
// //                   </h2>
// //                 )}
// //                 <div className="text-sm text-gray-600 dark:text-gray-400">
// //                   Showing {indexOfFirstItem + 1}-
// //                   {Math.min(indexOfLastItem, filteredNews.length)} of{" "}
// //                   {filteredNews.length} items
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {currentItems.slice().reverse().map((item) => (
// //                   <article
// //                     key={item._id}
// //                     className="group bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-zinc-700"
// //                   >
// //                     <div className="relative h-48 overflow-hidden">
// //                       <img
// //                         src={item.urlToImage}
// //                         alt={item.title}
// //                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
// //                         onError={(e) => {
// //                           e.target.src = "/placeholder-news.jpg";
// //                           e.target.className =
// //                             "w-full h-full object-cover bg-gray-200 dark:bg-zinc-700";
// //                         }}
// //                       />
// //                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
// //                         <span className="text-xs font-medium text-gray-600 bg-gray-50/70 px-2 py-1 rounded">
// //                           {item.source || "Unknown"}
// //                         </span>
// //                         <span className="ml-2 text-xs font-medium text-white bg-blue-600/70 px-2 py-1 rounded">
// //                           {item.category}
// //                         </span>
// //                       </div>
// //                     </div>
// //                     <div className="p-5">
// //                       <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
// //                         <span>
// //                           {new Date(item.publishedAt).toLocaleDateString(
// //                             "en-IN",
// //                             {
// //                               day: "numeric",
// //                               month: "short",
// //                               year: "numeric",
// //                             }
// //                           )}
// //                         </span>
// //                       </div>
// //                       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
// //                         {item.title}
// //                       </h2>
// //                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
// //                         {item.description}
// //                       </p>
// //                       <div className="flex justify-between items-center">
// //                         <a
// //                           href={item.url}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
// //                         >
// //                           Read More
// //                           <svg
// //                             className="w-4 h-4"
// //                             fill="none"
// //                             stroke="currentColor"
// //                             viewBox="0 0 24 24"
// //                             xmlns="http://www.w3.org/2000/svg"
// //                           >
// //                             <path
// //                               strokeLinecap="round"
// //                               strokeLinejoin="round"
// //                               strokeWidth={2}
// //                               d="M14 5l7 7m0 0l-7 7m7-7H3"
// //                             />
// //                           </svg>
// //                         </a>
// //                       </div>
// //                     </div>
// //                   </article>
// //                 ))}
// //               </div>

// //               {/* Pagination Controls */}
// //               {totalPages > 1 && (
// //                 <div className="flex justify-center mt-8">
// //                   <nav className="flex items-center gap-1">
// //                     <button
// //                       onClick={prevPage}
// //                       disabled={currentPage === 1}
// //                       className={`px-3 py-1 rounded-md ${
// //                         currentPage === 1
// //                           ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
// //                           : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
// //                       }`}
// //                     >
// //                       &laquo; Previous
// //                     </button>

// //                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(
// //                       (number) => (
// //                         <button
// //                           key={number}
// //                           onClick={() => paginate(number)}
// //                           className={`px-3 py-1 rounded-md ${
// //                             currentPage === number
// //                               ? "bg-blue-600 text-white"
// //                               : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
// //                           }`}
// //                         >
// //                           {number}
// //                         </button>
// //                       )
// //                     )}

// //                     <button
// //                       onClick={nextPage}
// //                       disabled={currentPage === totalPages}
// //                       className={`px-3 py-1 rounded-md ${
// //                         currentPage === totalPages
// //                           ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
// //                           : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
// //                       }`}
// //                     >
// //                       Next &raquo;
// //                     </button>
// //                   </nav>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </main>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default CurrentAffairs;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import Layout from "../components/layouts/layout";
// import { Search } from "lucide-react";

// const CurrentAffairs = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const { backend_URL } = useContext(AppContext);

//   // Categories for filtering
//   const categories = [
//     "All",
//     "Economics",
//     "International Relations",
//     "Environment",
//     "Science & Technology",
//     "Polity & Governance",
//     "Defense & Security",
//     "Geography & Disaster Management",
//     "Sports & Awards",
//     "Art & Culture",
//     "Agriculture & Rural Development",
//     "General Studies",
//   ];

//   // Fetch news from backend
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${backend_URL}/api/news/fetch-all`);
//         const data = await response.json();

//         // Sort news by date (newest first) before categorizing
//         const sortedData = data.sort(
//           (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
//         );

//         const categorizedData = sortedData.map((item) => ({
//           ...item,
//           category: categorizeForExams(item),
//         }));
//         setNews(categorizedData);
//         setCurrentPage(1);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNews();
//   }, [backend_URL]);

//   // Categorize function
//   const categorizeForExams = (article) => {
//     const content = (
//       article.title +
//       " " +
//       (article.description || "")
//     ).toLowerCase();

//     if (
//       content.includes("economy") ||
//       content.includes("gdp") ||
//       content.includes("inflation") ||
//       content.includes("budget") ||
//       content.includes("banking") ||
//       content.includes("rbi") ||
//       content.includes("finance") ||
//       content.includes("monetary") ||
//       content.includes("fiscal")
//     ) {
//       return "Economics";
//     }

//     if (
//       content.includes("international") ||
//       content.includes("foreign policy") ||
//       content.includes("diplomacy") ||
//       content.includes("treaty") ||
//       content.includes("summit") ||
//       content.includes("bilateral") ||
//       content.includes("multilateral")
//     ) {
//       return "International Relations";
//     }

//     if (
//       content.includes("environment") ||
//       content.includes("climate") ||
//       content.includes("pollution") ||
//       content.includes("renewable") ||
//       content.includes("biodiversity") ||
//       content.includes("conservation") ||
//       content.includes("ecological")
//     ) {
//       return "Environment";
//     }

//     if (
//       content.includes("science") ||
//       content.includes("technology") ||
//       content.includes("isro") ||
//       content.includes("space") ||
//       content.includes("research") ||
//       content.includes("innovation") ||
//       content.includes("artificial intelligence") ||
//       content.includes("digital")
//     ) {
//       return "Science & Technology";
//     }

//     if (
//       content.includes("government") ||
//       content.includes("policy") ||
//       content.includes("parliament") ||
//       content.includes("constitutional") ||
//       content.includes("judiciary") ||
//       content.includes("supreme court") ||
//       content.includes("high court") ||
//       content.includes("election")
//     ) {
//       return "Polity & Governance";
//     }

//     if (
//       content.includes("security") ||
//       content.includes("defense") ||
//       content.includes("military") ||
//       content.includes("border") ||
//       content.includes("terrorism") ||
//       content.includes("cyber security") ||
//       content.includes("national security")
//     ) {
//       return "Defense & Security";
//     }

//     if (
//       content.includes("geography") ||
//       content.includes("disaster") ||
//       content.includes("cyclone") ||
//       content.includes("earthquake") ||
//       content.includes("flood") ||
//       content.includes("drought") ||
//       content.includes("mountain") ||
//       content.includes("river")
//     ) {
//       return "Geography & Disaster Management";
//     }

//     if (
//       content.includes("sports") ||
//       content.includes("olympics") ||
//       content.includes("award") ||
//       content.includes("medal") ||
//       content.includes("championship") ||
//       content.includes("achievement") ||
//       content.includes("recognition")
//     ) {
//       return "Sports & Awards";
//     }

//     if (
//       content.includes("culture") ||
//       content.includes("heritage") ||
//       content.includes("tradition") ||
//       content.includes("festival") ||
//       content.includes("unesco") ||
//       content.includes("archaeological") ||
//       content.includes("monument")
//     ) {
//       return "Art & Culture";
//     }

//     if (
//       content.includes("agriculture") ||
//       content.includes("farmer") ||
//       content.includes("rural") ||
//       content.includes("crop") ||
//       content.includes("irrigation") ||
//       content.includes("farming")
//     ) {
//       return "Agriculture & Rural Development";
//     }

//     return "General Studies";
//   };

//   // Filter news by search query and category
//   const filteredNews = news.filter(
//     (item) =>
//       (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
//       (selectedCategory === null ||
//         selectedCategory === "All" ||
//         item.category === selectedCategory)
//   );

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Next page
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
   

//         <div className="flex flex-col items-center justify-center mt-20">
//           <div className="text-center max-w-4xl">
//             <div className="mb-4">
//               <h1 className="text-6xl font-bold mb-6 dark:text-white">
//                 <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
//                   World Wide
//                 </span>
//                 <br />
//                 Current Affairs
//               </h1>
//               <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//                 Stay updated with the latest news and developments across India. Curated content for competitive exam preparation.
//               </p>
//             </div>

//             <div className="relative w-full max-w-2xl mx-auto mb-4">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 placeholder="Search Current Affairs..."
//                 className="w-full p-6 pl-14 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-2xl dark:text-white transition-all"
//               />
//               <Search
//                 className="absolute left-5 top-7 text-gray-400"
//                 size={24}
//               />
            
//             </div>
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="container max-w-6xl mx-auto px-4 py-4">
//           <div className="flex flex-wrap justify-center gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => {
//                   setSelectedCategory(category === "All" ? null : category);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                   (selectedCategory === null && category === "All") ||
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <main className="container mx-auto px-4 py-8">
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : currentItems.length === 0 ? (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
//                 {searchQuery
//                   ? "No matching news found"
//                   : selectedCategory
//                   ? `No news available in ${selectedCategory} category`
//                   : "No news available"}
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400 mt-2">
//                 {searchQuery
//                   ? "Try a different search term"
//                   : "Please check back later"}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 {selectedCategory && (
//                   <h2 className="text-xl font-bold dark:text-white">
//                     Category: {selectedCategory}
//                   </h2>
//                 )}
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {indexOfFirstItem + 1}-
//                   {Math.min(indexOfLastItem, filteredNews.length)} of{" "}
//                   {filteredNews.length} items
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentItems.map((item) => (
//                   <article
//                     key={item._id}
//                     className="group bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-zinc-700"
//                   >
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={item.urlToImage}
//                         alt={item.title}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         onError={(e) => {
//                           e.target.src = "/placeholder-news.jpg";
//                           e.target.className =
//                             "w-full h-full object-cover bg-gray-200 dark:bg-zinc-700";
//                         }}
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                         <span className="text-xs font-medium text-gray-600 bg-gray-50/70 px-2 py-1 rounded">
//                           {item.source || "Unknown"}
//                         </span>
//                         <span className="ml-2 text-xs font-medium text-white bg-blue-600/70 px-2 py-1 rounded">
//                           {item.category}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="p-5">
//                       <span className="block mt-1 text-xs mb-2 dark:text-gray-300 text-gray-600">
//                         {new Date(item.publishedAt).toLocaleDateString(
//                           "en-IN",
//                           {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }
//                         )}
//                       </span>
//                       <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2">
//                         {item.title}
//                       </h2>
//                       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
//                         {item.description}
//                       </p>
//                       <div className="flex justify-between items-center">
//                         <a
//                           href={item.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-1"
//                         >
//                           Read More
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M14 5l7 7m0 0l-7 7m7-7H3"
//                             />
//                           </svg>
//                         </a>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-8">
//                   <nav className="flex items-center gap-1">
//                     <button
//                       onClick={prevPage}
//                       disabled={currentPage === 1}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === 1
//                           ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
//                       }`}
//                     >
//                       &laquo; Previous
//                     </button>

//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                       (number) => (
//                         <button
//                           key={number}
//                           onClick={() => paginate(number)}
//                           className={`px-3 py-1 rounded-md ${
//                             currentPage === number
//                               ? "bg-blue-600 text-white"
//                               : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
//                           }`}
//                         >
//                           {number}
//                         </button>
//                       )
//                     )}

//                     <button
//                       onClick={nextPage}
//                       disabled={currentPage === totalPages}
//                       className={`px-3 py-1 rounded-md ${
//                         currentPage === totalPages
//                           ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
//                           : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
//                       }`}
//                     >
//                       Next &raquo;
//                     </button>
//                   </nav>
//                 </div>
//               )}
//             </>
//           )}
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default CurrentAffairs;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Layout from "../components/layouts/layout";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const CurrentAffairs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { backend_URL } = useContext(AppContext);

  // Categories for filtering
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

  // Fetch news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backend_URL}/api/news/fetch-all`);
        const data = await response.json();

        // Sort news by date (newest first) before categorizing
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

  // Get latest 5 news items
  const latestNews = news.slice(0, 5);

  // Slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === latestNews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? latestNews.length - 1 : prev - 1));
  };

  // Categorize function
  const categorizeForExams = (article) => {
    const content = (
      article.title +
      " " +
      (article.description || "")
    ).toLowerCase();

    if (
      content.includes("economy") ||
      content.includes("gdp") ||
      content.includes("inflation") ||
      content.includes("budget") ||
      content.includes("banking") ||
      content.includes("rbi") ||
      content.includes("finance") ||
      content.includes("monetary") ||
      content.includes("fiscal")
    ) {
      return "Economics";
    }

    if (
      content.includes("international") ||
      content.includes("foreign policy") ||
      content.includes("diplomacy") ||
      content.includes("treaty") ||
      content.includes("summit") ||
      content.includes("bilateral") ||
      content.includes("multilateral")
    ) {
      return "International Relations";
    }

    if (
      content.includes("environment") ||
      content.includes("climate") ||
      content.includes("pollution") ||
      content.includes("renewable") ||
      content.includes("biodiversity") ||
      content.includes("conservation") ||
      content.includes("ecological")
    ) {
      return "Environment";
    }

    if (
      content.includes("science") ||
      content.includes("technology") ||
      content.includes("isro") ||
      content.includes("space") ||
      content.includes("research") ||
      content.includes("innovation") ||
      content.includes("artificial intelligence") ||
      content.includes("digital")
    ) {
      return "Science & Technology";
    }

    if (
      content.includes("government") ||
      content.includes("policy") ||
      content.includes("parliament") ||
      content.includes("constitutional") ||
      content.includes("judiciary") ||
      content.includes("supreme court") ||
      content.includes("high court") ||
      content.includes("election")
    ) {
      return "Polity & Governance";
    }

    if (
      content.includes("security") ||
      content.includes("defense") ||
      content.includes("military") ||
      content.includes("border") ||
      content.includes("terrorism") ||
      content.includes("cyber security") ||
      content.includes("national security")
    ) {
      return "Defense & Security";
    }

    if (
      content.includes("geography") ||
      content.includes("disaster") ||
      content.includes("cyclone") ||
      content.includes("earthquake") ||
      content.includes("flood") ||
      content.includes("drought") ||
      content.includes("mountain") ||
      content.includes("river")
    ) {
      return "Geography & Disaster Management";
    }

    if (
      content.includes("sports") ||
      content.includes("olympics") ||
      content.includes("award") ||
      content.includes("medal") ||
      content.includes("championship") ||
      content.includes("achievement") ||
      content.includes("recognition")
    ) {
      return "Sports & Awards";
    }

    if (
      content.includes("culture") ||
      content.includes("heritage") ||
      content.includes("tradition") ||
      content.includes("festival") ||
      content.includes("unesco") ||
      content.includes("archaeological") ||
      content.includes("monument")
    ) {
      return "Art & Culture";
    }

    if (
      content.includes("agriculture") ||
      content.includes("farmer") ||
      content.includes("rural") ||
      content.includes("crop") ||
      content.includes("irrigation") ||
      content.includes("farming")
    ) {
      return "Agriculture & Rural Development";
    }

    return "General Studies";
  };

  // Filter news by search query and category
  const filteredNews = news.filter(
    (item) =>
      (item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === null ||
        selectedCategory === "All" ||
        item.category === selectedCategory)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="text-center max-w-4xl">
            <div className="mb-4">
              <h1 className="text-6xl font-bold mb-6 dark:text-white">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  World Wide
                </span>
                <br />
                Current Affairs
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay updated with the latest news and developments across India.
                Curated content for competitive exam preparation.
              </p>
            </div>

            <div className="relative w-full max-w-2xl mx-auto mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Current Affairs..."
                className="w-full p-6 pl-14 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 shadow-2xl dark:text-white transition-all"
              />
              <Search
                className="absolute left-5 top-7 text-gray-400"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Latest News Slider */}
        {!loading && latestNews.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold dark:text-white">
                Latest Updates
              </h2>
              <a
                href="#all-news"
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
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-zinc-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-zinc-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-zinc-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-zinc-700 transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* Slider Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {latestNews.map((item, index) => (
                  <div
                    key={item._id}
                    className={`transition-all duration-300 ${
                      index === currentSlide
                        ? "scale-105"
                        : "scale-95 opacity-80"
                    }`}
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="relative h-40 overflow-hidden rounded-lg shadow-md">
                        <img
                          src={item.urlToImage}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "/placeholder-news.jpg";
                            e.target.className =
                              "w-full h-full object-cover bg-gray-200 dark:bg-zinc-700";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                          <h3 className="text-white text-sm font-medium line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          {item.category.split(" & ")[0]}
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Slider Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {latestNews.map((_, index) => (
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
        )}

        {/* Category Filter */}
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category === "All" ? null : category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        <main id="all-news" className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      &laquo; Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === number
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {number}
                        </button>
                      )
                    )}

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      Next &raquo;
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