"use client";

import { useState } from "react";
import HeroStats from "@/components/HeroStats";
import BrandAnalysis from "@/components/BrandAnalysis";
import TopVideos from "@/components/TopVideos";
import TikTokSearch from "@/components/TikTokSearch";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

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
      </div>

      {/* Search Bar */}
      <TikTokSearch />

      {/* Navigation Tabs */}
      <nav className="w-full max-w-xl mx-auto flex justify-center space-x-2 mt-4 z-10 sticky top-4">
        <div className="bg-[#1e1e1e]/80 backdrop-blur-md rounded-full p-1.5 flex shadow-xl border border-white/5">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "home"
              ? "bg-gradient-to-r from-orange-500 to-green-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "dashboard"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("hall_of_fame")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "hall_of_fame"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              : "text-slate-400 hover:text-white"
              }`}
          >
            Hall of Fame
          </button>
        </div>
      </nav>

      {/* Tab Content Rendering */}
      <div className="w-full relative z-10 mt-6 flex-1 flex flex-col animate-in fade-in duration-500">
        {activeTab === "home" && <HeroStats />}
        {activeTab === "dashboard" && <BrandAnalysis />}
        {activeTab === "hall_of_fame" && <TopVideos />}
      </div>
    </main>
  );
}
