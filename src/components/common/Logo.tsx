import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-info'>
        <Camera className='h-5 w-5 text-white' />
      </div>
      <span className='font-bold text-lg tracking-tight text-text'>
        Webshot
      </span>
    </div>
  );
}
