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
  toolbarPosition?: "top" | "bottom" | "left" | "right";
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
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";

  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;
      popupRef.current.style.left = `${isToolbarLeft ? "0" : "50%"}`;
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position, isToolbarLeft]);

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 max-h-[68px] min-h-[68px] flex items-center justify-center",
        "bg-card border border-border",
        !isToolbarBottom && "mt-2.5",
        className
      )}
      style={{
        top: `${position.top + "px"}`,
        transform: "translateX(-50%)",
        left: "50%",
        minWidth: "320px",
        maxWidth: "calc(100% - 32px)",
      }}
    >
      <div className='p-3 relative flex items-center'>
        {children}
        <Button
          className={cn(
            "h-8 w-8 rounded-full transition-colors duration-200 justify-center ml-4",
            "hover:bg-hover hover:text-text",
            isToolbarLeft && "absolute top-0 right-0.5"
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
