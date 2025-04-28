"use client";

import type React from "react";

import { useRef } from "react";
import {
  ZoomIn,
  Crop,
  Pencil,
  Square,
  ArrowRight,
  Type,
  Smile,
  CloudyIcon as Blur,
  FlagIcon as BorderAll,
  ImageIcon,
  Hash,
  Star,
  ArrowUpRight,
  Paintbrush,
  Highlighter,
  Camera,
} from "lucide-react";
import Button from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Tooltip from "./ui/toolip";
import { useImageEditor } from "@/context/ImageContext";

// Update the EditorToolbar interface to include the logo prop
interface EditorToolbarProps {
  settingsButton?: React.ReactNode;
  logo?: React.ReactNode;
}

// Update the EditorToolbar component to include the logo parameter
export function EditorToolbar({ settingsButton, logo }: EditorToolbarProps) {
  const {
    toolbarPosition,
    selectedShape = "square",
    selectedArrowStyle = "arrow-line",
    selectedPencilTool = "pencil",
    selectedTextArrowType = "text-arrow",
    toolVisibility,
    activeTool,
    handleToolChange: onToolChange,
  } = useImageEditor();
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Update the renderToolIcon function to add premium indicators to specific tools
  const renderToolIcon = (toolId: string) => {
    const wrapWithPremiumIndicator = (icon: React.ReactNode) => {
      return icon;
    };

    switch (toolId) {
      case "square":
        if (activeTool === "square") {
          switch (selectedShape) {
            case "rounded":
              return wrapWithPremiumIndicator(
                <div className='w-5 h-5 flex items-center justify-center'>
                  <div className='w-4 h-4 rounded-md border-2 border-current'></div>
                </div>
              );
            case "circle":
              return wrapWithPremiumIndicator(
                <div className='w-5 h-5 flex items-center justify-center'>
                  <div className='w-4 h-4 rounded-full border-2 border-current'></div>
                </div>
              );
            case "star":
              return wrapWithPremiumIndicator(<Star className='h-5 w-5' />);
            default:
              return wrapWithPremiumIndicator(<Square className='h-5 w-5' />);
          }
        }
        return wrapWithPremiumIndicator(<Square className='h-5 w-5' />);

      case "arrow":
        if (activeTool === "arrow") {
          switch (selectedArrowStyle) {
            case "arrow-curve":
              return wrapWithPremiumIndicator(
                <ArrowUpRight className='h-5 w-5' />
              );
            case "double-arrow":
              return wrapWithPremiumIndicator(
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 10H17M3 10L7 6M3 10L7 14M17 10L13 6M17 10L13 14'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              );
            case "line":
              return wrapWithPremiumIndicator(
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 10H17'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              );
            case "curve-line":
              return wrapWithPremiumIndicator(
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 14C6 14 7 6 10 6C13 6 14 14 17 14'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                </svg>
              );
            case "dotted-line":
              return wrapWithPremiumIndicator(
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 10H5M8 10H10M13 10H15M18 10H20'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              );
            default:
              return wrapWithPremiumIndicator(
                <ArrowRight className='h-5 w-5' />
              );
          }
        }
        return wrapWithPremiumIndicator(<ArrowRight className='h-5 w-5' />);

      case "pencil":
        if (activeTool === "pencil") {
          switch (selectedPencilTool) {
            case "brush":
              return wrapWithPremiumIndicator(
                <Paintbrush className='h-5 w-5' />
              );
            case "highlighter":
              return wrapWithPremiumIndicator(
                <Highlighter className='h-5 w-5' />
              );
            default:
              return wrapWithPremiumIndicator(<Pencil className='h-5 w-5' />);
          }
        }
        return wrapWithPremiumIndicator(<Pencil className='h-5 w-5' />);

      case "textarrow":
        if (activeTool === "textarrow") {
          if (selectedTextArrowType === "page-text") {
            // Page text icon - document with text lines
            return wrapWithPremiumIndicator(
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='3'
                  y='3'
                  width='14'
                  height='14'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M6 7H14'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M6 10H14'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M6 13H10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            );
          }
          // Text arrow icon - speech bubble with arrow
          return wrapWithPremiumIndicator(
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 5C3 3.89543 3.89543 3 5 3H12C13.1046 3 14 3.89543 14 5V10C14 11.1046 13.1046 12 12 12H9L6 15V12H5C3.89543 12 3 11.1046 3 10V5Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M14 8L17 11'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M17 11L17 14'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          );
        }
        // Default text arrow icon when not active
        return wrapWithPremiumIndicator(
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 5C3 3.89543 3.89543 3 5 3H12C13.1046 3 14 3.89543 14 5V10C14 11.1046 13.1046 12 12 12H9L6 15V12H5C3.89543 12 3 11.1046 3 10V5Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14 8L17 11'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M17 11L17 14'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        );
      default: {
        // For other tools, use the default icon mapping
        const iconMap: Record<string, React.ElementType> = {
          zoom: ZoomIn,
          crop: Crop,
          text: Type,
          number: Hash,
          stickers: Smile,
          blur: Blur,
          border: BorderAll,
          watermark: ImageIcon,
        };
        const Icon = iconMap[toolId] || Square;
        return wrapWithPremiumIndicator(<Icon className='h-5 w-5' />);
      }
    }
  };

  // Filter tools based on visibility settings
  const tools = [
    { id: "zoom", label: "Zoom" },
    { id: "crop", label: "Crop" },
    { id: "pencil", label: "Pencil" },
    { id: "square", label: "Shape" },
    { id: "arrow", label: "Arrow Line" },
    { id: "text", label: "Text" },
    { id: "textarrow", label: "Text Arrow" },
    { id: "number", label: "Number" },
    { id: "stickers", label: "Stickers" },
    { id: "blur", label: "Blur" },
    { id: "border", label: "Border" },
    { id: "watermark", label: "Watermark" },
  ];

  const visibleTools = tools.filter(
    (tool) => toolVisibility[tool.id] !== false
  );

  // Update the handleToolClick function to pass isPremium information
  const handleToolClick = (toolId: string) => {
    const premiumTools = [
      "textarrow",
      "number",
      "stickers",
      "blur",
      "border",
      "watermark",
    ];
    const isPremium = premiumTools.includes(toolId);
    const buttonRect =
      buttonRefs.current[toolId]?.getBoundingClientRect() || null;
    onToolChange(toolId, buttonRect, isPremium);
  };

  // Render toolbar based on position
  if (toolbarPosition === "left") {
    return (
      <>
        <div className='fixed left-0 top-0 h-full z-50 shadow-md transition-all duration-300 animate-fade-in-left bg-background border-r border-border'>
          <div className='h-full py-4  px-3 flex flex-col items-center gap-8 overflow-y-auto no-scrollbar '>
            {/* Top section - logo and settings */}
            <div className='flex flex-col items-center gap-4'>
              {logo && (
                <div className='flex items-center justify-center w-8 h-8 rounded-lg mb-2 mt-6 bg-card'>
                  <Camera className='h-5 w-5 text-text' />
                </div>
              )}
              <div className='flex items-center gap-2 flex-col'>
                {settingsButton}
              </div>
            </div>

            {/* Center section - tools */}
            <div className='flex flex-col items-center gap-2 bg-card py-3 px-2 rounded-xl transition-all duration-300 min-[1600px]:fixed min-[1600px]:top-1/2 min-[1600px]:-translate-y-1/2'>
              {visibleTools.map((tool) => (
                <Tooltip
                  key={tool.id}
                  id={tool.id}
                  place='right'
                  content={tool.label}
                >
                  <Button
                    ref={(el) => (buttonRefs.current[tool.id] = el)}
                    className={cn(
                      "rounded-xl transition-all duration-200 hover:scale-110 min-w-10 hover:bg-hover bg-background",
                      activeTool === tool.id && "bg-hover"
                    )}
                    onClick={() => handleToolClick(tool.id)}
                  >
                    {renderToolIcon(tool.id)}
                    <span className='sr-only'>{tool.label}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>

            {/* Bottom section (empty for now) */}
            <div className='w-12'></div>
          </div>
        </div>
      </>
    );
  } else if (toolbarPosition === "bottom") {
    return (
      <>
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg rounded-full transition-all duration-300 animate-fade-in-bottom bg-background border border-border'>
          <div className='px-4 py-2 flex items-center justify-between'>
            {/* Left section - logo, settings and theme toggle */}
            <div className='flex items-center gap-3 mr-2'>
              {logo && <div className='mr-2'>{logo}</div>}
              {settingsButton}
            </div>

            {/* Center section - tools */}
            <div className='flex items-center justify-center gap-1 rounded-[20px] px-3 py-2 transition-all duration-300 bg-card text-text'>
              {visibleTools.map((tool) => (
                <Tooltip
                  key={tool.id}
                  id={tool.id}
                  place='top'
                  content={tool.label}
                >
                  <Button
                    ref={(el) => (buttonRefs.current[tool.id] = el)}
                    className={cn(
                      "rounded-xl transition-all duration-200 hover:scale-110 min-w-10 bg-background hover:bg-hover",
                      activeTool === tool.id && "bg-hover"
                    )}
                    onClick={() => handleToolClick(tool.id)}
                  >
                    {renderToolIcon(tool.id)}
                    <span className='sr-only'>{tool.label}</span>
                  </Button>
                </Tooltip>
              ))}
            </div>

            {/* Right section (empty for now) */}
            <div className='w-12'></div>
          </div>
        </div>
      </>
    );
  }

  // Default: Top position
  return (
    <div className='fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300 animate-fade-in-top bg-background border-b border-border'>
      <div className='max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between'>
        {/* Left section - logo */}
        <div className='flex items-center min-w-24'>{logo}</div>

        {/* Center section - tools */}
        <div className='flex items-center justify-center gap-1 rounded-[20px] px-3 py-2 transition-all duration-300 bg-card text-text'>
          {visibleTools.map((tool) => (
            <Tooltip
              key={tool.id}
              id={tool.id}
              place='bottom'
              content={tool.label}
            >
              <Button
                ref={(el) => (buttonRefs.current[tool.id] = el)}
                className={cn(
                  "rounded-xl transition-all duration-200 hover:scale-110 min-w-10 hover:bg-hover bg-background",
                  activeTool === tool.id && "bg-hover"
                )}
                onClick={() => handleToolClick(tool.id)}
              >
                {renderToolIcon(tool.id)}
                <span className='sr-only'>{tool.label}</span>
              </Button>
            </Tooltip>
          ))}
        </div>

        {/* Right section - settings and theme toggle */}
        <div className='flex items-center gap-3 min-w-[100px] px-2 justify-end'>
          {settingsButton && settingsButton}
        </div>
      </div>
    </div>
  );
}
