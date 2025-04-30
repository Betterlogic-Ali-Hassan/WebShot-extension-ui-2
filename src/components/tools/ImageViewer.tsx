"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useImageEditor } from "@/context/ImageContext";

interface ImageViewerProps {
  disableWheelZoom?: boolean;
  showZoomControls?: boolean;
  fitToContainer?: boolean;
}

export function ImageViewer({ showZoomControls = true }: ImageViewerProps) {
  const { uploadedImage: imageUrl } = useImageEditor();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [initialScale, setInitialScale] = useState(1);
  const [isImageSmall, setIsImageSmall] = useState(false);
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle zoom in/out buttons
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 5));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.1));
  };

  const resetZoom = () => {
    setZoomLevel(initialScale);
  };

  // This is the function that handles the expand/collapse functionality
  const toggleHeightExpand = () => {
    setIsHeightExpanded((prev) => !prev);
  };

  // Update container and image size on load and resize
  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current && imageRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        setContainerSize({
          width: containerWidth,
          height: containerHeight,
        });

        // Get natural image dimensions
        const imgWidth = imageRef.current.naturalWidth;
        const imgHeight = imageRef.current.naturalHeight;

        setImageSize({
          width: imgWidth,
          height: imgHeight,
        });

        // Check if image is smaller than container
        setIsImageSmall(
          imgWidth < containerWidth && imgHeight < containerHeight
        );

        // Set initial scale to 1 since we're handling width with CSS
        setInitialScale(1);
        setZoomLevel(1);
      }
    };

    // Update sizes when image loads
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.onload = updateSizes;
    }

    // Update on resize
    window.addEventListener("resize", updateSizes);

    // Initial update
    updateSizes();

    return () => {
      window.removeEventListener("resize", updateSizes);
      if (imageElement) {
        imageElement.onload = null;
      }
    };
  }, [imageUrl]);

  // If no image, show placeholder
  if (!imageUrl) {
    return (
      <div
        className={cn(
          "w-full h-full rounded-xl flex items-center justify-center",
          "bg-card"
        )}
      >
        <p className='text-center text-gray-500'>
          No image uploaded yet
          <br />
          <span className='text-sm'>Upload an image to preview</span>
        </p>
      </div>
    );
  }

  return (
    <div className='relative flex flex-col h-full w-full'>
      {/* Image container */}
      <div
        ref={containerRef}
        className={cn(
          "overflow-auto rounded-xl p-0 w-full transition-all duration-500 ease-in-out",
          isHeightExpanded ? "h-[calc(100vh-100px)]" : "h-full",
          isImageSmall ? "flex items-center justify-center" : "block",
          "bg-card"
        )}
      >
        <img
          ref={imageRef}
          src={imageUrl || "/placeholder.svg"}
          alt='Uploaded screenshot'
          className='transition-transform duration-200'
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            height: "auto",
            margin: imageSize.width < containerSize.width ? "0 auto" : "0",
            display: "block",
            width: imageSize.width < containerSize.width ? "auto" : "100%",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* Zoom controls */}
      {showZoomControls && (
        <div className='absolute bottom-4 right-4 flex flex-col gap-2'>
          {/* Height expand/collapse button */}
          <div className='group relative'>
            <button
              onClick={toggleHeightExpand}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                "bg-searchbar text-foreground hover:bg-btn-hover"
              )}
              aria-label={isHeightExpanded ? "Collapse view" : "Expand view"}
            >
              {isHeightExpanded ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M3 14h18m-18 0 6 6m-6-6 6-6'></path>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M3 10h18m-18 0 6-6m-6 6 6 6'></path>
                </svg>
              )}
            </button>
            <div
              className={cn(
                "absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "bg-searchbar text-foreground shadow-md"
              )}
            >
              {isHeightExpanded ? "Collapse view" : "Expand view"}
            </div>
          </div>

          {/* Other zoom controls */}
          <div className='group relative'>
            <button
              onClick={zoomIn}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                "bg-searchbar text-foreground hover:bg-btn-hover"
              )}
              aria-label='Zoom in'
            >
              <ZoomIn className='h-5 w-5' />
            </button>
            <div
              className={cn(
                "absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "bg-searchbar text-foreground shadow-md"
              )}
            >
              Zoom in
            </div>
          </div>

          <div className='group relative'>
            <button
              onClick={zoomOut}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                "bg-searchbar text-foreground hover:bg-btn-hover"
              )}
              aria-label='Zoom out'
            >
              <ZoomOut className='h-5 w-5' />
            </button>
            <div
              className={cn(
                "absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "bg-searchbar text-foreground shadow-md"
              )}
            >
              Zoom out
            </div>
          </div>

          <div className='group relative'>
            <button
              onClick={resetZoom}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                "bg-searchbar text-foreground hover:bg-btn-hover",
                zoomLevel === initialScale ? "opacity-50" : "opacity-100"
              )}
              aria-label='Reset zoom'
              disabled={zoomLevel === initialScale}
            >
              <RotateCcw className='h-4 w-4' />
            </button>
            <div
              className={cn(
                "absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "bg-searchbar text-foreground shadow-md"
              )}
            >
              Reset zoom
            </div>
          </div>

          {/* Zoom level indicator */}
          <div
            className={cn(
              "px-2 py-1 rounded-md text-xs font-medium text-center",
              "bg-searchbar text-foreground shadow-lg"
            )}
          >
            {Math.round(zoomLevel * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
