"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MediaItem } from "@/lib/products";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
  items: MediaItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  // Track which indices have been visited for lazy mounting
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  const activeItem = items[activeIndex];

  // Pause video when navigating away from it
  useEffect(() => {
    if (activeItem?.type !== "video" && videoRef.current) {
      videoRef.current.pause();
    }
  }, [activeIndex, activeItem?.type]);

  // Auto-play video when it becomes active
  useEffect(() => {
    if (activeItem?.type === "video" && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex, activeItem?.type, isMuted]);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
        setVisited(prev => {
          const next = new Set(prev);
          next.add(index);
          // Pre-mount adjacent slides
          if (index + 1 < items.length) next.add(index + 1);
          if (index - 1 >= 0) next.add(index - 1);
          return next;
        });
      }
    },
    [items.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Pre-mount adjacent slides on initial load
  useEffect(() => {
    if (items.length > 1) {
      setVisited(prev => {
        const next = new Set(prev);
        next.add(0);
        next.add(1);
        return next;
      });
    }
  }, [items.length]);

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Thumbnail Rail - Vertical on desktop, horizontal on mobile */}
      <div className="flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-2 lg:pb-0 lg:pr-2 scrollbar-hide">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={cn(
              "relative shrink-0 w-16 h-20 lg:w-20 lg:h-24 overflow-hidden border-2 transition-all duration-200",
              activeIndex === idx
                ? "border-rose-accent shadow-md"
                : "border-cream-alt hover:border-blush-primary opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={item.thumbnail}
              alt={item.alt || `Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play size={16} className="text-white fill-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Viewport */}
      <div
        className="relative order-1 lg:order-2 flex-1 aspect-[3/4] bg-cream-alt overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, idx) => {
          // Only mount visited slides (lazy loading)
          if (!visited.has(idx)) return null;

          if (item.type === "image") {
            return (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-200 ease-out",
                  activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt || "Product image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  loading={idx <= 1 ? "eager" : "lazy"}
                />
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-200 ease-out",
                  activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <video
                  ref={activeIndex === idx ? videoRef : null}
                  src={item.src}
                  poster={item.thumbnail}
                  loop
                  playsInline
                  muted={isMuted}
                  preload={activeIndex === idx ? "auto" : "none"}
                  className="w-full h-full object-cover"
                />
                {/* Mute/Unmute */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2.5 rounded-full hover:bg-black/70 transition-colors z-10"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            );
          }
        })}

        {/* Arrow Navigation */}
        {activeIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-cream-base/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-cream-base transition-colors z-20 hidden lg:flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-charcoal-text" />
          </button>
        )}
        {activeIndex < items.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-cream-base/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-cream-base transition-colors z-20 hidden lg:flex items-center justify-center"
          >
            <ChevronRight size={20} className="text-charcoal-text" />
          </button>
        )}

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeIndex === idx
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
          <span className="text-white text-xs ml-1.5 font-medium">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
