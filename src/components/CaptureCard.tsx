"use client";

import type React from "react";
import Button from "@/components/ui/button";

import { Upload, FileImage, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Separator from "./ui/Separator";

interface CaptureCardProps {
  onCapture: () => void;
  onUpload: () => void;
}

export function CaptureCard({ onCapture, onUpload }: CaptureCardProps) {
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

    onUpload();
  };

  return (
    <div className='w-full max-w-md p-6 rounded-[20px] shadow-lg transition-all duration-300 bg-background border border-border'>
      <h2 className='text-xl font-semibold text-center mb-6'>
        Capture Screenshot from URL
      </h2>

      <div className='space-y-4'>
        <input
          type='url'
          placeholder='https://example.com'
          className='rounded-xl h-10 border-none w-full px-3 py-2 bg-hover text-text focus:outline-none text-sm'
        />

        <Button
          onClick={onCapture}
          className='w-full rounded-xl h-10 bg-info hover:opacity-80 text-text-primary justify-center'
        >
          <FileImage className='mr-2 h-4 w-4' />
          Capture Screenshot
        </Button>

        <div className='flex items-center gap-2 my-4 px-2'>
          <Separator className='h-[1px] w-[45%] bg-border' />
          <span className='text-sm text-foreground'>OR</span>
          <Separator className='h-[1px] w-[45%] bg-border' />
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full rounded-xl h-32 border-dashed border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 border-border hover:border-hover",

            isDragging && "bg-background border-info"
          )}
        >
          <Upload className='h-8 w-8 opacity-70' />
          <div className='text-center'>
            <p className='font-medium'>Drop image here or</p>
            <Button
              onClick={onUpload}
              className='p-0 h-auto justify-center w-full text-info'
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
