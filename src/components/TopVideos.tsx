import { topVideos } from "@/lib/mock-data";
import { Eye, Heart, MessageCircle, CalendarIcon, Repeat2 } from "lucide-react";

export default function TopVideos() {
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

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-transparent w-full max-w-xl mx-auto pb-16">
            {/* Header */}
            <div className="w-full mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <span>👑</span>
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                        Hall of Fame
                    </span>
                </div>
                <h2 className="text-[32px] font-bold tracking-tight text-white mb-2 leading-tight">
                    Top 5 video <span className="text-[#f59e0b]">huyền thoại</span>
                </h2>
            </div>

            {/* Video List */}
            <div className="w-full flex flex-col space-y-4">
                {topVideos.map((video) => (
                    <div
                        key={video.id}
                        className="flex items-center bg-[#1e1e1e]/60 border border-white/5 rounded-[20px] p-5 w-full"
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
                            {/* Title */}
                            <h3 className="text-base font-bold text-white tracking-wide truncate w-full">
                                {video.title}
                            </h3>

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
                                        {video.hasCrown && <span>👑</span>}
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
                ))}
            </div>
        </div>
    );
}
