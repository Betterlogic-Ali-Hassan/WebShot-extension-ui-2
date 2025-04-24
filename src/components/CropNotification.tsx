"use client";

import { Scissors, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CropNotificationProps {
  isDarkMode: boolean;
  onClose?: () => void;
}

export function CropNotification({
  isDarkMode,
  onClose,
}: CropNotificationProps) {
  return (
    <div className='fixed bottom-32 left-1/2 transform -translate-x-1/2 z-20'>
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300",
          isDarkMode ? "bg-[#2C2C2E]" : "bg-white"
        )}
      >
        <Scissors className='h-4 w-4' />
        <p className='text-sm'>
          Crop is active — Drag to select the area you want to crop.
        </p>
        <button
          onClick={onClose}
          className={cn(
            "ml-1 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors",
            "flex items-center justify-center"
          )}
          aria-label='Cancel crop'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
}
