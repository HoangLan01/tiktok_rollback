"use client";

import { useState } from "react";
import HeroStats from "@/components/HeroStats";
import BrandAnalysis from "@/components/BrandAnalysis";
import TopVideos from "@/components/TopVideos";
import TikTokSearch from "@/components/TikTokSearch";
import Insights from "@/components/Insights";
import { accountsData } from "@/lib/mock-data";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentAccount, setCurrentAccount] = useState("vietchop");

  const handleSearch = (query: string) => {
    // Basic lookup logic based on text match
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("blossominn")) {
      setCurrentAccount("blossominn");
    } else if (lowerQuery.includes("vietchop") || lowerQuery.includes("chú tùng")) {
      setCurrentAccount("vietchop");
    } else {
      // If none match, you either show alert or default to one
      // For this spec, we will default nicely to blossominn if "bloss" is typed, else do nothing to keep current view
      if (lowerQuery.includes("bloss")) {
        setCurrentAccount("blossominn");
      }
    }
  };

  const currentData = accountsData[currentAccount];

  return (
    <main className="min-h-screen bg-[#111111] text-white flex flex-col items-center overflow-x-hidden relative">
      {/* Background Glow Effects (Transparency matching active tab) */}
      <div className="fixed inset-0 pointer-events-none w-full h-full overflow-hidden z-0">
        {/* Glow for Home */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === "home" ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Main Title Center */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-r from-orange-500/20 to-green-500/20 blur-[120px]" />
          {/* Likes (Rose) */}
          <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-rose-500/15 blur-[100px]" />
          {/* Shares (Cyan) */}
          <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-cyan-400/15 blur-[100px]" />
          {/* Saves (Purple) */}
          <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] bg-purple-500/15 blur-[100px]" />
          {/* Videos (Emerald) */}
          <div className="absolute bottom-[10%] right-[30%] w-[300px] h-[300px] bg-emerald-500/15 blur-[100px]" />
        </div>

        {/* Glow for Dashboard */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === "dashboard" ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Title (Cyan) */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-cyan-500/20 blur-[120px]" />
          {/* Middle/Left (Red/Kia + Blue/Lexus) */}
          <div className="absolute top-[45%] left-[10%] w-[400px] h-[400px] bg-red-500/15 blur-[100px]" />
          {/* Bottom/Right (Orange/LynkCo + Yellow/Porsche) */}
          <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-orange-500/15 blur-[100px]" />
        </div>

        {/* Glow for Hall of Fame */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === "hall_of_fame" ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Top/Crown (Amber) */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-amber-500/20 blur-[120px]" />
          {/* Tags (Pink/Lifestyle) */}
          <div className="absolute top-[40%] left-[15%] w-[350px] h-[350px] bg-pink-500/15 blur-[100px]" />
          {/* Tags (Red/Drama & Blue/Sponsored) */}
          <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] bg-blue-500/15 blur-[100px]" />
        </div>

        {/* Glow for Insights */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${activeTab === "insights" ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Center Title Glow (Emerald/Teal) */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-emerald-500/20 blur-[120px]" />
          {/* Bottom/Left (Green/Teal for Green Zones) */}
          <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] bg-teal-500/15 blur-[100px]" />
        </div>
      </div>

      {/* Search Bar */}
      <TikTokSearch onSearch={handleSearch} />

      {/* Navigation Tabs */}
      <nav className="w-full max-w-2xl mx-auto flex justify-center space-x-2 mt-4 z-10 sticky top-4 px-4 overflow-x-auto no-scrollbar pb-2">
        <div className="bg-[#1e1e1e]/80 backdrop-blur-md rounded-full p-1.5 flex shadow-xl border border-white/5 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${activeTab === "home"
              ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${activeTab === "dashboard"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("hall_of_fame")}
            className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${activeTab === "hall_of_fame"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Hall of Fame
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 flex items-center gap-1.5 ${activeTab === "insights"
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            ✨ Tips for 2026
          </button>
        </div>
      </nav>

      {/* Tab Content Rendering */}
      <div className="w-full relative z-10 mt-6 flex-1 flex flex-col animate-in fade-in duration-500">
        {activeTab === "home" && <HeroStats stats={currentData.channelStats} />}
        {activeTab === "dashboard" && <BrandAnalysis data={currentData.brandAnalysis} config={currentData.analysisConfig} peakTime={currentData.peakTimeAnalysis} />}
        {activeTab === "hall_of_fame" && <TopVideos videos={currentData.topVideos} />}
        {activeTab === "insights" && <Insights data={currentData.insights} />}
      </div>
    </main>
  );
}
