"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { CheckSquare, Square, Trash2 } from "lucide-react";
import { screenShot } from "@/types/ScreenShot";
import { useScreenShot } from "@/context/ScreenShotContext";
import FloatingActionBar from "./FloatingActionBar";
import ScreenshotInfo from "./ScreenshotInfo";

interface ScreenshotCardProps {
  screenshot: screenShot;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  screenshot,
}) => {
  const {
    handleDragStart,
    handleContextMenu,
    activeTab,
    viewMode,
    isMultiSelectMode,
    selectedScreenshots,
    handleToggleScreenshotSelection,
    handlePreview,
  } = useScreenShot();

  return (
    <div
      draggable={!screenshot.trash && activeTab !== "recycle-bin"}
      onDragStart={(e) => handleDragStart(e, screenshot)}
      className={cn(
        "group relative rounded-2xl overflow-hidden ",
        "transition-all duration-300 transform hover:scale-[1.02]",
        "shadow-sm hover:shadow bg-background  border border-border",
        viewMode === "grid" ? "" : "flex items-center",
        activeTab === "recycle-bin" && "opacity-80"
      )}
      onContextMenu={(e) => handleContextMenu(e, screenshot)}
    >
      {isMultiSelectMode && (
        <div
          className={cn(
            "absolute top-2 left-2 z-10",
            "transition-all duration-200"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleScreenshotSelection(screenshot.id);
            }}
            className={cn(
              "transition-all duration-200 bg-background backdrop-blur-sm border  text-card hover:bg-border",
              selectedScreenshots.includes(screenshot.id) &&
                "bg-info text-text-primary hover:bg-info-hover"
            )}
          >
            {selectedScreenshots.includes(screenshot.id) ? (
              <CheckSquare size={18} />
            ) : (
              <Square size={18} />
            )}
          </button>
        </div>
      )}

      {/* Screenshot image with zoom effect */}
      <div
        className={cn(
          "cursor-pointer overflow-hidden",
          viewMode === "grid" ? "md:aspect-video aspect-auto" : "w-32 h-20",
          activeTab === "recycle-bin" && "relative"
        )}
      >
        <div className='w-full h-full relative'>
          {/* Checkered background for transparent images */}
          <div className={cn("absolute inset-0 bg-checkered")}></div>
          <img
            src={screenshot.url || "/placeholder.svg"}
            alt={screenshot.name}
            className={cn(
              "w-full h-full object-cover",
              "transition-transform duration-300 group-hover:scale-110",
              activeTab === "recycle-bin" && "opacity-70" // Dim the image in recycle bin
            )}
            onClick={() => handlePreview(screenshot)}
          />
          {activeTab === "recycle-bin" && (
            <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
              <div
                className={cn(
                  "bg-black/50 backdrop-blur-sm rounded-full p-2",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                )}
              >
                <Trash2 size={24} className='text-text-primary/80' />
              </div>
            </div>
          )}
        </div>
      </div>
      <FloatingActionBar screenshot={screenshot} />
      {/* Screenshot info */}
      <ScreenshotInfo screenshot={screenshot} />
    </div>
  );
};
