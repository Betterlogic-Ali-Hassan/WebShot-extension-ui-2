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
import Tooltip from "../ui/toolip";
import { useImageEditor } from "@/context/ImageContext";
import TextArrowIcon from "../svgs/TextArrowIcon";
import PageTextIcon from "../svgs/PageTextIcon";
import DottedLineIcon from "../svgs/DottedLineIcon";
import CurveLineIcon from "../svgs/CurveLineIcon";
import LineIcon from "../svgs/LineIcon";
import DoubleArrowIcon from "../svgs/DoubleArrowIcon";
import { FooterControls } from "./FooterControl";

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
              return wrapWithPremiumIndicator(<DoubleArrowIcon />);
            case "line":
              return wrapWithPremiumIndicator(<LineIcon />);
            case "curve-line":
              return wrapWithPremiumIndicator(<CurveLineIcon />);
            case "dotted-line":
              return wrapWithPremiumIndicator(<DottedLineIcon />);
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
            return wrapWithPremiumIndicator(<PageTextIcon />);
          }
          // Text arrow icon - speech bubble with arrow
          return wrapWithPremiumIndicator(<TextArrowIcon />);
        }
        // Default text arrow icon when not active
        return wrapWithPremiumIndicator(<TextArrowIcon />);
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
      <div className='max-w-screen-2xl mx-auto px-4 h-[72px] py-2 flex items-center justify-between gap-10 overflow-x-auto'>
        {/* Left section - logo */}
        <div className='flex items-center gap-20'>
          <div className='flex items-center min-w-24'>{logo}</div>
          {toolbarPosition === "bottom" && <FooterControls />}
        </div>

        {/* Center section - tools */}
        <div className='flex items-center justify-center gap-1 ml-2 rounded-[20px] px-3 py-2 transition-all duration-300 bg-card text-text min-[1200px]:absolute min-[1200px]:left-1/2 min-[1200px]:-translate-x-1/2'>
          {visibleTools.map((tool) => (
            <Tooltip key={tool.id} id={tool.id} content={tool.label}>
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
        <div className='flex items-center gap-3 min-[1200px]:min-w-[100px] px-2 justify-end'>
          {settingsButton && settingsButton}
        </div>
      </div>
    </div>
  );
}
