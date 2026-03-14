import { motion } from "framer-motion";
import { Users, Eye, Heart, TrendingUp, Clock, Flame } from "lucide-react";

import { AccountData } from "@/lib/mock-data";

type Props = {
  account1Data: AccountData;
  account1Name: string;
  account2Data: AccountData;
  account2Name: string;
};

// Helper to convert string numbers (like "1.8M", "85K") to actual numbers for comparison
const parseNumber = (val: string) => {
  const cleanVal = val.replace(/,/g, '');
  if (cleanVal.includes('M')) return parseFloat(cleanVal) * 1000000;
  if (cleanVal.includes('K')) return parseFloat(cleanVal) * 1000;
  if (cleanVal.includes('%')) return parseFloat(cleanVal);
  return parseFloat(cleanVal) || 0;
};

// Component for the "VS Progress Bar"
const VSBar = ({ label, val1, val2, icon: Icon, color1, color2, overrideDisplay1, overrideDisplay2 }: any) => {
  const n1 = parseNumber(val1);
  const n2 = parseNumber(val2);
  const total = n1 + n2;
  const pct1 = total === 0 ? 50 : (n1 / total) * 100;
  const pct2 = 100 - pct1;

  // Determine winner for subtle text highlight
  const is1Winner = n1 > n2;
  const is2Winner = n2 > n1;

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className={`text-sm font-bold ${is1Winner ? 'text-white' : 'text-slate-400'}`}>
          {overrideDisplay1 || val1}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full">
            <Icon className="w-3.5 h-3.5" />
            {label}
        </div>
        <span className={`text-sm font-bold ${is2Winner ? 'text-white' : 'text-slate-400'}`}>
          {overrideDisplay2 || val2}
        </span>
      </div>
      
      {/* The actual VS Bar */}
      <div className="h-4 w-full bg-white/5 rounded-full flex overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct1}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color1} relative`}
        >
            <div className="absolute inset-0 bg-white/10 w-full animate-[shimmer_2s_infinite]"></div>
        </motion.div>
        
        {/* The VS separator */}
        <div className="w-1.5 h-full bg-[#111] z-10 -ml-[0.75px] -mr-[0.75px] transform skew-x-[-15deg]"></div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct2}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color2} relative`}
        >
             <div className="absolute inset-0 bg-white/10 w-full animate-[shimmer_2s_infinite_reverse]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default function AccountComparison({ account1Data, account1Name, account2Data, account2Name }: Props) {
  // Brand colors for the two accounts (simulated for visual contrast)
  const color1 = "bg-gradient-to-r from-orange-500 to-rose-500"; // VietChop (Warm/Food)
  const color2 = "bg-gradient-to-r from-cyan-500 to-blue-500";   // Blossominn (Cool/Lifestyle)

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400 inline-flex items-center gap-3">
          <Flame className="w-8 h-8 text-rose-500" />
          Head-to-Head Analysis
          <Flame className="w-8 h-8 text-blue-500" />
        </h2>
        <p className="text-slate-400 mt-2 text-sm">Direct performance comparison based on current analytics data.</p>
      </div>

      {/* Main Comparison Container */}
      <div className="relative bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-rose-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>

        {/* Competitor Names Row */}
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
            <div className="flex flex-col items-start">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-rose-600 mb-2 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                    {account1Name.charAt(0)}
                 </div>
                 <h3 className="text-xl sm:text-2xl font-bold text-white">{account1Name}</h3>
                 <span className="text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded mt-1">Challenger 1</span>
            </div>

            <div className="flex flex-col items-center justify-center px-4">
                <span className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 drop-shadow-md">
                    VS
                </span>
            </div>

            <div className="flex flex-col items-end">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mb-2 flex items-center justify-center text-xl font-bold border-2 border-white/20 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                     {account2Name.charAt(0)}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{account2Name}</h3>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded mt-1">Challenger 2</span>
            </div>
        </div>

        {/* The VS Bars Section */}
        <div className="space-y-2">
            <VSBar 
                label="Total Views" 
                icon={Eye}
                val1={account1Data.channelStats.totalViews} 
                val2={account2Data.channelStats.totalViews} 
                color1={color1} 
                color2={color2} 
            />
            <VSBar 
                label="Total Likes" 
                icon={Heart}
                val1={account1Data.channelStats.likes} 
                val2={account2Data.channelStats.likes} 
                color1={color1} 
                color2={color2} 
            />
            <VSBar 
                label="Total Videos" 
                icon={Flame}
                val1={account1Data.channelStats.totalVideos.toString()} 
                val2={account2Data.channelStats.totalVideos.toString()} 
                color1={color1} 
                color2={color2} 
            />
            <VSBar 
                label="Total Shares" 
                icon={TrendingUp}
                val1={account1Data.channelStats.shares} 
                val2={account2Data.channelStats.shares} 
                color1={color1} 
                color2={color2} 
            />
            <VSBar 
                label="Total Saves" 
                icon={Users}
                val1={account1Data.channelStats.saves} 
                val2={account2Data.channelStats.saves} 
                color1={color1} 
                color2={color2} 
            />
        </div>

        {/* Specific Differences (Cards) */}
        <div className="mt-10 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-rose-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Clock className="w-16 h-16 text-rose-500" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-rose-400 font-bold text-sm tracking-wide">{account1Name} Peak</span>
                </div>
                <div className="text-2xl font-black text-white">{account1Data.peakTimeAnalysis.bestHour}</div>
                <p className="text-xs text-slate-400 mt-1">Avg. {account1Data.peakTimeAnalysis.avgViewsInPeak} views during this window.</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <Clock className="w-16 h-16 text-blue-500" />
                </div>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400 font-bold text-sm tracking-wide">{account2Name} Peak</span>
                </div>
                <div className="text-2xl font-black text-white">{account2Data.peakTimeAnalysis.bestHour}</div>
                <p className="text-xs text-slate-400 mt-1">Avg. {account2Data.peakTimeAnalysis.avgViewsInPeak} views during this window.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
