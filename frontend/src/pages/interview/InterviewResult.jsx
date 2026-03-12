import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import {
    FiBarChart2, FiInfo, FiStar, FiAlertCircle, FiCheckCircle, FiMessageSquare, FiArrowRight
} from "react-icons/fi";
import { useInterview } from "./InterviewContext";

const InterviewResult = () => {
    const { report, transcript, resetInterview } = useInterview();
    const navigate = useNavigate();

    useEffect(() => {
        if (!report) {
            navigate("/interview/setup");
        }
    }, [report, navigate]);

    if (!report) return null;

    return (
        <Layout>
            <div className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#0a0a0f] to-[#07070a]">
                <div className="max-w-5xl mx-auto animate-fade-in">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                        <div className="p-12 border-b border-zinc-800 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-indigo-500/20">
                                        Success Analysis
                                    </div>
                                    <span className="text-zinc-600 text-xs font-medium">{new Date().toLocaleDateString()}</span>
                                </div>
                                <h1 className="text-5xl font-black text-white tracking-tighter flex items-center">
                                    <FiBarChart2 className="mr-4 text-indigo-500" />
                                    The Report
                                </h1>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative flex flex-col items-center bg-zinc-800 border-2 border-indigo-500/30 rounded-3xl p-6 min-w-[160px]">
                                    <div className="text-5xl font-black text-white italic">{report.overallScore}<span className="text-xl text-zinc-500 not-italic">/10</span></div>
                                    <div className="text-[10px] uppercase font-black text-indigo-400 tracking-widest mt-1">Overall Score</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 space-y-12">
                            <section>
                                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center">
                                    <FiInfo className="mr-2 text-indigo-500" /> Executive Summary
                                </h3>
                                <p className="text-lg text-zinc-300 bg-zinc-950/50 p-8 rounded-[32px] border border-zinc-800 leading-relaxed font-medium">
                                    {report.feedback}
                                </p>
                            </section>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-zinc-800/30 p-8 rounded-[32px] border border-indigo-500/10 group hover:border-indigo-500/30 transition-all">
                                    <h3 className="text-indigo-400 font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                                        <FiStar className="mr-2 text-indigo-500 animate-pulse" /> Areas of Dominance
                                    </h3>
                                    <ul className="space-y-4">
                                        {report.strengths?.map((s, i) => (
                                            <li key={i} className="flex items-start text-sm text-zinc-300 font-medium">
                                                <span className="text-indigo-500 mr-3 mt-1 text-xs">◆</span> {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-zinc-800/30 p-8 rounded-[32px] border border-orange-500/10 group hover:border-orange-500/30 transition-all">
                                    <h3 className="text-orange-400 font-black text-xs uppercase tracking-widest mb-6 flex items-center">
                                        <FiAlertCircle className="mr-2 text-orange-500" /> Improvement Path
                                    </h3>
                                    <ul className="space-y-4">
                                        {report.weaknesses?.map((w, i) => (
                                            <li key={i} className="flex items-start text-sm text-zinc-300 font-medium">
                                                <span className="text-orange-500 mr-3 mt-1 text-xs">◇</span> {w}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <section>
                                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center">
                                    <FiCheckCircle className="mr-2 text-indigo-500" /> Strategic Suggestions
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {report.suggestions?.map((s, i) => (
                                        <span key={i} className="bg-zinc-800 text-zinc-300 px-6 py-3 rounded-2xl text-xs font-bold border border-zinc-700 hover:border-indigo-500/50 transition-colors cursor-default">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {transcript.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center">
                                            <FiMessageSquare className="mr-2 text-indigo-500" /> Call Transcript
                                        </h3>
                                        <span className="text-[10px] font-bold text-zinc-700">{transcript.length} Messages Recorded</span>
                                    </div>
                                    <div className="bg-zinc-950/80 rounded-[32px] p-8 max-h-96 overflow-y-auto space-y-4 border border-zinc-800 scrollbar-hide">
                                        {transcript.map((msg) => (
                                            <div key={msg.id} className="text-sm border-l-2 border-zinc-800 pl-4 py-1 transition-all hover:border-indigo-500/50">
                                                <div className="flex items-center mb-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${msg.isAgent ? 'text-indigo-400' : 'text-zinc-500'}`}>
                                                        {msg.speaker}
                                                    </span>
                                                    <span className="text-[9px] text-zinc-800 ml-2">{msg.timestamp}</span>
                                                </div>
                                                <p className="text-zinc-400 font-medium leading-relaxed">{msg.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <button
                                onClick={() => {
                                    resetInterview();
                                    navigate("/interview/setup");
                                }}
                                className="w-full bg-white text-black font-black text-lg py-6 rounded-[24px] hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-3"
                            >
                                <span>Initialize New Role</span>
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InterviewResult;
