import { useState } from "react";
import { AccountData } from "@/lib/mock-data";
import { Eye, Heart, MessageCircle, CalendarIcon, Repeat2, TrendingUp, Users, Target, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    videos: AccountData["topVideos"];
};

export default function TopVideos({ videos }: Props) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const getBadgeStyle = (tag: string) => {
        switch (tag) {
            case "STORYTELLING":
                return "bg-[#856b17]/30 text-[#eab308]";
            case "LIFESTYLE":
                return "bg-[#831843]/40 text-[#f472b6]";
            case "DRAMA":
                return "bg-[#7f1d1d]/40 text-[#fca5a5]";
            case "SPONSORED":
                return "bg-[#064e3b]/50 text-[#34d399]";
            case "PHẢN BIỆN":
                return "bg-[#1e3a8a]/50 text-[#93c5fd]";
            default:
                return "bg-slate-800 text-slate-300";
        }
    };

    const getRankColor = (id: string) => {
        switch (id) {
            case "01":
                return "text-[#f59e0b]";
            case "02":
                return "text-[#f8fafc]";
            case "03":
                return "text-[#c084fc]";
            case "04":
                return "text-[#64748b]";
            case "05":
                return "text-[#475569]";
            default:
                return "text-slate-500";
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-transparent w-full max-w-xl mx-auto pb-16">
            {/* Header */}
            <div className="w-full mb-6 relative">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-amber-500">👑</span>
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        Hall of Fame
                    </span>
                </div>
                <h2 className="text-[32px] font-bold tracking-tight text-white mb-2 leading-tight">
                    Top 5 video <span className="text-[#f59e0b]">huyền thoại</span>
                </h2>
                <p className="text-xs text-slate-400">Nhấn vào từng video để xem phân tích Viral Logic</p>
            </div>

            {/* Video List */}
            <div className="w-full flex flex-col space-y-4">
                {videos.map((video) => {
                    const isExpanded = expandedId === video.id;
                    return (
                        <div key={video.id} className="flex flex-col w-full">
                            {/* Main Card (Clickable) */}
                            <div
                                onClick={() => toggleExpand(video.id)}
                                className={`flex items-center bg-[#1e1e1e]/80 border ${isExpanded ? 'border-slate-500/50' : 'border-white/5'} hover:border-slate-500/30 rounded-[20px] p-5 w-full cursor-pointer transition-all duration-300 relative z-10 shadow-lg`}
                            >
                                {/* Left: Rank Number */}
                                <div className="w-[72px] flex justify-start shrink-0">
                                    <span
                                        className={`text-4xl font-black font-mono tracking-tighter ${getRankColor(
                                            video.id
                                        )}`}
                                    >
                                        {video.id}
                                    </span>
                                </div>

                                {/* Right: Content Block */}
                                <div className="flex flex-col flex-1 pl-1 justify-center space-y-2.5 overflow-hidden">
                                    {/* Title & Chevron */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold text-white tracking-wide truncate w-full pr-2">
                                            {video.title}
                                        </h3>
                                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Stats Line 1: Views, Likes + Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-[13px] font-medium text-slate-300">
                                            {/* Views */}
                                            <div className="flex items-center space-x-1.5">
                                                <Eye className="w-4 h-4 text-slate-400" />
                                                <span>{video.views}</span>
                                            </div>
                                            {/* Likes */}
                                            <div className="flex items-center space-x-1.5">
                                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                                <span>{video.likes}</span>
                                                {video.hasCrown && <span className="text-amber-500 text-xs shadow-sm">👑</span>}
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        <span
                                            className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shrink-0 ml-2 ${getBadgeStyle(
                                                video.tags[0]
                                            )}`}
                                        >
                                            {video.tags[0]}
                                        </span>
                                    </div>

                                    {/* Stats Line 2: Comments/Shares, Date */}
                                    <div className="flex items-center space-x-4 text-[13px] font-medium text-slate-400">
                                        {/* Comments / Shares */}
                                        {video.comments !== "0" ? (
                                            <div className="flex items-center space-x-1.5">
                                                <MessageCircle className="w-4 h-4 fill-slate-300 text-slate-300" />
                                                <span>{video.comments}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-1.5">
                                                <Repeat2 className="w-4 h-4 text-sky-400" />
                                                <span>{video.shares}</span>
                                            </div>
                                        )}
                                        {/* Date */}
                                        <div className="flex items-center space-x-2 pl-3">
                                            <CalendarIcon className="w-[14px] h-[14px] text-slate-400" />
                                            <span>{video.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Viral Logic Section */}
                            <AnimatePresence>
                                {isExpanded && video.viralLogic && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: "auto", opacity: 1, marginTop: -15 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden relative z-0"
                                    >
                                        <div className="bg-slate-800/50 backdrop-blur-md pt-8 pb-4 px-6 rounded-b-[20px] border border-t-0 border-white/5 mx-2 shadow-inner">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div className="w-1 h-3 bg-cyan-400 rounded-full"></div>
                                                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                                                    Phân Tích Viral Logic
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
                                                {/* Metric 1 */}
                                                <div className="flex items-center justify-between bg-[#111111]/40 rounded-lg p-2.5">
                                                    <div className="flex items-center space-x-2 text-slate-300">
                                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                                        <span className="text-xs font-medium">Tốc độ 24h đầu</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-green-400">
                                                        {video.viralLogic.growth24h}
                                                    </span>
                                                </div>

                                                {/* Metric 2 */}
                                                <div className="flex items-center justify-between bg-[#111111]/40 rounded-lg p-2.5">
                                                    <div className="flex items-center space-x-2 text-slate-300">
                                                        <Users className="w-4 h-4 text-blue-400" />
                                                        <span className="text-xs font-medium">Tỷ lệ giữ chân ước tính</span>
                                                    </div>
                                                    <span className="text-sm font-bold text-blue-400">
                                                        {video.viralLogic.retentionRate}
                                                    </span>
                                                </div>

                                                {/* Metric 3 */}
                                                <div className="flex items-center justify-between bg-[#111111]/40 rounded-lg p-2.5">
                                                    <div className="flex items-center space-x-2 text-slate-300">
                                                        <Target className="w-4 h-4 text-purple-400" />
                                                        <span className="text-xs font-medium">Từ khóa Hook</span>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-md border border-purple-500/20">
                                                        {video.viralLogic.keyHook}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
