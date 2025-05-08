"use client";

import { Settings } from "lucide-react";

import { SettingsPanel } from "@/components/common/SettingsPanel";
import Tooltip from "../ui/toolip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useImageEditor } from "@/context/ImageContext";

export function SettingsButton() {
  const {
    toolVisibility,
    toolbarPosition,
    premiumPopupsEnabled = true,
    handlePremiumPopupsToggle: onPremiumPopupsToggle,
    handleToolVisibilityChange: onToolVisibilityChange,
    setToolbarPosition: onToolbarPositionChange,
  } = useImageEditor();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Tooltip id='setting-icon' content='Settings'>
            <button className='flex items-center justify-center rounded-full w-9 h-9 transition-colors bg-card hover:bg-hover'>
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </button>
          </Tooltip>
        </SheetTrigger>
        <SheetContent className='w-80 border-0'>
          <SettingsPanel
            setIsOpen={setIsOpen}
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
