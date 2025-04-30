"use client";

import { Scissors, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CropNotification() {
  const [showNotification, setShowNotification] = useState(true);
  const onClose = () => {
    setShowNotification(false);
  };
  return (
    <div
      className={cn(
        "fixed bottom-32 left-1/2 transform -translate-x-1/2 z-20 hidden",
        showNotification && "block"
      )}
    >
      <div className='flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 bg-background border border-border text-text'>
        <Scissors className='h-4 w-4' />
        <p className='text-sm'>
          Crop is active — Drag to select the area you want to crop.
        </p>
        <button
          onClick={onClose}
          className={cn(
            "ml-1 p-1 rounded-full hover:bg-hover  transition-colors",
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
