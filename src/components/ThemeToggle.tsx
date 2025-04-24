"use client";

import { Moon, Sun } from "lucide-react";
import Button from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Tooltip from "./ui/toolip";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <Tooltip
      id='theme'
      content={`Toggle ${isDarkMode ? "light" : "dark"} mode`}
    >
      <Button
        onClick={onToggle}
        className={cn(
          "rounded-full transition-all duration-200",
          isDarkMode
            ? "bg-[#3A3A3C] border-[#4A4A4C] hover:bg-[#3A3A3A] hover:border-[#555] hover:text-[#F5F5F5]"
            : "bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-md"
        )}
      >
        {isDarkMode ? (
          <Sun className='h-5 w-5 text-white' />
        ) : (
          <Moon className='h-5 w-5' />
        )}
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </Tooltip>
  );
}
