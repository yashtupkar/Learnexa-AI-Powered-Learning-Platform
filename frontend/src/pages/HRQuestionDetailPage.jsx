// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Layout from "../components/layouts/layout";
// import {
//   FiMic,
//   FiMicOff,
//   FiArrowLeft,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiMessageSquare,
//   FiHeart,
//   FiShare2,
//   FiMoreHorizontal
// } from "react-icons/fi";
// import {
//   FaRegLightbulb,
//   FaRegThumbsUp,
//   FaRegChartBar,
//   FaHeart
// } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import avatarPlaceholder from '../assets/referal.png';

// const HRQuestionDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [analysis, setAnalysis] = useState(null);
//   const [responses, setResponses] = useState([]);
//   const [comment, setComment] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("record");
//   const [discussion, setDiscussion] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [replyTo, setReplyTo] = useState(null);
//   const [replyContent, setReplyContent] = useState("");

//   const questions = [
//     "Tell me about yourself.",
//     "What are your strengths and weaknesses?",
//     "Why do you want to work for our company?",
//     "Where do you see yourself in 5 years?",
//     "Describe a challenging work situation and how you overcame it.",
//   ];

//   // Mock responses data
//   const mockResponsesData = {
//     0: [
//       {
//         id: 1,
//         type: "audio",
//         content: "I'm a software engineer with 5 years of experience specializing in frontend development. I've worked with React, Vue, and Angular, and I'm passionate about creating intuitive user interfaces.",
//         date: "2023-05-15",
//         analysis: {
//           scores: { fluency: 4, confidence: 3, relevance: 5, clarity: 4 },
//           feedback: {
//             strengths: ["Clear career focus", "Good technical detail"],
//             improvements: ["Could mention soft skills"],
//             suggestion: "Add a sentence about collaboration skills"
//           }
//         },
//       },
//       {
//         id: 2,
//         type: "text",
//         content: "I have 5 years of experience in marketing, with expertise in digital campaigns and social media strategy. I've helped grow several brands' online presence significantly.",
//         date: "2023-05-10",
//       },
//     ],
//     1: [
//       {
//         id: 1,
//         type: "text",
//         content: "My strengths include communication and teamwork, while my weakness is sometimes taking on too much work. I'm working on better delegation.",
//         date: "2023-05-12",
//         analysis: {
//           scores: { fluency: 3, confidence: 4, relevance: 4, clarity: 3 },
//           feedback: {
//             strengths: ["Honest self-assessment"],
//             improvements: ["Could provide more specific examples"],
//             suggestion: "Use STAR method for weakness example"
//           }
//         },
//       },
//     ],
//   };

//   // Mock discussion data
//   const mockDiscussionData = {
//     0: [
//       {
//         id: 1,
//         userId: "user123",
//         userName: "Alex Johnson",
//         userAvatar: avatarPlaceholder,
//         content: "I find it helpful to structure my 'Tell me about yourself' answer in three parts: present role, relevant past experience, and why I'm interested in this position.",
//         timestamp: "2023-05-18T14:30:00Z",
//         likes: 8,
//         liked: false,
//         replies: [
//           {
//             id: 101,
//             userId: "user456",
//             userName: "Sam Wilson",
//             userAvatar: avatarPlaceholder,
//             content: "That's a great structure! I've been using it and it really helps keep my answer focused.",
//             timestamp: "2023-05-18T15:45:00Z",
//             likes: 3,
//             liked: false
//           }
//         ]
//       },
//       {
//         id: 2,
//         userId: "user789",
//         userName: "Taylor Smith",
//         userAvatar: avatarPlaceholder,
//         content: "Does anyone have tips for keeping this answer under 2 minutes? I tend to ramble when talking about my background.",
//         timestamp: "2023-05-17T09:15:00Z",
//         likes: 5,
//         liked: true,
//         replies: []
//       }
//     ],
//     1: [
//       {
//         id: 3,
//         userId: "user456",
//         userName: "Sam Wilson",
//         userAvatar: avatarPlaceholder,
//         content: "For strengths and weaknesses, I always pick a weakness that I've actively worked to improve, and show concrete examples of my progress.",
//         timestamp: "2023-05-16T11:20:00Z",
//         likes: 12,
//         liked: false,
//         replies: []
//       }
//     ]
//   };

//   useEffect(() => {
//     // Load responses for this question
//     setResponses(mockResponsesData[id] || []);
//     setDiscussion(mockDiscussionData[id] || []);
//   }, [id]);

//   const startRecording = () => {
//     try {
//       const recognition = new (window.SpeechRecognition ||
//         window.webkitSpeechRecognition)();
//       recognition.lang = "en-US";
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;

//       setRecognition(recognition);
//       setIsRecording(true);

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setUserAnswer(transcript);
//         processAnswer(transcript);
//       };

//       recognition.onerror = (event) => {
//         console.error("Recognition error:", event.error);
//         setIsRecording(false);
//         alert(`Speech recognition error: ${event.error}`);
//       };

//       recognition.onend = () => {
//         setIsRecording(false);
//       };

//       recognition.start();
//     } catch (err) {
//       console.error("Speech recognition error:", err);
//       alert("Speech recognition not supported or error occurred");
//     }
//   };

//   const stopRecording = () => {
//     if (recognition) {
//       recognition.stop();
//       setRecognition(null);
//       setIsRecording(false);
//     }
//   };

//   const processAnswer = async (transcript) => {
//     setIsLoading(true);
//     // Simulate API call to analyze answer
//     setTimeout(() => {
//       const mockAnalysis = {
//         scores: {
//           fluency: Math.floor(Math.random() * 5) + 1,
//           confidence: Math.floor(Math.random() * 5) + 1,
//           relevance: Math.floor(Math.random() * 5) + 1,
//           clarity: Math.floor(Math.random() * 5) + 1,
//         },
//         feedback: {
//           strengths: [
//             "Clear articulation of thoughts",
//             "Good use of specific examples",
//             "Appropriate length for the answer"
//           ],
//           improvements: [
//             "Could provide more concrete examples",
//             "Try to reduce filler words"
//           ],
//           suggestion: "Practice answering in STAR format (Situation, Task, Action, Result) for more structured responses"
//         },
//       };
//       setAnalysis(mockAnalysis);

//       // Add to responses
//       setResponses((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           type: "audio",
//           content: transcript,
//           date: new Date().toISOString().split("T")[0],
//           analysis: mockAnalysis,
//         },
//       ]);
//       setIsLoading(false);
//     }, 2000);
//   };

//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     if (!comment.trim()) return;

//     const newResponse = {
//       id: Date.now(),
//       type: "text",
//       content: comment,
//       date: new Date().toISOString().split("T")[0],
//     };

//     setResponses((prev) => [...prev, newResponse]);
//     setComment("");
//     setActiveTab("history");
//   };

//   const handleSubmitDiscussionComment = () => {
//     if (!newComment.trim()) return;

//     const newDiscussionPost = {
//       id: Date.now(),
//       userId: "currentUser",
//       userName: "You",
//       userAvatar: avatarPlaceholder,
//       content: newComment,
//       timestamp: new Date().toISOString(),
//       likes: 0,
//       liked: false,
//       replies: []
//     };

//     setDiscussion(prev => [newDiscussionPost, ...prev]);
//     setNewComment("");
//   };

//   const handleReply = (commentId) => {
//     if (!replyContent.trim()) return;

//     const updatedDiscussion = discussion.map(comment => {
//       if (comment.id === commentId) {
//         const newReply = {
//           id: Date.now(),
//           userId: "currentUser",
//           userName: "You",
//           userAvatar: avatarPlaceholder,
//           content: replyContent,
//           timestamp: new Date().toISOString(),
//           likes: 0,
//           liked: false
//         };
//         return {
//           ...comment,
//           replies: [...comment.replies, newReply]
//         };
//       }
//       return comment;
//     });

//     setDiscussion(updatedDiscussion);
//     setReplyTo(null);
//     setReplyContent("");
//   };

//   const toggleLike = (commentId, isReply = false, parentId = null) => {
//     if (isReply) {
//       setDiscussion(prev => prev.map(comment => {
//         if (comment.id === parentId) {
//           return {
//             ...comment,
//             replies: comment.replies.map(reply => {
//               if (reply.id === commentId) {
//                 return {
//                   ...reply,
//                   likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
//                   liked: !reply.liked
//                 };
//               }
//               return reply;
//             })
//           };
//         }
//         return comment;
//       }));
//     } else {
//       setDiscussion(prev => prev.map(comment => {
//         if (comment.id === commentId) {
//           return {
//             ...comment,
//             likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
//             liked: !comment.liked
//           };
//         }
//         return comment;
//       }));
//     }
//   };

//   const renderScoreBar = (score) => {
//     const percentage = score * 20;
//     let colorClass = "bg-red-500";
//     if (score >= 4) colorClass = "bg-green-500";
//     else if (score >= 3) colorClass = "bg-yellow-500";

//     return (
//       <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//         <div
//           className={`h-2.5 rounded-full ${colorClass}`}
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     );
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//           <button
//             onClick={() => navigate(-1)}
//             className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
//           >
//             <FiArrowLeft className="mr-2" />
//             Back to Questions
//           </button>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200 dark:border-gray-700">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center mb-2">
//                 <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium mr-3">
//                   {parseInt(id) + 1}
//                 </span>
//                 <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//                   {questions[id]}
//                 </h1>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 ml-11">
//                 Practice your response to this common interview question
//               </p>
//             </div>

//             <div className="p-6">
//               <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//                 <button
//                   className={`py-2 px-4 font-medium ${activeTab === "record" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
//                   onClick={() => setActiveTab("record")}
//                 >
//                   Record Answer
//                 </button>
//                 <button
//                   className={`py-2 px-4 font-medium ${activeTab === "text" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
//                   onClick={() => setActiveTab("text")}
//                 >
//                   Write Answer
//                 </button>
//                 <button
//                   className={`py-2 px-4 font-medium ${activeTab === "history" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
//                   onClick={() => setActiveTab("history")}
//                 >
//                   History ({responses.length})
//                 </button>
//                 <button
//                   className={`py-2 px-4 font-medium ${activeTab === "discussion" ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"}`}
//                   onClick={() => setActiveTab("discussion")}
//                 >
//                   Discussion
//                 </button>
//               </div>

//               {activeTab === "record" && (
//                 <div className="space-y-6">
//                   <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
//                     <h2 className="text-lg font-semibold mb-3 flex items-center">
//                       <FiMic className="mr-2" />
//                       Record Your Answer
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">
//                       Click the button below and speak your answer to the
//                       question. We'll analyze your response for fluency,
//                       confidence, and relevance.
//                     </p>
//                     <button
//                       onClick={isRecording ? stopRecording : startRecording}
//                       className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all ${
//                         isRecording
//                           ? "bg-red-600 hover:bg-red-700 text-white"
//                           : "bg-blue-600 hover:bg-blue-700 text-white"
//                       }`}
//                     >
//                       {isRecording ? (
//                         <>
//                           <span className="relative flex h-3 w-3 mr-2">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                           </span>
//                           Recording - Click to Stop
//                         </>
//                       ) : (
//                         <>
//                           <FiMic className="mr-2" />
//                           Start Recording
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   {userAnswer && (
//                     <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600">
//                       <h3 className="font-semibold mb-2">Your Answer</h3>
//                       <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded">
//                         <p className="whitespace-pre-line">{userAnswer}</p>
//                       </div>
//                     </div>
//                   )}

//                   {isLoading && (
//                     <div className="text-center py-8">
//                       <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//                       <p className="mt-2 text-gray-600 dark:text-gray-300">
//                         Analyzing your response...
//                       </p>
//                     </div>
//                   )}

//                   {analysis && !isLoading && (
//                     <div className="space-y-6">
//                       <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600">
//                         <h3 className="text-lg font-semibold mb-4 flex items-center">
//                           <FaRegChartBar className="mr-2 text-blue-500" />
//                           Performance Analysis
//                         </h3>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                           {Object.entries(analysis.scores).map(
//                             ([metric, score]) => (
//                             <div
//                               key={metric}
//                               className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg"
//                             >
//                               <div className="flex justify-between items-center mb-1">
//                                 <span className="capitalize font-medium text-gray-700 dark:text-gray-200">
//                                   {metric}
//                                 </span>
//                                 <span className="font-bold">{score}/5</span>
//                               </div>
//                               {renderScoreBar(score)}
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-100 dark:border-green-800">
//                           <h4 className="font-semibold mb-3 flex items-center">
//                             <FaRegThumbsUp className="mr-2 text-green-500" />
//                             Strengths
//                           </h4>
//                           <ul className="space-y-2">
//                             {analysis.feedback.strengths.map((strength, i) => (
//                               <li key={i} className="flex items-start">
//                                 <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
//                                 <span>{strength}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-100 dark:border-yellow-800">
//                           <h4 className="font-semibold mb-3 flex items-center">
//                             <FiAlertCircle className="mr-2 text-yellow-500" />
//                             Areas for Improvement
//                           </h4>
//                           <ul className="space-y-2">
//                             {analysis.feedback.improvements.map((imp, i) => (
//                               <li key={i} className="flex items-start">
//                                 <FiAlertCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
//                                 <span>{imp}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>

//                       <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-100 dark:border-blue-800">
//                         <h4 className="font-semibold mb-3 flex items-center">
//                           <FaRegLightbulb className="mr-2 text-blue-500" />
//                           Suggestion
//                         </h4>
//                         <p>{analysis.feedback.suggestion}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === "text" && (
//                 <div>
//                   <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-lg border border-purple-100 dark:border-purple-800 mb-6">
//                     <h2 className="text-lg font-semibold mb-3">
//                       Write Your Answer
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">
//                       Type your response to the question. You can save multiple
//                       versions and compare them later.
//                     </p>
//                     <form onSubmit={handleSubmitComment}>
//                       <textarea
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         className="w-full p-4 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         rows="6"
//                         placeholder="Type your answer here..."
//                       ></textarea>
//                       <button
//                         type="submit"
//                         className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//                         disabled={!comment.trim()}
//                       >
//                         Save Answer
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "history" && (
//                 <div>
//                   <h2 className="text-lg font-semibold mb-4">
//                     Your Practice History
//                   </h2>
//                   {responses.length === 0 ? (
//                     <div className="text-center py-8">
//                       <p className="text-gray-500 dark:text-gray-400">
//                         No responses yet. Record or write your first answer!
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {responses.map((response) => (
//                         <div
//                           key={response.id}
//                           className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex items-center">
//                               <span
//                                 className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${
//                                   response.type === "audio"
//                                     ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
//                                     : "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
//                                 }`}
//                               >
//                                 {response.type === "audio" ? "A" : "T"}
//                               </span>
//                               <span className="text-sm text-gray-500 dark:text-gray-400">
//                                 {response.date}
//                               </span>
//                             </div>
//                             {response.analysis && (
//                               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
//                                 Analyzed
//                               </span>
//                             )}
//                           </div>
//                           <p className="mb-4 whitespace-pre-line">
//                             {response.content}
//                           </p>
//                           {response.analysis && (
//                             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//                               <h4 className="font-medium mb-3 flex items-center">
//                                 <FaRegChartBar className="mr-2 text-blue-500" />
//                                 Analysis Summary
//                               </h4>
//                               <div className="flex flex-wrap gap-2 mb-3">
//                                 {Object.entries(response.analysis.scores).map(
//                                   ([metric, score]) => (
//                                     <div
//                                       key={metric}
//                                       className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-xs flex items-center"
//                                     >
//                                       <span className="capitalize mr-1">
//                                         {metric}:
//                                       </span>
//                                       <span className="font-bold">{score}/5</span>
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                               {response.analysis.feedback && (
//                                 <div className="text-sm text-gray-600 dark:text-gray-300">
//                                   <p className="font-medium">
//                                     {response.analysis.feedback.strengths[0]}
//                                   </p>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === "discussion" && (
//                 <div className="space-y-6">
//                   <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600">
//                     <h2 className="text-lg font-semibold mb-4 flex items-center">
//                       <FiMessageSquare className="mr-2" />
//                       Join the Discussion
//                     </h2>
//                     <div className="flex items-start space-x-3">
//                       <img
//                         src={avatarPlaceholder}
//                         alt="Your avatar"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div className="flex-1">
//                         <textarea
//                           value={newComment}
//                           onChange={(e) => setNewComment(e.target.value)}
//                           className="w-full p-3 border rounded-lg dark:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           rows="3"
//                           placeholder="Share your tips or ask a question about this interview question..."
//                         ></textarea>
//                         <div className="flex justify-end mt-2">
//                           <button
//                             onClick={handleSubmitDiscussionComment}
//                             disabled={!newComment.trim()}
//                             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center disabled:opacity-50"
//                           >
//                             <IoMdSend className="mr-1" />
//                             Post
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     {discussion.length === 0 ? (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500 dark:text-gray-400">
//                           No discussion yet. Be the first to share your thoughts!
//                         </p>
//                       </div>
//                     ) : (
//                       discussion.map((comment) => (
//                         <div
//                           key={comment.id}
//                           className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600"
//                         >
//                           <div className="flex items-start space-x-3">
//                             <img
//                               src={comment.userAvatar}
//                               alt={comment.userName}
//                               className="w-10 h-10 rounded-full"
//                             />
//                             <div className="flex-1">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   <h4 className="font-semibold">{comment.userName}</h4>
//                                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                                     {new Date(comment.timestamp).toLocaleString()}
//                                   </p>
//                                 </div>
//                                 <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//                                   <FiMoreHorizontal />
//                                 </button>
//                               </div>
//                               <p className="mt-2 whitespace-pre-line">{comment.content}</p>
                              
//                               <div className="flex items-center mt-3 space-x-4">
//                                 <button
//                                   onClick={() => toggleLike(comment.id)}
//                                   className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
//                                 >
//                                   {comment.liked ? (
//                                     <FaHeart className="text-red-500 mr-1" />
//                                   ) : (
//                                     <FiHeart className="mr-1" />
//                                   )}
//                                   <span>{comment.likes}</span>
//                                 </button>
//                                 <button
//                                   onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
//                                   className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
//                                 >
//                                   <FiMessageSquare className="mr-1" />
//                                   <span>Reply</span>
//                                 </button>
//                                 <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
//                                   <FiShare2 className="mr-1" />
//                                   <span>Share</span>
//                                 </button>
//                               </div>

//                               {replyTo === comment.id && (
//                                 <div className="mt-3 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
//                                   <div className="flex items-start space-x-3">
//                                     <img
//                                       src={avatarPlaceholder}
//                                       alt="Your avatar"
//                                       className="w-8 h-8 rounded-full"
//                                     />
//                                     <div className="flex-1">
//                                       <textarea
//                                         value={replyContent}
//                                         onChange={(e) => setReplyContent(e.target.value)}
//                                         className="w-full p-2 border rounded-lg dark:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         rows="2"
//                                         placeholder="Write your reply..."
//                                       ></textarea>
//                                       <div className="flex justify-end gap-2 mt-2">
//                                         <button
//                                           onClick={() => setReplyTo(null)}
//                                           className="px-3 py-1 border rounded-lg text-sm"
//                                         >
//                                           Cancel
//                                         </button>
//                                         <button
//                                           onClick={() => handleReply(comment.id)}
//                                           disabled={!replyContent.trim()}
//                                           className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50"
//                                         >
//                                           Reply
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}

//                               {comment.replies.length > 0 && (
//                                 <div className="mt-4 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
//                                   {comment.replies.map((reply) => (
//                                     <div key={reply.id} className="pt-3">
//                                       <div className="flex items-start space-x-3">
//                                         <img
//                                           src={reply.userAvatar}
//                                           alt={reply.userName}
//                                           className="w-8 h-8 rounded-full"
//                                         />
//                                         <div className="flex-1">
//                                           <div className="flex justify-between items-start">
//                                             <div>
//                                               <h4 className="font-medium text-sm">{reply.userName}</h4>
//                                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                 {new Date(reply.timestamp).toLocaleString()}
//                                               </p>
//                                             </div>
//                                             <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm">
//                                               <FiMoreHorizontal />
//                                             </button>
//                                           </div>
//                                           <p className="mt-1 text-sm whitespace-pre-line">{reply.content}</p>
//                                           <div className="flex items-center mt-2 space-x-4">
//                                             <button
//                                               onClick={() => toggleLike(reply.id, true, comment.id)}
//                                               className="flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-sm"
//                                             >
//                                               {reply.liked ? (
//                                                 <FaHeart className="text-red-500 mr-1" size={14} />
//                                               ) : (
//                                                 <FiHeart className="mr-1" size={14} />
//                                               )}
//                                               <span>{reply.likes}</span>
//                                             </button>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <h2 className="text-lg font-semibold mb-3">Tips for Answering</h2>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full p-1 mr-3">
//                     <FiCheckCircle className="text-lg" />
//                   </span>
//                   <span>
//                     <strong>Be concise:</strong> Aim for 1-2 minute responses
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full p-1 mr-3">
//                     <FiCheckCircle className="text-lg" />
//                   </span>
//                   <span>
//                     <strong>Use examples:</strong> Support your points with
//                     specific experiences
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full p-1 mr-3">
//                     <FiCheckCircle className="text-lg" />
//                   </span>
//                   <span>
//                     <strong>Practice structure:</strong> Try the STAR method
//                     (Situation, Task, Action, Result) for behavioral questions
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HRQuestionDetailPage;


import React, { useState, useEffect, useRef } from "react";
import { 
  FiMic, 
  FiMicOff, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiAlertCircle,
  FiMessageSquare,
  FiHeart,
  FiShare2,
  FiMoreHorizontal,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiRefreshCw,
  FiEye,
  FiClock,
  FiTrendingUp,
  FiBookmark,
  FiDownload,
  FiSend
} from "react-icons/fi";
import { 
  FaRegLightbulb, 
  FaRegThumbsUp, 
  FaRegChartBar,
  FaHeart,
  FaRobot,
  FaMicrophone,
  FaPlay,
  FaPause,
  FaStop
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BsStars, BsLightbulb, BsGraphUp, BsCheckCircle } from "react-icons/bs";
import Layout from "../components/layouts/layout";


const HRQuestionDetailPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [detailedAnalysis, setDetailedAnalysis] = useState(null);
  const [responses, setResponses] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("interview");
  const [discussion, setDiscussion] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [interviewMode, setInterviewMode] = useState('practice'); // 'practice' or 'mock'
  const [sessionProgress, setSessionProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const questions = [
    {
      id: 1,
      question: "Tell me about yourself.",
      category: "General",
      difficulty: "Easy",
      tips: "Focus on your professional background, key skills, and what makes you unique. Keep it under 2 minutes.",
      timeLimit: 120
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      category: "Self-Assessment",
      difficulty: "Medium",
      tips: "Be honest about weaknesses but show how you're working to improve them. Use specific examples.",
      timeLimit: 180
    },
    {
      id: 3,
      question: "Why do you want to work for our company?",
      category: "Company Fit",
      difficulty: "Medium",
      tips: "Research the company beforehand. Mention specific values, projects, or aspects that appeal to you.",
      timeLimit: 150
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      difficulty: "Medium",
      tips: "Show ambition but be realistic. Align your goals with the company's growth opportunities.",
      timeLimit: 120
    },
    {
      id: 5,
      question: "Describe a challenging work situation and how you overcame it.",
      category: "Behavioral",
      difficulty: "Hard",
      tips: "Use the STAR method: Situation, Task, Action, Result. Focus on your problem-solving process.",
      timeLimit: 240
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Text-to-Speech functionality
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Enhanced recording with audio capture
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudioToBackend(audioBlob);
      };

      // Start speech recognition
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      setRecognition(recognition);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setUserAnswer(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      recognition.onend = () => {
        setIsRecording(false);
        clearInterval(timerRef.current);
      };

      mediaRecorderRef.current.start();
      recognition.start();
    } catch (err) {
      console.error("Recording error:", err);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  // Mock backend API call
  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);
    
    // Simulate API call with FormData
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('questionId', currentQuestion.id);
    formData.append('transcript', userAnswer);

    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock detailed analysis response (using the structure from your second document)
      const mockAnalysis = {
        analysisSummary: "The candidate provides a structured overview of their background and demonstrates good technical knowledge. However, the response could benefit from more specific examples and better storytelling to create a more engaging narrative.",
        scores: {
          relevance: Math.floor(Math.random() * 3) + 6,
          clarity: Math.floor(Math.random() * 3) + 6,
          confidence: Math.floor(Math.random() * 3) + 6,
          structure: Math.floor(Math.random() * 3) + 5,
          specificity: Math.floor(Math.random() * 3) + 5,
          depth: Math.floor(Math.random() * 3) + 4,
          originality: Math.floor(Math.random() * 3) + 5
        },
        strengths: {
          items: [
            "Clear communication style",
            "Relevant experience mentioned",
            "Confident delivery",
            "Good technical knowledge"
          ],
          explanations: [
            "Speaks clearly with appropriate pacing",
            "Mentions relevant skills and experience",
            "Maintains confident tone throughout",
            "Shows understanding of technical concepts"
          ]
        },
        improvements: {
          items: [
            "Add more specific examples",
            "Better narrative structure",
            "Quantify achievements",
            "Connect to company needs"
          ],
          explanations: [
            "Include specific projects or accomplishments",
            "Create a more engaging story flow",
            "Use numbers and metrics where possible",
            "Relate experience to the target role"
          ]
        },
        suggestions: [
          "Start with a compelling hook about your passion",
          "Use the STAR method for behavioral examples",
          "Include quantifiable achievements",
          "Practice smoother transitions between points",
          "Research the company to tailor your response"
        ],
        contentAnalysis: {
          keyThemes: ["Professional background", "Technical skills", "Experience"],
          emotionalTone: "Confident but could be more engaging",
          technicalAccuracy: "Generally accurate",
          evidenceUsed: ["Experience claims", "Skill mentions"],
          missingElements: ["Specific achievements", "Company research", "Personal motivation"]
        },
        sampleAnswer: "I'm a passionate software engineer with 3 years of experience building scalable web applications. What drives me is solving complex problems through clean, efficient code. In my current role at TechCorp, I led the development of a customer portal that reduced support tickets by 40%. I specialize in React and Node.js, and I'm particularly excited about this opportunity because your company's focus on AI-driven solutions aligns perfectly with my interest in machine learning integration.",
        followUpQuestions: [
          "Can you elaborate on a specific technical challenge you overcame?",
          "How do you stay updated with the latest technology trends?",
          "What interests you most about our company's tech stack?"
        ],
        interviewerReaction: {
          positiveImpressions: [
            "Clear technical foundation",
            "Confident presentation",
            "Relevant experience"
          ],
          potentialConcerns: [
            "Needs more specific examples",
            "Could show more enthusiasm",
            "Missing company research"
          ]
        },
        overallScore: (Math.random() * 2 + 6).toFixed(1),
        metadata: {
          analyzedAt: new Date().toISOString(),
          questionLength: currentQuestion.question.length,
          answerLength: userAnswer.length,
          wordCount: userAnswer.split(' ').length,
          recordingDuration: recordingTime
        }
      };

      setDetailedAnalysis(mockAnalysis);
      
      // Add to responses
      setResponses((prev) => [
        ...prev,
        {
          id: Date.now(),
          questionId: currentQuestion.id,
          question: currentQuestion.question,
          type: "audio",
          content: userAnswer,
          date: new Date().toISOString().split("T")[0],
          analysis: mockAnalysis,
          duration: recordingTime,
          audioBlob: audioBlob
        },
      ]);

      // Update session progress
      setSessionProgress((currentQuestionIndex + 1) / questions.length * 100);
      
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      alert('Error analyzing your response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreBarColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderScoreBar = (score) => {
    const percentage = (score / 10) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${getScoreBarColor(score)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setDetailedAnalysis(null);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer("");
      setDetailedAnalysis(null);
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FiArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Interview Preparation</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${sessionProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(sessionProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-lg">
                      <span className="text-white font-bold">{currentQuestionIndex + 1}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{currentQuestion.question}</h2>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-indigo-100 text-sm">{currentQuestion.category}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {currentQuestion.difficulty}
                        </span>
                        <span className="text-indigo-100 text-sm flex items-center">
                          <FiClock className="mr-1" />
                          {formatTime(currentQuestion.timeLimit)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => speakText(currentQuestion.question)}
                      disabled={isSpeaking}
                      className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
                    >
                      {isSpeaking ? (
                        <FiVolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <FiVolume2 className="h-5 w-5 text-white" />
                      )}
                    </button>
                    <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                      <FiBookmark className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                    <BsLightbulb className="mr-2" />
                    Interview Tip
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">{currentQuestion.tips}</p>
                </div>

                {/* Recording Interface */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording 
                          ? 'bg-red-500 shadow-lg shadow-red-500/25 animate-pulse' 
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg'
                      }`}>
                        <button
                          onClick={isRecording ? stopRecording : startRecording}
                          disabled={isProcessing}
                          className="text-white focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
                        >
                          {isRecording ? (
                            <FiMicOff className="h-12 w-12" />
                          ) : (
                            <FiMic className="h-12 w-12" />
                          )}
                        </button>
                      </div>
                      
                      {isRecording && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                          <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {formatTime(recordingTime)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {isRecording ? 'Recording in progress...' : 'Click to start recording'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isRecording ? 'Speak clearly and naturally' : 'Your response will be analyzed for feedback'}
                      </p>
                    </div>
                  </div>

                  {/* Live Transcript */}
                  {userAnswer && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <FaRobot className="mr-2 text-indigo-600" />
                        Live Transcript
                      </h3>
                      <div className="bg-white dark:bg-gray-600 rounded p-3 min-h-[100px] border-2 border-dashed border-gray-300 dark:border-gray-500">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {userAnswer}
                          {isRecording && <span className="animate-pulse">|</span>}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Processing State */}
                  {isProcessing && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
                        <BsStars className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Analyzing Your Response
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our AI is evaluating your answer for content, delivery, and structure...
                      </p>
                      <div className="mt-4 max-w-md mx-auto">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span>Processing...</span>
                          <span>Please wait</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {questions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                            index === currentQuestionIndex
                              ? 'bg-indigo-600 text-white'
                              : index < currentQuestionIndex
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <FiArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            {detailedAnalysis && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <BsGraphUp className="mr-2" />
                    Detailed Analysis
                  </h3>
                  <p className="text-green-100 text-sm mt-1">
                    Overall Score: {detailedAnalysis.overallScore}/10
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Summary */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Summary
                    </h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      {detailedAnalysis.analysisSummary}
                    </p>
                  </div>

                  {/* Scores Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(detailedAnalysis.scores).map(([metric, score]) => (
                      <div key={metric} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {metric}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(score)}`}>
                            {score}/10
                          </span>
                        </div>
                        {renderScoreBar(score)}
                      </div>
                    ))}
                  </div>

                  {/* Strengths and Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                        <BsCheckCircle className="mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {detailedAnalysis.strengths.items.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <span className="text-green-800 dark:text-green-200 font-medium">
                                {strength}
                              </span>
                              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                                {detailedAnalysis.strengths.explanations[index]}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                        <FiAlertCircle className="mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {detailedAnalysis.improvements.items.map((improvement, index) => (
                          <li key={index} className="flex items-start">
                            <FiAlertCircle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
                            <div>
                              <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                                {improvement}
                              </span>
                              <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                                {detailedAnalysis.improvements.explanations[index]}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Suggestions */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                      <FaRegLightbulb className="mr-2" />
                      Suggested Improvements
                    </h4>
                    <ul className="space-y-3">
                      {detailedAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-full mr-3 mt-1 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-purple-800 dark:text-purple-200">
                            {suggestion}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Answer */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3 flex items-center">
                      <FiMessageSquare className="mr-2" />
                      Sample Answer
                    </h4>
                    <div className="bg-white dark:bg-gray-700 rounded p-4 border-l-4 border-indigo-500">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {detailedAnalysis.sampleAnswer}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => speakText(detailedAnalysis.sampleAnswer)}
                        className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        <FiVolume2 className="mr-1" />
                        Listen to sample
                      </button>
                    </div>
                  </div>

                  {/* Follow-up Questions */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FiRefreshCw className="mr-2" />
                      Potential Follow-up Questions
                    </h4>
                    <div className="space-y-3">
                      {detailedAnalysis.followUpQuestions.map((question, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-600 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-start">
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-500 text-gray-600 dark:text-gray-200 rounded-full mr-3 flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {question}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <FaRegChartBar className="mr-2" />
                      Content Analysis
                    </h4>
                    
                    {/* Key Themes */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Key Themes Identified
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {detailedAnalysis.contentAnalysis.keyThemes.map((theme, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Emotional Tone */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Emotional Tone
                      </h5>
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                          {detailedAnalysis.contentAnalysis.emotionalTone}
                        </span>
                        <div className="ml-4 w-full max-w-xs bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: '70%' }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Missing Elements */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Missing Elements
                      </h5>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        {detailedAnalysis.contentAnalysis.missingElements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Interviewer Reaction */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FiEye className="mr-2" />
                      Predicted Interviewer Reaction
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
                          Positive Impressions
                        </h5>
                        <ul className="space-y-2">
                          {detailedAnalysis.interviewerReaction.positiveImpressions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-2">
                          Potential Concerns
                        </h5>
                        <ul className="space-y-2">
                          {detailedAnalysis.interviewerReaction.potentialConcerns.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Practice History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FiClock className="mr-2" />
                  Practice History
                </h3>
              </div>
              <div className="p-4">
                {responses.length > 0 ? (
                  <div className="space-y-4">
                    {responses.map((response) => (
                      <div
                        key={response.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => {
                          setCurrentQuestionIndex(questions.findIndex(q => q.id === response.questionId));
                          setUserAnswer(response.content);
                          setDetailedAnalysis(response.analysis);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                              {response.question}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {response.date} • {formatTime(response.duration)}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            getScoreColor(response.analysis.overallScore)
                          }`}>
                            {response.analysis.overallScore}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                              <FiPlay className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                              <FiShare2 className="h-4 w-4" />
                            </button>
                          </div>
                          <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            <FiMoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                      <FiMicOff className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                      No practice history yet
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Record your first response to see it here
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Performance Trends
                </h3>
              </div>
              <div className="p-4">
                {responses.length > 1 ? (
                  <div className="space-y-4">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Performance chart will appear here
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-200">Best Score</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-300">
                          {Math.max(...responses.map(r => parseFloat(r.analysis.overallScore)))}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">Avg. Score</p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
                          {(responses.reduce((sum, r) => sum + parseFloat(r.analysis.overallScore), 0) / responses.length)}
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-200">Responses</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-300">
                          {responses.length}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <BsGraphUp className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                      Track your progress
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Complete more responses to see your trends
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Discussion & Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === 'interview'
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('interview')}
                  >
                    Discussion
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 text-center font-medium ${
                      activeTab === 'notes'
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('notes')}
                  >
                    My Notes
                  </button>
                </div>
              </div>
              <div className="p-4">
                {activeTab === 'interview' ? (
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <span className="text-indigo-600 dark:text-indigo-300 font-medium text-sm">AI</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-800 dark:text-gray-200 text-sm">
                            How would you approach answering this question? Share your thoughts below.
                          </p>
                        </div>
                        <div className="flex items-center mt-2 space-x-3 text-xs text-gray-500 dark:text-gray-400">
                          <button className="hover:text-indigo-600 dark:hover:text-indigo-400">
                            <FiHeart className="h-3 w-3" />
                          </button>
                          <span>2h ago</span>
                        </div>
                      </div>
                    </div>

                    {discussion.length > 0 ? (
                      discussion.map((comment, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                              <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                                {comment.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                              <p className="text-gray-800 dark:text-gray-200 text-sm">
                                {comment.content}
                              </p>
                            </div>
                            <div className="flex items-center mt-2 space-x-3 text-xs text-gray-500 dark:text-gray-400">
                              <button className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                <FiHeart className="h-3 w-3" />
                              </button>
                              <button 
                                className="hover:text-indigo-600 dark:hover:text-indigo-400"
                                onClick={() => setReplyTo(comment.id)}
                              >
                                Reply
                              </button>
                              <span>{comment.time}</span>
                            </div>
                            
                            {replyTo === comment.id && (
                              <div className="mt-3 flex items-start space-x-2">
                                <input
                                  type="text"
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  placeholder="Write a reply..."
                                  className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button
                                  onClick={() => {
                                    if (replyContent.trim()) {
                                      setDiscussion([
                                        ...discussion,
                                        {
                                          id: Date.now(),
                                          author: "You",
                                          content: replyContent,
                                          time: "Just now",
                                          parentId: comment.id
                                        }
                                      ]);
                                      setReplyContent("");
                                      setReplyTo(null);
                                    }
                                  }}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-2 text-sm"
                                >
                                  <FiSend className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                          <FiMessageSquare className="h-6 w-6 text-gray-400" />
                        </div>
                        <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                          No discussions yet
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Be the first to share your thoughts
                        </p>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">Y</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add to the discussion..."
                          className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => {
                              if (newComment.trim()) {
                                setDiscussion([
                                  ...discussion,
                                  {
                                    id: Date.now(),
                                    author: "You",
                                    content: newComment,
                                    time: "Just now"
                                  }
                                ]);
                                setNewComment("");
                              }
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-1 text-sm flex items-center"
                          >
                            <IoMdSend className="mr-1 h-3 w-3" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-40 text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Write your personal notes about this question..."
                    />
                    <div className="flex justify-end">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm">
                        Save Notes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FiBookmark className="mr-2" />
                  Recommended Resources
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <a
                  href="#"
                  className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    How to Answer "Tell Me About Yourself"
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Article • 5 min read
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    STAR Method Explained with Examples
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Video • 8 min
                  </p>
                </a>
                <a
                  href="#"
                  className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    Common HR Interview Questions
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    Cheatsheet • PDF
                  </p>
                </a>
                <button className="w-full text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium py-2">
                  View all resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></Layout>
  );
};

export default HRQuestionDetailPage;