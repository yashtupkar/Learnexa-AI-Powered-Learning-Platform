import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import Layout from "../../components/layouts/layout";
import {
    FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff,
    FiMessageSquare, FiUser, FiCheckCircle, FiLoader,
    FiMonitor, FiBarChart2, FiInfo, FiStar, FiArrowRight, FiShield, FiMoreVertical
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useInterview } from "./InterviewContext";

const InterviewSession = () => {
    const {
        interviewData,
        sessionId,
        setSessionId,
        transcript,
        setTranscript,
        callStatus,
        setCallStatus,
        interviewDuration,
        setInterviewDuration,
        setReport,
        isCameraEnabled,
        setIsCameraEnabled,
        isMicEnabled,
        setIsMicEnabled
    } = useInterview();

    const location = useLocation();
    const navigate = useNavigate();
    const systemPrompt = location.state?.systemPrompt;

    // ── DEV PREVIEW MODE ─────────────────────────────────────────────────────
    // Visit /interview/session?preview=true to design UI without a real call.
    const isPreview = new URLSearchParams(location.search).get("preview") === "true";

    const MOCK_INTERVIEW_DATA = {
        interviewType: "Technical",
        role: "Senior Frontend Engineer",
        level: "Senior",
        content: ""
    };
    const MOCK_TRANSCRIPT = [
        { id: 1, role: "assistant", speaker: "Rohan", text: "Hello! I'm Rohan, your AI interviewer. Welcome! Could you please begin by introducing yourself?", stableText: "Hello! I'm Rohan, your AI interviewer. Welcome! Could you please begin by introducing yourself?", timestamp: "10:00 AM", isAgent: true },
        { id: 2, role: "user", speaker: "You", text: "Hi Rohan! I'm a senior frontend engineer with 5 years of experience building React applications.", stableText: "Hi Rohan! I'm a senior frontend engineer with 5 years of experience building React applications.", timestamp: "10:01 AM", isAgent: false },
        { id: 3, role: "assistant", speaker: "Rohan", text: "Great! Let's dive into some technical questions. Can you explain the difference between `useMemo` and `useCallback` in React?", stableText: "Great! Let's dive into some technical questions. Can you explain the difference between `useMemo` and `useCallback` in React?", timestamp: "10:01 AM", isAgent: true },
        { id: 4, role: "user", speaker: "You", text: "`useMemo` memoizes a computed value while `useCallback` memoizes a function reference. Both help avoid unnecessary re-renders.", stableText: "`useMemo` memoizes a computed value while `useCallback` memoizes a function reference. Both help avoid unnecessary re-renders.", timestamp: "10:02 AM", isAgent: false },

        { id: 5, role: "assistant", speaker: "Rohan", text: "Great! Let's dive into some technical questions. Can you explain the difference between `useMemo` and `useCallback` in React?", stableText: "Great! Let's dive into some technical questions. Can you explain the difference between `useMemo` and `useCallback` in React?", timestamp: "10:01 AM", isAgent: true },
        { id: 6, role: "user", speaker: "You", text: "`useMemo` memoizes a computed value while `useCallback` memoizes a function reference. Both help avoid unnecessary re-renders.", stableText: "`useMemo` memoizes a computed value while `useCallback` memoizes a function reference. Both help avoid unnecessary re-renders.", timestamp: "10:02 AM", isAgent: false },
    ];
    // ─────────────────────────────────────────────────────────────────────────

    const [isMuted, setIsMuted] = useState(!isMicEnabled);
    const [isVideoOn, setIsVideoOn] = useState(isCameraEnabled);
    const [isProcessing, setIsProcessing] = useState(false);
    const [agentReady, setAgentReady] = useState(false);

    const vapi = useRef(null);
    const transcriptEndRef = useRef(null);
    const localVideoRef = useRef(null);
    const sessionIdRef = useRef(sessionId);

    useEffect(() => {
        sessionIdRef.current = sessionId;
    }, [sessionId]);

    // Redirect if no sessionId or systemPrompt (skip in preview mode)
    useEffect(() => {
        if (isPreview) {
            setCallStatus("active");
            setInterviewDuration(142);
            setTranscript(MOCK_TRANSCRIPT);
            return;
        }

        if (!sessionId || !systemPrompt) {
            toast.error("Please setup the interview first.");
            navigate("/interview/setup");
            return;
        }
        
        // Initial check for camera/mic
        if (!isCameraEnabled || !isMicEnabled) {
            toast.error("Camera and Microphone must be enabled to join the session.");
            navigate("/interview/setup");
        }
    }, []); // Only check on mount to prevent redirection when toggling during session

    // Camera Management
    useEffect(() => {
        let stream = null;
        const startCamera = async () => {
            if (isVideoOn) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 1280, height: 720 },
                        audio: false
                    });
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error("Camera access denied:", err);
                    setIsVideoOn(false);
                }
            }
        };
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isVideoOn]);

    // Initialize Vapi
    useEffect(() => {
        if (isPreview || !systemPrompt || !sessionId) return;

        const initVapi = async () => {
            try {
                vapi.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
                setAgentReady(true);

                vapi.current.on("call-start", () => {
                    setCallStatus("active");
                    toast.success("Connection secured. Interview started.");
                });

                vapi.current.on("call-end", () => {
                    setCallStatus("inactive");
                    setIsProcessing(true);
                    pollForReport(sessionIdRef.current);
                });

                vapi.current.on("error", (error) => {
                    console.error("Vapi error:", error);
                    setCallStatus("inactive");
                    toast.error("Bridge connection failed.");
                });

                vapi.current.on("message", (message) => {
                    if (message.type === "transcript") {
                        const role = message.role;
                        const text = message.transcript;
                        const isFinal = message.transcriptType === "final";

                        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        setTranscript(prev => {
                            const lastMsg = prev[prev.length - 1];
                            if (lastMsg && lastMsg.role === role) {
                                const updated = [...prev];
                                const stableText = lastMsg.stableText || "";
                                const newText = stableText + (stableText && text ? " " : "") + text;
                                updated[updated.length - 1] = {
                                    ...lastMsg,
                                    text: newText,
                                    stableText: isFinal ? newText : stableText,
                                    timestamp: currentTime
                                };
                                return updated;
                            } else {
                                const isAgentRole = role === "assistant" || role === "agent";
                                return [...prev, {
                                    id: Date.now(),
                                    role: role,
                                    speaker: isAgentRole ? "AI Interviewer" : "You",
                                    text: text,
                                    stableText: isFinal ? text : "",
                                    timestamp: currentTime,
                                    isAgent: isAgentRole
                                }];
                            }
                        });
                    }
                });

                // Start call automatically — agent speaks first on connect
                setCallStatus("connecting");
                await vapi.current.start({
                    model: {
                        provider: "openai",
                        model: "gpt-4o",
                        messages: [{ role: "system", content: systemPrompt }]
                    },
                    firstMessage: "Hello! I'm Rohan, your AI interviewer. Welcome! Let's get started whenever you're ready. Could you please begin by introducing yourself?",
                    firstMessageMode: "assistant-speaks-first",
                    metadata: { sessionId: sessionId }
                });

            } catch (error) {
                console.error("Failed to start Vapi:", error);
                toast.error("Failed to connect to AI agent.");
                navigate("/interview/setup");
            }
        };

        initVapi();

        return () => {
            if (vapi.current) {
                vapi.current.stop();
            }
        };
    }, [systemPrompt, sessionId]);

    // Timer
    useEffect(() => {
        let interval;
        if (callStatus === "active") {
            interval = setInterval(() => {
                setInterviewDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [callStatus]);

    // Auto-scroll transcript
    useEffect(() => {
        if (transcriptEndRef.current) {
            transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [transcript]);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const stopInterview = () => {
        if (vapi.current) {
            vapi.current.stop();
        }
    };

    const toggleMute = () => {
        if (vapi.current) {
            if (isMuted) vapi.current.unmute();
            else vapi.current.mute();
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            setIsMicEnabled(!newMuted);
        }
    };

    const toggleVideo = () => {
        const newVideoOn = !isVideoOn;
        setIsVideoOn(newVideoOn);
        setIsCameraEnabled(newVideoOn);
    };

    const pollForReport = async (id) => {
        if (!id) return;
        let attempts = 0;
        const maxAttempts = 24;
        const interval = setInterval(async () => {
            attempts++;
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vapi-interview/report/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.status === "completed" && response.data.report) {
                    setReport(response.data.report);
                    clearInterval(interval);
                    toast.success("Interview report generated!");
                    navigate("/interview/result");
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
            if (attempts >= maxAttempts) {
                clearInterval(interval);
                toast.error("Report generation is taking longer. Check back later.");
                navigate("/interview/setup");
            }
        }, 5000);
    };

    // Use mock data in preview mode
    const displayData = isPreview ? MOCK_INTERVIEW_DATA : interviewData;

    return (

        <div className="min-h-screen bg-[#07070a] text-gray-100 font-sans">

            <div className="h-full flex flex-col bg-[#050507] overflow-hidden min-h-[90vh]">
                {/* Header */}
                <header className="px-4 md:px-6 py-2 flex items-center justify-between bg-white/5 border-b border-white/5">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={() => navigate("/interview/setup")}
                            className="p-1.5 md:p-2 bg-white/10 hover:bg-white/20 cursor-pointer rounded-lg transition-colors text-zinc-400 hover:text-white"
                        >
                            <FiArrowRight className="rotate-180" size={18} />
                        </button>
                        <div>
                            <h1 className="text-sm md:text-lg font-semibold text-white tracking-tight truncate max-w-[150px] md:max-w-none">
                                {displayData.role}
                            </h1>
                            <p className="text-[10px] md:text-[11px] text-zinc-500 font-medium">
                                {displayData.interviewType} • {displayData.level}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-zinc-900 border border-white/5 shadow-inner">
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${callStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                            <span className="text-[10px] md:text-[11px] font-mono font-bold text-zinc-300">
                                {formatDuration(interviewDuration)}
                            </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 font-bold text-[10px] bg-red-500/10 text-red-500 rounded-lg border border-red-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            Live
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden pt-2 px-6 gap-8 max-w-fit mx-auto w-full">
                    {/* Video Column */}
                    <div className="w-full max-w-3xl flex-none flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-none">
                        <div className="relative aspect-video bg-white/5 rounded-[32px] overflow-hidden border border-white/5 group shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                {callStatus === "active" && (
                                    <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] animate-pulse-slow pointer-events-none" />
                                )}
                                <img
                                    src="/assets/interview-agent.png"
                                    alt="AI Interviewer"
                                    className={`w-full h-full object-cover transition-all duration-700 ${callStatus === "active" ? 'scale-105 brightness-110' : 'scale-100 brightness-90'}`}
                                />
                            </div>

                            <div className="absolute top-3 right-3 w-54 aspect-[16/10] bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl group/pip transition-transform hover:scale-105">
                                {isVideoOn ? (
                                    <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover mirror" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 opacity-40">
                                        <FiVideoOff size={16} />
                                        <span className="text-[8px] font-bold uppercase mt-1">Camera Off</span>
                                    </div>
                                )}
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-tighter">You</span>
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10  transition-opacity duration-300 shadow-2xl">
                                <button onClick={toggleMute} className={`p-3 cursor-pointer rounded-xl transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                    {isMuted ? <FiMicOff size={18} /> : <FiMic size={18} />}
                                </button>
                                <button onClick={toggleVideo} className={`p-3 cursor-pointer rounded-xl transition-all ${!isVideoOn ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                    {!isVideoOn ? <FiVideoOff size={18} /> : <FiVideo size={18} />}
                                </button>


                                <button onClick={stopInterview} className="p-3 bg-red-600 cursor-pointer hover:bg-red-500 text-white rounded-xl shadow-lg transition-all active:scale-95">
                                    <FiPhoneOff size={18} />
                                </button>
                            </div>

                            {callStatus === "connecting" && (
                                <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
                                    <div className="text-center animate-fade-in px-6">
                                        <FiLoader className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
                                        <h2 className="text-xl font-bold text-white mb-1">Connecting...</h2>
                                        <p className="text-zinc-500 text-xs">Establishing neural conversational link</p>
                                    </div>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center z-50">
                                    <div className="text-center w-full max-w-sm px-6">
                                        <FiBarChart2 className="w-10 h-10 text-indigo-400 animate-pulse mx-auto mb-4" />
                                        <h2 className="text-xl font-bold text-white mb-2">Finalizing Analysis</h2>
                                        <p className="text-zinc-500 text-xs leading-relaxed px-4 mb-6">
                                            Constructing your performance metrics and behavioral insights...
                                        </p>
                                        <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                            <div className="bg-indigo-500 h-full rounded-full animate-progress"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                                    Key Session Notes - {displayData.role}
                                </h3>
                                <button className="p-1.5 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                    <FiMoreVertical size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-zinc-900/50 px-4 py-3 rounded-2xl border border-white/5 flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter flex items-center gap-1.5">
                                        <FiInfo size={10} className="text-indigo-400" /> Date
                                    </span>
                                    <p className="text-[11px] font-semibold text-white">{new Date().toLocaleDateString()}</p>
                                </div>
                                <div className="bg-zinc-900/50 px-4 py-3 rounded-2xl border border-white/5 flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter flex items-center gap-1.5">
                                        <FiStar size={10} className="text-indigo-400" /> Type
                                    </span>
                                    <p className="text-[11px] font-semibold text-white uppercase">{displayData.interviewType}</p>
                                </div>
                                <div className="bg-zinc-900/50 px-4 py-3 rounded-2xl border border-white/5 flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter flex items-center gap-1.5">
                                        <FiUser size={10} className="text-indigo-400" /> Participants
                                    </span>
                                    <p className="text-[11px] font-semibold text-white truncate">AI Agent, You</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-[28px] bg-indigo-600/10 border border-indigo-500/20 shadow-inner group overflow-hidden relative">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                            <FiCheckCircle size={14} />
                                        </div>
                                        <h4 className="text-[13px] font-bold text-indigo-100">AI Live Summary & Guidance</h4>
                                    </div>
                                    <p className="text-[12px] text-indigo-200/80 leading-relaxed font-medium">
                                        {isProcessing
                                            ? "Constructing final evaluation report..."
                                            : "Our neural agent is currently analyzing your technical depth, communication style, and logical reasoning."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transcript Column */}
                    <div className="flex-1 flex flex-col w-2xl bg-white/5 max-h-[700px] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="p-2 flex gap-1 bg-zinc-800 border-b border-white/5">
                            <button className="flex-1 py-2 px-3 rounded-xl bg-zinc-700 text-white text-[10px] font-bold shadow-md">Live Transcript</button>
                            <button className="flex-1 py-2 px-3 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 text-[10px] font-bold transition-all">Timeline</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
                            {transcript.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4 px-8">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center opacity-40">Ready to sync...</p>
                                </div>
                            ) : (
                                transcript.map((msg, idx) => (
                                    <div key={msg.id} className="group animate-message-in ">
                                        <div className={`flex items-center gap-2 mb-1.5  ${msg.isAgent ? '' : 'flex-row-reverse'}`}>
                                            <div className={`w-10 h-10 rounded-full flex font-semibold items-center justify-center text-sm font-black ${msg.isAgent ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                                {msg.isAgent ? 'R' : 'U'}
                                            </div>
                                            <span className="text-xs font-semibold font-black text-zinc-400 uppercase tracking-tighter">
                                                {msg.speaker} • {msg.timestamp}
                                            </span>
                                        </div>
                                        <div className={`flex ${msg.isAgent ? 'justify-start' : 'justify-end'}`}>
                                            <div className={`p-4 rounded-2xl text-sm w-[70%] transition-all shadow-sm ${msg.isAgent
                                                ? 'bg-zinc-800/80 text-zinc-300 border border-white/5 rounded-tl-none'
                                                : 'bg-indigo-500 text-white border border-indigo-500/20 rounded-tr-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={transcriptEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default InterviewSession;
