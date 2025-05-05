"use client";

import { type ReactNode, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PopupPosition {
  top: number;
  left?: number;
}

export interface PopupContainerProps {
  position: PopupPosition;
  onClose: () => void;
  children: ReactNode;
  toolbarPosition?: "top" | "bottom" | "right";
  className?: string;
}

export function PopupContainer({
  position,
  onClose,
  children,
  toolbarPosition = "top",
  className,
}: PopupContainerProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const isToolbarBottom = toolbarPosition === "bottom";
  const isLessWidth = window.innerWidth <= 850;
  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;
      if (!isLessWidth) popupRef.current.style.left = "50%";
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 min-[850px]:max-h-[68px] min-h-[68px] flex items-center justify-center",
        "bg-card border border-border min-[850px]:min-w-[320px] min-[850px]:max-w-[calc(100% - 32px)] ",
        !isToolbarBottom && "mt-2.5",
        className
      )}
      style={{
        top: position.top + "px",
        transform: isLessWidth ? "" : "translateX(-50%)",
        left: isLessWidth ? position.left + "px" : "50%",
      }}
    >
      <div className='p-3 relative flex items-center max-[850px]:flex-col'>
        {children}
        <Button
          className={cn(
            "h-8 w-8 rounded-full transition-colors duration-200 justify-center ml-4 max-[850px]:absolute top-0 right-2 ",
            "hover:bg-hover hover:text-text"
          )}
          onClick={onClose}
        >
          <X className='h-4 w-4 flex-shrink-0' />
          <span className='sr-only'>Close</span>
        </Button>
      </div>
    </div>
  );
}
