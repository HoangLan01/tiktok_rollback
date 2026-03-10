import { useEffect, useState, useCallback } from "react";
import { X, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  tabs: string[];
  activeTabIndex: number;
  durationPerSlide?: number; // MS, e.g., 7000
  onComplete: () => void;
  onNextSlide: (nextIndex: number) => void;
  onClose: () => void;
};

export default function StoryProgress({
  tabs,
  activeTabIndex,
  durationPerSlide = 7000,
  onComplete,
  onNextSlide,
  onClose,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    if (activeTabIndex < tabs.length - 1) {
      onNextSlide(activeTabIndex + 1);
    } else {
      onComplete();
    }
  }, [activeTabIndex, tabs.length, onNextSlide, onComplete]);

  const handlePrev = useCallback(() => {
    if (activeTabIndex > 0) {
      onNextSlide(activeTabIndex - 1);
    }
  }, [activeTabIndex, onNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.key === "Spacebar") {
        setIsPaused(p => !p);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  useEffect(() => {
    if (isPaused) return;

    // Reset progress when slide changes
    setProgress(0);

    const updateInterval = 50; // Update 20 times a second for smooth animation
    const increment = (updateInterval / durationPerSlide) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          handleNext();
          return 100;
        }
        return next;
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [activeTabIndex, isPaused, durationPerSlide, handleNext, tabs.length]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-between">
      {/* Top Bar with Progress Indicators */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-4 flex items-center space-x-1 pointer-events-auto">
        {tabs.map((_, idx) => {
          let barWidth = "0%";
          if (idx < activeTabIndex) barWidth = "100%";
          else if (idx === activeTabIndex) barWidth = `${progress}%`;

          return (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{ width: barWidth }}
              />
            </div>
          );
        })}
      </div>

      {/* Close & Pause Controls */}
      <div className="absolute top-8 right-4 flex items-center space-x-3 pointer-events-auto">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition"
          title="Tạm dừng/Tiếp tục (Phím Space)"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition"
          title="Đóng (Phím Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Invisible clickable areas for manual navigation & Visible Navigation Buttons */}
      <div className="absolute inset-0 top-20 pointer-events-auto flex items-center">
        {/* Left Side: Go Back */}
        <div
          className="w-1/4 h-full cursor-w-resize group flex items-center justify-start pl-4 sm:pl-8"
          onClick={handlePrev}
          title="Quay lại (Phím mũi tên trái)"
        >
          <button className="p-3 bg-black/20 text-white rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ChevronLeft className="w-8 h-8 opacity-70 group-hover:opacity-100" />
          </button>
        </div>

        {/* Middle/Pause Overlay (hold to pause, click to play) */}
        <div
          className="flex-1 h-full cursor-pointer"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />

        {/* Right Side: Go Forward */}
        <div
          className="w-1/4 h-full cursor-e-resize group flex items-center justify-end pr-4 sm:pr-8"
          onClick={handleNext}
          title="Tiếp theo (Phím mũi tên phải)"
        >
          <button className="p-3 bg-black/20 text-white rounded-full hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
            <ChevronRight className="w-8 h-8 opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
