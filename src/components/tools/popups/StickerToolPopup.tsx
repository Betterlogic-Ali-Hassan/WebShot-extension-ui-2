"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StickersToolPopupProps {
  position: { top: number; left: number; width: number };
  isDarkMode: boolean;
  onClose: () => void;
  toolbarPosition: "top" | "left" | "bottom";
}

// Define proper types for stickers
interface BaseSticker {
  name: string;
  category?: string;
}

interface TextSticker extends BaseSticker {
  sticker: string;
}

interface SvgSticker extends BaseSticker {
  id: string;
  svg: string;
}

type Sticker = TextSticker | SvgSticker;

export function StickersToolPopup({
  position,
  isDarkMode,
  onClose,
  toolbarPosition,
}: StickersToolPopupProps) {
  // Ref for popup positioning
  const popupRef = useRef<HTMLDivElement>(null);

  // Sticker categories
  const categories = [
    { id: "emoji", label: "Emoji" },
    { id: "arrows", label: "Arrows" },
    { id: "shapes", label: "Shapes" },
    { id: "symbols", label: "Symbols" },
    { id: "custom", label: "Custom" },
  ];

  // Active category
  const [activeCategory, setActiveCategory] = useState("emoji");
  const [searchQuery, setSearchQuery] = useState("");
  const [customStickers, setCustomStickers] = useState<SvgSticker[]>([]);
  // Add a new state variable for recently used stickers after the other state variables
  const [recentStickers, setRecentStickers] = useState<string[]>([
    "🔥",
    "👍",
    "❤️",
    "✅",
    "⭐",
    "🚀",
  ]);
  // First, add a new state to track the selected sticker
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Stickers by category with names for better search
  const stickers: Record<string, TextSticker[]> = {
    emoji: [
      { sticker: "😊", name: "smiling face happy smile" },
      { sticker: "👍", name: "thumbs up like approve good" },
      { sticker: "❤️", name: "heart love red" },
      { sticker: "🎉", name: "party popper celebration confetti" },
      { sticker: "🔥", name: "fire hot flame trending" },
      { sticker: "⭐", name: "star favorite important" },
      { sticker: "💯", name: "hundred points perfect score" },
      { sticker: "🤔", name: "thinking face hmm consider" },
      { sticker: "👀", name: "eyes looking watch" },
      { sticker: "💪", name: "flexed biceps strong muscle" },
      { sticker: "🚀", name: "rocket launch ship space" },
      { sticker: "✅", name: "check mark correct right done" },
      { sticker: "❌", name: "cross mark wrong incorrect error" },
      { sticker: "⚠️", name: "warning caution alert" },
      { sticker: "💡", name: "light bulb idea bright" },
      { sticker: "🎯", name: "direct hit target bullseye" },
      { sticker: "🎨", name: "artist palette paint art" },
      { sticker: "🎭", name: "performing arts theater drama" },
      { sticker: "🎮", name: "video game controller gaming" },
      { sticker: "🎪", name: "circus tent carnival" },
      { sticker: "🎬", name: "clapper board movie film" },
      { sticker: "🎤", name: "microphone sing music" },
      { sticker: "🎧", name: "headphone music audio" },
      { sticker: "🎼", name: "musical score sheet music" },
      { sticker: "🎹", name: "musical keyboard piano" },
    ],
    arrows: [
      { sticker: "↑", name: "up arrow" },
      { sticker: "↓", name: "down arrow" },
      { sticker: "←", name: "left arrow" },
      { sticker: "→", name: "right arrow" },
      { sticker: "↖", name: "up-left arrow diagonal" },
      { sticker: "↗", name: "up-right arrow diagonal" },
      { sticker: "↘", name: "down-right arrow diagonal" },
      { sticker: "↙", name: "down-left arrow diagonal" },
      { sticker: "↔", name: "left-right arrow horizontal" },
      { sticker: "↕", name: "up-down arrow vertical" },
      { sticker: "⇑", name: "up arrow double line" },
      { sticker: "⇓", name: "down arrow double line" },
      { sticker: "⇐", name: "left arrow double line" },
      { sticker: "⇒", name: "right arrow double line" },
      { sticker: "⟲", name: "clockwise arrow circular" },
      { sticker: "⟳", name: "counterclockwise arrow circular" },
      { sticker: "⤴", name: "right arrow curving up" },
      { sticker: "⤵", name: "right arrow curving down" },
    ],
    shapes: [
      { sticker: "■", name: "black square" },
      { sticker: "□", name: "white square" },
      { sticker: "▢", name: "white square with rounded corners" },
      { sticker: "▣", name: "white square containing black small square" },
      { sticker: "▤", name: "square with horizontal fill" },
      { sticker: "▥", name: "square with vertical fill" },
      { sticker: "▦", name: "square with orthogonal crosshatch fill" },
      { sticker: "▧", name: "square with upper left to lower right fill" },
      { sticker: "▨", name: "square with upper right to lower left fill" },
      { sticker: "▩", name: "square with diagonal crosshatch fill" },
      { sticker: "▲", name: "black up-pointing triangle" },
      { sticker: "△", name: "white up-pointing triangle" },
      { sticker: "▶", name: "black right-pointing triangle" },
      { sticker: "◆", name: "black diamond" },
      { sticker: "◇", name: "white diamond" },
    ],
    symbols: [
      { sticker: "✓", name: "check mark tick" },
      { sticker: "✗", name: "x mark cross" },
      { sticker: "✘", name: "heavy x mark cross" },
      { sticker: "✕", name: "multiplication x" },
      { sticker: "✖", name: "heavy multiplication x" },
      { sticker: "✚", name: "heavy plus sign" },
      { sticker: "✛", name: "heavy plus sign outline" },
      { sticker: "✜", name: "heavy plus sign with thin circle" },
      { sticker: "✝", name: "latin cross" },
      { sticker: "✞", name: "cross outline" },
      { sticker: "✟", name: "outlined latin cross" },
      { sticker: "✠", name: "maltese cross" },
      { sticker: "✡", name: "star of david" },
      { sticker: "✢", name: "four teardrop-spoked asterisk" },
      { sticker: "✣", name: "four balloon-spoked asterisk" },
      { sticker: "✤", name: "heavy four balloon-spoked asterisk" },
      { sticker: "✥", name: "four club-spoked asterisk" },
      { sticker: "✦", name: "black four pointed star" },
      { sticker: "✧", name: "white four pointed star" },
      { sticker: "✨", name: "sparkles" },
    ],
    custom: [],
  };

  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;

      // Apply the adjusted position
      popupRef.current.style.left = isToolbarLeft ? "0" : "50%";
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  // Add a function to handle SVG file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          let svgContent = event.target.result as string;

          // Ensure SVG has proper attributes for responsive sizing
          if (!svgContent.includes("preserveAspectRatio")) {
            svgContent = svgContent.replace(
              /<svg/,
              '<svg preserveAspectRatio="xMidYMid meet"'
            );
          }

          // Ensure SVG has viewBox if missing
          if (
            !svgContent.includes("viewBox") &&
            svgContent.includes("width") &&
            svgContent.includes("height")
          ) {
            const widthMatch = svgContent.match(/width="([^"]*)"/);
            const heightMatch = svgContent.match(/height="([^"]*)"/);

            if (widthMatch && heightMatch) {
              const width = widthMatch[1].replace(/[^0-9.]/g, "");
              const height = heightMatch[1].replace(/[^0-9.]/g, "");

              if (width && height) {
                svgContent = svgContent.replace(
                  /<svg/,
                  `<svg viewBox="0 0 ${width} ${height}"`
                );
              }
            }
          }

          const newSticker: SvgSticker = {
            id: `custom-${Date.now()}`,
            svg: svgContent,
            name: file.name.replace(".svg", ""),
          };

          // Add to custom stickers and persist to localStorage
          setCustomStickers((prev) => {
            const updated = [...prev, newSticker];
            try {
              localStorage.setItem("customStickers", JSON.stringify(updated));
            } catch (error) {
              console.error(
                "Failed to save custom stickers to localStorage",
                error
              );
            }
            return updated;
          });
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload an SVG file");
    }
  };

  // Add a function to filter stickers based on search query
  const getFilteredStickers = (): Sticker[] => {
    // If no search query, just return stickers from active category (current behavior)
    if (!searchQuery.trim()) {
      if (activeCategory === "custom") {
        return customStickers;
      } else {
        return stickers[activeCategory as keyof typeof stickers];
      }
    }

    // When searching, look across all categories
    const searchLower = searchQuery.toLowerCase();
    let results: Sticker[] = [];

    // Search in regular sticker categories
    Object.entries(stickers).forEach(([category, categoryStickers]) => {
      const matchingStickers = categoryStickers.filter(
        (sticker) =>
          sticker.sticker.toLowerCase().includes(searchLower) ||
          sticker.name.toLowerCase().includes(searchLower)
      );

      // Add category info to each result
      results = [
        ...results,
        ...matchingStickers.map((sticker) => ({
          ...sticker,
          category,
        })),
      ];
    });

    // Search in custom stickers
    if (customStickers.length > 0) {
      const matchingCustom = customStickers.filter((sticker) =>
        sticker.name.toLowerCase().includes(searchLower)
      );

      results = [
        ...results,
        ...matchingCustom.map((sticker) => ({
          ...sticker,
          category: "custom",
        })),
      ];
    }

    return results;
  };

  // Add a function to clear recent stickers after the getFilteredStickers function
  const clearRecentStickers = () => {
    setRecentStickers([]);
    try {
      localStorage.removeItem("recentStickers");
    } catch (error) {
      console.error("Failed to clear recent stickers from localStorage", error);
    }
  };

  // First, add a function to delete a custom sticker after the clearRecentStickers function
  const deleteCustomSticker = (id: string, e: React.MouseEvent) => {
    // Prevent the click from bubbling up to the sticker button
    e.stopPropagation();

    // Remove the sticker from state
    setCustomStickers((prev) => {
      const updated = prev.filter((sticker) => sticker.id !== id);

      // Update localStorage
      try {
        localStorage.setItem("customStickers", JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save custom stickers to localStorage", error);
      }

      return updated;
    });
  };

  // Add localStorage persistence for custom stickers
  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem("customStickers");
      if (savedStickers) {
        setCustomStickers(JSON.parse(savedStickers));
      }

      const savedRecentStickers = localStorage.getItem("recentStickers");
      if (savedRecentStickers) {
        setRecentStickers(JSON.parse(savedRecentStickers));
      }
    } catch (error) {
      console.error("Failed to load stickers from localStorage", error);
    }
  }, []);

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 bg-[#2C2C2E] border border-[#3A3A3C]",
        isDarkMode ? "text-white" : "text-gray-900",
        isToolbarLeft && "ml-[100px]",
        isToolbarBottom && "-mt-[440px] "
      )}
      style={{
        top: `${isToolbarLeft ? "50%" : position.top + "px"}`,
        transform: `${isToolbarLeft ? "translate(0,-50%)" : ""}`,
        width: "300px",
        left: `${isToolbarLeft ? "0" : position.left + "px"}`,
      }}
    >
      <div>
        {/* Header with title and close button */}
        <div className='p-3 flex items-center justify-between border-b border-opacity-30 border-gray-500/30'>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>🎭</span>
            <h3
              className={cn(
                "text-sm font-bold",
                isDarkMode ? "text-gray-200" : "text-gray-800"
              )}
            >
              Stickers
            </h3>
          </div>
          <Button
            className={cn(
              "h-7 w-7 rounded-full transition-colors duration-200 justify-center",
              isDarkMode
                ? "hover:bg-[#3A3A3A] hover:text-[#F5F5F5]"
                : "hover:bg-gray-100"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {/* Category tabs - improved with pill style */}
        <div className='p-2 border-b border-opacity-30 border-gray-500/30 relative group'>
          {/* Left arrow - only visible on hover */}
          <button
            onClick={() => {
              const container = document.querySelector(".categories-scroll");
              if (container)
                container.scrollBy({ left: -100, behavior: "smooth" });
            }}
            className='absolute left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'
            style={{
              background: isDarkMode
                ? "rgba(60, 60, 60, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18L9 12L15 6'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          {/* Scrollable container */}
          <div
            className='categories-scroll overflow-x-auto whitespace-nowrap scrollbar-none'
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className='flex gap-1 pr-2 pl-2'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                    activeCategory === category.id
                      ? isDarkMode
                        ? "bg-[#3A3A3C] text-white shadow-sm"
                        : "bg-gray-200 text-black shadow-sm"
                      : isDarkMode
                      ? "text-gray-400 hover:text-gray-300 hover:bg-[#2C2C2E]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow - only visible on hover */}
          <button
            onClick={() => {
              const container = document.querySelector(".categories-scroll");
              if (container)
                container.scrollBy({ left: 100, behavior: "smooth" });
            }}
            className='absolute right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'
            style={{
              background: isDarkMode
                ? "rgba(60, 60, 60, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 6L15 12L9 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className='px-2 py-1.5'>
          <div
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-md",
              isDarkMode ? "bg-[#3A3A3C]" : "bg-gray-100"
            )}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className={cn(
                "w-4 h-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}
            >
              <path
                fillRule='evenodd'
                d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                clipRule='evenodd'
              />
            </svg>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search stickers...'
              className={cn(
                "bg-transparent border-none outline-none text-xs w-full",
                isDarkMode
                  ? "text-white placeholder:text-gray-500"
                  : "text-gray-800 placeholder:text-gray-400"
              )}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={cn(
                  "text-xs",
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-800"
                )}
              >
                <X className='h-3.5 w-3.5' />
              </button>
            )}
          </div>
        </div>

        {/* Stickers grid with improved layout */}
        <div
          className={cn("max-h-[250px] overflow-y-auto px-2 py-1")}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {activeCategory === "custom" && (
            <div className='mb-3'>
              <input
                type='file'
                ref={fileInputRef}
                accept='.svg'
                className='hidden'
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "w-full py-2 px-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors",
                  isDarkMode
                    ? "border-gray-700 hover:border-gray-500 text-gray-400"
                    : "border-gray-300 hover:border-gray-400 text-gray-600"
                )}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                  <polyline points='17 8 12 3 7 8'></polyline>
                  <line x1='12' y1='3' x2='12' y2='15'></line>
                </svg>
                <span className='text-xs'>Upload SVG</span>
              </button>
            </div>
          )}

          <div className='grid grid-cols-5 gap-1'>
            {getFilteredStickers().length > 0 ? (
              getFilteredStickers().map((item, index) => {
                // Generate a unique ID for the sticker if it doesn't have one
                const stickerId =
                  "id" in item
                    ? item.id
                    : "sticker" in item
                    ? item.sticker
                    : `sticker-${index}`;

                return (
                  <button
                    key={index}
                    className={cn(
                      "aspect-square flex items-center justify-center text-xl rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none relative",
                      isDarkMode
                        ? "bg-[#3A3A3C]/50 hover:bg-[#3A3A3C]"
                        : "bg-gray-100/50 hover:bg-gray-200"
                    )}
                    title={item.name}
                    onClick={() => {
                      // Toggle selection
                      setSelectedStickerId(
                        selectedStickerId === stickerId ? null : stickerId
                      );

                      if (item.category && item.category !== activeCategory) {
                        setActiveCategory(item.category);
                      }
                    }}
                  >
                    {"sticker" in item ? (
                      item.sticker
                    ) : (
                      <div className='w-full h-full flex items-center justify-center overflow-hidden p-1 relative group'>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.svg
                              ? item.svg.replace(
                                  /<svg/,
                                  '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"'
                                )
                              : "",
                          }}
                        />
                        {activeCategory === "custom" && "id" in item && (
                          <button
                            onClick={(e) => deleteCustomSticker(item.id, e)}
                            className={cn(
                              "absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                              isDarkMode
                                ? "bg-red-600 text-white"
                                : "bg-red-500 text-white"
                            )}
                            aria-label='Delete sticker'
                          >
                            <X className='h-2.5 w-2.5' />
                          </button>
                        )}
                      </div>
                    )}
                    {/* Show category badge when searching across categories */}
                    {searchQuery &&
                      item.category &&
                      item.category !== activeCategory && (
                        <div
                          className={cn(
                            "absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[8px] rounded-full",
                            isDarkMode
                              ? "bg-[#3A3A3C] text-white"
                              : "bg-gray-200 text-gray-700"
                          )}
                        >
                          {item.category.charAt(0).toUpperCase()}
                        </div>
                      )}

                    {/* Show green tick when sticker is selected */}
                    {selectedStickerId === stickerId && (
                      <div className='absolute top-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='10'
                          height='10'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='white'
                          strokeWidth='3'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <polyline points='20 6 9 17 4 12'></polyline>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className='col-span-5 py-8 text-center'>
                <p
                  className={cn(
                    "text-sm",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  No stickers found
                </p>
                <button
                  className={cn(
                    "text-xs mt-2",
                    isDarkMode ? "text-[#007AFF]" : "text-blue-600"
                  )}
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer with recent stickers - improved styling */}
        <div className='p-2 border-t border-opacity-30 border-gray-500/30'>
          <div className='flex items-center justify-between mb-1.5'>
            <p
              className={cn(
                "text-xs font-medium",
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              Recently Used
            </p>
            <button
              onClick={clearRecentStickers}
              className={cn(
                "text-xs",
                isDarkMode ? "text-[#007AFF]" : "text-blue-600"
              )}
            >
              Clear
            </button>
          </div>
          <div className='flex gap-1 overflow-x-auto py-1 pb-0.5'>
            {recentStickers.length > 0 ? (
              recentStickers.map((sticker, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-9 w-9 flex items-center justify-center text-lg rounded-lg transition-all duration-200 hover:scale-110 relative",
                    isDarkMode
                      ? "bg-[#2C2C2E]/70 hover:bg-[#3A3A3C]"
                      : "bg-gray-100/70 hover:bg-gray-200"
                  )}
                  onClick={() => {
                    // Toggle selection
                    setSelectedStickerId(
                      selectedStickerId === sticker ? null : sticker
                    );
                  }}
                >
                  {sticker}
                  {/* Show green tick when sticker is selected */}
                  {selectedStickerId === sticker && (
                    <div className='absolute top-0.5 right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='10'
                        height='10'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='3'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='20 6 9 17 4 12'></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <p
                className={cn(
                  "text-xs italic",
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                )}
              >
                No recent stickers
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
