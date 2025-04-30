import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { FolderOpen, Trash2 } from "lucide-react";

const MultiSelectBar = () => {
  const {
    selectedScreenshots,
    setIsDeleteConfirmationOpen,
    currentFolder,
    setIsMoveFolderOpen,
  } = useScreenShot();
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20",
        "px-4 py-3 rounded-full shadow-lg",
        "flex items-center space-x-4",
        "animate-in fade-in slide-in-from-bottom-5 duration-300 bg-background border"
      )}
    >
      <span className='text-sm font-medium'>
        {selectedScreenshots.length} selected
      </span>

      <div className='h-4 border-r '></div>

      <button
        onClick={() => setIsDeleteConfirmationOpen(true)}
        className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 bg-error hover:bg-error/80 text-text-primary'
      >
        <Trash2 size={14} className='mr-1' />
        <span>Delete</span>
      </button>

      {currentFolder !== "trash" && (
        <button
          onClick={() => setIsMoveFolderOpen(true)}
          className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 bg-card hover:bg-hover'
        >
          <FolderOpen size={14} className='mr-1' />
          <span>Move</span>
        </button>
      )}
    </div>
  );
};

export default MultiSelectBar;
