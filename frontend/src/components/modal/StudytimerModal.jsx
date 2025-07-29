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
  Maximize2,
  Minimize2,
  SkipForward,
  Timer,
} from "lucide-react";

const StudyTimerModal = () => {
  // Load state from localStorage or use defaults
  const loadState = () => {
    const savedState = localStorage.getItem("studyTimerState");
    return savedState
      ? JSON.parse(savedState)
      : {
          isRunning: false,
          timeLeft: 25 * 60,
          sessionType: "focus",
          isMinimized: false,
          showSettings: false,
          isSoundEnabled: true,
          showBreakScreen: false,
          breakTimeLeft: 5 * 60,
          currentPreset: "classic",
          lastUpdated: Date.now(),
        };
  };

  // Initial state
  const [state, setState] = useState(loadState());


  const timerRef = useRef(null);
  const breakTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Presets
  const presets = {
    classic: { focus: 25, shortBreak: 5, longBreak: 15, name: "Classic" },
    short: { focus: 1, shortBreak: 3, longBreak: 10, name: "Short" },
    deep: { focus: 45, shortBreak: 10, longBreak: 20, name: "Deep" },
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const saveState = () => {
      const stateToSave = {
        ...state,
        lastUpdated: Date.now(),
      };
      localStorage.setItem("studyTimerState", JSON.stringify(stateToSave));
    };

    saveState();

    // Also save state before page unload
    window.addEventListener("beforeunload", saveState);
    return () => window.removeEventListener("beforeunload", saveState);
  }, [state]);

  // Calculate elapsed time since last update
  useEffect(() => {
    const checkElapsedTime = () => {
      if (state.isRunning && state.lastUpdated) {
        const elapsedSeconds = Math.floor(
          (Date.now() - state.lastUpdated) / 1000
        );
        if (elapsedSeconds > 0) {
          setState((prev) => {
            const newTimeLeft = Math.max(0, prev.timeLeft - elapsedSeconds);
            if (newTimeLeft <= 0) {
              return { ...prev, timeLeft: 0, isRunning: false };
            }
            return { ...prev, timeLeft: newTimeLeft };
          });
        }
      }
    };

    checkElapsedTime();
  }, []);

  // Timer logic
  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0) {
      clearInterval(timerRef.current);
      handleTimerComplete();
    }

    return () => clearInterval(timerRef.current);
  }, [state.isRunning, state.timeLeft]);

  // Break timer logic
  useEffect(() => {
    if (state.showBreakScreen && state.breakTimeLeft > 0) {
      breakTimerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          breakTimeLeft: prev.breakTimeLeft - 1,
        }));
      }, 1000);
    } else if (state.showBreakScreen && state.breakTimeLeft === 0) {
      clearInterval(breakTimerRef.current);
      endBreak();
    }

    return () => clearInterval(breakTimerRef.current);
  }, [state.showBreakScreen, state.breakTimeLeft]);

  const handleTimerComplete = () => {
    if (state.isSoundEnabled) playSound();

    if (state.sessionType === "focus") {
      // Start break
      const breakDuration = presets[state.currentPreset].shortBreak * 60;
      setState((prev) => ({
        ...prev,
        breakTimeLeft: breakDuration,
        showBreakScreen: true,
        isMinimized: false, // Show full screen for break
        isRunning: false,
      }));
    } else {
      // Start focus session
      const focusDuration = presets[state.currentPreset].focus * 60;
      setState((prev) => ({
        ...prev,
        sessionType: "focus",
        timeLeft: focusDuration,
        isRunning: false,
      }));
    }
  };

  const endBreak = () => {
    const focusDuration = presets[state.currentPreset].focus * 60;
    setState((prev) => ({
      ...prev,
      showBreakScreen: false,
      sessionType: "focus",
      timeLeft: focusDuration,
    }));
  };

  const skipBreak = () => {
    clearInterval(breakTimerRef.current);
    const focusDuration = presets[state.currentPreset].focus * 60;
    setState((prev) => ({
      ...prev,
      showBreakScreen: false,
      sessionType: "focus",
      timeLeft: focusDuration,
      breakTimeLeft: presets[state.currentPreset].shortBreak * 60,
    }));
  };

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
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
      console.log("Audio not supported");
    }
  };

  // Timer controls
  const startTimer = () => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      isMinimized: true, // Minimize on start
      lastUpdated: Date.now(),
    }));
  };

  const pauseTimer = () => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      lastUpdated: Date.now(),
    }));
  };

  const resetTimer = () => {
    const duration =
      state.sessionType === "focus"
        ? presets[state.currentPreset].focus * 60
        : state.sessionType === "shortBreak"
        ? presets[state.currentPreset].shortBreak * 60
        : presets[state.currentPreset].longBreak * 60;

    setState((prev) => ({
      ...prev,
      isRunning: false,
      timeLeft: duration,
      lastUpdated: Date.now(),
    }));
  };

  // Helpers
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getSessionColor = () => {
    return state.sessionType === "focus"
      ? "bg-blue-500"
      : state.sessionType === "shortBreak"
      ? "bg-green-500"
      : "bg-purple-500";
  };

  const getSessionIcon = () => {
    return state.sessionType === "focus" ? (
      <Brain size={16} />
    ) : (
      <Coffee size={16} />
    );
  };

  const switchSession = (type) => {
    const duration =
      type === "focus"
        ? presets[state.currentPreset].focus * 60
        : type === "shortBreak"
        ? presets[state.currentPreset].shortBreak * 60
        : presets[state.currentPreset].longBreak * 60;

    setState((prev) => ({
      ...prev,
      sessionType: type,
      isRunning: false,
      timeLeft: duration,
      lastUpdated: Date.now(),
    }));
  };

  const selectPreset = (preset) => {
    setState((prev) => ({
      ...prev,
      currentPreset: preset,
      isRunning: false,
      timeLeft: presets[preset].focus * 60,
      sessionType: "focus",
      lastUpdated: Date.now(),
    }));
  };





  // Progress calculations
  const progress =
    (((state.sessionType === "focus"
      ? presets[state.currentPreset].focus * 60
      : state.sessionType === "shortBreak"
      ? presets[state.currentPreset].shortBreak * 60
      : presets[state.currentPreset].longBreak * 60) -
      state.timeLeft) /
      (state.sessionType === "focus"
        ? presets[state.currentPreset].focus * 60
        : state.sessionType === "shortBreak"
        ? presets[state.currentPreset].shortBreak * 60
        : presets[state.currentPreset].longBreak * 60)) *
    100;

  // Break Screen Overlay
  if (state.showBreakScreen) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="text-center text-white p-8 max-w-md">
          <Coffee size={48} className="mx-auto mb-6 text-green-400" />
          <h2 className="text-3xl font-bold mb-2">Time for a Break!</h2>
          <p className="text-xl mb-6 opacity-80">
            Step away from your work for a few minutes
          </p>

          <div className="text-5xl font-mono font-bold mb-8">
            {formatTime(state.breakTimeLeft)}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={skipBreak}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
            >
              <SkipForward size={18} />
              Skip Break
            </button>
            <button
              onClick={endBreak}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
            >
              End Break Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Minimized view
if (state.isMinimized) {
  return (
    <div className="fixed  bottom-4 right-4 z-50 select-none">
      {!state.isRunning ? (
        // Stopped state - show start message
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-700 w-64 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Timer
                  size={18}
                  className="text-blue-600 dark:text-blue-400 animate-[spin_3s_linear_infinite]"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                  Ready to Focus?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {presets[state.currentPreset].name} •{" "}
                  {formatTime(state.timeLeft)}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              <button
                onClick={() =>
                  setState((prev) => ({ ...prev, isMinimized: false }))
                }
                className="no-drag p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Expand timer"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={startTimer}
            className="no-drag w-full mt-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            <Play size={14} className="fill-current" />
            <span className="font-medium text-sm">Start Session</span>
          </button>
        </div>
      ) : (
        // Running state - compact timer
        <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-blue-200 w-48 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Timer
                size={16}
                className="text-blue-600 animate-bounce group-hover:animate-pulse"
              />
            </div>
            <span className="font-mono font-bold text-gray-800 text-sm hover:text-blue-600 transition-colors duration-200">
              {formatTime(state.timeLeft)}
            </span>
            <button
              onClick={() =>
                setState((prev) => ({ ...prev, isMinimized: false }))
              }
              className="no-drag ml-auto hover:bg-blue-100 p-1 rounded text-blue-600 transition-all duration-200 hover:scale-110 active:scale-95 transform-gpu"
              aria-label="Expand timer"
            >
              <Maximize2 size={14} />
            </button>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Time type indicator */}
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
            {state.sessionType === "focus" ? "F" : "B"}
          </div>
        </div>
      )}
    </div>
  );
}


  // Main view
return (
  <div className="fixed bottom-4 right-4 z-50 select-none">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/70 dark:border-gray-700/80 w-80 overflow-hidden backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      {/* Header */}
      <div className={`${getSessionColor()} p-5 text-white relative`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
          <div
            className="h-full bg-white transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              {getSessionIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {state.sessionType === "focus"
                  ? "Focus Session"
                  : state.sessionType === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
              </h3>
              <p className="text-sm opacity-90 mt-0.5">
                {presets[state.currentPreset].name} preset
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setState((prev) => ({ ...prev, isMinimized: true }))
              }
              className="no-drag hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  showSettings: !prev.showSettings,
                }))
              }
              className={`no-drag p-2 rounded-lg transition-colors ${
                state.showSettings ? "bg-white/20" : "hover:bg-white/20"
              }`}
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="text-6xl font-bold mb-4 dark:text-white font-mono tracking-tighter">
            {formatTime(state.timeLeft)}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mb-5">
            {!state.isRunning ? (
              <button
                onClick={startTimer}
                className="no-drag flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-green-500/20"
              >
                <Play size={18} className="fill-current" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="no-drag flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-amber-500/20"
              >
                <Pause size={18} className="fill-current" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={resetTimer}
              className="no-drag p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all active:scale-95"
              aria-label="Reset"
            >
              <RotateCw size={18} />
            </button>
            <button
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  isSoundEnabled: !prev.isSoundEnabled,
                }))
              }
              className={`no-drag p-3 rounded-xl transition-all active:scale-95 ${
                state.isSoundEnabled
                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
              aria-label={state.isSoundEnabled ? "Mute" : "Unmute"}
            >
              {state.isSoundEnabled ? (
                <Volume2 size={18} />
              ) : (
                <VolumeX size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Settings */}
        {state.showSettings && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold mb-3 dark:text-white px-1">
              <Settings size={16} className="opacity-70" />
              <span>Timer Settings</span>
            </h4>

            <div className="grid grid-cols-3 gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => selectPreset(key)}
                  className={`no-drag p-3 rounded-xl transition-all ${
                    state.currentPreset === key
                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="font-medium text-sm">{preset.name}</div>
                  <div className="text-xs opacity-80 mt-1">
                    {preset.focus}/{preset.shortBreak}/{preset.longBreak}
                  </div>
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