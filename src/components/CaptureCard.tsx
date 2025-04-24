"use client";

import type React from "react";
import Button from "@/components/ui/button";

import { Upload, FileImage, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Separator from "./ui/Separator";

interface CaptureCardProps {
  isDarkMode: boolean;
  onCapture: () => void;
  onUpload: () => void;
}

export function CaptureCard({
  isDarkMode,
  onCapture,
  onUpload,
}: CaptureCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // In a real implementation, we would handle the file here
    // But for now, we just call onUpload to trigger the file input
    onUpload();
  };

  return (
    <div
      className={cn(
        "w-full max-w-md p-6 rounded-[20px] shadow-lg transition-all duration-300",
        isDarkMode ? "bg-[#2C2C2E]" : "bg-white shadow-md"
      )}
    >
      <h2 className='text-xl font-semibold text-center mb-6'>
        Capture Screenshot from URL
      </h2>

      <div className='space-y-4'>
        <input
          type='url'
          placeholder='https://example.com'
          className={cn(
            "rounded-xl h-10 border-none w-full px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm",
            isDarkMode ? "bg-[#3A3A3C] text-white" : "bg-gray-100 text-black"
          )}
        />

        <Button
          onClick={onCapture}
          className='w-full rounded-xl h-10 bg-[#007AFF] hover:bg-[#0071EB] text-white justify-center'
        >
          <FileImage className='mr-2 h-4 w-4' />
          Capture Screenshot
        </Button>

        <div className='flex items-center gap-2 my-4 px-2'>
          <Separator
            className={cn(
              "h-[1px] w-[45%]",
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            )}
          />
          <span className='text-sm text-gray-500'>OR</span>
          <Separator
            className={cn(
              "h-[1px] w-[45%] ",
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            )}
          />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full rounded-xl h-32 border-dashed border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2",
            isDarkMode
              ? "border-gray-600 hover:border-gray-500 text-gray-300"
              : "border-gray-300 hover:border-gray-400 text-gray-700",
            isDragging &&
              (isDarkMode
                ? "bg-[#3A3A3C] border-[#007AFF]"
                : "bg-gray-50 border-[#007AFF]")
          )}
        >
          <Upload className='h-8 w-8 opacity-70' />
          <div className='text-center'>
            <p className='font-medium'>Drop image here or</p>
            <Button
              onClick={onUpload}
              className={cn(
                "p-0 h-auto justify-center w-full",
                isDarkMode ? "text-[#007AFF]" : "text-[#0071EB]"
              )}
            >
              browse files
            </Button>
          </div>
        </div>

        <div className='flex items-center justify-center gap-2 mt-4'>
          <Clipboard className='h-4 w-4 text-gray-500' />
          <p className='text-xs text-gray-500'>
            You can also paste (Ctrl+V) from clipboard
          </p>
        </div>
      </div>
    </div>
  );
}
