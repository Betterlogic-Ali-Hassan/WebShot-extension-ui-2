"use client";

import { useState, useRef, useEffect } from "react";
import { X, Download } from "lucide-react";
import Button from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";

export function BorderToolPopup() {
  const {
    popupPosition: position,
    handleClosePopup: onClose,
    toolbarPosition,
  } = useImageEditor();
  const [padding, setPadding] = useState(Math.min(20, 100));
  const [backgroundType, setBackgroundType] = useState<"solid" | "gradient">(
    "gradient"
  );
  const [selectedPreset, setSelectedPreset] = useState(0);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Refs for positioning and dropdowns
  const popupRef = useRef<HTMLDivElement>(null);

  const getAllPresets = () => {
    if (backgroundType === "gradient") {
      return [
        // Original gradient presets
        "linear-gradient(to right, #FF3B30, #5856D6)",
        "linear-gradient(to right, #34C759, #007AFF)",
        "linear-gradient(to right, #FF9500, #FFCC00)",
        "linear-gradient(to right, #AF52DE, #FF2D55)",
        // Additional gradient presets to make 50 total
        "linear-gradient(to right, #FF5E3A, #FF2A68)",
        "linear-gradient(to right, #FF9500, #FF3B30)",
        "linear-gradient(to right, #FFCC00, #FF9500)",
        "linear-gradient(to right, #4CD964, #5AC8FA)",
        "linear-gradient(to right, #5AC8FA, #007AFF)",
        "linear-gradient(to right, #007AFF, #5856D6)",
        "linear-gradient(to right, #5856D6, #FF2D55)",
        "linear-gradient(to right, #FF2D55, #FF3B30)",
        "linear-gradient(45deg, #FF3B30, #5856D6)",
        "linear-gradient(45deg, #34C759, #007AFF)",
        "linear-gradient(45deg, #FF9500, #FFCC00)",
        "linear-gradient(45deg, #AF52DE, #FF2D55)",
        "linear-gradient(to bottom right, #FF3B30, #5856D6)",
        "linear-gradient(to bottom right, #34C759, #007AFF)",
        "linear-gradient(to bottom right, #FF9500, #FFCC00)",
        "linear-gradient(to bottom right, #AF52DE, #FF2D55)",
        "linear-gradient(to right, #FF416C, #FF4B2B)",
        "linear-gradient(to right, #8A2387, #E94057, #F27121)",
        "linear-gradient(to right, #00B4DB, #0083B0)",
        "linear-gradient(to right, #FDC830, #F37335)",
        "linear-gradient(to right, #ED213A, #93291E)",
        "linear-gradient(to right, #1A2980, #26D0CE)",
        "linear-gradient(to right, #FF0099, #493240)",
        "linear-gradient(to right, #004FF9, #FFF94C)",
        "linear-gradient(to right, #F7971E, #FFD200)",
        "linear-gradient(to right, #11998e, #38ef7d)",
        "linear-gradient(to right, #0F2027, #203A43, #2C5364)",
        "linear-gradient(to right, #C33764, #1D2671)",
        "linear-gradient(to right, #3494E6, #EC6EAD)",
        "linear-gradient(to right, #67B26F, #4ca2cd)",
        "linear-gradient(to right, #f46b45, #eea849)",
        "linear-gradient(to right, #4568DC, #B06AB3)",
        "linear-gradient(to right, #6190E8, #A7BFE8)",
        "linear-gradient(to right, #44A08D, #093637)",
        "linear-gradient(to right, #2C3E50, #4CA1AF)",
        "linear-gradient(to right, #2C3E50, #FD746C)",
        "linear-gradient(to right, #F00000, #DC281E)",
        "linear-gradient(to right, #141E30, #243B55)",
        "linear-gradient(to right, #42275a, #734b6d)",
        "linear-gradient(to right, #000428, #004e92)",
        "linear-gradient(to right, #56CCF2, #2F80ED)",
        "linear-gradient(to right, #F2994A, #F2C94C)",
        "linear-gradient(to right, #EB5757, #000000)",
        "linear-gradient(to right, #F2F2F2, #DBDBDB)",
        "linear-gradient(to right, #00c6ff, #0072ff)",
        "linear-gradient(to right, #fe8c00, #f83600)",
      ];
    } else {
      return [
        // Original solid presets
        "#FF3B30", // Red
        "#007AFF", // Blue
        "#34C759", // Green
        "#FF9500", // Orange
        "#5856D6", // Purple
        "#000000", // Black
        // Additional solid presets to make 50 total
        "#FFFFFF", // White
        "#FF2D55", // Pink
        "#5AC8FA", // Light Blue
        "#FFCC00", // Yellow
        "#4CD964", // Light Green
        "#FF9500", // Orange
        "#C7C7CC", // Light Gray
        "#8E8E93", // Gray
        "#FF6B6B", // Coral
        "#48DBFB", // Sky
        "#1DD1A1", // Mint
        "#5F27CD", // Indigo
        "#FF9FF3", // Pink
        "#54A0FF", // Blue
        "#00D2D3", // Turquoise
        "#FFC048", // Yellow
        "#FF6B6B", // Red
        "#5352ED", // Blue
        "#2ED573", // Green
        "#FF4757", // Red
        "#3742FA", // Blue
        "#70A1FF", // Light Blue
        "#FF7F50", // Coral
        "#32CD32", // Lime Green
        "#6A5ACD", // Slate Blue
        "#FF69B4", // Hot Pink
        "#20B2AA", // Light Sea Green
        "#FF6347", // Tomato
        "#4169E1", // Royal Blue
        "#32CD32", // Lime Green
        "#FF1493", // Deep Pink
        "#00CED1", // Dark Turquoise
        "#FF8C00", // Dark Orange
        "#8A2BE2", // Blue Violet
        "#DC143C", // Crimson
        "#00BFFF", // Deep Sky Blue
        "#F08080", // Light Coral
        "#ADFF2F", // Green Yellow
        "#DA70D6", // Orchid
        "#CD5C5C", // Indian Red
        "#4682B4", // Steel Blue
        "#D8BFD8", // Thistle
        "#DDA0DD", // Plum
        "#F0E68C", // Khaki
      ];
    }
  };

  // Get current presets based on selected type
  const currentPresets = getAllPresets();

  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;
    };
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  // Handle padding change
  const handlePaddingChange = (value: number[]) => {
    setPadding(Math.min(value[0], 100));
  };

  // Handle background type change
  const handleBackgroundTypeChange = (type: "solid" | "gradient") => {
    setBackgroundType(type);
    setSelectedPreset(0); // Reset selected preset when changing type
  };

  // Handle preset selection
  const handlePresetSelect = (index: number) => {
    setSelectedPreset(index);
  };

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 bg-card border border-border text-text",
        !isToolbarBottom && "mt-2.5",
        isToolbarBottom && "-mt-[405px] "
      )}
      style={{
        top: `${isToolbarLeft ? "50%" : position.top + "px"}`,
        transform: `${
          isToolbarLeft ? "translate(0,-50%)" : "translateX(-50%)"
        }`,
        maxWidth: "300px",
        width: "100%",
        left: `${isToolbarLeft ? "0" : position.left}px`,
      }}
    >
      <div className='p-3 max-h-[470px] overflow-y-auto no-scrollbar'>
        {/* Add header with title and close button */}
        <div className='flex items-center justify-between border-b border-opacity-30 border-border mb-4 pb-2'>
          <h3 className='text-sm font-medium text-text'>Border</h3>
          <Button
            className={cn(
              "h-7 w-7 rounded-full transition-colors duration-200 justify-center",
              "hover:bg-hover"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {/* Preview area */}
        <div className='relative'>
          <div
            className='w-full transition-all duration-300 rounded-lg'
            style={{
              padding: `${padding}px`,
              background: currentPresets[selectedPreset],
            }}
          >
            <div className='w-full h-[80px] rounded-md flex items-center justify-center backdrop-blur-sm bg-background/90'>
              <div className='text-center text-xs'>
                <p className='text-text/70'>Screenshot preview</p>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-4 pb-2 '>
          {/* Padding control */}
          <div className='mb-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-medium text-text'>Padding</span>
              <span className='text-xs font-medium px-2 py-0.5 rounded-full bg-border text-text'>
                {padding}px
              </span>
            </div>
            <div className='relative'>
              <Slider
                value={[padding]}
                min={0}
                max={100}
                step={1}
                onValueChange={handlePaddingChange}
              />
              <div className='absolute w-full flex justify-between px-1 mt-1.5'>
                <div className='w-0.5 h-1 bg-border'></div>
                <div className='w-0.5 h-1 bg-border'></div>
                <div className='w-0.5 h-1 bg-border'></div>
                <div className='w-0.5 h-1 bg-border'></div>
                <div className='w-0.5 h-1 bg-border'></div>
              </div>
              <div className='flex justify-between mt-3 text-[10px] text-foreground'>
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Background type selector */}
          <div className='mb-4'>
            <div className='flex items-center justify-between mb-1.5'>
              <span className='text-xs font-medium text-text'>Background</span>
            </div>
            <div className='flex rounded-lg p-0.5 text-xs font-medium w-full bg-background'>
              <button
                onClick={() => handleBackgroundTypeChange("solid")}
                className={cn(
                  "flex-1 py-1.5 px-3 rounded-md transition-all duration-200",
                  backgroundType === "solid"
                    ? "bg-hover text-text shadow-sm"
                    : "text-text/50"
                )}
              >
                Solid
              </button>
              <button
                onClick={() => handleBackgroundTypeChange("gradient")}
                className={cn(
                  "flex-1 py-1.5 px-3 rounded-md transition-all duration-200",
                  backgroundType === "gradient"
                    ? "bg-hover text-text shadow-sm"
                    : "text-text/50"
                )}
              >
                Gradient
              </button>
            </div>
          </div>

          {/* Preset options - smaller grid with spacing */}
          <div className='mb-4'>
            <div className='flex items-center'>
              <button
                onClick={() => {
                  const newIndex = Math.max(0, selectedPreset - 6);
                  setSelectedPreset(newIndex);
                }}
                className={cn(
                  "h-6 w-6 flex items-center justify-center rounded-full mr-1",
                  "bg-border hover:bg-hover text-text"
                )}
                disabled={selectedPreset === 0}
              >
                <svg
                  width='12'
                  height='12'
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

              <div className='grid grid-cols-6 gap-1.5 flex-1 overflow-hidden'>
                {getAllPresets()
                  .slice(
                    Math.floor(selectedPreset / 6) * 6,
                    Math.floor(selectedPreset / 6) * 6 + 6
                  )
                  .map((preset, index) => {
                    const actualIndex =
                      Math.floor(selectedPreset / 6) * 6 + index;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => handlePresetSelect(actualIndex)}
                        className={cn(
                          "aspect-square rounded-sm transition-all duration-200 scale-75",
                          selectedPreset === actualIndex
                            ? "ring-1.5 ring-offset-1"
                            : "ring-0.5 ring-inset",
                          selectedPreset === actualIndex
                            ? "ring-text ring-offset-background"
                            : "ring-border"
                        )}
                        style={{
                          background: preset,
                        }}
                        aria-label={`Select ${backgroundType} preset ${
                          actualIndex + 1
                        }`}
                      />
                    );
                  })}
              </div>

              <button
                onClick={() => {
                  const newIndex = Math.min(
                    getAllPresets().length - 1,
                    selectedPreset + 6
                  );
                  setSelectedPreset(newIndex);
                }}
                className={cn(
                  "h-6 w-6 flex items-center justify-center rounded-full ml-1",
                  "bg-border hover:bg-hover text-text"
                )}
                disabled={
                  Math.floor(selectedPreset / 6) >=
                  Math.floor((getAllPresets().length - 1) / 6)
                }
              >
                <svg
                  width='12'
                  height='12'
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

            <div className='flex justify-between mt-2'>
              <span className='text-xs opacity-60'>
                {Math.floor(selectedPreset / 6) * 6 + 1}-
                {Math.min(
                  Math.floor(selectedPreset / 6) * 6 + 6,
                  getAllPresets().length
                )}{" "}
                of {getAllPresets().length}
              </span>
              <span className='text-xs opacity-60'>
                Page {Math.floor(selectedPreset / 6) + 1}/
                {Math.ceil(getAllPresets().length / 6)}
              </span>
            </div>
          </div>

          {/* Save button - styled to match other tools */}
          <Button className='w-full rounded-md text-xs py-1.5 px-4 h-8 transition-all duration-200 font-medium justify-center bg-info hover:bg-info-hover text-text-primary'>
            <Download className='h-4 w-4 mr-1.5' />
            Save Image
          </Button>
        </div>
      </div>
    </div>
  );
}
