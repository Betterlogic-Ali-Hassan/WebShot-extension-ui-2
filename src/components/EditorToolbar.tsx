"use client";

import type React from "react";

import { useRef } from "react";
import {
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
              return wrapWithPremiumIndicator(<Star className='!h-4 !w-4' />);
            default:
              return wrapWithPremiumIndicator(<Square className='!h-4 !w-4' />);
          }
        }
        return wrapWithPremiumIndicator(<Square className='!h-4 !w-4' />);

      case "arrow":
        if (activeTool === "arrow") {
          switch (selectedArrowStyle) {
            case "arrow-curve":
              return wrapWithPremiumIndicator(
                <ArrowUpRight className='!h-4 !w-4' />
              );
            case "double-arrow":
              return wrapWithPremiumIndicator(
                <svg
                  width='16'
                  height='16'
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
                  width='16'
                  height='16'
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
                  width='16'
                  height='16'
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
                  width='16'
                  height='16'
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
                <ArrowRight className='!h-4 !w-4' />
              );
          }
        }
        return wrapWithPremiumIndicator(<ArrowRight className='!h-4 !w-4' />);

      case "pencil":
        if (activeTool === "pencil") {
          switch (selectedPencilTool) {
            case "brush":
              return wrapWithPremiumIndicator(
                <Paintbrush className='!h-4 !w-4' />
              );
            case "highlighter":
              return wrapWithPremiumIndicator(
                <Highlighter className='!h-4 !w-4' />
              );
            default:
              return wrapWithPremiumIndicator(<Pencil className='!h-4 !w-4' />);
          }
        }
        return wrapWithPremiumIndicator(<Pencil className='!h-4 !w-4' />);

      case "textarrow":
        if (activeTool === "textarrow") {
          if (selectedTextArrowType === "page-text") {
            return wrapWithPremiumIndicator(
              <svg
                width='16'
                height='16'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='2'
                  y='2'
                  width='16'
                  height='16'
                  rx='2'
                  stroke='currentColor'
                  stroke-width='1.5'
                ></rect>
                <path
                  d='M5 6H15'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                ></path>
                <path
                  d='M5 10H15'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                ></path>
                <path
                  d='M5 14H12'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                ></path>
              </svg>
            );
          }
          // Text arrow icon - speech bubble with arrow
          return wrapWithPremiumIndicator(
            <div className='relative h-4 w-4'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-0 left-0'
              >
                <rect
                  x='2'
                  y='2'
                  width='12'
                  height='10'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
              </svg>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute -bottom-1 -right-1'
              >
                <path
                  d='M12 10L18 16M18 16H14M18 16V12'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          );
        }
        // Default text arrow icon when not active
        return wrapWithPremiumIndicator(
          <div className='relative h-4 w-4'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute top-0 left-0'
            >
              <rect
                x='2'
                y='2'
                width='12'
                height='10'
                rx='2'
                stroke='currentColor'
                strokeWidth='1.5'
              />
            </svg>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute -bottom-1 -right-1'
            >
              <path
                d='M12 10L18 16M18 16H14M18 16V12'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        );
      default: {
        // For other tools, use the default icon mapping
        const iconMap: Record<string, React.ElementType> = {
          crop: Crop,
          text: Type,
          number: Hash,
          stickers: Smile,
          blur: Blur,
          border: BorderAll,
          watermark: ImageIcon,
        };
        const Icon = iconMap[toolId] || Square;
        return wrapWithPremiumIndicator(<Icon className='!h-4 !w-4' />);
      }
    }
  };

  // Filter tools based on visibility settings
  const tools = [
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

  return (
    <div
      className={cn(
        "fixed  left-0 w-full z-40 shadow-md transition-all duration-300 animate-fade-in-top bg-background  ",
        toolbarPosition === "bottom" ? "bottom-0" : "top-0"
      )}
    >
      <div className='max-w-screen-2xl mx-auto px-4 h-[72px] py-2 flex items-center justify-between'>
        {/* Left section - logo */}
        <div className='flex items-center min-w-24'>{logo}</div>

        {/* Center section - tools */}
        <div className='flex items-center justify-center gap-1 ml-2 rounded-[20px] px-3 py-2 transition-all duration-300 bg-card text-text absolute left-1/2 -translate-x-1/2'>
          {visibleTools.map((tool) => (
            <Tooltip
              key={tool.id}
              id={tool.id}
              place={activeTool ? "left" : "bottom"}
              content={tool.label}
            >
              <Button
                ref={(el) => (buttonRefs.current[tool.id] = el)}
                className={cn(
                  "rounded-xl transition-all duration-200 hover:scale-110 min-w-10 h-[40px] hover:bg-hover",
                  activeTool === tool.id && "bg-hover "
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
