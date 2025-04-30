"use client";

import { CheckSquare, FolderOpen, Square, Trash2 } from "lucide-react";

import { useScreenShot } from "@/context/ScreenShotContext";

export const ScreenshotHeader = () => {
  const {
    activeTab,
    currentFolder,
    isMultiSelectMode,
    filteredScreenshots,
    selectedScreenshots,
    handleSelectAll,
  } = useScreenShot();
  return (
    <div className='flex items-center justify-between mb-5'>
      <div className='flex items-center space-x-3'>
        <div className='p-2 rounded-lg hover:bg-hover'>
          {activeTab === "recycle-bin" ? (
            <Trash2 size={20} className='text-info' />
          ) : currentFolder === "trash" ? (
            <Trash2 size={20} className='text-info' />
          ) : (
            <FolderOpen size={20} className='text-info' />
          )}
        </div>
        <h2 className='text-xl font-semibold'>
          {activeTab === "recycle-bin"
            ? "Recycle Bin"
            : currentFolder === "trash"
            ? "Trash"
            : "Screenshots"}
          {filteredScreenshots.length > 0 && (
            <span className='text-sm font-normal ml-2 px-2 py-0.5 rounded-full bg-card text-text'>
              {filteredScreenshots.length}
            </span>
          )}
        </h2>
      </div>

      {isMultiSelectMode && filteredScreenshots.length > 0 && (
        <button
          onClick={handleSelectAll}
          className='flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200 text-sm bg-card text-text hover:bg-hover'
        >
          {selectedScreenshots.length === filteredScreenshots.length ? (
            <>
              <CheckSquare size={14} className='mr-1' />
              <span>Deselect All</span>
            </>
          ) : (
            <>
              <Square size={14} className='mr-1' />
              <span>Select All</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
