import { AccountData } from "@/lib/mock-data";

const brandColors: Record<string, string> = {
    "VinFast": "bg-[#2dd4bf]",
    "Kia": "bg-[#ef4444]",
    "Lexus": "bg-[#3b82f6]",
    "Audi": "bg-[#a855f7]",
    "Toyota": "bg-[#f97316]",
    "Mazda": "bg-[#22c55e]",
    "BMW": "bg-[#38bdf8]",
    "Lynk & Co": "bg-[#ea580c]",
    "Porsche": "bg-[#eab308]",
    "#fyp": "bg-[#2dd4bf]",
    "#trending": "bg-[#ef4444]",
    "#duhocsinh": "bg-[#3b82f6]",
    "#uk": "bg-[#a855f7]",
    "#2025newyear": "bg-[#f97316]",
    "#cute": "bg-[#22c55e]",
    "#lifestyle": "bg-[#eab308]",
};

type Props = {
    data: AccountData["brandAnalysis"];
    config: AccountData["analysisConfig"];
};

export default function BrandAnalysis({ data, config }: Props) {
    // Max videos to calculate width percentage
    const maxVideos = Math.max(...data.map((b) => b.videoCount));

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-transparent text-white w-full max-w-xl mx-auto pb-16">
            <div className="w-full">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm">{config.icon}</span>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                        {config.title}
                    </span>
                </div>
                <h2 className="text-3xl font-bold mb-8 tracking-tight">
                    Bản đồ <span className="text-cyan-400">{config.highlightWord}</span> trên kênh
                </h2>

                {/* Bar Chart Container */}
                <div className="flex flex-col space-y-3 relative">
                    {data.map((item, idx) => {
                        const widthPct = Math.max((item.videoCount / maxVideos) * 100, 15);
                        const colorClass = brandColors[item.brand] || "bg-gray-500";

                        let isHighAvg = false;
                        // Enhanced high view detection logic
                        if (item.avgViews.includes("K")) {
                            const val = parseFloat(item.avgViews.replace("K", ""));
                            if (val > 10) isHighAvg = true; // Adjusted down for general highlighting
                        } else if (item.avgViews.includes("M")) {
                            isHighAvg = true;
                        }

                        return (
                            <div key={idx} className="flex items-center space-x-4">
                                {/* Left: Brand Name */}
                                <div className="w-20 text-right shrink-0">
                                    <span className="text-[15px] font-bold text-slate-100 break-words">
                                        {item.brand}
                                    </span>
                                </div>

                                {/* Middle: Progress Bar */}
                                <div className="flex-1 max-w-[280px] bg-zinc-800/60 rounded-md h-8 flex overflow-hidden w-full">
                                    <div
                                        className={`${colorClass} h-full rounded-md flex items-center px-3`}
                                        style={{ width: `${widthPct}%` }}
                                    >
                                        <span className="text-xs font-semibold text-white drop-shadow-sm whitespace-nowrap">
                                            {item.videoCount} videos
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Avg Views */}
                                <div className="w-24 shrink-0 flex items-center justify-start space-x-1">
                                    <span
                                        className={`text-xs ${isHighAvg
                                                ? "text-yellow-500 font-bold"
                                                : "text-slate-400 font-medium"
                                            }`}
                                    >
                                        {item.avgViews} {item.avgViews !== "-" && "avg"}
                                    </span>
                                    {isHighAvg && <span className="text-sm">🔥</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Info Card Sub-Component */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 mt-10 w-full shadow-lg">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-3">
                    <span>👀</span>
                    <span>Nhìn Này</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-wrap">
                    {config.description}
                </p>
            </div>
        </div>
    );
}
