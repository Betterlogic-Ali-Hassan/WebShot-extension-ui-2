"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { X, Moon, Sun, Monitor, Check } from "lucide-react";
import Button from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isDarkMode: boolean;
  onDarkModeChange?: (isDark: boolean) => void;
  // Add props for all settings that need to be controlled
  toolVisibility: Record<string, boolean>;
  onToolVisibilityChange: (toolId: string, isVisible: boolean) => void;
  toolbarPosition: "top" | "left" | "bottom";
  onToolbarPositionChange: (position: "top" | "left" | "bottom") => void;
  premiumPopupsEnabled?: boolean;
  onPremiumPopupsToggle?: (enabled: boolean) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}
type ThemeMode = "light" | "dark" | "system";

export function SettingsPanel({
  setIsOpen,
  setIsDarkMode,
  isDarkMode,
  onDarkModeChange = () => {},
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
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize theme mode from localStorage or default to system
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode | null;
    if (savedTheme && typeof onDarkModeChange === "function") {
      setThemeMode(savedTheme);

      if (savedTheme === "light") {
        setIsDarkMode(false);
      } else if (savedTheme === "dark") {
        setIsDarkMode(true);
      } else {
        // System preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        onDarkModeChange(prefersDark);
      }
    }
  }, [onDarkModeChange]);

  // Listen for system preference changes
  useEffect(() => {
    if (themeMode === "system" && typeof onDarkModeChange === "function") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        onDarkModeChange(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode, onDarkModeChange]);

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem("themeMode", mode);

    if (typeof onDarkModeChange === "function") {
      if (mode === "light") {
        onDarkModeChange(false);
      } else if (mode === "dark") {
        onDarkModeChange(true);
      } else {
        // System preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        onDarkModeChange(prefersDark);
      }
    }
  };

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
        className={cn(
          "h-full w-full overflow-hidden flex flex-col transition-transform duration-300 ease-in-out ",
          isDarkMode
            ? "bg-[#1f1f1f] text-[#f5f5f5]"
            : "bg-[#ffffff] text-[#1a1a1a]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between p-4 border-b",
            isDarkMode ? "border-[#2c2c2c]" : "border-[#e5e7eb]"
          )}
        >
          <h2
            className={cn(
              "text-lg font-semibold",
              isDarkMode ? "text-[#f3f4f6]" : "text-[#111827]"
            )}
          >
            Settings
          </h2>
          <Button
            onClick={() => setIsOpen(false)}
            className={cn(
              "rounded-full h-8 w-8 justify-center",
              isDarkMode ? "hover:bg-[#2c2c2c]" : "hover:bg-[#f9fafb]"
            )}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {/* Settings Content */}
        <div
          className={cn(
            "flex-1 px-5 py-6 space-y-8 overflow-y-auto no-scrollbar",
            isDarkMode
              ? "scrollbar-thumb-[#4b5563] scrollbar-track-[#1f1f1f]"
              : "scrollbar-thumb-[#cbd5e1] scrollbar-track-[#f9fafb]"
          )}
        >
          {/* Theme Section */}
          <div
            className={cn(
              "space-y-4 pb-6 border-b",
              isDarkMode ? "border-[#2c2c2c]" : "border-[#f0f0f0]"
            )}
          >
            <h3
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-[#f3f4f6]" : "text-[#111827]"
              )}
            >
              Theme
            </h3>

            <div className='flex flex-col space-y-2'>
              {/* Theme Options */}
              <div className='grid grid-cols-3 gap-2'>
                {/* Light Theme */}
                <button
                  onClick={() => handleThemeChange("light")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg relative",
                    themeMode === "light"
                      ? isDarkMode
                        ? "bg-[#2563eb33] text-[#ffffff]"
                        : "bg-[#dbeafe] text-[#1e40af]"
                      : isDarkMode
                      ? "hover:bg-[#1f2937] text-[#9ca3af]"
                      : "hover:bg-[#e5f1ff] text-[#374151]"
                  )}
                >
                  <Sun className='h-5 w-5 mb-1' />
                  <span className='text-xs'>Light</span>
                  {themeMode === "light" && (
                    <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                      <Check className='h-2 w-2 text-white' />
                    </div>
                  )}
                </button>

                {/* Dark Theme */}
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg relative",
                    themeMode === "dark"
                      ? isDarkMode
                        ? "bg-[#2563eb33] text-[#ffffff]"
                        : "bg-[#dbeafe] text-[#1e40af]"
                      : isDarkMode
                      ? "hover:bg-[#1f2937] text-[#9ca3af]"
                      : "hover:bg-[#e5f1ff] text-[#374151]"
                  )}
                >
                  <Moon className='h-5 w-5 mb-1' />
                  <span className='text-xs'>Dark</span>
                  {themeMode === "dark" && (
                    <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                      <Check className='h-2 w-2 text-white' />
                    </div>
                  )}
                </button>

                {/* System Theme */}
                <button
                  onClick={() => handleThemeChange("system")}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg relative",
                    themeMode === "system"
                      ? isDarkMode
                        ? "bg-[#2563eb33] text-[#ffffff]"
                        : "bg-[#dbeafe] text-[#1e40af]"
                      : isDarkMode
                      ? "hover:bg-[#1f2937] text-[#9ca3af]"
                      : "hover:bg-[#e5f1ff] text-[#374151]"
                  )}
                >
                  <Monitor className='h-5 w-5 mb-1' />
                  <span className='text-xs'>System</span>
                  {themeMode === "system" && (
                    <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                      <Check className='h-2 w-2 text-white' />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Toolbar Location */}
          <div
            className={cn(
              "space-y-4 pb-6 border-b",
              isDarkMode ? "border-[#2c2c2c]" : "border-[#f0f0f0]"
            )}
          >
            <h3
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-[#f3f4f6]" : "text-[#111827]"
              )}
            >
              Toolbar Location
            </h3>

            <div className='grid grid-cols-3 gap-3'>
              <button
                onClick={(e) => handleToolbarPositionChange(e, "top")}
                type='button'
                className={cn(
                  "p-4 rounded-lg border transition-all relative flex flex-col items-center justify-center gap-2",
                  toolbarPosition === "top"
                    ? isDarkMode
                      ? "bg-[#2563eb33] border-[#3b82f6] ring-1 ring-[#3b82f6]/20"
                      : "bg-[#dbeafe] border-[#2563eb] ring-1 ring-[#2563eb]/20"
                    : isDarkMode
                    ? "bg-[#1f1f1f] border-[#2c2c2c] hover:bg-[#2c2c2c]"
                    : "bg-[#ffffff] border-[#e5e7eb] hover:bg-[#f9fafb]"
                )}
              >
                <div className='w-full h-2 bg-current rounded-full opacity-70'></div>
                <div className='w-full h-10 border-2 border-dashed border-current rounded-lg opacity-30'></div>
                <span className='text-xs font-medium mt-1'>Top</span>
                {toolbarPosition === "top" && (
                  <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                    <Check className='h-2 w-2 text-white' />
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
                    ? isDarkMode
                      ? "bg-[#2563eb33] border-[#3b82f6] ring-1 ring-[#3b82f6]/20"
                      : "bg-[#dbeafe] border-[#2563eb] ring-1 ring-[#2563eb]/20"
                    : isDarkMode
                    ? "bg-[#1f1f1f] border-[#2c2c2c] hover:bg-[#2c2c2c]"
                    : "bg-[#ffffff] border-[#e5e7eb] hover:bg-[#f9fafb]"
                )}
              >
                <div className='w-full h-10 border-2 border-dashed border-current rounded-lg opacity-30'></div>
                <div className='w-full h-2 bg-current rounded-full opacity-70'></div>
                <span className='text-xs font-medium mt-1'>Bottom</span>
                {toolbarPosition === "bottom" && (
                  <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-[#3b82f6] flex items-center justify-center'>
                    <Check className='h-2 w-2 text-white' />
                  </div>
                )}
              </button>
            </div>

            <div
              className={cn(
                "text-xs mt-2 p-2 rounded",
                isDarkMode
                  ? "bg-[#2c2c2c]/50 text-[#9ca3af]"
                  : "bg-[#f9fafb] text-[#6b7280]"
              )}
            >
              <p>
                Changes are applied immediately while keeping settings open.
              </p>
            </div>
          </div>

          {/* Toolbar Controls Section */}
          <div
            className={cn(
              "space-y-4 pb-6 border-b",
              isDarkMode ? "border-[#2c2c2c]" : "border-[#f0f0f0]"
            )}
          >
            <h3
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-[#f3f4f6]" : "text-[#111827]"
              )}
            >
              Toolbar Controls
            </h3>

            <div className='space-y-3'>
              {/* Premium Badge Legend */}
              <div
                className={cn(
                  "mb-3 p-2 rounded-md flex items-center gap-2 text-xs",
                  isDarkMode
                    ? "bg-[#2c2c2c]/50 text-[#9ca3af]"
                    : "bg-[#f9fafb] text-[#6b7280]"
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
                  <span
                    className={cn(
                      "text-xs",
                      isDarkMode ? "text-[#9ca3af]" : "text-[#6b7280]"
                    )}
                  >
                    Show upgrade popups for premium features
                  </span>
                </div>
                <Switch
                  checked={premiumPopupsEnabled}
                  onCheckedChange={handlePremiumPopupsToggle}
                  className={cn(
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
                  )}
                />
              </div>

              <div
                className={cn(
                  "my-4 border-t",
                  isDarkMode ? "border-[#2c2c2c]" : "border-[#f0f0f0]"
                )}
              ></div>

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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
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
                    "data-[state=checked]:bg-[#3b82f6]",
                    isDarkMode
                      ? "data-[state=unchecked]:bg-[#4b5563]"
                      : "data-[state=unchecked]:bg-[#d1d5db]"
                  )}
                />
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className='space-y-4 pb-2'>
            <h3
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-[#f3f4f6]" : "text-[#111827]"
              )}
            >
              Keyboard Shortcuts
            </h3>

            <div
              className={cn(
                "rounded-lg p-3 space-y-2 text-sm",
                isDarkMode
                  ? "bg-[#111827] text-[#9ca3af]"
                  : "bg-[#f9fafb] text-[#374151]"
              )}
            >
              <div className='flex justify-between'>
                <span>Undo</span>
                <kbd
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    isDarkMode
                      ? "bg-[#2c2c2c] text-[#f5f5f5]"
                      : "bg-[#e5e7eb] text-[#1a1a1a]"
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
                    isDarkMode
                      ? "bg-[#2c2c2c] text-[#f5f5f5]"
                      : "bg-[#e5e7eb] text-[#1a1a1a]"
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
                    isDarkMode
                      ? "bg-[#2c2c2c] text-[#f5f5f5]"
                      : "bg-[#e5e7eb] text-[#1a1a1a]"
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
                    isDarkMode
                      ? "bg-[#2c2c2c] text-[#f5f5f5]"
                      : "bg-[#e5e7eb] text-[#1a1a1a]"
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
            isDarkMode
              ? "border-[#2c2c2c] bg-[#1f1f1f]"
              : "border-[#e5e7eb] bg-[#ffffff]"
          )}
        >
          <div className='flex justify-between items-center'>
            <span className='text-xs opacity-70'>Version 1.0.0</span>
            <Button
              className={cn(
                "text-xs",
                isDarkMode
                  ? "border-[#2c2c2c] bg-[#2c2c2c] hover:bg-[#3a3a3c] text-[#f5f5f5]"
                  : "border-[#e5e7eb] bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#1a1a1a]"
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
