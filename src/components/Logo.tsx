import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  isDarkMode: boolean;
  className?: string;
}

export function Logo({ isDarkMode, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg",
          isDarkMode ? "bg-blue-500" : "bg-blue-600"
        )}
      >
        <Camera className='h-5 w-5 text-white' />
      </div>
      <span
        className={cn(
          "font-bold text-lg tracking-tight",
          isDarkMode ? "text-white" : "text-gray-900"
        )}
      >
        Webshot
      </span>
    </div>
  );
}
