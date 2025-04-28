"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, Upload, ChevronDown, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";

type WatermarkPosition =
  | "Top Left"
  | "Top Right"
  | "Bottom Left"
  | "Bottom Right"
  | "Center";

export function WatermarkToolPopup() {
  const {
    popupPosition: position,
    toolbarPosition,
    handleClosePopup: onClose,
  } = useImageEditor();
  // State for watermark controls
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState(false);
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [watermarkPosition, setWatermarkPosition] =
    useState<WatermarkPosition>("Top Right");
  const [watermarkSize, setWatermarkSize] = useState(50);
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Refs for positioning
  const popupRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const positionDropdownRef = useRef<HTMLDivElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Position options
  const positionOptions: WatermarkPosition[] = [
    "Top Left",
    "Top Right",
    "Bottom Left",
    "Bottom Right",
    "Center",
  ];

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/svg+xml")
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setWatermarkImage(dataUrl);

          // Get image dimensions
          const img = new Image();
          img.onload = () => {
            setImageSize({
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };
          img.src = dataUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle size change
  const handleSizeChange = (value: number[]) => {
    setWatermarkSize(value[0]);
  };

  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    setWatermarkOpacity(value[0]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        positionDropdownRef.current &&
        !positionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPositionDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 bg-card border border-border text-text",
        isToolbarBottom && isWatermarkEnabled && "-mt-[150px]",
        isToolbarLeft && isWatermarkEnabled && "-mt-[130px]",
        isToolbarLeft && "ml-[100px]",
        isToolbarBottom && "-mt-4"
      )}
      style={{
        top: ` ${position.top}px`,
        left: `${isToolbarLeft ? "0" : position.left}px`,
        transform: `${isToolbarLeft ? "translateX(0)" : "translateX(-50%)"}`,
        maxWidth: isToolbarLeft ? "200px" : "250px",
        width: "100%",
      }}
    >
      <div className='p-3'>
        {/* Watermark Toggle */}
        <div className='flex items-center justify-between'>
          <span className='text-sm font-medium text-text'>Watermark</span>
          <div className='flex items-center gap-2'>
            <Switch
              checked={isWatermarkEnabled}
              onCheckedChange={setIsWatermarkEnabled}
            />
            <Button
              className='h-7 w-7 rounded-full ml-1 justify-center hover:bg-hover text-text'
              onClick={onClose}
            >
              <X className='h-4 w-4 flex-shrink-0' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>
        </div>

        {isWatermarkEnabled && (
          <>
            {/* Upload Section */}
            <div className='mb-2 mt-4'>
              <input
                type='file'
                ref={fileInputRef}
                accept='image/png,image/jpeg,image/svg+xml'
                className='hidden'
                onChange={handleFileUpload}
              />
              {!watermarkImage ? (
                <button
                  onClick={handleUploadClick}
                  className='w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors border-border/70 hover:border-border text-text/70'
                >
                  <Upload className='h-6 w-6 mb-2' />
                  <span className='text-sm'>Upload Image</span>
                </button>
              ) : (
                <div className='relative'>
                  <img
                    src={watermarkImage || "/placeholder.svg"}
                    alt='Watermark preview'
                    className='w-full h-auto max-h-32 object-contain rounded-md'
                    style={{ opacity: watermarkOpacity / 100 }}
                  />
                  {imageSize && (
                    <div className='absolute bottom-2 right-2 px-2 py-1 text-xs rounded-md bg-background/70 text-text'>
                      {imageSize.width} × {imageSize.height}px
                    </div>
                  )}
                  <Button
                    onClick={() => {
                      setWatermarkImage(null);
                      setImageSize(null);
                    }}
                    className='absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-background/70 hover:bg-background/90'
                  >
                    <Trash2 className='h-3 w-3' />
                    <span className='sr-only'>Remove watermark</span>
                  </Button>
                </div>
              )}
            </div>

            {watermarkImage && (
              <>
                {/* Position Selector */}
                <div className='mb-4'>
                  <label className='block text-sm font-medium mb-1.5 text-text'>
                    Position
                  </label>
                  <div className='relative' ref={positionDropdownRef}>
                    <button
                      onClick={() =>
                        setIsPositionDropdownOpen(!isPositionDropdownOpen)
                      }
                      className='flex items-center justify-between w-full px-3 py-2 text-left border rounded-md transition-colors bg-card border-border hover:border-border/80'
                    >
                      <span>{watermarkPosition}</span>
                      <ChevronDown className='h-4 w-4 opacity-50' />
                    </button>

                    {isPositionDropdownOpen && (
                      <div className='absolute z-10 w-full mt-1 rounded-md shadow-lg bg-card border border-border'>
                        <div className='py-1'>
                          {positionOptions.map((option) => (
                            <button
                              key={option}
                              className={cn(
                                "block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-hover text-text",
                                watermarkPosition === option && "bg-hover"
                              )}
                              onClick={() => {
                                setWatermarkPosition(option);
                                setIsPositionDropdownOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Size Slider */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between mb-1.5'>
                    <label className='text-sm font-medium text-text'>
                      Size
                    </label>
                    <span className='text-xs font-medium px-2 py-0.5 rounded-full bg-searchbar text-text'>
                      {watermarkSize}%
                    </span>
                  </div>
                  <div className='relative'>
                    <Slider
                      value={[watermarkSize]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={handleSizeChange}
                    />
                    <div className='absolute w-full flex justify-between px-1 mt-1.5'>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                    </div>
                  </div>
                </div>

                {/* Opacity Slider */}
                <div className='mb-4'>
                  <div className='flex items-center justify-between mb-1.5'>
                    <label className='text-sm font-medium text-text'>
                      Opacity
                    </label>
                    <span className='text-xs font-medium px-2 py-0.5 rounded-full bg-searchbar text-text'>
                      {watermarkOpacity}%
                    </span>
                  </div>
                  <div className='relative'>
                    <Slider
                      value={[watermarkOpacity]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={handleOpacityChange}
                    />
                    <div className='absolute w-full flex justify-between px-1 mt-1.5'>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                      <div className='w-0.5 h-1 bg-border'></div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
