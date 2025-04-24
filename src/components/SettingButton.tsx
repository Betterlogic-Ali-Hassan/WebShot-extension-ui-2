"use client";

import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { SettingsPanel } from "@/components/SettingsPanel";
import Tooltip from "./ui/toolip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

// Update the interface to include the new props
interface SettingsButtonProps {
  isDarkMode: boolean;
  toolVisibility: Record<string, boolean>;
  toolbarPosition: "top" | "left" | "bottom";
  onToolbarPositionChange: (position: "top" | "left" | "bottom") => void;
  onToolVisibilityChange: (toolId: string, isVisible: boolean) => void;
  onToggleAll: (visible: boolean) => void;
  onRestoreDefaults: () => void;
  premiumPopupsEnabled?: boolean;
  onPremiumPopupsToggle?: (enabled: boolean) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

// Update the component to destructure the new props
export function SettingsButton({
  isDarkMode,
  toolVisibility,
  toolbarPosition,
  onToolbarPositionChange,
  onToolVisibilityChange,
  setIsDarkMode,
  //   onToggleAll,
  //   onRestoreDefaults,
  premiumPopupsEnabled = true,
  onPremiumPopupsToggle = () => {},
}: SettingsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Tooltip id='setting-icon' content='Settings'>
            <button
              className={cn(
                "flex items-center justify-center rounded-full w-9 h-9 transition-colors",
                isDarkMode
                  ? "bg-[#2c2c2c] hover:bg-[#3a3a3c] text-[#f5f5f5]"
                  : "bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#1a1a1a]"
              )}
            >
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </button>
          </Tooltip>
        </SheetTrigger>
        <SheetContent className='w-80 border-0'>
          <SettingsPanel
            setIsOpen={setIsOpen}
            setIsDarkMode={setIsDarkMode}
            isDarkMode={isDarkMode}
            toolVisibility={toolVisibility}
            onToolVisibilityChange={onToolVisibilityChange}
            toolbarPosition={toolbarPosition}
            onToolbarPositionChange={onToolbarPositionChange}
            premiumPopupsEnabled={premiumPopupsEnabled}
            onPremiumPopupsToggle={onPremiumPopupsToggle}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
