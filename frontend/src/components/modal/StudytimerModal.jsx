// import React, { useState, useEffect, useRef } from "react";
// import {
//   Play,
//   Pause,
//   RotateCw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Coffee,
//   Brain,
//   Maximize2,
//   Minimize2,
//   SkipForward,
//   Timer,
//   Square,
// } from "lucide-react";

// const StudyTimerModal = () => {
//   // Load state from localStorage or use defaults
//   const loadState = () => {
//     const savedState = localStorage.getItem("studyTimerState");
//     return savedState
//       ? JSON.parse(savedState)
//       : {
//           isRunning: false,
//           timeLeft: 25 * 60,
//           sessionType: "focus",
//           isMinimized: false,
//           showSettings: false,
//           isSoundEnabled: true,
//           showBreakScreen: false,
//           breakTimeLeft: 5 * 60,
//           currentPreset: "classic",
//           lastUpdated: Date.now(),
//         };
//   };

//   // Initial state
//   const [state, setState] = useState(loadState());

//   const timerRef = useRef(null);
//   const breakTimerRef = useRef(null);
//   const containerRef = useRef(null);

//   // Presets
//   const presets = {
//     classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
//     short: { focus: 1, shortBreak: 3, longBreak: 10, name: "Short" },
//     deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
//   };

//   // Save state to localStorage whenever it changes
//   useEffect(() => {
//     const saveState = () => {
//       const stateToSave = {
//         ...state,
//         lastUpdated: Date.now(),
//       };
//       localStorage.setItem("studyTimerState", JSON.stringify(stateToSave));
//     };

//     saveState();

//     // Also save state before page unload
//     window.addEventListener("beforeunload", saveState);
//     return () => window.removeEventListener("beforeunload", saveState);
//   }, [state]);

//   // Calculate elapsed time since last update
//   useEffect(() => {
//     const checkElapsedTime = () => {
//       if (state.isRunning && state.lastUpdated) {
//         const elapsedSeconds = Math.floor(
//           (Date.now() - state.lastUpdated) / 1000
//         );
//         if (elapsedSeconds > 0) {
//           setState((prev) => {
//             const newTimeLeft = Math.max(0, prev.timeLeft - elapsedSeconds);
//             if (newTimeLeft <= 0) {
//               return { ...prev, timeLeft: 0, isRunning: false };
//             }
//             return { ...prev, timeLeft: newTimeLeft };
//           });
//         }
//       }
//     };

//     checkElapsedTime();
//   }, []);

//   // Timer logic
//   useEffect(() => {
//     if (state.isRunning && state.timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
//       }, 1000);
//     } else if (state.timeLeft === 0) {
//       clearInterval(timerRef.current);
//       handleTimerComplete();
//     }

//     return () => clearInterval(timerRef.current);
//   }, [state.isRunning, state.timeLeft]);

//   // Break timer logic
//   useEffect(() => {
//     if (state.showBreakScreen && state.breakTimeLeft > 0) {
//       breakTimerRef.current = setInterval(() => {
//         setState((prev) => ({
//           ...prev,
//           breakTimeLeft: prev.breakTimeLeft - 1,
//         }));
//       }, 1000);
//     } else if (state.showBreakScreen && state.breakTimeLeft === 0) {
//       clearInterval(breakTimerRef.current);
//       endBreak();
//     }

//     return () => clearInterval(breakTimerRef.current);
//   }, [state.showBreakScreen, state.breakTimeLeft]);

//   const handleTimerComplete = () => {
//     if (state.isSoundEnabled) playSound();

//     if (state.sessionType === "focus") {
//       // Start break
//       const breakDuration = presets[state.currentPreset].shortBreak * 60;
//       setState((prev) => ({
//         ...prev,
//         breakTimeLeft: breakDuration,
//         showBreakScreen: true,
//         isMinimized: false, // Show full screen for break
//         isRunning: false,
//       }));
//     } else {
//       // Start focus session
//       const focusDuration = presets[state.currentPreset].focus * 60;
//       setState((prev) => ({
//         ...prev,
//         sessionType: "focus",
//         timeLeft: focusDuration,
//         isRunning: false,
//       }));
//     }
//   };

//   const endBreak = () => {
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//     }));
//   };

//   const skipBreak = () => {
//     clearInterval(breakTimerRef.current);
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60,
//     }));
//   };

//   const playSound = () => {
//     try {
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();
//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);
//       oscillator.frequency.value = state.sessionType === "focus" ? 800 : 600;
//       oscillator.type = "sine";
//       gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(
//         0.01,
//         audioContext.currentTime + 0.8
//       );
//       oscillator.start();
//       oscillator.stop(audioContext.currentTime + 0.8);
//     } catch (e) {
//       console.log("Audio not supported");
//     }
//   };

//   // Timer controls
//   const startTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: true,
//       isMinimized: true, // Minimize on start
//       lastUpdated: Date.now(),
//     }));
//   };

//   const pauseTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       lastUpdated: Date.now(),
//     }));
//   };

//   const resetTimer = () => {
//     const duration =
//       state.sessionType === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : state.sessionType === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60;

//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       timeLeft: duration,
//       lastUpdated: Date.now(),
//     }));
//   };

//   // Helpers
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const getSessionColor = () => {
//     return state.sessionType === "focus"
//       ? "bg-blue-500"
//       : state.sessionType === "shortBreak"
//       ? "bg-green-500"
//       : "bg-purple-500";
//   };

//   const getSessionIcon = () => {
//     return state.sessionType === "focus" ? (
//       <Brain size={16} />
//     ) : (
//       <Coffee size={16} />
//     );
//   };

//   const switchSession = (type) => {
//     const duration =
//       type === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : type === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60;

//     setState((prev) => ({
//       ...prev,
//       sessionType: type,
//       isRunning: false,
//       timeLeft: duration,
//       lastUpdated: Date.now(),
//     }));
//   };

//   const selectPreset = (preset) => {
//     setState((prev) => ({
//       ...prev,
//       currentPreset: preset,
//       isRunning: false,
//       timeLeft: presets[preset].focus * 60,
//       sessionType: "focus",
//       lastUpdated: Date.now(),
//     }));
//   };

//   // Progress calculations
//   const progress =
//     (((state.sessionType === "focus"
//       ? presets[state.currentPreset].focus * 60
//       : state.sessionType === "shortBreak"
//       ? presets[state.currentPreset].shortBreak * 60
//       : presets[state.currentPreset].longBreak * 60) -
//       state.timeLeft) /
//       (state.sessionType === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : state.sessionType === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60)) *
//     100;

//   // Break Screen Overlay
//   if (state.showBreakScreen) {
//     return (
//       <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
//         <div className="text-center text-white p-8 max-w-md">
//           <Coffee size={48} className="mx-auto mb-6 text-green-400" />
//           <h2 className="text-3xl font-bold mb-2">Time for a Break!</h2>
//           <p className="text-xl mb-6 opacity-80">
//             Step away from your work for a few minutes
//           </p>

//           <div className="text-5xl font-mono font-bold mb-8">
//             {formatTime(state.breakTimeLeft)}
//           </div>

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={skipBreak}
//               className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
//             >
//               <SkipForward size={18} />
//               Skip Break
//             </button>
//             <button
//               onClick={endBreak}
//               className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
//             >
//               End Break Now
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Minimized view
//   if (state.isMinimized) {
//     return (
//       <div className="fixed bottom-4 right-4 z-50 select-none">
//         {!state.isRunning ? (
//           // Stopped state - enhanced visibility
//           <button
//             onClick={startTimer}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
//                      text-white rounded-2xl px-4 py-3 shadow-2xl border border-blue-400
//                      hover:shadow-blue-500/25 transition-all duration-300 group
//                      backdrop-blur-sm hover:scale-105 active:scale-95"
//             aria-label="Start timer"
//           >
//             <div className="flex items-center gap-2">
//               <Timer
//                 size={24}
//                 className="animate-pulse group-hover:animate-spin"
//               />
//               <span className="font-semibold text-sm">Start</span>
//             </div>
//           </button>
//         ) : (
//           // Running state - enhanced circular progress with better visibility
//           <div className="relative group">
//             <button
//               onClick={() =>
//                 setState((prev) => ({ ...prev, isMinimized: false }))
//               }
//               className="no-drag relative bg-white dark:bg-gray-900 rounded-full p-2
//                        shadow-2xl border-2 border-blue-200 dark:border-blue-800
//                        hover:shadow-blue-500/20 transition-all duration-300
//                        hover:scale-105 active:scale-95"
//               aria-label="Expand timer"
//             >
//               <div className="w-16 h-16 flex items-center justify-center relative">
//                 {/* Outer glow effect */}
//                 <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>

//                 {/* Circular progress background */}
//                 <svg
//                   className="absolute w-full h-full transform -rotate-90"
//                   viewBox="0 0 36 36"
//                 >
//                   {/* Background circle */}
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className="stroke-gray-200 dark:stroke-gray-700"
//                     strokeWidth="3"
//                   />
//                   {/* Progress circle with gradient */}
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className={`transition-all duration-1000 ${
//                       state.sessionType === "focus"
//                         ? "stroke-blue-500"
//                         : "stroke-green-500"
//                     }`}
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeDasharray="100"
//                     strokeDashoffset={100 - progress}
//                     style={{
//                       filter: "drop-shadow(0 0 4px currentColor)",
//                     }}
//                   />
//                 </svg>

//                 {/* Time display - enhanced */}
//                 <div className="flex flex-col items-center justify-center z-10">
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {Math.floor(state.timeLeft / 60)
//                       .toString()
//                       .padStart(2, "0")}
//                   </span>
//                   <div className="w-3 h-px bg-gray-400 dark:bg-gray-500 my-0.5"></div>
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {(state.timeLeft % 60).toString().padStart(2, "0")}
//                   </span>
//                 </div>
//               </div>

//               {/* Session type indicator - enhanced */}
//               <div
//                 className={`absolute -top-2 -right-2 text-white text-xs w-6 h-6
//                            flex items-center justify-center rounded-full shadow-lg
//                            font-bold border-2 border-white dark:border-gray-900
//                            ${
//                              state.sessionType === "focus"
//                                ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                : "bg-gradient-to-r from-green-500 to-green-600"
//                            }`}
//               >
//                 {state.sessionType === "focus" ? "F" : "B"}
//               </div>
//             </button>

//             {/* Tooltip on hover */}
//             <div
//               className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100
//                           transition-opacity duration-300 pointer-events-none"
//             >
//               <div
//                 className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg
//                             px-3 py-2 whitespace-nowrap shadow-xl"
//               >
//                 <div className="font-semibold">
//                   {state.sessionType === "focus"
//                     ? "Focus Session"
//                     : "Break Time"}
//                 </div>
//                 <div className="text-gray-300 dark:text-gray-400">
//                   Click to expand
//                 </div>
//                 {/* Tooltip arrow */}
//                 <div
//                   className="absolute top-full right-4 border-4 border-transparent
//                               border-t-gray-900 dark:border-t-gray-700"
//                 ></div>
//               </div>
//             </div>

//             {/* Pulse animation for focus sessions */}
//             {state.sessionType === "focus" && (
//               <div
//                 className="absolute inset-0 rounded-full border-2 border-blue-400
//                             animate-ping opacity-20"
//               ></div>
//             )}
//           </div>
//         )}

//         {/* Quick action buttons when running */}
//         {state.isRunning && (
//           <div
//             className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100
//                         transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
//           >
//             <div className="flex flex-col gap-1">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   pauseTimer();
//                 }}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2
//                          shadow-lg transition-all duration-200 hover:scale-105"
//                 aria-label="Pause timer"
//               >
//                 <Pause size={16} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   stopTimer();
//                 }}
//                 className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2
//                          shadow-lg transition-all duration-200 hover:scale-105"
//                 aria-label="Stop timer"
//               >
//                 <Square size={16} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Main view
//   //   // Render the main full-sized timer modal
//     return (
//       <div className="fixed bottom-4 right-4 z-50 select-none font-inter">
//         <div
//           className="bg-white dark:bg-gray-800 rounded-xl shadow-xl
//                          border border-gray-200/70 dark:border-gray-700/80
//                          w-72 sm:w-80 max-w-[calc(100vw-2rem)] overflow-hidden
//                          backdrop-blur-md bg-opacity-95 dark:bg-opacity-95
//                          transform scale-95 sm:scale-100 transition-transform duration-300 ease-out"
//         >
//           {/* Header Section with session type, preset, and controls */}
//           <div className={`${getSessionColor()} p-4 text-white relative`}>
//             {/* Progress bar at the very top of the header */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
//               <div
//                 className="h-full bg-white transition-all duration-1000 ease-out"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
//                   {getSessionIcon()} {/* Icon for the current session type */}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-base drop-shadow-sm">
//                     {state.sessionType === "focus"
//                       ? "Focus Session"
//                       : state.sessionType === "shortBreak"
//                       ? "Short Break"
//                       : "Long Break"}
//                   </h3>
//                   <div className="flex items-center gap-1.5 text-xs opacity-90">
//                     <span>{presets[state.currentPreset].name} preset</span>
//                     <span>•</span>
//                     <span>{state.sessionsCompleted} sessions</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Minimize and Settings buttons */}
//               <div className="flex gap-0.5">
//                 <button
//                   onClick={() =>
//                     setState((prev) => ({ ...prev, isMinimized: true }))
//                   }
//                   className="hover:bg-white/20 p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//                   aria-label="Minimize"
//                 >
//                   <Minimize2 size={16} />
//                 </button>

//                 <button
//                   onClick={() =>
//                     setState((prev) => ({
//                       ...prev,
//                       showSettings: !prev.showSettings,
//                     }))
//                   }
//                   className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
//                     state.showSettings ? "bg-white/20" : "hover:bg-white/20"
//                   }`}
//                   aria-label="Toggle settings"
//                 >
//                   <Settings size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="p-4">
//             {/* Session switcher tabs */}
//             <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 mb-5 shadow-inner">
//               {["focus", "shortBreak", "longBreak"].map((type) => (
//                 <button
//                   key={type}
//                   onClick={() => switchSession(type)}
//                   className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all
//                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                                    ${
//                                      state.sessionType === type
//                                        ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
//                                        : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
//                                    }`}
//                 >
//                   {type === "focus"
//                     ? "Focus"
//                     : type === "shortBreak"
//                     ? "Short Break"
//                     : "Long Break"}
//                 </button>
//               ))}
//             </div>

//             {/* Timer Display */}
//             <div className="text-center mb-5">
//               <div className="text-5xl sm:text-6xl font-bold mb-3 dark:text-white font-mono tracking-tighter drop-shadow-md">
//                 {formatTime(state.timeLeft)}
//               </div>

//               {/* Main Controls (Play/Pause, Reset, Sound) */}
//               <div className="flex justify-center gap-2 mb-5">
//                 {!state.isRunning ? (
//                   <button
//                     onClick={startTimer}
//                     className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500
//                                        hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium text-sm
//                                        transition-all active:scale-95 shadow-lg shadow-green-500/20
//                                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                   >
//                     <Play size={16} className="fill-current" />
//                     <span>Start</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={pauseTimer}
//                     className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500
//                                        hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-medium text-sm
//                                        transition-all active:scale-95 shadow-lg shadow-amber-500/20
//                                        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
//                   >
//                     <Pause size={16} className="fill-current" />
//                     <span>Pause</span>
//                   </button>
//                 )}

//                 <button
//                   onClick={resetTimer}
//                   className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
//                                        rounded-lg transition-all active:scale-95 text-gray-700 dark:text-gray-300
//                                        shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                   aria-label="Reset"
//                 >
//                   <RotateCw size={16} />
//                 </button>

//                 <button
//                   onClick={() =>
//                     setState((prev) => ({
//                       ...prev,
//                       isSoundEnabled: !prev.isSoundEnabled,
//                     }))
//                   }
//                   className={`p-2.5 rounded-lg transition-all active:scale-95 shadow-sm hover:shadow-md
//                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                                          state.isSoundEnabled
//                                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
//                                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//                                        }`}
//                   aria-label={
//                     state.isSoundEnabled ? "Mute sound" : "Unmute sound"
//                   }
//                 >
//                   {state.isSoundEnabled ? (
//                     <Volume2 size={16} />
//                   ) : (
//                     <VolumeX size={16} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Settings Section (visible when showSettings is true) */}
//             {state.showSettings && (
//               <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4 animate-fade-in">
//                 <h4 className="flex items-center gap-2 text-xs font-semibold mb-3 dark:text-white">
//                   <Settings size={14} className="opacity-70" />
//                   <span>Timer Presets</span>
//                 </h4>

//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {Object.entries(presets).map(([key, preset]) => (
//                     <button
//                       key={key}
//                       onClick={() => selectPreset(key)}
//                       className={`p-2.5 rounded-lg transition-all text-center flex flex-col items-center justify-center
//                                            shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                                            ${
//                                              state.currentPreset === key
//                                                ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
//                                                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
//                                            }`}
//                     >
//                       <div className="font-medium text-sm mb-0.5">
//                         {preset.name}
//                       </div>
//                       <div className="text-xs opacity-80">{preset.focus}min</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
// };

// export default StudyTimerModal;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Play,
//   Pause,
//   RotateCw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Coffee,
//   Brain,
//   Maximize2,
//   Minimize2,
//   SkipForward,
//   Timer,
//   Star,
//   Target,
//   Zap,
// } from "lucide-react";

// const StudyTimerModal = () => {
//   // Motivational quotes for breaks
//   const motivationalQuotes = [
//     "Great things never come from comfort zones.",
//     "Success is the sum of small efforts repeated day in and day out.",
//     "The only way to do great work is to love what you do.",
//     "Don't watch the clock; do what it does. Keep going.",
//     "Your limitation—it's only your imagination.",
//     "Push yourself, because no one else is going to do it for you.",
//     "Sometimes later becomes never. Do it now.",
//     "Dreams don't work unless you take action.",
//     "The harder you work for something, the greater you'll feel when you achieve it.",
//     "Focus on being productive instead of busy.",
//     "A year from now you may wish you had started today.",
//     "The secret of getting ahead is getting started."
//   ];

//   // Load state from memory (no localStorage)
//   const loadState = () => {
//     return {
//       isRunning: false,
//       timeLeft: 25 * 60,
//       sessionType: "focus",
//       isMinimized: false,
//       showSettings: false,
//       isSoundEnabled: true,
//       showBreakScreen: false,
//       breakTimeLeft: 5 * 60,
//       currentPreset: "classic",
//       lastUpdated: Date.now(),
//       currentQuote: motivationalQuotes[0],
//     };
//   };

//   // Initial state
//   const [state, setState] = useState(loadState());
//   const [position, setPosition] = useState({ x: 20, y: 20 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//   const timerRef = useRef(null);
//   const breakTimerRef = useRef(null);
//   const containerRef = useRef(null);

//   // Presets
//   const presets = {
//     classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
//     short: { focus: 1, shortBreak: 3, longBreak: 10, name: "Short" },
//     deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
//   };

//   // Change quote every 10 seconds during break
//   useEffect(() => {
//     if (state.showBreakScreen) {
//       const quoteInterval = setInterval(() => {
//         setState(prev => ({
//           ...prev,
//           currentQuote: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
//         }));
//       }, 8000); // Change every 8 seconds

//       return () => clearInterval(quoteInterval);
//     }
//   }, [state.showBreakScreen]);

//   // Timer logic
//   useEffect(() => {
//     if (state.isRunning && state.timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
//       }, 1000);
//     } else if (state.timeLeft === 0) {
//       clearInterval(timerRef.current);
//       handleTimerComplete();
//     }

//     return () => clearInterval(timerRef.current);
//   }, [state.isRunning, state.timeLeft]);

//   // Break timer logic
//   useEffect(() => {
//     if (state.showBreakScreen && state.breakTimeLeft > 0) {
//       breakTimerRef.current = setInterval(() => {
//         setState((prev) => ({
//           ...prev,
//           breakTimeLeft: prev.breakTimeLeft - 1,
//         }));
//       }, 1000);
//     } else if (state.showBreakScreen && state.breakTimeLeft === 0) {
//       clearInterval(breakTimerRef.current);
//       endBreak();
//     }

//     return () => clearInterval(breakTimerRef.current);
//   }, [state.showBreakScreen, state.breakTimeLeft]);

//   const handleTimerComplete = () => {
//     if (state.isSoundEnabled) playSound();

//     if (state.sessionType === "focus") {
//       // Start break
//       const breakDuration = presets[state.currentPreset].shortBreak * 60;
//       setState((prev) => ({
//         ...prev,
//         breakTimeLeft: breakDuration,
//         showBreakScreen: true,
//         isMinimized: false,
//         isRunning: false,
//         currentQuote: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
//       }));
//     } else {
//       // Start focus session
//       const focusDuration = presets[state.currentPreset].focus * 60;
//       setState((prev) => ({
//         ...prev,
//         sessionType: "focus",
//         timeLeft: focusDuration,
//         isRunning: false,
//       }));
//     }
//   };

//   const endBreak = () => {
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//     }));
//   };

//   const skipBreak = () => {
//     clearInterval(breakTimerRef.current);
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60,
//     }));
//   };

//   const playSound = () => {
//     try {
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();
//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);
//       oscillator.frequency.value = state.sessionType === "focus" ? 800 : 600;
//       oscillator.type = "sine";
//       gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(
//         0.01,
//         audioContext.currentTime + 0.8
//       );
//       oscillator.start();
//       oscillator.stop(audioContext.currentTime + 0.8);
//     } catch (e) {
//       console.log("Audio not supported");
//     }
//   };

//   // Timer controls
//   const startTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: true,
//       isMinimized: true,
//       lastUpdated: Date.now(),
//     }));
//   };

//   const pauseTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       lastUpdated: Date.now(),
//     }));
//   };

//   const resetTimer = () => {
//     const duration =
//       state.sessionType === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : state.sessionType === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60;

//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       timeLeft: duration,
//       lastUpdated: Date.now(),
//     }));
//   };

//   // Helpers
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const getSessionColor = () => {
//     return state.sessionType === "focus"
//       ? "bg-blue-500"
//       : state.sessionType === "shortBreak"
//       ? "bg-green-500"
//       : "bg-purple-500";
//   };

//   const getSessionIcon = () => {
//     return state.sessionType === "focus" ? (
//       <Brain size={16} />
//     ) : (
//       <Coffee size={16} />
//     );
//   };

//   const switchSession = (type) => {
//     const duration =
//       type === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : type === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60;

//     setState((prev) => ({
//       ...prev,
//       sessionType: type,
//       isRunning: false,
//       timeLeft: duration,
//       lastUpdated: Date.now(),
//     }));
//   };

//   const selectPreset = (preset) => {
//     setState((prev) => ({
//       ...prev,
//       currentPreset: preset,
//       isRunning: false,
//       timeLeft: presets[preset].focus * 60,
//       sessionType: "focus",
//       lastUpdated: Date.now(),
//     }));
//   };

//   // Dragging logic - only when running
//   const handleMouseDown = (e) => {
//     if (e.target.closest(".no-drag") || !state.isRunning) return;
//     setIsDragging(true);
//     const rect = containerRef.current.getBoundingClientRect();
//     setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const maxX = window.innerWidth - 280;
//     const maxY = window.innerHeight - 180;
//     setPosition({
//       x: Math.max(0, Math.min(e.clientX - dragOffset.x, maxX)),
//       y: Math.max(0, Math.min(e.clientY - dragOffset.y, maxY)),
//     });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//       return () => {
//         document.removeEventListener("mousemove", handleMouseMove);
//         document.removeEventListener("mouseup", handleMouseUp);
//       };
//     }
//   }, [isDragging, dragOffset]);

//   // Progress calculations
//   const progress =
//     (((state.sessionType === "focus"
//       ? presets[state.currentPreset].focus * 60
//       : state.sessionType === "shortBreak"
//       ? presets[state.currentPreset].shortBreak * 60
//       : presets[state.currentPreset].longBreak * 60) -
//       state.timeLeft) /
//       (state.sessionType === "focus"
//         ? presets[state.currentPreset].focus * 60
//         : state.sessionType === "shortBreak"
//         ? presets[state.currentPreset].shortBreak * 60
//         : presets[state.currentPreset].longBreak * 60)) *
//     100;

//   // Break Screen Overlay
//   if (state.showBreakScreen) {
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center z-50 animate-fadeIn">
//         <div className="text-center text-white p-8 max-w-2xl">
//           <div className="animate-bounce mb-6">
//             <Coffee size={48} className="mx-auto text-green-400" />
//           </div>
          
//           <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
//             Time for a Break!
//           </h2>

//           <div className="mb-8 transition-all duration-500 ease-in-out" key={state.currentQuote}>
//             <div className="flex items-center justify-center mb-4">
//               <Star className="text-yellow-400 mr-2 animate-spin" size={20} style={{ animationDuration: '3s' }} />
//               <p className="text-xl italic max-w-lg leading-relaxed animate-fadeIn">
//                 "{state.currentQuote}"
//               </p>
//               <Star className="text-yellow-400 ml-2 animate-spin" size={20} style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
//             </div>
//           </div>

//           <div className="text-6xl font-mono font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-pulse">
//             {formatTime(state.breakTimeLeft)}
//           </div>

//           <div className="flex justify-center gap-4">
//             <button
//               onClick={skipBreak}
//               className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/50 rounded-xl font-medium border border-gray-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <SkipForward size={18} />
//               Skip Break
//             </button>
//             <button
//               onClick={endBreak}
//               className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               End Break Now
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Minimized view
//   if (state.isMinimized) {
//     return (
//       <div
//         ref={containerRef}
//         className={`fixed z-50 select-none transition-all duration-200 ${state.isRunning ? 'cursor-move hover:scale-105' : 'cursor-default'}`}
//         style={{ left: position.x, top: position.y }}
//         onMouseDown={handleMouseDown}
//       >
//         {!state.isRunning ? (
//           // Stopped state - show start message
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl px-4 py-3 shadow-lg max-w-xs animate-fadeIn">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Timer size={24} className="text-blue-600 animate-spin" style={{ animationDuration: '2s' }} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-semibold text-gray-800 mb-1">
//                   Start Pomodoro Timer
//                 </p>
//                 <p className="text-xs text-gray-600">
//                   {formatTime(state.timeLeft)} • {presets[state.currentPreset].name}
//                 </p>
//               </div>
//               <button
//                 onClick={startTimer}
//                 className="no-drag bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-2 rounded-lg shadow-md transition-all duration-200 hover:scale-110 active:scale-90"
//               >
//                 <Play size={16} />
//               </button>
//               <button
//                 onClick={() => setState((prev) => ({ ...prev, isMinimized: false }))}
//                 className="no-drag hover:bg-blue-100 p-2 rounded-lg text-blue-600 transition-all duration-200 hover:scale-110 active:scale-90"
//               >
//                 <Maximize2 size={16} />
//               </button>
//             </div>
//           </div>
//         ) : (
//           // Running state - compact timer
//           <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-blue-200 animate-pulse-shadow">
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <Timer size={20} className="text-blue-600 animate-bounce" />
//               </div>
//               <span className="font-mono font-bold text-gray-800">
//                 {formatTime(state.timeLeft)}
//               </span>
//               <button
//                 onClick={() => setState((prev) => ({ ...prev, isMinimized: false }))}
//                 className="no-drag ml-auto hover:bg-blue-100 p-1 rounded text-blue-600 transition-all duration-200 hover:scale-110 active:scale-90"
//               >
//                 <Maximize2 size={16} />
//               </button>
//             </div>
//             <div className="mt-2 bg-gray-200 rounded-full h-1">
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-1000 ease-out"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Main view
//   return (
//     <div
//       ref={containerRef}
//       className={`fixed z-50 select-none transition-all duration-200 ${state.isRunning ? 'cursor-move' : 'cursor-default'} animate-fadeIn`}
//       style={{ left: position.x, top: position.y }}
//       onMouseDown={handleMouseDown}
//     >
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-72 overflow-hidden hover:shadow-3xl transition-all duration-300">
//         {/* Header */}
//         <div className={`${getSessionColor()} p-4 text-white relative overflow-hidden`}>
//           <div className="absolute inset-0 opacity-10 animate-gradient-shift" />
          
//           <div className="flex items-center justify-between mb-3 relative z-10">
//             <div className="flex items-center gap-2 animate-slideInLeft">
//               <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-200">
//                 {getSessionIcon()}
//               </div>
//               <div>
//                 <h3 className="font-semibold">
//                   {state.sessionType === "focus"
//                     ? "Focus Session"
//                     : state.sessionType === "shortBreak"
//                     ? "Short Break"
//                     : "Long Break"}
//                 </h3>
//                 <p className="text-xs opacity-80">
//                   {presets[state.currentPreset].name} Mode
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-1 animate-slideInRight">
//               <button
//                 onClick={() => setState((prev) => ({ ...prev, isMinimized: true }))}
//                 className="no-drag hover:bg-white/20 p-1.5 rounded backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-90"
//               >
//                 <Minimize2 size={16} />
//               </button>
//               <button
//                 onClick={() =>
//                   setState((prev) => ({
//                     ...prev,
//                     showSettings: !prev.showSettings,
//                   }))
//                 }
//                 className={`no-drag p-1.5 rounded backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-90 ${
//                   state.showSettings ? "bg-white/20" : "hover:bg-white/20"
//                 }`}
//               >
//                 <Settings size={16} className={state.showSettings ? "animate-spin" : ""} />
//               </button>
//             </div>
//           </div>
//           <div className="bg-white/20 rounded-full h-1.5 backdrop-blur-sm">
//             <div
//               className="bg-white h-1.5 rounded-full shadow-sm transition-all duration-1000 ease-out"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-4">
//           {/* Timer Display */}
//           <div className="text-center mb-4">
//             <div className="text-5xl font-bold mb-4 dark:text-white font-mono bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent animate-pulse">
//               {formatTime(state.timeLeft)}
//             </div>

//             {/* Controls */}
//             <div className="flex justify-center gap-2 mb-4">
//               {!state.isRunning ? (
//                 <button
//                   onClick={startTimer}
//                   className="no-drag flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-slideInUp"
//                 >
//                   <Play size={16} />
//                   Start
//                 </button>
//               ) : (
//                 <button
//                   onClick={pauseTimer}
//                   className="no-drag flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 animate-slideInUp"
//                 >
//                   <Pause size={16} />
//                   Pause
//                 </button>
//               )}
              
//               <button
//                 onClick={resetTimer}
//                 className="no-drag p-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 hover:scale-110 active:scale-90 hover:rotate-180"
//               >
//                 <RotateCw size={16} />
//               </button>
              
//               <button
//                 onClick={() =>
//                   setState((prev) => ({
//                     ...prev,
//                     isSoundEnabled: !prev.isSoundEnabled,
//                   }))
//                 }
//                 className={`no-drag p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-90 ${
//                   state.isSoundEnabled
//                     ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                     : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//                 }`}
//               >
//                 {state.isSoundEnabled ? (
//                   <Volume2 size={16} className="animate-pulse" />
//                 ) : (
//                   <VolumeX size={16} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Settings */}
//           {state.showSettings && (
//             <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 animate-slideInUp">
//               <h4 className="flex items-center gap-2 text-sm font-semibold mb-3 dark:text-white">
//                 <Settings size={16} />
//                 Timer Presets
//               </h4>

//               <div className="grid grid-cols-3 gap-2 mb-3">
//                 {Object.entries(presets).map(([key, preset], index) => (
//                   <button
//                     key={key}
//                     onClick={() => selectPreset(key)}
//                     className={`no-drag p-3 rounded-lg text-xs transition-all duration-200 hover:scale-105 active:scale-95 animate-slideInUp ${
//                       state.currentPreset === key
//                         ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
//                         : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//                     }`}
//                     style={{ animationDelay: `${index * 100}ms` }}
//                   >
//                     <div className="font-semibold">{preset.name}</div>
//                     <div className="text-xs opacity-75 mt-1">
//                       {preset.focus}m / {preset.shortBreak}m
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
        
//         @keyframes slideInLeft {
//           from { transform: translateX(-20px); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
        
//         @keyframes slideInRight {
//           from { transform: translateX(20px); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
        
//         @keyframes slideInUp {
//           from { transform: translateY(20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
        
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         @keyframes pulse-shadow {
//           0%, 100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); }
//           50% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.6); }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
        
//         .animate-slideInLeft {
//           animation: slideInLeft 0.4s ease-out;
//         }
        
//         .animate-slideInRight {
//           animation: slideInRight 0.4s ease-out;
//         }
        
//         .animate-slideInUp {
//           animation: slideInUp 0.4s ease-out;
//         }
        
//         .animate-gradient-shift {
//           background: linear-gradient(-45deg, transparent, rgba(255,255,255,0.1), transparent);
//           background-size: 400% 400%;
//           animation: gradient-shift 3s ease infinite;
//         }
        
//         .animate-pulse-shadow {
//           animation: pulse-shadow 2s ease-in-out infinite;
//         }
        
//         .hover\\:shadow-3xl:hover {
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//         }
//       `}</style>
//     </div>
//     );
// }
// export default StudyTimerModal;





// import React, { useState, useEffect, useRef } from "react";
// import {
//   Play,
//   Pause,
//   RotateCw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Coffee,
//   Brain,
//   Maximize2,
//   Minimize2,
//   SkipForward,
//   Timer,
//   Square,
//   Clock,
// } from "lucide-react";

// const StudyTimerModal = () => {
//   // Presets
//   const presets = {
//     classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
//     short: { focus: 1, shortBreak: 1, longBreak: 2, name: "Short" }, // For testing
//     deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
//     quick: { focus: 15, shortBreak: 3, longBreak: 10, name: "Quick" },
//   };

//   // Initial state
//   const [state, setState] = useState({
//     isRunning: false,
//     timeLeft: 25 * 60,
//     sessionType: "focus", // focus, shortBreak, longBreak
//     isMinimized: false,
//     showSettings: false,
//     isSoundEnabled: true,
//     showBreakScreen: false,
//     breakTimeLeft: 5 * 60,
//     currentPreset: "classic",
//     sessionsCompleted: 0,
//     cycleCount: 0,
//   });

//   const timerRef = useRef(null);
//   const breakTimerRef = useRef(null);

//   // Timer logic
//   useEffect(() => {
//     if (state.isRunning && state.timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setState((prev) => {
//           if (prev.timeLeft <= 1) {
//             return { ...prev, timeLeft: 0, isRunning: false };
//           }
//           return { ...prev, timeLeft: prev.timeLeft - 1 };
//         });
//       }, 1000);
//     } else if (state.timeLeft === 0 && !state.showBreakScreen) {
//       handleTimerComplete();
//     } else {
//       clearInterval(timerRef.current);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [state.isRunning, state.timeLeft]);

//   // Break timer logic
//   useEffect(() => {
//     if (state.showBreakScreen && state.breakTimeLeft > 0) {
//       breakTimerRef.current = setInterval(() => {
//         setState((prev) => {
//           if (prev.breakTimeLeft <= 1) {
//             return { ...prev, breakTimeLeft: 0 };
//           }
//           return { ...prev, breakTimeLeft: prev.breakTimeLeft - 1 };
//         });
//       }, 1000);
//     } else if (state.showBreakScreen && state.breakTimeLeft === 0) {
//       endBreak();
//     } else {
//       clearInterval(breakTimerRef.current);
//     }

//     return () => clearInterval(breakTimerRef.current);
//   }, [state.showBreakScreen, state.breakTimeLeft]);

//   const handleTimerComplete = () => {
//     if (state.isSoundEnabled) playSound();

//     if (state.sessionType === "focus") {
//       // Completed focus session
//       const newSessionsCompleted = state.sessionsCompleted + 1;
//       const shouldTakeLongBreak = newSessionsCompleted % 4 === 0;
//       const breakType = shouldTakeLongBreak ? "longBreak" : "shortBreak";
//       const breakDuration = shouldTakeLongBreak
//         ? presets[state.currentPreset].longBreak * 60
//         : presets[state.currentPreset].shortBreak * 60;

//       setState((prev) => ({
//         ...prev,
//         sessionsCompleted: newSessionsCompleted,
//         sessionType: breakType,
//         breakTimeLeft: breakDuration,
//         showBreakScreen: true,
//         isMinimized: false,
//         isRunning: false,
//         timeLeft: breakDuration,
//       }));
//     } else {
//       // Completed break session
//       const focusDuration = presets[state.currentPreset].focus * 60;
//       setState((prev) => ({
//         ...prev,
//         sessionType: "focus",
//         timeLeft: focusDuration,
//         showBreakScreen: false,
//         isRunning: false,
//       }));
//     }
//   };

//   const endBreak = () => {
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       isRunning: false,
//     }));
//   };

//   const skipBreak = () => {
//     clearInterval(breakTimerRef.current);
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60,
//       isRunning: false,
//     }));
//   };

//   const playSound = () => {
//     try {
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();

//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);

//       oscillator.frequency.value = state.sessionType === "focus" ? 800 : 600;
//       oscillator.type = "sine";

//       gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(
//         0.01,
//         audioContext.currentTime + 0.8
//       );

//       oscillator.start();
//       oscillator.stop(audioContext.currentTime + 0.8);
//     } catch (e) {
//       console.log("Audio not supported");
//     }
//   };

//   // Timer controls
//   const startTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: true,
//       isMinimized: true,
//     }));
//   };

//   const pauseTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//     }));
//   };

//   const stopTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//     }));
//     resetTimer();
//   };

//   const resetTimer = () => {
//     const duration = getDurationForSessionType(state.sessionType);
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       timeLeft: duration,
//     }));
//   };

//   const getDurationForSessionType = (sessionType) => {
//     const preset = presets[state.currentPreset];
//     switch (sessionType) {
//       case "focus":
//         return preset.focus * 60;
//       case "shortBreak":
//         return preset.shortBreak * 60;
//       case "longBreak":
//         return preset.longBreak * 60;
//       default:
//         return preset.focus * 60;
//     }
//   };

//   // Helpers
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const getSessionColor = () => {
//     switch (state.sessionType) {
//       case "focus":
//         return "bg-gradient-to-br from-blue-500 to-blue-600";
//       case "shortBreak":
//         return "bg-gradient-to-br from-green-500 to-green-600";
//       case "longBreak":
//         return "bg-gradient-to-br from-purple-500 to-purple-600";
//       default:
//         return "bg-gradient-to-br from-blue-500 to-blue-600";
//     }
//   };

//   const getSessionIcon = () => {
//     const iconProps = { size: 20 };
//     switch (state.sessionType) {
//       case "focus":
//         return <Brain {...iconProps} />;
//       case "shortBreak":
//         return <Coffee {...iconProps} />;
//       case "longBreak":
//         return <Clock {...iconProps} />;
//       default:
//         return <Timer {...iconProps} />;
//     }
//   };

//   const switchSession = (type) => {
//     const duration = getDurationForSessionType(type);
//     setState((prev) => ({
//       ...prev,
//       sessionType: type,
//       isRunning: false,
//       timeLeft: duration,
//     }));
//   };

//   const selectPreset = (preset) => {
//     setState((prev) => ({
//       ...prev,
//       currentPreset: preset,
//       isRunning: false,
//       timeLeft: presets[preset].focus * 60,
//       sessionType: "focus",
//     }));
//   };

//   // Progress calculations
//   const getTotalDuration = () => getDurationForSessionType(state.sessionType);
//   const progress =
//     ((getTotalDuration() - state.timeLeft) / getTotalDuration()) * 100;
//   const breakProgress = state.showBreakScreen
//     ? ((getDurationForSessionType(state.sessionType) - state.breakTimeLeft) /
//         getDurationForSessionType(state.sessionType)) *
//       100
//     : 0;

//   // Break Screen Overlay
//   if (state.showBreakScreen) {
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 p-4">
//         <div className="text-center text-white max-w-md w-full">
//           {/* Header */}
//           <div className="mb-8">
//             <div
//               className={`inline-flex p-4 rounded-full mb-6 ${
//                 state.sessionType === "longBreak"
//                   ? "bg-purple-500/20 text-purple-400"
//                   : "bg-green-500/20 text-green-400"
//               }`}
//             >
//               {state.sessionType === "longBreak" ? (
//                 <Clock size={48} />
//               ) : (
//                 <Coffee size={48} />
//               )}
//             </div>
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               {state.sessionType === "longBreak"
//                 ? "Long Break Time!"
//                 : "Time for a Break!"}
//             </h2>
//             <p className="text-xl text-gray-300 mb-2">
//               Step away from your work for a few minutes
//             </p>
//             <div className="text-sm text-gray-400">
//               Sessions completed: {state.sessionsCompleted}
//             </div>
//           </div>

//           {/* Timer Display */}
//           <div className="mb-8">
//             <div className="text-6xl sm:text-7xl font-mono font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               {formatTime(state.breakTimeLeft)}
//             </div>

//             {/* Progress Bar */}
//             <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
//               <div
//                 className={`h-2 rounded-full transition-all duration-1000 ${
//                   state.sessionType === "longBreak"
//                     ? "bg-gradient-to-r from-purple-500 to-purple-400"
//                     : "bg-gradient-to-r from-green-500 to-green-400"
//                 }`}
//                 style={{ width: `${breakProgress}%` }}
//               />
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={skipBreak}
//               className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm border border-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <SkipForward size={18} />
//               Skip Break
//             </button>
//             <button
//               onClick={endBreak}
//               className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
//                 state.sessionType === "longBreak"
//                   ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
//                   : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
//               } text-white shadow-lg`}
//             >
//               Start Next Focus
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Minimized view
//   if (state.isMinimized) {
//     return (
//       <div className="fixed bottom-4 right-4 z-50 select-none">
//         {!state.isRunning ? (
//           // Stopped state
//           <button
//             onClick={startTimer}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
//                        text-white rounded-2xl px-4 py-3 shadow-2xl border border-blue-400/50
//                        hover:shadow-blue-500/30 transition-all duration-300 group
//                        backdrop-blur-sm hover:scale-105 active:scale-95"
//             aria-label="Start timer"
//           >
//             <div className="flex items-center gap-2">
//               <Timer
//                 size={24}
//                 className="animate-pulse group-hover:animate-spin"
//               />
//               <span className="font-semibold text-sm">Start Timer</span>
//             </div>
//           </button>
//         ) : (
//           // Running state
//           <div className="relative group">
//             <button
//               onClick={() =>
//                 setState((prev) => ({ ...prev, isMinimized: false }))
//               }
//               className="relative bg-white dark:bg-gray-800 rounded-full p-3
//                          shadow-2xl border-2 border-gray-200 dark:border-gray-700
//                          hover:shadow-xl transition-all duration-300
//                          hover:scale-105 active:scale-95"
//               aria-label="Expand timer"
//             >
//               <div className="w-16 h-16 flex items-center justify-center relative">
//                 {/* Outer glow effect */}
//                 <div
//                   className={`absolute inset-0 rounded-full animate-pulse ${
//                     state.sessionType === "focus"
//                       ? "bg-blue-500/20"
//                       : state.sessionType === "shortBreak"
//                       ? "bg-green-500/20"
//                       : "bg-purple-500/20"
//                   }`}
//                 ></div>

//                 {/* Circular progress */}
//                 <svg
//                   className="absolute w-full h-full transform -rotate-90"
//                   viewBox="0 0 36 36"
//                 >
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className="stroke-gray-200 dark:stroke-gray-600"
//                     strokeWidth="2.5"
//                   />
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className={`transition-all duration-1000 ${
//                       state.sessionType === "focus"
//                         ? "stroke-blue-500"
//                         : state.sessionType === "shortBreak"
//                         ? "stroke-green-500"
//                         : "stroke-purple-500"
//                     }`}
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeDasharray="100"
//                     strokeDashoffset={100 - progress}
//                     style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
//                   />
//                 </svg>

//                 {/* Time display */}
//                 <div className="flex flex-col items-center justify-center z-10">
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {Math.floor(state.timeLeft / 60)
//                       .toString()
//                       .padStart(2, "0")}
//                   </span>
//                   <div className="w-3 h-px bg-gray-400 dark:bg-gray-500 my-0.5"></div>
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {(state.timeLeft % 60).toString().padStart(2, "0")}
//                   </span>
//                 </div>
//               </div>

//               {/* Session indicator */}
//               <div
//                 className={`absolute -top-1 -right-1 text-white text-xs w-6 h-6
//                                flex items-center justify-center rounded-full shadow-lg
//                                font-bold border-2 border-white dark:border-gray-800 ${
//                                  state.sessionType === "focus"
//                                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                    : state.sessionType === "shortBreak"
//                                    ? "bg-gradient-to-r from-green-500 to-green-600"
//                                    : "bg-gradient-to-r from-purple-500 to-purple-600"
//                                }`}
//               >
//                 {state.sessionType === "focus"
//                   ? "F"
//                   : state.sessionType === "shortBreak"
//                   ? "S"
//                   : "L"}
//               </div>
//             </button>

//             {/* Hover tooltip */}
//             <div
//               className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100
//                             transition-opacity duration-300 pointer-events-none z-10"
//             >
//               <div
//                 className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg
//                               px-3 py-2 whitespace-nowrap shadow-xl"
//               >
//                 <div className="font-semibold">
//                   {state.sessionType === "focus"
//                     ? "Focus Session"
//                     : state.sessionType === "shortBreak"
//                     ? "Short Break"
//                     : "Long Break"}
//                 </div>
//                 <div className="text-gray-300 dark:text-gray-400">
//                   Click to expand
//                 </div>
//                 <div
//                   className="absolute top-full right-4 border-4 border-transparent
//                                 border-t-gray-900 dark:border-t-gray-700"
//                 ></div>
//               </div>
//             </div>

//             {/* Quick controls */}
//             <div
//               className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100
//                             transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
//             >
//               <div className="flex flex-col gap-1">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     pauseTimer();
//                   }}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2
//                              shadow-lg transition-all duration-200 hover:scale-105"
//                   aria-label="Pause timer"
//                 >
//                   <Pause size={16} />
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     stopTimer();
//                   }}
//                   className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2
//                              shadow-lg transition-all duration-200 hover:scale-105"
//                   aria-label="Stop timer"
//                 >
//                   <Square size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Main view
//    return (
//      <div className="fixed bottom-4 right-4 z-50 select-none font-inter">
//        <div
//          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl
//                    border border-gray-200/70 dark:border-gray-700/80
//                    w-72 sm:w-80 max-w-[calc(100vw-2rem)] overflow-hidden
//                    backdrop-blur-md bg-opacity-95 dark:bg-opacity-95
//                    transform scale-95 sm:scale-100 transition-transform duration-300 ease-out"
//        >
//          {/* Header Section */}
//          <div className={`${getSessionColor()} p-4 text-white relative`}>
//            {/* Progress bar at the very top */}
//            <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
//              <div
//                className="h-full bg-white transition-all duration-1000 ease-out"
//                style={{ width: `${progress}%` }}
//              />
//            </div>

//            <div className="flex items-center justify-between">
//              <div className="flex items-center gap-2">
//                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
//                  {getSessionIcon()}
//                </div>
//                <div>
//                  <h3 className="font-semibold text-base drop-shadow-sm">
//                    {state.sessionType === "focus"
//                      ? "Focus Session"
//                      : state.sessionType === "shortBreak"
//                      ? "Short Break"
//                      : "Long Break"}
//                  </h3>
//                  <div className="flex items-center gap-1.5 text-xs opacity-90">
//                    <span>{presets[state.currentPreset].name} preset</span>
//                    <span>•</span>
//                    <span>{state.sessionsCompleted} sessions</span>
//                  </div>
//                </div>
//              </div>

//              <div className="flex gap-0.5">
//                <button
//                  onClick={() =>
//                    setState((prev) => ({ ...prev, isMinimized: true }))
//                  }
//                  className="hover:bg-white/20 p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//                  aria-label="Minimize"
//                >
//                  <Minimize2 size={16} />
//                </button>

//                <button
//                  onClick={() =>
//                    setState((prev) => ({
//                      ...prev,
//                      showSettings: !prev.showSettings,
//                    }))
//                  }
//                  className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
//                    state.showSettings ? "bg-white/20" : "hover:bg-white/20"
//                  }`}
//                  aria-label="Toggle settings"
//                >
//                  <Settings size={16} />
//                </button>
//              </div>
//            </div>
//          </div>

//          {/* Main Content Area */}
//          <div className="p-4">
//            {/* Session switcher tabs */}
//            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 mb-5 shadow-inner">
//              {["focus", "shortBreak", "longBreak"].map((type) => (
//                <button
//                  key={type}
//                  onClick={() => switchSession(type)}
//                  className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all
//                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                             ${
//                               state.sessionType === type
//                                 ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
//                                 : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
//                             }`}
//                >
//                  {type === "focus"
//                    ? "Focus"
//                    : type === "shortBreak"
//                    ? "Short Break"
//                    : "Long Break"}
//                </button>
//              ))}
//            </div>

//            {/* Timer Display */}
//            <div className="text-center mb-5">
//              <div className="text-5xl sm:text-6xl font-bold mb-3 dark:text-white font-mono tracking-tighter drop-shadow-md">
//                {formatTime(state.timeLeft)}
//              </div>

//              {/* Main Controls (Play/Pause, Reset, Sound) */}
//              <div className="flex justify-center gap-2 mb-5">
//                {!state.isRunning ? (
//                  <button
//                    onClick={startTimer}
//                    className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500
//                                  hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium text-sm
//                                  transition-all active:scale-95 shadow-lg shadow-green-500/20
//                                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                  >
//                    <Play size={16} className="fill-current" />
//                    <span>Start</span>
//                  </button>
//                ) : (
//                  <button
//                    onClick={pauseTimer}
//                    className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500
//                                  hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-medium text-sm
//                                  transition-all active:scale-95 shadow-lg shadow-amber-500/20
//                                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
//                  >
//                    <Pause size={16} className="fill-current" />
//                    <span>Pause</span>
//                  </button>
//                )}

//                <button
//                  onClick={resetTimer}
//                  className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
//                                  rounded-lg transition-all active:scale-95 text-gray-700 dark:text-gray-300
//                                  shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                  aria-label="Reset"
//                >
//                  <RotateCw size={16} />
//                </button>

//                <button
//                  onClick={() =>
//                    setState((prev) => ({
//                      ...prev,
//                      isSoundEnabled: !prev.isSoundEnabled,
//                    }))
//                  }
//                  className={`p-2.5 rounded-lg transition-all active:scale-95 shadow-sm hover:shadow-md
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                                    state.isSoundEnabled
//                                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
//                                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//                                  }`}
//                  aria-label={
//                    state.isSoundEnabled ? "Mute sound" : "Unmute sound"
//                  }
//                >
//                  {state.isSoundEnabled ? (
//                    <Volume2 size={16} />
//                  ) : (
//                    <VolumeX size={16} />
//                  )}
//                </button>
//              </div>
//            </div>

//            {/* Settings Section */}
//            {state.showSettings && (
//              <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4 animate-fade-in">
//                <h4 className="flex items-center gap-2 text-xs font-semibold mb-3 dark:text-white">
//                  <Settings size={14} className="opacity-70" />
//                  <span>Timer Presets</span>
//                </h4>

//                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                  {Object.entries(presets).map(([key, preset]) => (
//                    <button
//                      key={key}
//                      onClick={() => selectPreset(key)}
//                      className={`p-2.5 rounded-lg transition-all text-center flex flex-col items-center justify-center
//                                  shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                                  ${
//                                    state.currentPreset === key
//                                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
//                                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
//                                  }`}
//                    >
//                      <div className="font-medium text-sm mb-0.5">
//                        {preset.name}
//                      </div>
//                      <div className="text-xs opacity-80">{preset.focus}min</div>
//                    </button>
//                  ))}
//                </div>
//              </div>
//            )}
//          </div>
//        </div>
//      </div>
//    );
// };

// export default StudyTimerModal;


// import React, { useState, useEffect, useRef } from "react";
// import {
//   Play,
//   Pause,
//   RotateCw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Coffee,
//   Brain,
//   Minimize2,
//   SkipForward,
//   Timer,
//   Square,
//   Clock,
// } from "lucide-react";

// // Define a key for localStorage to store the timer state
// const LOCAL_STORAGE_KEY = "studyTimerState";

// const StudyTimerModal = () => {
//   // Presets for different study session durations
//   const presets = {
//     classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
//     short: { focus: 1, shortBreak: 1, longBreak: 2, name: "Short" }, // For testing purposes
//     deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
//     quick: { focus: 15, shortBreak: 3, longBreak: 10, name: "Quick" },
//   };

//   // Function to retrieve the initial state from localStorage or return a default state
//   const getInitialState = () => {
//     try {
//       const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
//       if (savedState) {
//         const parsedState = JSON.parse(savedState);
//         // Ensure the current preset from saved state is valid, otherwise default to 'classic'
//         const currentPreset = presets[parsedState.currentPreset]
//           ? parsedState.currentPreset
//           : "classic";
//         const presetData = presets[currentPreset];

//         let adjustedTimeLeft = parsedState.timeLeft;
//         let adjustedBreakTimeLeft = parsedState.breakTimeLeft;

//         // If the timer was running when the app was closed, calculate elapsed time
//         if (parsedState.isRunning) {
//           const lastUpdateTime = parsedState.lastUpdateTime || Date.now();
//           const elapsedTime = Math.floor((Date.now() - lastUpdateTime) / 1000);

//           if (parsedState.showBreakScreen) {
//             // Adjust break time left
//             adjustedBreakTimeLeft = Math.max(
//               0,
//               parsedState.breakTimeLeft - elapsedTime
//             );
//             if (adjustedBreakTimeLeft === 0) {
//               // If break ended while app was closed, transition to focus session
//               return {
//                 ...parsedState,
//                 isRunning: false, // Start paused, user can resume
//                 showBreakScreen: false,
//                 sessionType: "focus",
//                 timeLeft: presetData.focus * 60,
//                 breakTimeLeft: presetData.shortBreak * 60, // Reset short break time
//                 currentPreset: currentPreset,
//                 lastUpdateTime: Date.now(),
//               };
//             }
//           } else {
//             // Focus session
//             // Adjust focus time left
//             adjustedTimeLeft = Math.max(0, parsedState.timeLeft - elapsedTime);
//             if (adjustedTimeLeft === 0) {
//               // If focus session ended while app was closed, transition to break
//               const newSessionsCompleted = parsedState.sessionsCompleted + 1;
//               const shouldTakeLongBreak = newSessionsCompleted % 4 === 0;
//               const breakType = shouldTakeLongBreak
//                 ? "longBreak"
//                 : "shortBreak";
//               const breakDuration = shouldTakeLongBreak
//                 ? presetData.longBreak * 60
//                 : presetData.shortBreak * 60;
//               return {
//                 ...parsedState,
//                 isRunning: false, // Start paused on break screen
//                 sessionType: breakType,
//                 sessionsCompleted: newSessionsCompleted,
//                 showBreakScreen: true,
//                 breakTimeLeft: breakDuration,
//                 timeLeft: breakDuration, // Set timeLeft to break duration for consistent display
//                 currentPreset: currentPreset,
//                 lastUpdateTime: Date.now(),
//               };
//             }
//           }
//         }

//         // Return the parsed state with adjusted times and updated lastUpdateTime
//         return {
//           ...parsedState,
//           timeLeft: adjustedTimeLeft,
//           breakTimeLeft: adjustedBreakTimeLeft,
//           currentPreset: currentPreset,
//           lastUpdateTime: Date.now(), // Update timestamp on load
//         };
//       }
//     } catch (error) {
//       console.error("Failed to load state from localStorage:", error);
//       // If there's an error loading, fall back to default state
//     }
//     // Default initial state if no saved state or an error occurred
//     return {
//       isRunning: false,
//       timeLeft: 25 * 60,
//       sessionType: "focus", // focus, shortBreak, longBreak
//       isMinimized: false,
//       showSettings: false,
//       isSoundEnabled: true,
//       showBreakScreen: false,
//       breakTimeLeft: 5 * 60,
//       currentPreset: "classic",
//       sessionsCompleted: 0,
//       lastUpdateTime: Date.now(), // Track last time state was updated for persistence calculations
//     };
//   };

//   // Initialize state using the getInitialState function
//   const [state, setState] = useState(getInitialState);

//   // Refs to hold interval IDs to clear them when needed
//   const timerRef = useRef(null);
//   const breakTimerRef = useRef(null);

//   // Effect to save the current state to localStorage whenever the state changes
//   useEffect(() => {
//     try {
//       localStorage.setItem(
//         LOCAL_STORAGE_KEY,
//         JSON.stringify({
//           ...state,
//           lastUpdateTime: Date.now(), // Update the timestamp before saving
//         })
//       );
//     } catch (error) {
//       console.error("Failed to save state to localStorage:", error);
//     }
//   }, [state]); // This effect runs whenever any part of the 'state' object changes

//   // Main timer logic: decrement timeLeft when running and not on break screen
//  useEffect(() => {
//   if (state.isRunning && state.timeLeft > 0 && !state.showBreakScreen) {
//     timerRef.current = setInterval(() => {
//       setState((prev) => {
//         if (prev.timeLeft <= 1) {
//           clearInterval(timerRef.current);
//           return { ...prev, timeLeft: 0, isRunning: false };
//         }
//         return { ...prev, timeLeft: prev.timeLeft - 1 };
//       });
//     }, 1000);
//   } else if (state.timeLeft === 0 && !state.showBreakScreen && state.isRunning) {
//     // This will trigger when timer reaches 0
//     handleTimerComplete();
//   } else {
//     clearInterval(timerRef.current);
//   }

//   return () => clearInterval(timerRef.current);
// }, [state.isRunning, state.timeLeft, state.showBreakScreen]);// Dependencies for this effect

//   // Break timer logic: decrement breakTimeLeft when on break screen and running
//   useEffect(() => {
//     if (state.showBreakScreen && state.breakTimeLeft > 0 && state.isRunning) {
//       breakTimerRef.current = setInterval(() => {
//         setState((prev) => {
//           if (prev.breakTimeLeft <= 1) {
//             clearInterval(breakTimerRef.current); // Clear interval when break timer reaches 0
//             return { ...prev, breakTimeLeft: 0 };
//           }
//           return { ...prev, breakTimeLeft: prev.breakTimeLeft - 1 };
//         });
//       }, 1000);
//     } else if (
//       state.showBreakScreen &&
//       state.breakTimeLeft === 0 &&
//       state.isRunning
//     ) {
//       // If break timer reached 0 and was running, end the break
//       endBreak();
//     } else {
//       clearInterval(breakTimerRef.current); // Clear interval if not on break screen or conditions not met
//     }

//     // Cleanup function for the break timer
//     return () => clearInterval(breakTimerRef.current);
//   }, [state.showBreakScreen, state.breakTimeLeft, state.isRunning]); // Dependencies for this effect

//   // Handles the completion of a focus or break session
//   // const handleTimerComplete = () => {
//   //   if (state.isSoundEnabled) playSound(); // Play sound if enabled

//   //   if (state.sessionType === "focus") {
//   //     // Logic for completing a focus session
//   //     const newSessionsCompleted = state.sessionsCompleted + 1;
//   //     // Determine if it's time for a long break (every 4 focus sessions)
//   //     const shouldTakeLongBreak = newSessionsCompleted % 4 === 0;
//   //     const breakType = shouldTakeLongBreak ? "longBreak" : "shortBreak";
//   //     const breakDuration = shouldTakeLongBreak
//   //       ? presets[state.currentPreset].longBreak * 60
//   //       : presets[state.currentPreset].shortBreak * 60;

//   //     setState((prev) => ({
//   //       ...prev,
//   //       sessionsCompleted: newSessionsCompleted,
//   //       sessionType: breakType,
//   //       breakTimeLeft: breakDuration,
//   //       showBreakScreen: true, // Show the break overlay
//   //       isMinimized: false, // Expand the modal for the break screen
//   //       isRunning: false, // Pause timer, user can start break
//   //       timeLeft: breakDuration, // Update main timer display to break duration
//   //     }));
//   //   } else {
//   //     // Logic for completing a break session
//   //     const focusDuration = presets[state.currentPreset].focus * 60;
//   //     setState((prev) => ({
//   //       ...prev,
//   //       sessionType: "focus",
//   //       timeLeft: focusDuration,
//   //       showBreakScreen: false, // Hide break overlay
//   //       isRunning: false, // Pause timer, user can start focus
//   //     }));
//   //   }
//   // };
// const handleTimerComplete = () => {
//   if (state.isSoundEnabled) playSound(); // Play sound if enabled

//   if (state.sessionType === "focus") {
//     // Logic for completing a focus session
//     const newSessionsCompleted = state.sessionsCompleted + 1;
//     // Determine if it's time for a long break (every 4 focus sessions)
//     const shouldTakeLongBreak = newSessionsCompleted % 4 === 0;
//     const breakType = shouldTakeLongBreak ? "longBreak" : "shortBreak";
//     const breakDuration = shouldTakeLongBreak
//       ? presets[state.currentPreset].longBreak * 60
//       : presets[state.currentPreset].shortBreak * 60;

//     setState((prev) => ({
//       ...prev,
//       sessionsCompleted: newSessionsCompleted,
//       sessionType: breakType,
//       breakTimeLeft: breakDuration,
//       showBreakScreen: true, // Show the break overlay
//       isMinimized: false, // Expand the modal for the break screen
//       isRunning: false, // Pause timer, user can start break
//       timeLeft: breakDuration, // Update main timer display to break duration
//     }));
//   } else {
//     // Logic for completing a break session
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       showBreakScreen: false, // Hide break overlay
//       isRunning: false, // Pause timer, user can start focus
//     }));
//   }
// };
//   // Ends the current break and transitions back to a focus session
//   const endBreak = () => {
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       isRunning: false, // Stop running after break
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60, // Reset break time for next short break
//     }));
//   };

//   // Skips the current break and immediately transitions to a focus session
//   const skipBreak = () => {
//     clearInterval(breakTimerRef.current); // Ensure break timer is cleared
//     const focusDuration = presets[state.currentPreset].focus * 60;
//     setState((prev) => ({
//       ...prev,
//       showBreakScreen: false,
//       sessionType: "focus",
//       timeLeft: focusDuration,
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60, // Reset break time
//       isRunning: false, // Stop running after skipping break
//     }));
//   };

//   // Plays a simple sine wave sound to indicate timer completion
//   const playSound = () => {
//     try {
//       const audioContext = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();

//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);

//       // Different frequencies for focus and break completion sounds
//       oscillator.frequency.value = state.sessionType === "focus" ? 800 : 600;
//       oscillator.type = "sine";

//       gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(
//         0.01,
//         audioContext.currentTime + 0.8
//       );

//       oscillator.start();
//       oscillator.stop(audioContext.currentTime + 0.8);
//     } catch (e) {
//       console.log("Audio not supported or failed to play:", e);
//     }
//   };

//   // Starts the timer
//   const startTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: true,
//       isMinimized: true, // Minimize modal when timer starts
//     }));
//   };

//   // Pauses the timer
//   const pauseTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//     }));
//   };

//   // Stops the timer and resets it to the initial duration for the current session type
//   const stopTimer = () => {
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//     }));
//     resetTimer(); // Call reset to restore initial time
//   };

//   // Resets the timer to its initial duration for the current session type
//   const resetTimer = () => {
//     const duration = getDurationForSessionType(state.sessionType);
//     setState((prev) => ({
//       ...prev,
//       isRunning: false,
//       timeLeft: duration,
//       breakTimeLeft: presets[state.currentPreset].shortBreak * 60, // Ensure break time is also reset
//     }));
//   };

//   // Helper function to get the duration for a given session type based on the current preset
//   const getDurationForSessionType = (sessionType) => {
//     const preset = presets[state.currentPreset];
//     switch (sessionType) {
//       case "focus":
//         return preset.focus * 60;
//       case "shortBreak":
//         return preset.shortBreak * 60;
//       case "longBreak":
//         return preset.longBreak * 60;
//       default:
//         return preset.focus * 60; // Default to focus duration
//     }
//   };

//   // Helper function to format seconds into MM:SS string
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   // Helper function to get the appropriate background color for the current session type
//   const getSessionColor = () => {
//     switch (state.sessionType) {
//       case "focus":
//         return "bg-gradient-to-br from-blue-500 to-blue-600";
//       case "shortBreak":
//         return "bg-gradient-to-br from-green-500 to-green-600";
//       case "longBreak":
//         return "bg-gradient-to-br from-purple-500 to-purple-600";
//       default:
//         return "bg-gradient-to-br from-blue-500 to-blue-600";
//     }
//   };

//   // Helper function to get the appropriate icon for the current session type
//   const getSessionIcon = () => {
//     const iconProps = { size: 20 };
//     switch (state.sessionType) {
//       case "focus":
//         return <Brain {...iconProps} />;
//       case "shortBreak":
//         return <Coffee {...iconProps} />;
//       case "longBreak":
//         return <Clock {...iconProps} />;
//       default:
//         return <Timer {...iconProps} />;
//     }
//   };

//   // Switches the current session type (e.g., from focus to short break)
//   const switchSession = (type) => {
//     const duration = getDurationForSessionType(type);
//     setState((prev) => ({
//       ...prev,
//       sessionType: type,
//       isRunning: false, // Pause timer when switching sessions
//       timeLeft: duration,
//       breakTimeLeft: presets[prev.currentPreset].shortBreak * 60, // Reset break time
//     }));
//   };

//   // Selects a new preset and updates the timer accordingly
//   const selectPreset = (preset) => {
//     setState((prev) => ({
//       ...prev,
//       currentPreset: preset,
//       isRunning: false, // Pause timer when changing presets
//       timeLeft: presets[preset].focus * 60, // Reset to focus time of the new preset
//       sessionType: "focus", // Always switch to focus when changing presets
//       breakTimeLeft: presets[preset].shortBreak * 60, // Reset break time
//     }));
//   };

//   // Calculate progress for the main timer
//   const getTotalDuration = () => {
//     // If on break screen, total duration is for the break session, otherwise for the current focus session
//     if (state.showBreakScreen) {
//       return getDurationForSessionType(state.sessionType);
//     }
//     return getDurationForSessionType(state.sessionType);
//   };

//   const progress =
//     ((getTotalDuration() - state.timeLeft) / getTotalDuration()) * 100;

//   // Calculate progress for the break timer (only relevant when showBreakScreen is true)
//   const breakProgress = state.showBreakScreen
//     ? ((getDurationForSessionType(state.sessionType) - state.breakTimeLeft) /
//         getDurationForSessionType(state.sessionType)) *
//       100
//     : 0;

//   // Render the break screen overlay when showBreakScreen is true
//   if (state.showBreakScreen) {
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 p-4">
//         <div className="text-center text-white max-w-md w-full">
//           {/* Header for the break screen */}
//           <div className="mb-8">
//             <div
//               className={`inline-flex p-4 rounded-full mb-6 ${
//                 state.sessionType === "longBreak"
//                   ? "bg-purple-500/20 text-purple-400"
//                   : "bg-green-500/20 text-green-400"
//               }`}
//             >
//               {state.sessionType === "longBreak" ? (
//                 <Clock size={48} />
//               ) : (
//                 <Coffee size={48} />
//               )}
//             </div>
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               {state.sessionType === "longBreak"
//                 ? "Long Break Time!"
//                 : "Time for a Break!"}
//             </h2>
//             <p className="text-xl text-gray-300 mb-2">
//               Step away from your work for a few minutes
//             </p>
//             <div className="text-sm text-gray-400">
//               Sessions completed: {state.sessionsCompleted}
//             </div>
//           </div>

//           {/* Break Timer Display */}
//           <div className="mb-8">
//             <div className="text-6xl sm:text-7xl font-mono font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//               {formatTime(state.breakTimeLeft)}
//             </div>

//             {/* Progress Bar for break */}
//             <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
//               <div
//                 className={`h-2 rounded-full transition-all duration-1000 ${
//                   state.sessionType === "longBreak"
//                     ? "bg-gradient-to-r from-purple-500 to-purple-400"
//                     : "bg-gradient-to-r from-green-500 to-green-400"
//                 }`}
//                 style={{ width: `${breakProgress}%` }}
//               />
//             </div>
//           </div>

//           {/* Controls for break screen */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={skipBreak}
//               className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm border border-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
//             >
//               <SkipForward size={18} />
//               Skip Break
//             </button>
//             <button
//               onClick={endBreak}
//               className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
//                 state.sessionType === "longBreak"
//                   ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
//                   : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
//               } text-white shadow-lg`}
//             >
//               Start Next Focus
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Render the minimized view when isMinimized is true
//   if (state.isMinimized) {
//     return (
//       <div className="fixed bottom-4 right-4 z-50 select-none">
//         {!state.isRunning ? (
//           // Button to start timer when in stopped/minimized state
//           <button
//             onClick={() => {
//               setState((prev) => ({ ...prev, isMinimized: false }));
//             }
//             }
//             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
//                          text-white rounded-2xl px-4 py-3 shadow-2xl border border-blue-400/50
//                          hover:shadow-blue-500/30 transition-all duration-300 group
//                          backdrop-blur-sm hover:scale-105 active:scale-95"
//             aria-label="Start timer"
//           >
//             <div className="flex items-center gap-2">
//               <Timer
//                 size={24}
//                 className="animate-pulse group-hover:animate-spin"
//               />
//               <span className="font-semibold text-sm">Start Timer</span>
//             </div>
//           </button>
//         ) : (
//           // Minimized timer display when running
//           <div className="relative group">
//             <button
//               onClick={() =>
//                 setState((prev) => ({ ...prev, isMinimized: false }))
//               }
//               className="relative bg-white dark:bg-gray-800 rounded-full p-3
//                            shadow-2xl border-2 border-gray-200 dark:border-gray-700
//                            hover:shadow-xl transition-all duration-300
//                            hover:scale-105 active:scale-95"
//               aria-label="Expand timer"
//             >
//               <div className="w-16 h-16 flex items-center justify-center relative">
//                 {/* Outer glow effect based on session type */}
//                 <div
//                   className={`absolute inset-0 rounded-full animate-pulse ${
//                     state.sessionType === "focus"
//                       ? "bg-blue-500/20"
//                       : state.sessionType === "shortBreak"
//                       ? "bg-green-500/20"
//                       : "bg-purple-500/20"
//                   }`}
//                 ></div>

//                 {/* Circular progress SVG */}
//                 <svg
//                   className="absolute w-full h-full transform -rotate-90"
//                   viewBox="0 0 36 36"
//                 >
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className="stroke-gray-200 dark:stroke-gray-600"
//                     strokeWidth="2.5"
//                   />
//                   <circle
//                     cx="18"
//                     cy="18"
//                     r="15.9155"
//                     fill="none"
//                     className={`transition-all duration-1000 ${
//                       state.sessionType === "focus"
//                         ? "stroke-blue-500"
//                         : state.sessionType === "shortBreak"
//                         ? "stroke-green-500"
//                         : "stroke-purple-500"
//                     }`}
//                     strokeWidth="2.5"
//                     strokeLinecap="round"
//                     strokeDasharray="100"
//                     strokeDashoffset={100 - progress}
//                     style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
//                   />
//                 </svg>

//                 {/* Time display in minimized view */}
//                 <div className="flex flex-col items-center justify-center z-10">
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {Math.floor(state.timeLeft / 60)
//                       .toString()
//                       .padStart(2, "0")}
//                   </span>
//                   <div className="w-3 h-px bg-gray-400 dark:bg-gray-500 my-0.5"></div>
//                   <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
//                     {(state.timeLeft % 60).toString().padStart(2, "0")}
//                   </span>
//                 </div>
//               </div>

//               {/* Session type indicator (F, S, L) */}
//               <div
//                 className={`absolute -top-1 -right-1 text-white text-xs w-6 h-6
//                                flex items-center justify-center rounded-full shadow-lg
//                                font-bold border-2 border-white dark:border-gray-800 ${
//                                  state.sessionType === "focus"
//                                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
//                                    : state.sessionType === "shortBreak"
//                                    ? "bg-gradient-to-r from-green-500 to-green-600"
//                                    : "bg-gradient-to-r from-purple-500 to-purple-600"
//                                }`}
//               >
//                 {state.sessionType === "focus"
//                   ? "F"
//                   : state.sessionType === "shortBreak"
//                   ? "S"
//                   : "L"}
//               </div>
//             </button>

//             {/* Hover tooltip for minimized timer */}
//             <div
//               className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100
//                                  transition-opacity duration-300 pointer-events-none z-10"
//             >
//               <div
//                 className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg
//                                    px-3 py-2 whitespace-nowrap shadow-xl"
//               >
//                 <div className="font-semibold">
//                   {state.sessionType === "focus"
//                     ? "Focus Session"
//                     : state.sessionType === "shortBreak"
//                     ? "Short Break"
//                     : "Long Break"}
//                 </div>
//                 <div className="text-gray-300 dark:text-gray-400">
//                   Click to expand
//                 </div>
//                 <div
//                   className="absolute top-full right-4 border-4 border-transparent
//                                      border-t-gray-900 dark:border-t-gray-700"
//                 ></div>
//               </div>
//             </div>

//             {/* Quick controls (Pause, Stop) on hover for minimized timer */}
//             <div
//               className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100
//                                  transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
//             >
//               <div className="flex flex-col gap-1">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent button click from expanding the modal
//                     pauseTimer();
//                   }}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2
//                                      shadow-lg transition-all duration-200 hover:scale-105"
//                   aria-label="Pause timer"
//                 >
//                   <Pause size={16} />
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent button click from expanding the modal
//                     stopTimer();
//                   }}
//                   className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2
//                                      shadow-lg transition-all duration-200 hover:scale-105"
//                   aria-label="Stop timer"
//                 >
//                   <Square size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Render the main full-sized timer modal
//   return (
//     <div className="fixed bottom-4 right-4 z-50 select-none font-inter">
//       <div
//         className="bg-white dark:bg-gray-800 rounded-xl shadow-xl
//                        border border-gray-200/70 dark:border-gray-700/80
//                        w-72 sm:w-80 max-w-[calc(100vw-2rem)] overflow-hidden
//                        backdrop-blur-md bg-opacity-95 dark:bg-opacity-95
//                        transform scale-95 sm:scale-100 transition-transform duration-300 ease-out"
//       >
//         {/* Header Section with session type, preset, and controls */}
//         <div className={`${getSessionColor()} p-4 text-white relative`}>
//           {/* Progress bar at the very top of the header */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
//             <div
//               className="h-full bg-white transition-all duration-1000 ease-out"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
//                 {getSessionIcon()} {/* Icon for the current session type */}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-base drop-shadow-sm">
//                   {state.sessionType === "focus"
//                     ? "Focus Session"
//                     : state.sessionType === "shortBreak"
//                     ? "Short Break"
//                     : "Long Break"}
//                 </h3>
//                 <div className="flex items-center gap-1.5 text-xs opacity-90">
//                   <span>{presets[state.currentPreset].name} preset</span>
//                   <span>•</span>
//                   <span>{state.sessionsCompleted} sessions</span>
//                 </div>
//               </div>
//             </div>

//             {/* Minimize and Settings buttons */}
//             <div className="flex gap-0.5">
//               <button
//                 onClick={() =>
//                   setState((prev) => ({ ...prev, isMinimized: true }))
//                 }
//                 className="hover:bg-white/20 p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//                 aria-label="Minimize"
//               >
//                 <Minimize2 size={16} />
//               </button>

//               <button
//                 onClick={() =>
//                   setState((prev) => ({
//                     ...prev,
//                     showSettings: !prev.showSettings,
//                   }))
//                 }
//                 className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
//                   state.showSettings ? "bg-white/20" : "hover:bg-white/20"
//                 }`}
//                 aria-label="Toggle settings"
//               >
//                 <Settings size={16} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="p-4">
//           {/* Session switcher tabs */}
//           <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 mb-5 shadow-inner">
//             {["focus", "shortBreak", "longBreak"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => switchSession(type)}
//                 className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                                  ${
//                                    state.sessionType === type
//                                      ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
//                                      : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
//                                  }`}
//               >
//                 {type === "focus"
//                   ? "Focus"
//                   : type === "shortBreak"
//                   ? "Short Break"
//                   : "Long Break"}
//               </button>
//             ))}
//           </div>

//           {/* Timer Display */}
//           <div className="text-center mb-5">
//             <div className="text-5xl sm:text-6xl font-bold mb-3 dark:text-white font-mono tracking-tighter drop-shadow-md">
//               {formatTime(state.timeLeft)}
//             </div>

//             {/* Main Controls (Play/Pause, Reset, Sound) */}
//             <div className="flex justify-center gap-2 mb-5">
//               {!state.isRunning ? (
//                 <button
//                   onClick={startTimer}
//                   className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500
//                                      hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium text-sm
//                                      transition-all active:scale-95 shadow-lg shadow-green-500/20
//                                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//                 >
//                   <Play size={16} className="fill-current" />
//                   <span>Start</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={pauseTimer}
//                   className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500
//                                      hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-medium text-sm
//                                      transition-all active:scale-95 shadow-lg shadow-amber-500/20
//                                      focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
//                 >
//                   <Pause size={16} className="fill-current" />
//                   <span>Pause</span>
//                 </button>
//               )}

//               <button
//                 onClick={resetTimer}
//                 className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
//                                      rounded-lg transition-all active:scale-95 text-gray-700 dark:text-gray-300
//                                      shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                 aria-label="Reset"
//               >
//                 <RotateCw size={16} />
//               </button>

//               <button
//                 onClick={() =>
//                   setState((prev) => ({
//                     ...prev,
//                     isSoundEnabled: !prev.isSoundEnabled,
//                   }))
//                 }
//                 className={`p-2.5 rounded-lg transition-all active:scale-95 shadow-sm hover:shadow-md
//                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
//                                        state.isSoundEnabled
//                                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
//                                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
//                                      }`}
//                 aria-label={
//                   state.isSoundEnabled ? "Mute sound" : "Unmute sound"
//                 }
//               >
//                 {state.isSoundEnabled ? (
//                   <Volume2 size={16} />
//                 ) : (
//                   <VolumeX size={16} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Settings Section (visible when showSettings is true) */}
//           {state.showSettings && (
//             <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4 animate-fade-in">
//               <h4 className="flex items-center gap-2 text-xs font-semibold mb-3 dark:text-white">
//                 <Settings size={14} className="opacity-70" />
//                 <span>Timer Presets</span>
//               </h4>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                 {Object.entries(presets).map(([key, preset]) => (
//                   <button
//                     key={key}
//                     onClick={() => selectPreset(key)}
//                     className={`p-2.5 rounded-lg transition-all text-center flex flex-col items-center justify-center
//                                          shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
//                                          ${
//                                            state.currentPreset === key
//                                              ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
//                                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
//                                          }`}
//                   >
//                     <div className="font-medium text-sm mb-0.5">
//                       {preset.name}
//                     </div>
//                     <div className="text-xs opacity-80">{preset.focus}min</div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudyTimerModal;



import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
  Coffee,
  Brain,
  Minimize2,
  SkipForward,
  Timer,
  Square,
  Clock,
} from "lucide-react";

const LOCAL_STORAGE_KEY = "studyTimerState";

const StudyTimerModal = () => {
  const presets = {
    classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
    short: { focus: 1, shortBreak: 1, longBreak: 2, name: "Short" },
    deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
    quick: { focus: 15, shortBreak: 3, longBreak: 10, name: "Quick" },
  };

  const getInitialState = () => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error("Failed to load state:", error);
    }
    return {
      isRunning: false,
      timeLeft: presets.classic.focus * 60,
      sessionType: "focus",
      isMinimized: false,
      showSettings: false,
      isSoundEnabled: true,
      showBreakScreen: false,
      breakTimeLeft: presets.classic.shortBreak * 60,
      currentPreset: "classic",
      sessionsCompleted: 0,
      lastUpdateTime: Date.now(),
    };
  };

  const [state, setState] = useState(getInitialState);
  const timerRef = useRef(null);
  const breakTimerRef = useRef(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Main timer logic
  useEffect(() => {
    if (state.isRunning && !state.showBreakScreen) {
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(timerRef.current);
            handleTimerComplete();
            return {
              ...prev,
              timeLeft: 0,
              isRunning: false
            };
          }
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1
          };
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [state.isRunning, state.showBreakScreen]);

  // Break timer logic
  useEffect(() => {
    if (state.showBreakScreen && state.isRunning) {
      breakTimerRef.current = setInterval(() => {
        setState(prev => {
          if (prev.breakTimeLeft <= 1) {
            clearInterval(breakTimerRef.current);
            endBreak();
            return {
              ...prev,
              breakTimeLeft: 0,
              isRunning: false
            };
          }
          return {
            ...prev,
            breakTimeLeft: prev.breakTimeLeft - 1
          };
        });
      }, 1000);
    }
    return () => clearInterval(breakTimerRef.current);
  }, [state.showBreakScreen, state.isRunning]);

  const handleTimerComplete = () => {
    if (state.isSoundEnabled) playSound();

    if (state.sessionType === "focus") {
      const newSessionsCompleted = state.sessionsCompleted + 1;
      const shouldTakeLongBreak = newSessionsCompleted % 4 === 0;
      const breakType = shouldTakeLongBreak ? "longBreak" : "shortBreak";
      const breakDuration = shouldTakeLongBreak
        ? presets[state.currentPreset].longBreak * 60
        : presets[state.currentPreset].shortBreak * 60;

      setState(prev => ({
        ...prev,
        sessionsCompleted: newSessionsCompleted,
        sessionType: breakType,
        breakTimeLeft: breakDuration,
        showBreakScreen: true,
        isMinimized: false,
        isRunning: false,
        timeLeft: breakDuration,
      }));
    } else {
      const focusDuration = presets[state.currentPreset].focus * 60;
      setState(prev => ({
        ...prev,
        sessionType: "focus",
        timeLeft: focusDuration,
        showBreakScreen: false,
        isRunning: false,
      }));
    }
  };

  const endBreak = () => {
    const focusDuration = presets[state.currentPreset].focus * 60;
    setState(prev => ({
      ...prev,
      showBreakScreen: false,
      sessionType: "focus",
      timeLeft: focusDuration,
      isRunning: false,
      breakTimeLeft: presets[prev.currentPreset].shortBreak * 60,
    }));
  };

  const skipBreak = () => {
    clearInterval(breakTimerRef.current);
    const focusDuration = presets[state.currentPreset].focus * 60;
    setState(prev => ({
      ...prev,
      showBreakScreen: false,
      sessionType: "focus",
      timeLeft: focusDuration,
      breakTimeLeft: presets[prev.currentPreset].shortBreak * 60,
      isRunning: false,
    }));
  };

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = state.sessionType === "focus" ? 800 : 600;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.8
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) {
      console.log("Audio error:", e);
    }
  };

  const startTimer = () => {
    setState(prev => ({
      ...prev,
      isRunning: true,
      isMinimized: true,
    }));
  };

  const pauseTimer = () => {
    setState(prev => ({
      ...prev,
      isRunning: false,
    }));
  };

  const resetTimer = () => {
    const duration = getDurationForSessionType(state.sessionType);
    setState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: duration,
      breakTimeLeft: presets[state.currentPreset].shortBreak * 60,
    }));
  };

  const getDurationForSessionType = (sessionType) => {
    const preset = presets[state.currentPreset];
    switch (sessionType) {
      case "focus": return preset.focus * 60;
      case "shortBreak": return preset.shortBreak * 60;
      case "longBreak": return preset.longBreak * 60;
      default: return preset.focus * 60;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getSessionColor = () => {
    switch (state.sessionType) {
      case "focus": return "bg-gradient-to-br from-blue-500 to-blue-600";
      case "shortBreak": return "bg-gradient-to-br from-green-500 to-green-600";
      case "longBreak": return "bg-gradient-to-br from-purple-500 to-purple-600";
      default: return "bg-gradient-to-br from-blue-500 to-blue-600";
    }
  };

  const getSessionIcon = () => {
    const iconProps = { size: 20 };
    switch (state.sessionType) {
      case "focus": return <Brain {...iconProps} />;
      case "shortBreak": return <Coffee {...iconProps} />;
      case "longBreak": return <Clock {...iconProps} />;
      default: return <Timer {...iconProps} />;
    }
  };

  const switchSession = (type) => {
    const duration = getDurationForSessionType(type);
    setState(prev => ({
      ...prev,
      sessionType: type,
      isRunning: false,
      timeLeft: duration,
      breakTimeLeft: presets[prev.currentPreset].shortBreak * 60,
    }));
  };

  const selectPreset = (preset) => {
    setState(prev => ({
      ...prev,
      currentPreset: preset,
      isRunning: false,
      timeLeft: presets[preset].focus * 60,
      sessionType: "focus",
      breakTimeLeft: presets[preset].shortBreak * 60,
    }));
  };

  const progress = ((getDurationForSessionType(state.sessionType) - state.timeLeft) / 
                  getDurationForSessionType(state.sessionType) * 100);

  const breakProgress = state.showBreakScreen ? 
    ((getDurationForSessionType(state.sessionType) - state.breakTimeLeft) / 
     getDurationForSessionType(state.sessionType)) * 100 : 0;

  if (state.showBreakScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 p-4">
        <div className="text-center text-white max-w-md w-full">
          <div className="mb-8">
            <div className={`inline-flex p-4 rounded-full mb-6 ${
              state.sessionType === "longBreak" 
                ? "bg-purple-500/20 text-purple-400" 
                : "bg-green-500/20 text-green-400"
            }`}>
              {state.sessionType === "longBreak" ? <Clock size={48} /> : <Coffee size={48} />}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {state.sessionType === "longBreak" ? "Long Break Time!" : "Time for a Break!"}
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Step away from your work for a few minutes
            </p>
            <div className="text-sm text-gray-400">
              Sessions completed: {state.sessionsCompleted}
            </div>
          </div>

          <div className="mb-8">
            <div className="text-6xl sm:text-7xl font-mono font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {formatTime(state.breakTimeLeft)}
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div className={`h-2 rounded-full transition-all duration-1000 ${
                state.sessionType === "longBreak" 
                  ? "bg-gradient-to-r from-purple-500 to-purple-400" 
                  : "bg-gradient-to-r from-green-500 to-green-400"
              }`} style={{ width: `${breakProgress}%` }} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={skipBreak}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 backdrop-blur-sm border border-gray-600 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <SkipForward size={18} />
              Skip Break
            </button>
            <button
              onClick={() => setState(prev => ({ ...prev, isRunning: true }))}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                state.sessionType === "longBreak"
                  ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
                  : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
              } text-white shadow-lg`}
            >
              {state.isRunning ? "Break Running" : "Start Break"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 select-none">
        {!state.isRunning ? (
          <button
            onClick={() => setState(prev => ({ ...prev, isMinimized: false }))}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                         text-white rounded-2xl px-4 py-3 shadow-2xl border border-blue-400/50
                         hover:shadow-blue-500/30 transition-all duration-300 group
                         backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Timer size={24} className="animate-pulse group-hover:animate-spin" />
              <span className="font-semibold text-sm">Start Timer</span>
            </div>
          </button>
        ) : (
          <div className="relative group">
            <button
              onClick={() => setState(prev => ({ ...prev, isMinimized: false }))}
              className="relative bg-white dark:bg-gray-800 rounded-full p-3
                           shadow-2xl border-2 border-gray-200 dark:border-gray-700
                           hover:shadow-xl transition-all duration-300
                           hover:scale-105 active:scale-95"
            >
              <div className="w-16 h-16 flex items-center justify-center relative">
                <div className={`absolute inset-0 rounded-full animate-pulse ${
                  state.sessionType === "focus"
                    ? "bg-blue-500/20"
                    : state.sessionType === "shortBreak"
                    ? "bg-green-500/20"
                    : "bg-purple-500/20"
                }`}></div>

                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9155" fill="none" className="stroke-gray-200 dark:stroke-gray-600" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" className={`transition-all duration-1000 ${
                    state.sessionType === "focus"
                      ? "stroke-blue-500"
                      : state.sessionType === "shortBreak"
                      ? "stroke-green-500"
                      : "stroke-purple-500"
                  }`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={100 - progress} />
                </svg>

                <div className="flex flex-col items-center justify-center z-10">
                  <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
                    {Math.floor(state.timeLeft / 60).toString().padStart(2, "0")}
                  </span>
                  <div className="w-3 h-px bg-gray-400 dark:bg-gray-500 my-0.5"></div>
                  <span className="font-mono text-sm font-bold text-gray-800 dark:text-white leading-none">
                    {(state.timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className={`absolute -top-1 -right-1 text-white text-xs w-6 h-6
                               flex items-center justify-center rounded-full shadow-lg
                               font-bold border-2 border-white dark:border-gray-800 ${
                                 state.sessionType === "focus"
                                   ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                   : state.sessionType === "shortBreak"
                                   ? "bg-gradient-to-r from-green-500 to-green-600"
                                   : "bg-gradient-to-r from-purple-500 to-purple-600"
                               }`}
              >
                {state.sessionType === "focus" ? "F" : state.sessionType === "shortBreak" ? "S" : "L"}
              </div>
            </button>

            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-300 pointer-events-none z-10">
              <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg
                                   px-3 py-2 whitespace-nowrap shadow-xl">
                <div className="font-semibold">
                  {state.sessionType === "focus"
                    ? "Focus Session"
                    : state.sessionType === "shortBreak"
                    ? "Short Break"
                    : "Long Break"}
                </div>
                <div className="text-gray-300 dark:text-gray-400">Click to expand</div>
                <div className="absolute top-full right-4 border-4 border-transparent
                                     border-t-gray-900 dark:border-t-gray-700"></div>
              </div>
            </div>

            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100
                                 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="flex flex-col gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    pauseTimer();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-2
                                     shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Pause size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetTimer();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2
                                     shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Square size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none font-inter">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl
                       border border-gray-200/70 dark:border-gray-700/80
                       w-72 sm:w-80 max-w-[calc(100vw-2rem)] overflow-hidden
                       backdrop-blur-md bg-opacity-95 dark:bg-opacity-95
                       transform scale-95 sm:scale-100 transition-transform duration-300 ease-out">
        <div className={`${getSessionColor()} p-4 text-white relative`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
            <div className="h-full bg-white transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
                {getSessionIcon()}
              </div>
              <div>
                <h3 className="font-semibold text-base drop-shadow-sm">
                  {state.sessionType === "focus"
                    ? "Focus Session"
                    : state.sessionType === "shortBreak"
                    ? "Short Break"
                    : "Long Break"}
                </h3>
                <div className="flex items-center gap-1.5 text-xs opacity-90">
                  <span>{presets[state.currentPreset].name} preset</span>
                  <span>•</span>
                  <span>{state.sessionsCompleted} sessions</span>
                </div>
              </div>
            </div>

            <div className="flex gap-0.5">
              <button
                onClick={() => setState(prev => ({ ...prev, isMinimized: true }))}
                className="hover:bg-white/20 p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <Minimize2 size={16} />
              </button>

              <button
                onClick={() => setState(prev => ({ ...prev, showSettings: !prev.showSettings }))}
                className={`p-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                  state.showSettings ? "bg-white/20" : "hover:bg-white/20"
                }`}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 mb-5 shadow-inner">
            {["focus", "shortBreak", "longBreak"].map((type) => (
              <button
                key={type}
                onClick={() => switchSession(type)}
                className={`flex-1 py-2 px-2 rounded-md text-xs font-medium transition-all
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                 ${
                                   state.sessionType === type
                                     ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white"
                                     : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                                 }`}
              >
                {type === "focus"
                  ? "Focus"
                  : type === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
              </button>
            ))}
          </div>

          <div className="text-center mb-5">
            <div className="text-5xl sm:text-6xl font-bold mb-3 dark:text-white font-mono tracking-tighter drop-shadow-md">
              {formatTime(state.timeLeft)}
            </div>

            <div className="flex justify-center gap-2 mb-5">
              {!state.isRunning ? (
                <button
                  onClick={startTimer}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500
                                     hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium text-sm
                                     transition-all active:scale-95 shadow-lg shadow-green-500/20
                                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  <Play size={16} className="fill-current" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500
                                     hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-medium text-sm
                                     transition-all active:scale-95 shadow-lg shadow-amber-500/20
                                     focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                >
                  <Pause size={16} className="fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                                     rounded-lg transition-all active:scale-95 text-gray-700 dark:text-gray-300
                                     shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                <RotateCw size={16} />
              </button>

              <button
                onClick={() => setState(prev => ({ ...prev, isSoundEnabled: !prev.isSoundEnabled }))}
                className={`p-2.5 rounded-lg transition-all active:scale-95 shadow-sm hover:shadow-md
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                       state.isSoundEnabled
                                         ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                         : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                     }`}
              >
                {state.isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>

          {state.showSettings && (
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4 animate-fade-in">
              <h4 className="flex items-center gap-2 text-xs font-semibold mb-3 dark:text-white">
                <Settings size={14} className="opacity-70" />
                <span>Timer Presets</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => selectPreset(key)}
                    className={`p-2.5 rounded-lg transition-all text-center flex flex-col items-center justify-center
                                         shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                         ${
                                           state.currentPreset === key
                                             ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                                             : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white"
                                         }`}
                  >
                    <div className="font-medium text-sm mb-0.5">{preset.name}</div>
                    <div className="text-xs opacity-80">{preset.focus}min</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyTimerModal;