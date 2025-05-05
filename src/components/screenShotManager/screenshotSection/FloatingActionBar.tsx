"use client";

import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import type { screenShot } from "@/types/ScreenShot";
import {
  ArrowUpRight,
  Edit,
  Eye,
  FolderOpen,
  Link,
  MoreHorizontal,
  Pencil,
  Tags,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  screenshot: screenShot;
}

const FloatingActionBar = ({ screenshot }: Props) => {
  const {
    setMovingScreenshot,
    setIsMoveFolderOpen,
    handleOpenRenameModal,
    handleTagManagement,
    activeTab,
    handlePreview,
    handleShare,
    handleRestore,
    handlePermanentDelete,
    handleDelete,
  } = useScreenShot();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = (screenshot: screenShot) => {
    navigate(`/?image=${encodeURIComponent(screenshot.url)}`);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Mobile toggle button - only visible below md breakpoint */}
      <button
        onClick={toggleExpand}
        className={cn(
          "p-2 rounded-full bg-card absolute top-2 right-2 border shadow-lg transition-colors duration-200 flex items-center gap-1.5 animate-in fade-in zoom-in-95  justify-center md:hidden",
          isExpanded ? "w-auto hidden" : "w-8 h-8 flex"
        )}
      >
        <MoreHorizontal size={16} className='text-text-primary min-w-4' />
      </button>

      {/* Action buttons container */}
      <div
        className={cn(
          "absolute top-2 right-2 transition-all duration-300 ease-in-out transform flex items-center gap-1.5 p-1.5 rounded-full bg-card backdrop-blur-md shadow-lg border animate-in fade-in zoom-in-95 max-w-0 opacity-0 md:opacity-0 md:max-w-[500px] md:group-hover:scale-105",
          isExpanded && "opacity-100 max-w-[500px]"
        )}
      >
        {/* Show MoreHorizontal on the left when expanded on mobile */}
        {isExpanded && (
          <button
            onClick={toggleExpand}
            className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 md:hidden'
          >
            <MoreHorizontal size={14} className='text-text-primary' />
          </button>
        )}

        <button
          onClick={() => handlePreview(screenshot)}
          className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
          title='View'
        >
          <Eye size={14} className='text-text-primary' />
        </button>

        {!screenshot.trash && activeTab !== "recycle-bin" && (
          <>
            <button
              onClick={() => handleEdit(screenshot)}
              className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
              title='Edit'
            >
              <Edit size={14} className='text-text-primary' />
            </button>
            <button
              onClick={() => handleShare(screenshot)}
              className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
              title='Copy Link'
            >
              <Link size={14} className='text-text-primary' />
            </button>
            <button
              onClick={() => {
                setMovingScreenshot(screenshot);
                setIsMoveFolderOpen(true);
              }}
              className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
              title='Move to Folder'
            >
              <FolderOpen size={14} className='text-text-primary' />
            </button>
            <button
              onClick={() => handleDelete(screenshot.id)}
              className='p-1.5 rounded-full bg-border  hover:bg-error/25 transition-colors duration-200 hover:scale-110 transform'
              title='Delete'
            >
              <Trash2 size={14} className='text-text-primary' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTagManagement(screenshot.id);
              }}
              className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
              title='Manage Tags'
            >
              <Tags size={14} className='text-text-primary' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenRenameModal(screenshot);
              }}
              className='p-1.5 rounded-full bg-border hover:bg-hover transition-colors duration-200 hover:scale-110 transform'
              title='Rename'
            >
              <Pencil size={14} className='text-text-primary' />
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
              <ArrowUpRight size={14} className='text-text-primary' />
            </button>
            <button
              onClick={() => handlePermanentDelete(screenshot.id)}
              className='p-1.5 rounded-full bg-white/10 hover:bg-red-400/25 transition-colors duration-200 hover:scale-110 transform'
              title='Delete Permanently'
            >
              <Trash2 size={14} className='text-text-primary' />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default FloatingActionBar;
