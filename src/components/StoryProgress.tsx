import { useEffect, useState, useCallback, useRef } from "react";
import { X, Pause, Play, ChevronLeft, ChevronRight, Volume2, VolumeX, Disc3 } from "lucide-react";

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
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Audio Play/Pause Sync
  useEffect(() => {
    if (audioRef.current) {
        if (isPaused) {
            audioRef.current.pause();
        } else {
            // Attempt to play, catch potential autoplay restriction errors safely
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    console.log("Audio autoplay prevented by browser. User interaction needed.");
                });
            }
        }
    }
  }, [isPaused]);

  // Audio Mute Sync
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
      } else if (e.key.toLowerCase() === "m") {
        setIsMuted(m => !m);
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
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

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

      {/* Close & Player Controls (Top Right) */}
      <div className="absolute top-8 right-4 flex items-center space-x-3 pointer-events-auto">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition"
          title="Tật/Bật âm thanh (Phím M)"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
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

      {/* Vinyl Record Banner (Bottom Left) */}
      <div className="absolute bottom-6 left-6 pointer-events-auto flex items-center space-x-3 bg-black/40 backdrop-blur-[8px] pl-2 pr-4 py-2 rounded-full border border-white/5 shadow-2xl">
        <div className="relative w-10 h-10 rounded-full bg-[#111] border-2 border-[#222] flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {/* The Vinyl grooved texture */}
            <div className={`absolute inset-0 rounded-full border border-white/10 ${!isPaused ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                 <div className="absolute inset-[2px] rounded-full border border-white/5"></div>
                 <div className="absolute inset-[4px] rounded-full border border-white/5"></div>
                 <div className="absolute inset-[6px] rounded-full border border-white/5"></div>
            </div>
            {/* Center Label Custom Art (Generic Gradient) */}
            <div className={`w-4 h-4 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 z-10 ${!isPaused ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                {/* Spindle block */}
                <div className="absolute inset-0 m-auto w-1 h-1 bg-black rounded-full"></div>
            </div>
            <Disc3 className="w-full h-full text-white/5 absolute p-1 pointer-events-none" />
        </div>
        
        {/* Song Info Marquee */}
        <div className="flex flex-col max-w-[120px] overflow-hidden">
            <div className="flex w-max shrink-0">
                <span className={`text-[11px] font-bold text-white uppercase tracking-wider ${!isPaused ? 'animate-[marquee_6s_linear_infinite]' : ''}`}>
                    Chill Vibes - 2026 Soundtrack &nbsp;&nbsp;&nbsp;&nbsp; Chill Vibes - 2026 Soundtrack
                </span>
            </div>
            <span className="text-[9px] text-slate-400 truncate">Original Audio</span>
        </div>
      </div>

      {/* Invisible clickable areas for manual navigation & Visible Navigation Buttons */}
      <div className="absolute inset-x-0 top-20 bottom-24 pointer-events-auto flex items-stretch">
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
