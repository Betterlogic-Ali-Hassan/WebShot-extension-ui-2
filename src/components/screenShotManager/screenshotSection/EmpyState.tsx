"use client";

import { cn } from "@/lib/utils";
import { Search, Trash2, Upload } from "lucide-react";
import { useScreenShot } from "@/context/ScreenShotContext";

export const EmptyState = () => {
  const {
    activeTab,
    currentFolder,
    searchQuery,
    selectedTags,
    dateRange,
    fileInputRef,
  } = useScreenShot();
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 rounded-2xl px-6",
        "border transition-all duration-200 bg-card border-border"
      )}
    >
      {activeTab === "recycle-bin" ? (
        <>
          <Trash2 size={48} className='text-foreground mb-4' />
          <h3 className='text-lg font-medium mb-1 text-center'>
            Recycle Bin is Empty
          </h3>
          <p className='text-foreground text-center max-w-md'>
            Deleted screenshots will appear here for 30 days before being
            permanently removed
          </p>
        </>
      ) : currentFolder === "trash" ? (
        <>
          <Trash2 size={48} className='text-foreground mb-4' />
          <h3 className='text-lg font-medium mb-1'>Trash is Empty</h3>
          <p className='text-foreground text-center max-w-md'>
            Deleted screenshots will appear here
          </p>
        </>
      ) : searchQuery ||
        selectedTags.length > 0 ||
        dateRange.start ||
        dateRange.end ? (
        <>
          <Search size={48} className='text-foreground mb-4' />
          <h3 className='text-lg font-medium mb-1'>No Results Found</h3>
          <p className='text-foreground text-center max-w-md'>
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              // This would need to be handled by the parent component
              // setSearchQuery("");
              // setSelectedTags([]);
              // setDateRange({ start: "", end: "" });
            }}
            className={cn(
              "mt-4 px-4 py-2 rounded-full transition-all duration-200 bg-card hover:bg-hover"
            )}
          >
            Clear Filters
          </button>
        </>
      ) : (
        <>
          <div className='bg-checkered w-48 h-48 rounded-2xl flex items-center justify-center mb-4'>
            <Upload size={48} className='text-foreground' />
          </div>
          <h3 className='text-lg font-medium mb-1'>No Screenshots Yet</h3>
          <p className='text-foreground text-center max-w-md'>
            Upload your first screenshot to get started
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "mt-4 px-4 py-2 rounded-full transition-all duration-200",
              "shadow-md hover:shadow-lg",
              "bg-info hover:bg-info-hover",
              "text-text-primary"
            )}
          >
            Upload Screenshot
          </button>
        </>
      )}
    </div>
  );
};
