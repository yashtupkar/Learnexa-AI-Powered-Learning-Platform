import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layouts/layout";
import {
    FiMic, FiMicOff, FiVideo, FiVideoOff, FiUser, FiLoader, FiArrowRight, FiShield
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useInterview } from "./InterviewContext";

const InterviewSetup = () => {
    const { 
        interviewData, 
        setInterviewData, 
        setSessionId, 
        resetInterview,
        isCameraEnabled,
        setIsCameraEnabled,
        isMicEnabled,
        setIsMicEnabled
    } = useInterview();
    const [loading, setLoading] = useState(false);
    const localVideoRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        resetInterview();
    }, []);

    useEffect(() => {
        let stream = null;
        const startCamera = async () => {
            if (isCameraEnabled) {
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
                    setIsCameraEnabled(false);
                    toast.error("Could not access camera. Please check permissions.");
                }
            }
        };
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraEnabled]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInterviewData(prev => ({ ...prev, [name]: value }));
    };

    const startInterview = async () => {
        if (!isCameraEnabled || !isMicEnabled) {
            toast.error("Please enable both camera and microphone to start.");
            return;
        }
        if (!interviewData.content) {
            toast.error("Please provide role details or resume content.");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vapi-interview/start`,
                interviewData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { systemPrompt, sessionId: newSessionId } = response.data;
            setSessionId(newSessionId);

            // Navigate to the session page with systemPrompt and sessionId in state or just the context
            // We'll use context for simplicity as we already setSessionId there.
            // We need to pass systemPrompt as well.
            navigate("/interview/session", { state: { systemPrompt } });
        } catch (error) {
            console.error(error);
            toast.error("Failed to initialize interview.");
        } finally {
            setLoading(false);
        }
    };

    const toggleVideo = () => setIsCameraEnabled(!isCameraEnabled);

    return (
        <Layout>
            <div className="min-h-screen bg-[#07070a] text-gray-100 transition-colors font-sans selection:bg-indigo-500/30">
                <div className="flex flex-col lg:flex-row items-center justify-center min-h-[90vh] p-6 gap-12 max-w-7xl mx-auto">
                    {/* Pre-call Preview / Green Room */}
                   
                    <div className="w-full lg:w-1/2 flex flex-col space-y-6 animate-fade-in-left">
                        <h1 className="text-xl md:text-4xl font-semibold text-white tracking-tighter ">
                            Practice Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">with AI</span>
                        </h1>
                        <div className="relative aspect-video bg-zinc-900 rounded-3xl border border-green-500/50 overflow-hidden  shadow-2xl group">
                            {isCameraEnabled ? (
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="absolute inset-0 w-full h-full object-cover mirror"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                                    <div className="flex flex-col items-center opacity-40">
                                        <FiVideoOff className="text-6xl mb-4" />
                                        <span className="text-sm">Camera is Off</span>
                                    </div>
                                </div>
                            )}

                            {/* Controls Overlay */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10  transition-opacity duration-300 shadow-2xl">
                                <button
                                    onClick={() => setIsMicEnabled(!isMicEnabled)}
                                    className={`p-3 rounded-xl transition-all ${!isMicEnabled ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                >
                                    {!isMicEnabled ? <FiMicOff /> : <FiMic />}
                                </button>
                                <button
                                    onClick={toggleVideo}
                                    className={`p-3 rounded-xl  transition-all ${!isCameraEnabled ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                >
                                    {!isCameraEnabled ? <FiVideoOff /> : <FiVideo />}
                                </button>
                            </div>

                            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-semibold tracking-wider uppercase opacity-80">Ready to Join</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6  rounded-3xl border border-zinc-800">
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                                <FiShield className="mr-2 text-indigo-400" /> Professional Environment
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Ensure you are in a quiet room with good lighting. Our AI interviewer will analyze both your tone and content to provide detailed feedback.
                            </p>
                        </div>
                    </div>

                    {/* Setup Form */}
                    <div className="w-full md:w-[420px] h-fit bg-zinc-900/80 backdrop-blur-xl rounded-[32px] p-7 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-right">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white mb-1">Configure Interview</h2>
                            {/* <p className="text-zinc-500 text-xs">Tailor your interview experience</p> */}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Focus Mode</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Technical', 'Behavioral', 'HR', 'General'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setInterviewData(p => ({ ...p, interviewType: type.toLowerCase() }))}
                                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${interviewData.interviewType === type.toLowerCase()
                                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                                                : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Target Role</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
                                    <input
                                        name="role"
                                        value={interviewData.role}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Lead React Developer"
                                        className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none text-xs font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Experience</label>
                                <select
                                    name="level"
                                    value={interviewData.level}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none text-xs font-medium appearance-none"
                                >
                                    <option value="Junior">Entry Level</option>
                                    <option value="Mid-Level">Mid-Level Associate</option>
                                    <option value="Senior">Senior Professional</option>
                                    <option value="Architect">Architect / Lead</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Professional Context</label>
                                <textarea
                                    name="content"
                                    value={interviewData.content}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Paste core resume points..."
                                    className="w-full p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none resize-none text-xs font-medium leading-relaxed"
                                ></textarea>
                            </div>

                            <button
                                onClick={startInterview}
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-500 cursor-pointer text-white font-semibold py-3 rounded-2xl shadow-xl transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden active:scale-95"
                            >
                                <div className="relative z-10 flex items-center">
                                    {loading ? (
                                        <FiLoader className="animate-spin mr-3 text-xl" />
                                    ) : (
                                        <div className="bg-white/20 p-1.5 rounded-lg mr-3">
                                            <FiArrowRight />
                                        </div>
                                    )}
                                    <span className="tracking-tight text-lg">
                                        {loading ? "Establishing Link..." : "Join Interview Room"}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in-left {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </Layout>
    );
};

export default InterviewSetup;
