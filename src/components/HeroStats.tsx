import { Heart, Share2, MessageCircle, Bookmark, PlayCircle } from "lucide-react";
import { AccountData } from "@/lib/mock-data";

type Props = {
    stats: AccountData["channelStats"];
};

export default function HeroStats({ stats }: Props) {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-transparent min-h-[500px] text-white space-y-12">
            {/* Title / Hero stat */}
            <div className="text-center flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-orange-500 from-10% via-yellow-400 via-30% to-green-500 to-90% text-transparent bg-clip-text drop-shadow-md">
                    {stats.totalViews}
                </h1>
                <p className="text-slate-400 mt-2 text-lg font-light tracking-wide">
                    {stats.titleTagline}
                </p>
            </div>

            {/* Sub Stats Row 1: Likes, Shares, Comments */}
            <div className="flex flex-row justify-center space-x-12 md:space-x-16">
                {/* Likes */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-rose-500 tracking-wide">
                        {stats.likes}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-500">
                        {/* We wouldn't render the icon in exact text area in original design but below it or together with label */}
                        <span className="text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1">
                            <Heart size={14} className="mb-[1px]" /> LIKES
                        </span>
                    </div>
                </div>

                {/* Shares */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-cyan-400 tracking-wide">
                        {stats.shares}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-500">
                        <span className="text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1">
                            <Share2 size={14} className="mb-[1px]" /> SHARES
                        </span>
                    </div>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-amber-500 tracking-wide">
                        {stats.comments}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-500">
                        <span className="text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1">
                            <MessageCircle size={14} className="mb-[1px]" /> COMMENTS
                        </span>
                    </div>
                </div>
            </div>

            {/* Sub Stats Row 2: Saves, Videos */}
            <div className="flex flex-row justify-center space-x-12 md:space-x-16">
                {/* Saves */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wide">
                        {stats.saves}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-500">
                        <span className="text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1">
                            <Bookmark size={14} className="mb-[1px]" /> SAVES
                        </span>
                    </div>
                </div>

                {/* Videos */}
                <div className="flex flex-col items-center space-y-1">
                    <span className="text-3xl md:text-4xl font-bold text-emerald-400 tracking-wide">
                        {stats.totalVideos}
                    </span>
                    <div className="flex items-center space-x-1.5 text-slate-500">
                        <span className="text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1">
                            <PlayCircle size={14} className="mb-[1px]" /> VIDEOS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
