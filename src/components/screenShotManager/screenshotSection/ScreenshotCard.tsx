"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckSquare,
  Edit,
  Eye,
  FolderOpen,
  Link,
  Pencil,
  Square,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import { screenShot } from "@/types/ScreenShot";
import { useScreenShot } from "@/context/ScreenShotContext";
import { useNavigate } from "react-router-dom";

interface ScreenshotCardProps {
  screenshot: screenShot;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  screenshot,
}) => {
  const {
    handleRemoveTag,
    handleDragStart,
    handleContextMenu,
    setMovingScreenshot,
    setIsMoveFolderOpen,
    handleOpenRenameModal,
    handleTagManagement,
    handleRename,
    activeTab,
    viewMode,
    isMultiSelectMode,
    selectedScreenshots,
    editingScreenshot,
    setEditingScreenshot,
    handleToggleScreenshotSelection,
    handlePreview,
    handleShare,
    handleRestore,
    handlePermanentDelete,
    handleDelete,
  } = useScreenShot();
  const navigate = useNavigate();
  const handleEdit = (screenshot: screenShot) => {
    navigate(`/?image=${encodeURIComponent(screenshot.url)}`);
  };
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
          viewMode === "grid" ? "aspect-video" : "w-32 h-20",
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
                <Trash2 size={24} className='text-white/80' />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating action bar (visible on hover) */}
      <div
        className={cn(
          "absolute top-2 right-2 opacity-0 group-hover:opacity-100",
          "transition-all duration-300 ease-in-out transform group-hover:scale-105",
          "flex items-center gap-1.5 p-1.5 rounded-full",
          "bg-black/40 backdrop-blur-md shadow-lg",
          "border border-white/10",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
      >
        <button
          onClick={() => handlePreview(screenshot)}
          className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
          title='View'
        >
          <Eye size={14} className='text-white' />
        </button>
        {!screenshot.trash && activeTab !== "recycle-bin" && (
          <>
            <button
              onClick={() => handleEdit(screenshot)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
              title='Edit'
            >
              <Edit size={14} className='text-white' />
            </button>
            <button
              onClick={() => handleShare(screenshot)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
              title='Copy Link'
            >
              <Link size={14} className='text-white' />
            </button>
            <button
              onClick={() => {
                setMovingScreenshot(screenshot);
                setIsMoveFolderOpen(true);
              }}
              className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
              title='Move to Folder'
            >
              <FolderOpen size={14} className='text-white' />
            </button>
            <button
              onClick={() => handleDelete(screenshot.id)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-red-400/25 transition-colors duration-200 hover:scale-110 transform'
              title='Delete'
            >
              <Trash2 size={14} className='text-white' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTagManagement(screenshot.id);
              }}
              className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
              title='Manage Tags'
            >
              <Tags size={14} className='text-white' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenRenameModal(screenshot);
              }}
              className='p-1.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 hover:scale-110 transform'
              title='Rename'
            >
              <Pencil size={14} className='text-white' />
            </button>
          </>
        )}
        {(screenshot.trash || activeTab === "recycle-bin") && (
          <>
            <button
              onClick={() => handleRestore(screenshot.id)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-green-400/25 transition-colors duration-200 hover:scale-110 transform'
              title='Restore'
            >
              <ArrowUpRight size={14} className='text-white' />
            </button>
            <button
              onClick={() => handlePermanentDelete(screenshot.id)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-red-400/25 transition-colors duration-200 hover:scale-110 transform'
              title='Delete Permanently'
            >
              <Trash2 size={14} className='text-white' />
            </button>
          </>
        )}
      </div>

      {/* Screenshot info */}
      <div className={cn(viewMode === "grid" ? "p-3" : "flex-1 p-3")}>
        {editingScreenshot && editingScreenshot.id === screenshot.id ? (
          <div className='mb-1'>
            <input
              type='text'
              defaultValue={screenshot.name}
              autoFocus
              onBlur={(e) => handleRename(screenshot.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  handleRename(screenshot.id, target.value);
                } else if (e.key === "Escape") {
                  setEditingScreenshot(null);
                }
              }}
              className='w-full px-2 py-1 rounded-lg border transition-all duration-200 bg-card border-border text-text'
            />
          </div>
        ) : (
          <h3
            className={cn(
              "font-medium truncate cursor-pointer transition-colors duration-200 hover:text-info",
              activeTab === "recycle-bin" && "text-foreground"
            )}
            onClick={() =>
              !screenshot.trash && setEditingScreenshot(screenshot)
            }
          >
            {screenshot.name}
          </h3>
        )}

        <div className='flex items-center text-xs text-foreground mt-1'>
          <span>{screenshot.date}</span>
          {screenshot.tags &&
            screenshot.tags.length > 0 &&
            activeTab !== "recycle-bin" && (
              <div className='flex items-center ml-2'>
                <span className='mx-1'>•</span>
                <div className='flex flex-wrap gap-1 mt-1'>
                  {screenshot.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className='px-2 py-0.5 rounded-full text-xs group relative bg-card text-foreground transition-colors duration-200'
                    >
                      {tag}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(screenshot.id, tag);
                        }}
                        className={cn(
                          "absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center",
                          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                          "bg-error text-text-primary"
                        )}
                      >
                        <X size={8} />
                      </button>
                    </span>
                  ))}
                  {screenshot.tags.length > 2 && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs cursor-pointer",
                        "transition-colors duration-200 bg-card text-text"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagManagement(screenshot.id);
                      }}
                    >
                      +{screenshot.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}

          {/* Add recycle bin specific actions */}
          {activeTab === "recycle-bin" && (
            <div className='flex ml-auto space-x-1'>
              <button
                onClick={() => handleRestore(screenshot.id)}
                className={cn(
                  "p-1 rounded transition-colors duration-200 hover:bg-hover text-info"
                )}
                title='Restore'
              >
                <ArrowUpRight size={14} />
              </button>
              <button
                onClick={() => handlePermanentDelete(screenshot.id)}
                className={cn(
                  "p-1 rounded transition-colors duration-200 hover:bg-card text-error"
                )}
                title='Delete Permanently'
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
