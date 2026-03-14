import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/layouts/layout";
import {
    FiMic, FiMicOff, FiVideo, FiVideoOff, FiUser, FiLoader, FiArrowRight, FiShield, FiMoreVertical, FiFileText, FiBriefcase, FiLayers
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
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
    const [pastInterviews, setPastInterviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("create");
    const [inputType, setInputType] = useState("both"); // 'resume', 'jobDescription', 'both'
    const [jobDescription, setJobDescription] = useState("");
    const [resumeContent, setResumeContent] = useState("");
    const [showSetupForm, setShowSetupForm] = useState(false);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInterviews = pastInterviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pastInterviews.length / itemsPerPage);

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

    useEffect(() => {
        const fetchPastInterviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vapi-interview/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPastInterviews(res.data);
            } catch (err) {
                console.error("Error fetching past interviews:", err);
            }
        };
        fetchPastInterviews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInterviewData(prev => ({ ...prev, [name]: value }));
    };

    const startInterview = async () => {
        if (!isCameraEnabled || !isMicEnabled) {
            toast.error("Please enable both camera and microphone to start.");
            return;
        }
        
        let combinedContent = "";
        if (inputType === "resume") combinedContent = `Resume: ${resumeContent}`;
        else if (inputType === "jobDescription") combinedContent = `Job Description: ${jobDescription}`;
        else {
            if (!resumeContent && !jobDescription) {
                toast.error("Please provide resume or job description content.");
                return;
            }
            if (resumeContent) combinedContent += `Resume: ${resumeContent}\n`;
            if (jobDescription) combinedContent += `Job Description: ${jobDescription}`;
        }

        if (!combinedContent.trim()) {
             toast.error("Please provide resume or job description content.");
             return;
        }

        const finalInterviewData = {
            ...interviewData,
            content: combinedContent,
        };

        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vapi-interview/start`,
                finalInterviewData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { systemPrompt, sessionId: newSessionId } = response.data;
            setSessionId(newSessionId);

            // Navigate to the session page with systemPrompt and sessionId in state or just the context
            // We'll use context for simplicity as we already setSessionId there.
            // We need to pass systemPrompt as well.
            navigate(`/interview/session/${newSessionId}`, { state: { systemPrompt } });
        } catch (error) {
            console.error(error);
            toast.error("Failed to initialize interview.");
        } finally {
            setLoading(false);
        }
    };

    const toggleVideo = () => setIsCameraEnabled(!isCameraEnabled);

    return (<>
            <div className="min-h-screen dark:bg-[#07070a] bg-gray-50 dark:text-gray-100 text-gray-900 transition-colors font-sans selection:bg-indigo-500/30 pb-20">
                {/* Tabs Header */}
                <div className="w-full mx-auto sticky top-0 dark:bg-zinc-950 bg-white px-6 pt-2">
                    <div className="flex items-center space-x-8 border-b dark:border-white/10 border-black/10 mb-8">
                        <button 
                            onClick={() => setActiveTab("create")}
                            className={` text-sm font-semibold transition-colors cursor-pointer px-4 py-2 relative ${activeTab === 'create' ? 'text-white  bg-indigo-500 rounded-t-lg ' : 'dark:text-zinc-500 text-gray-500 dark:hover:text-zinc-300 hover:text-gray-700'}`}
                        >
                            Create Interview
                            {activeTab === 'create' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-t-full"></span>}
                        </button>
                        <button 
                            onClick={() => setActiveTab("past")}
                            className={` text-sm font-semibold transition-colors cursor-pointer px-4 py-2 relative ${activeTab === 'past' ? 'text-white  bg-indigo-500 rounded-t-lg ' : 'dark:text-zinc-500 text-gray-500 dark:hover:text-zinc-300 hover:text-gray-700'}`}
                        >
                            Past Interviews
                            {pastInterviews.length > 0 && (
                                <span className={`text-[10px] px-2 py-0.5 ml-2 rounded-full font-bold ${activeTab === 'past' ? 'dark:bg-black bg-white dark:text-white text-black' : 'bg-green-500 dark:text-white text-black'}`}>
                                    {pastInterviews.length}
                                </span>
                            )}
                            {activeTab === 'past' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-t-full"></span>}
                        </button>
                    </div>
                </div>

                {activeTab === "create" && (
                <div className="flex flex-col lg:flex-row  items-start justify-center  gap-12 max-w-7xl mx-auto animate-fade-in-up">
                    {/* Pre-call Preview / Green Room */}
                   
                    <div className="w-full lg:w-1/2 flex flex-col sticky top-20 space-y-3 animate-fade-in-left">
                        <h1 className="text-xl md:text-3xl font-semibold dark:text-white text-black tracking-tighter ">
                            Practice Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">with AI</span>
                        </h1>
                        <div className="relative aspect-video bg-zinc-900 rounded-3xl border border-green-500/50 overflow-hidden   group">
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
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-zinc-800 backdrop-blur-xl p-2 rounded-2xl border border-white/10 transition-opacity duration-300 shadow-2xl">
                                <button
                                    onClick={() => setIsMicEnabled(!isMicEnabled)}
                                    className={`p-3 rounded-xl transition-all cursor-pointer ${!isMicEnabled ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-zinc-700 text-white'}`}
                                >
                                    {!isMicEnabled ? <FiMicOff /> : <FiMic />}
                                </button>
                                <button
                                    onClick={toggleVideo}
                                    className={`p-3 rounded-xl  transition-all cursor-pointer ${!isCameraEnabled ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-zinc-700 text-white'}`}
                                >
                                    {!isCameraEnabled ? <FiVideoOff /> : <FiVideo />}
                                </button>
                            </div>

                            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-zinc-800 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-semibold tracking-wider text-white uppercase opacity-80">Ready to Join</span>
                            </div>
                        </div>

                       

                        <div className="dark:bg-white/5 dark:bg-black/5 bg-white/5 p-6 shadow-lg rounded-3xl border dark:border-zinc-800 border-gray-200">
                            <h3 className="text-lg font-bold dark:text-white text-black mb-2 flex items-center">
                                <FiShield className="mr-2 text-indigo-400" /> Professional Environment
                            </h3>
                            <p className="text-sm dark:text-zinc-400 text-gray-600 leading-relaxed">
                                Ensure you are in a quiet room with good lighting. Our AI interviewer will analyze both your tone and content to provide detailed feedback.
                            </p>
                        </div>
                    </div>

                    {/* Setup Form */}
                  
                    <div className="w-1/3 flex flex-col gap-6 animate-fade-in-right px-4">
                        <div className="pb-2">
                            <h2 className="text-base font-bold dark:text-white text-black mb-1">Interview details</h2>
                            <p className="dark:text-zinc-500 text-gray-500 text-sm">Give the job details you want to apply for</p>
                        </div>

                        <div className="space-y-6">
                            {/* Job Title */}
                            <div>
                                <label className="block text-sm font-semibold dark:text-white text-black mb-2">Job title</label>
                                <input
                                    name="role"
                                    value={interviewData.role || ""}
                                    onChange={handleInputChange}
                                    placeholder="Frontend Developer"
                                    className="w-full px-4 py-2.5 dark:bg-zinc-900 bg-gray-50 border dark:border-zinc-800 border-gray-200 rounded-xl dark:text-white text-black focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none text-sm dark:placeholder-zinc-500 placeholder-gray-400 shadow-sm"
                                />
                            </div>

                            <hr className="dark:border-white/5 border-black/5" />

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-semibold dark:text-white text-black">Context source</label>
                                    <div className="flex dark:bg-zinc-900 bg-gray-50 rounded-lg p-1 border dark:border-zinc-800 border-gray-200 w-fit shadow-sm">
                                        <button 
                                            onClick={() => setInputType('jobDescription')}
                                            className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition-colors ${inputType === 'jobDescription' ? 'dark:bg-zinc-700 bg-gray-200 dark:text-white text-black shadow-sm' : 'dark:text-zinc-500 text-gray-500 dark:hover:text-zinc-300 hover:text-gray-700'}`}
                                        >
                                            Job Description
                                        </button>
                                        <button 
                                            onClick={() => setInputType('resume')}
                                            className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition-colors ${inputType === 'resume' ? 'dark:bg-zinc-700 bg-gray-200 dark:text-white text-black shadow-sm' : 'dark:text-zinc-500 text-gray-500 dark:hover:text-zinc-300 hover:text-gray-700'}`}
                                        >
                                            Resume
                                        </button>
                                        <button 
                                            onClick={() => setInputType('both')}
                                            className={`px-4 py-1.5 text-[11px] font-semibold rounded-md transition-colors ${inputType === 'both' ? 'dark:bg-zinc-700 bg-gray-200 dark:text-white text-black shadow-sm' : 'dark:text-zinc-500 text-gray-500 dark:hover:text-zinc-300 hover:text-gray-700'}`}
                                        >
                                            Both
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Text Areas based on toggle */}
                                    {(inputType === 'jobDescription' || inputType === 'both') && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <label className="block text-sm font-semibold dark:text-white text-black">Paste the job description here</label>
                                            </div>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                rows="4"
                                                placeholder="e.g. We are seeking a React.js Developer to join our dynamic team in..."
                                                className="w-full p-4 dark:bg-zinc-900 bg-gray-50 border dark:border-zinc-800 border-gray-200 rounded-xl dark:text-white text-black focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none resize-none text-sm dark:placeholder-zinc-600 placeholder-gray-500 shadow-sm"
                                            ></textarea>
                                        </div>
                                    )}

                                    {(inputType === 'resume' || inputType === 'both') && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <label className="block text-sm font-semibold dark:text-white text-black">Paste your resume text here</label>
                                            </div>
                                            <textarea
                                                value={resumeContent}
                                                onChange={(e) => setResumeContent(e.target.value)}
                                                rows="4"
                                                placeholder="Paste your core resume points, skills, and experience..."
                                                className="w-full p-4 dark:bg-zinc-900 bg-gray-50 border dark:border-zinc-800 border-gray-200 rounded-xl dark:text-white text-black focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none resize-none text-sm dark:placeholder-zinc-600 placeholder-gray-500 shadow-sm"
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <hr className="dark:border-white/5 border-black/5" />

                            {/* Experience Level */}
                            <div>
                                <label className="block text-sm font-semibold dark:text-white text-black mb-2">Experience level</label>
                                <select
                                    name="level"
                                    value={interviewData.level || "Junior"}
                                    onChange={handleInputChange}
                                    className="w-full md:w-1/2 px-4 py-2.5 dark:bg-zinc-900 bg-gray-50 border dark:border-zinc-800 border-gray-200 rounded-xl dark:text-white text-black focus:ring-1 focus:ring-indigo-500/50 outline-none text-sm appearance-none shadow-sm"
                                >
                                    <option value="Junior">Entry Level</option>
                                    <option value="Mid-Level">Mid-Level Associate</option>
                                    <option value="Senior">Senior Professional</option>
                                    <option value="Architect">Architect / Lead</option>
                                </select>
                            </div>

                            <hr className="dark:border-white/5 border-black/5" />

                            {/* Interview Types (Radio List) */}
                            <div className="space-y-5 pt-1">
                                {/* Technical */}
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className={`mt-0.5 flex flex-shrink-0 items-center justify-center w-4 h-4 rounded-full border transition-colors ${interviewData.interviewType === 'technical' ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 dark:bg-zinc-800 bg-gray-100'}`}>
                                        {interviewData.interviewType === 'technical' && <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>}
                                    </div>
                                    <input type="radio" className="hidden" name="interviewType" value="technical" onChange={() => setInterviewData(p => ({ ...p, interviewType: 'technical' }))} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[15px] dark:text-zinc-100 text-gray-900 font-bold">Technical</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-medium whitespace-nowrap">Problem solving</span>
                                        </div>
                                        <p className="text-sm dark:text-zinc-400 text-gray-600 font-medium">Test your expertise and problem-solving skills</p>
                                        
                                      
                                    </div>
                                </label>

                                {/* Behavioral */}
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className={`mt-0.5 flex flex-shrink-0 items-center justify-center w-4 h-4 rounded-full border transition-colors ${interviewData.interviewType === 'behavioral' ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 dark:bg-zinc-800 bg-gray-100'}`}>
                                        {interviewData.interviewType === 'behavioral' && <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>}
                                    </div>
                                    <input type="radio" className="hidden" name="interviewType" value="behavioral" onChange={() => setInterviewData(p => ({ ...p, interviewType: 'behavioral' }))} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[15px] dark:text-zinc-100 text-gray-900 font-bold">Behavioral</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-medium whitespace-nowrap">Soft skills</span>
                                        </div>
                                        <p className="text-sm dark:text-zinc-400 text-gray-600 font-medium">Evaluate your experiences and interpersonal skills</p>
                                    </div>
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={startInterview}
                                    disabled={loading}
                                    className="w-full md:w-auto px-10 bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white  font-semibold py-3 rounded-xl transition-all inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500/50 shadow-md"
                                >
                                    {loading ? (
                                        <><FiLoader className="animate-spin mr-2" /> Starting...</>
                                    ) : (
                                        "Start Interview"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                   
                </div>
                )}

                {/* Past Interviews Section */}
                {activeTab === "past" && (
                    <div className="max-w-6xl mx-auto px-6 w-full animate-fade-in-up mt-2  rounded-xl p-6 border dark:border-white/5 border-black/5 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold dark:text-white text-black">Interviews</h2>
                            <button
                                onClick={() => setActiveTab("create")}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer font-semibold py-2 px-4 rounded-xl shadow-lg transition-all"
                            >
                                Create interview
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-xl border dark:border-white/5 border-black/5 dark:bg-[#1a1a1a]/40 bg-gray-100/40">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b dark:border-white/5 border-black/5 dark:text-zinc-400 text-gray-600 text-xs font-medium dark:bg-[#1a1a1a]/50 bg-gray-100/50">
                                            <th className="px-6 py-4 font-medium">Interviewer</th>
                                            <th className="px-6 py-4 font-medium">Job Title</th>
                                            <th className="px-6 py-4 font-medium">Interview Type</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium">Created</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {currentInterviews.map((session) => (
                                            <tr 
                                                key={session._id} 
                                                onClick={() => navigate(`/interview/result/${session._id}`)}
                                                className="border-b dark:border-white/5 border-black/5 dark:bg-[#1a1a1a]/50 bg-gray-100/50 dark:hover:bg-[#1a1a1a]  hover:bg-white transition-colors cursor-pointer group"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src="https://ui-avatars.com/api/?name=Rohan&background=6366f1&color=fff" alt="Rohan" className="w-8 h-8 rounded-full border dark:border-zinc-700 border-gray-300" />
                                                        <span className="dark:text-zinc-200 text-gray-800 font-medium group-hover:text-indigo-400 transition-colors">Rohan</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="dark:text-white text-black font-medium">{session.metadata?.role || "Interview Session"}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="dark:text-zinc-300 text-gray-700 capitalize">{session.interviewType}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 text-[11px] font-semibold rounded-md ${
                                                        session.status === "completed"
                                                            ? "dark:bg-[#253321] dark:text-[#93dc65] bg-green-600  text-white  border dark:border-[#3e5338]"
                                                            : "dark:bg-yellow-500/10 dark:text-yellow-400 border bg-yellow-500 text-white dark:border-yellow-500/20"
                                                    }`}>
                                                        {session.status === "completed" ? "Completed" : "Incomplete"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 dark:text-zinc-300 text-gray-700 font-medium truncate max-w-[120px]">
                                                    {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="dark:text-zinc-500 text-gray-500 dark:hover:text-white hover:text-black transition-colors p-2" onClick={(e) => e.stopPropagation()}>
                                                        <FiMoreVertical size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 flex items-center justify-between border-t dark:border-white/5 border-black/5 dark:bg-[#1a1a1a]/40 bg-gray-100/40">
                                <p className="text-xs dark:text-zinc-400 text-gray-600 font-medium">
                                    Showing {pastInterviews.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, pastInterviews.length)} of {pastInterviews.length} results
                                </p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 text-xs font-semibold rounded-lg dark:bg-zinc-800/80 bg-gray-200/80 dark:text-zinc-300 text-gray-700 dark:hover:bg-zinc-700 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border dark:border-white/5 border-black/5"
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="px-4 py-2 text-xs font-semibold rounded-lg dark:bg-zinc-800/80 bg-gray-200/80 dark:text-zinc-300 text-gray-700 dark:hover:bg-zinc-700 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border dark:border-white/5 border-black/5"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                        {pastInterviews.length === 0 && (
                            <div className="py-12 text-center dark:text-zinc-500 text-gray-500 flex flex-col items-center">
                                <span className="text-sm">No past interviews found. Start your first session now!</span>
                                <button onClick={() => setActiveTab("create")} className="mt-4 text-indigo-400 font-semibold hover:text-indigo-300">Create Session</button>
                            </div>
                        )}
                    </div>
                )}
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
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
    </>
        
    );
};

export default InterviewSetup;
