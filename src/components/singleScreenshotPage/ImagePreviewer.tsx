"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCw, Maximize, Minimize } from "lucide-react";

interface ImageViewerProps {
  imageUrl: string;
  disableWheelZoom?: boolean;
  showZoomControls?: boolean;
  fitToContainer?: boolean;
}

export function ImageViewer({
  imageUrl,
  disableWheelZoom = false,
  showZoomControls = true,
  fitToContainer = false,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset position when scale changes
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (disableWheelZoom) return;

    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.5, scale + delta), 5);
    setScale(newScale);
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.25, 5));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    const newScale = Math.max(0.5, scale - 0.25);
    setScale(newScale);
  };

  // Handle rotation
  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 bg-background" : ""
      }`}
      onMouseLeave={handleMouseUp}
    >
      <div
        className='relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {imageUrl && (
          <img
            ref={imageRef}
            src={imageUrl || "/placeholder.svg"}
            alt='Screenshot'
            className={`transition-transform duration-200 ${
              dragging ? "" : "transition-transform duration-200"
            }`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
              maxWidth: fitToContainer ? "100%" : "none",
              maxHeight: fitToContainer ? "100%" : "none",
            }}
            draggable={false}
          />
        )}
      </div>

      {showZoomControls && (
        <div className='absolute bottom-4 right-4 flex items-center space-x-2'>
          <button
            onClick={handleZoomOut}
            className='p-2 rounded-full bg-card hover:bg-hover text-text transition-colors'
            disabled={scale <= 0.5}
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleZoomIn}
            className='p-2 rounded-full bg-card hover:bg-hover text-text transition-colors'
            disabled={scale >= 5}
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleRotate}
            className='p-2 rounded-full bg-card hover:bg-hover text-text transition-colors'
          >
            <RotateCw size={18} />
          </button>
          <button
            onClick={handleFullscreenToggle}
            className='p-2 rounded-full bg-card hover:bg-hover text-text transition-colors'
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      )}
    </div>
  );
}
