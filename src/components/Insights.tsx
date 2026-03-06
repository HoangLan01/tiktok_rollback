import { AccountData } from "@/lib/mock-data";
import { Lightbulb, TrendingUp, Sparkles } from "lucide-react";

type Props = {
    data: AccountData["insights"];
};

export default function Insights({ data }: Props) {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-transparent w-full max-w-xl mx-auto pb-16">
            {/* Header */}
            <div className="w-full mb-8 relative">
                <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-bold tracking-widest text-emerald-400/80 uppercase">
                        Tips for 2026
                    </span>
                </div>
                <h2 className="text-[32px] font-bold tracking-tight text-white mb-2 leading-tight">
                    Chiến lược <span className="text-emerald-400">bứt phá</span>
                </h2>
                <p className="text-xs text-slate-400">Dữ liệu phân tích độc quyền xây dựng từ báo cáo 2025</p>
            </div>

            {/* Hero Advice Card */}
            <div className="w-full bg-[#1e1e1e]/60 border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg">
                {/* Glow behind the bulb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="flex items-start space-x-4 relative z-10">
                    <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0 mt-1 shadow-inner border border-emerald-500/20">
                        <Lightbulb className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white mb-2 tracking-wide">LỜI KHUYÊN DÀNH TRỌNG TÂM</h3>
                        <p className="text-[15px] text-slate-300 leading-relaxed font-light">
                            {data.futureTip}
                        </p>
                    </div>
                </div>
            </div>

            {/* Green Zones Section */}
            <div className="w-full">
                <div className="flex items-center space-x-2 mb-4 pl-1">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase">
                        Vùng xanh cơ hội
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {data.greenZones.map((zone, idx) => (
                        <div
                            key={idx}
                            className="bg-[#1e1e1e]/40 border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1e1e1e]/60 transition-colors"
                        >
                            {/* Left: Topic & Video Count */}
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-white mb-1">
                                    {zone.topic}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">
                                    Đã thực hiện: <span className="text-slate-300">{zone.videoCount} videos</span>
                                </span>
                            </div>

                            {/* Right: Engagement & Growth */}
                            <div className="flex items-center gap-6 sm:justify-end">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                                        Avg Engagement
                                    </span>
                                    <span className="text-sm font-semibold text-slate-300">
                                        {zone.avgEngagement}
                                    </span>
                                </div>

                                <div className="w-[1px] h-8 bg-slate-700/50 hidden sm:block"></div>

                                <div className="flex flex-col items-end min-w-[70px]">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                                        Growth
                                    </span>
                                    <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                        {zone.potentialGrowth}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
