"use client";

import type React from "react";

import { useRef } from "react";
import { X, Check } from "lucide-react";
import Button from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import ThemeCards from "./ThemeCards";

interface SettingsPanelProps {
  onDarkModeChange?: (isDark: boolean) => void;
  // Add props for all settings that need to be controlled
  toolVisibility: Record<string, boolean>;
  onToolVisibilityChange: (toolId: string, isVisible: boolean) => void;
  toolbarPosition: "top" | "left" | "bottom";
  onToolbarPositionChange: (position: "top" | "left" | "bottom") => void;
  premiumPopupsEnabled?: boolean;
  onPremiumPopupsToggle?: (enabled: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function SettingsPanel({
  setIsOpen,
  toolVisibility = {
    zoom: false,
    textarrow: true,
    number: true,
    stickers: true,
    blur: true,
    border: true,
    watermark: true,
  },
  onToolVisibilityChange = () => {},
  toolbarPosition = "top",
  onToolbarPositionChange = () => {},
  premiumPopupsEnabled = false,
  onPremiumPopupsToggle = () => {},
}: SettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle tool visibility change
  const handleToolVisibilityChange = (toolId: string, isChecked: boolean) => {
    onToolVisibilityChange(toolId, isChecked);
  };

  // Handle toolbar position change with event prevention
  const handleToolbarPositionChange = (
    e: React.MouseEvent,
    position: "top" | "left" | "bottom"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onToolbarPositionChange(position);
  };

  const handlePremiumPopupsToggle = (checked: boolean) => {
    onPremiumPopupsToggle(checked);
  };

  return (
    <>
      <div
        ref={panelRef}
        className='h-full w-full overflow-hidden flex flex-col transition-transform duration-300 ease-in-out bg-card text-text '
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h2 className='text-lg font-semibold text-text'>Settings</h2>
          <Button
            onClick={() => setIsOpen(false)}
            className='rounded-full h-8 w-8 justify-center hover:bg-hover'
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {/* Settings Content */}
        <div className='flex-1 px-5 py-6 space-y-8 overflow-y-auto no-scrollbar'>
          {/* Theme Section */}
          <ThemeCards />

          {/* Toolbar Location */}
          <div className='space-y-4 pb-6 border-b border-border'>
            <h3 className='text-sm font-medium text-text'>Toolbar Location</h3>

            <div className='grid grid-cols-3 gap-3'>
              <button
                onClick={(e) => handleToolbarPositionChange(e, "top")}
                type='button'
                className={cn(
                  "p-4 rounded-lg border transition-all relative flex flex-col items-center justify-center gap-2",
                  toolbarPosition === "top"
                    ? "bg-info/20 border-info ring-1 ring-info/20"
                    : "bg-card border-border hover:bg-hover"
                )}
              >
                <div className='w-full h-2 bg-current rounded-full opacity-70'></div>
                <div className='w-full h-10 border-2 border-dashed border-current rounded-lg opacity-30'></div>
                <span className='text-xs font-medium mt-1'>Top</span>
                {toolbarPosition === "top" && (
                  <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-info flex items-center justify-center'>
                    <Check className='h-2 w-2 text-text-primary' />
                  </div>
                )}
              </button>

              {/* <button
                onClick={(e) => handleToolbarPositionChange(e, "left")}
                type='button'
                className={cn(
                  "p-4 rounded-lg border transition-all flex items-center justify-center gap-2 relative",
                  toolbarPosition === "left"
                    ? isDarkMode
                      ? "bg-[#2563eb33] border-[#3b82f6] ring-1 ring-[#3b82f6]/20"
                      : "bg-[#dbeafe] border-[#2563eb] ring-1 ring-[#2563eb]/20"
                    : isDarkMode
                    ? "bg-[#1f1f1f] border-[#2c2c2c] hover:bg-[#2c2c2c]"
                    : "bg-[#ffffff] border-[#e5e7eb] hover:bg-[#f9fafb]"
                )}
              >
                <div className='h-full w-2 bg-current rounded-full opacity-70'></div>
                <div className='h-10 w-full border-2 border-dashed border-current rounded-lg opacity-30'></div>
                <span className='text-xs font-medium absolute bottom-3'>
                  Left
                </span>
                {toolbarPosition === "left" && (
                  <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                    <Check className='h-2 w-2 text-white' />
                  </div>
                )}
              </button> */}

              <button
                onClick={(e) => handleToolbarPositionChange(e, "bottom")}
                type='button'
                className={cn(
                  "p-4 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 relative",
                  toolbarPosition === "bottom"
                    ? "bg-info/20 border-info ring-1 ring-info/20"
                    : "bg-card border-border hover:bg-hover"
                )}
              >
                <div className='w-full h-10 border-2 border-dashed border-current rounded-lg opacity-30'></div>
                <div className='w-full h-2 bg-current rounded-full opacity-70'></div>
                <span className='text-xs font-medium mt-1'>Bottom</span>
                {toolbarPosition === "bottom" && (
                  <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-info flex items-center justify-center'>
                    <Check className='h-2 w-2 text-text-primary' />
                  </div>
                )}
              </button>
            </div>

            <div
              className={cn(
                "text-xs mt-2 p-2 rounded",
                "bg-card/80 text-text/70"
              )}
            >
              <p>
                Changes are applied immediately while keeping settings open.
              </p>
            </div>
          </div>

          {/* Toolbar Controls Section */}
          <div className={cn("space-y-4 pb-6 border-b", "border-border")}>
            <h3 className={cn("text-sm font-medium", "text-text")}>
              Toolbar Controls
            </h3>

            <div className='space-y-3'>
              {/* Premium Badge Legend */}
              <div
                className={cn(
                  "mb-3 p-2 rounded-md flex items-center gap-2 text-xs",
                  "bg-card/10 text-text/70"
                )}
              >
                <div className='flex items-center gap-1.5'>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                  <span>Premium Feature</span>
                </div>
              </div>

              {/* Premium Popups Toggle */}
              <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                  <label className='text-sm font-medium'>
                    Premium Feature Popups
                  </label>
                  <span className={cn("text-xs", "text-text/70")}>
                    Show upgrade popups for premium features
                  </span>
                </div>
                <Switch
                  checked={premiumPopupsEnabled}
                  onCheckedChange={handlePremiumPopupsToggle}
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className={cn("my-4 border-t", "border-border")}></div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Text Arrow</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.textarrow ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("textarrow", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Numbers</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.number ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("number", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Stickers</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.stickers ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("stickers", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Blur</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.blur ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("blur", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Border</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.border ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("border", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <label className='text-sm'>Watermark</label>
                  <div className='w-2.5 h-2.5 bg-amber-400 rounded-full'></div>
                </div>
                <Switch
                  checked={toolVisibility.watermark ?? true}
                  onCheckedChange={(checked) =>
                    handleToolVisibilityChange("watermark", checked)
                  }
                  className={cn(
                    "data-[state=checked]:bg-info",
                    "data-[state=unchecked]:bg-switch-disabled-bg"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className='space-y-4 pb-2'>
            <h3 className={cn("text-sm font-medium", "text-text")}>
              Keyboard Shortcuts
            </h3>

            <div
              className={cn(
                "rounded-lg p-3 space-y-2 text-sm",
                "bg-card/90 text-text/70"
              )}
            >
              <div className='flex justify-between'>
                <span>Undo</span>
                <kbd
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    "bg-card text-text"
                  )}
                >
                  ⌘Z
                </kbd>
              </div>
              <div className='flex justify-between'>
                <span>Redo</span>
                <kbd
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    "bg-card text-text"
                  )}
                >
                  ⌘⇧Z
                </kbd>
              </div>
              <div className='flex justify-between'>
                <span>Save</span>
                <kbd
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    "bg-card text-text"
                  )}
                >
                  ⌘S
                </kbd>
              </div>
              <div className='flex justify-between'>
                <span>Export</span>
                <kbd
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    "bg-card text-text"
                  )}
                >
                  ⌘E
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "sticky bottom-0 left-0 right-0 p-4 border-t",
            "border-border bg-background"
          )}
        >
          <div className='flex justify-between items-center'>
            <span className='text-xs opacity-70'>Version 1.0.0</span>
            <Button
              className={cn(
                "text-xs",
                "border-border bg-card hover:bg-hover text-text"
              )}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
