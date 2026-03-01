"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    onSearch: (query: string) => void;
};

export default function TikTokSearch({ onSearch }: Props) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim() || isLoading) return;

        setIsLoading(true);
        // Simulate API fetch delay
        setTimeout(() => {
            setIsLoading(false);
            onSearch(query);
        }, 2000); // reduced from 3s to 2s for better UX
    };

    return (
        <div className="w-full flex justify-center z-10 my-4 px-4 relative mt-12 mb-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                <form
                    onSubmit={handleSearch}
                    className={`flex items-center w-full bg-white/5 backdrop-blur-xl border rounded-full transition-all duration-300 overflow-hidden ${isFocused
                        ? "border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.3)] bg-white/10"
                        : "border-white/10 hover:border-white/30"
                        }`}
                >
                    <div className="pl-6 pr-3 py-4 flex items-center justify-center pointer-events-none">
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 text-[#22C55E] animate-spin" />
                        ) : (
                            <Search
                                className={`w-6 h-6 transition-colors duration-300 ${isFocused ? "text-[#22C55E]" : "text-slate-400"
                                    }`}
                            />
                        )}
                    </div>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={isLoading}
                        placeholder="Nhập link kênh hoặc tên kênh TikTok..."
                        className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-base disabled:opacity-50 h-full py-4"
                    />

                    <div className="pr-2 lg:pr-3 py-2">
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isLoading || !query.trim()
                                ? "bg-white/10 text-slate-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#22C55E] to-emerald-400 text-white shadow-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                }`}
                        >
                            Phân tích
                        </button>
                    </div>
                </form>

                {/* Loading Text */}
                <div className="h-6 mt-3 text-center">
                    {isLoading && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-[#22C55E] font-medium tracking-wide animate-pulse"
                        >
                            Đang thu thập dữ liệu từ TikTok...
                        </motion.p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
