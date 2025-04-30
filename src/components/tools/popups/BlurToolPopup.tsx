"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";

export function BlurToolPopup() {
  const {
    popupPosition: position,
    handleClosePopup: onClose,
    toolbarPosition,
  } = useImageEditor();
  const [blurIntensity, setBlurIntensity] = useState(5);
  const popupRef = useRef<HTMLDivElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;

      // Apply the adjusted position
      popupRef.current.style.left = `${isToolbarLeft ? "0" : "50%"}`;
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  const handleBlurChange = (value: number[]) => {
    setBlurIntensity(value[0]);
  };

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 max-h-[68px] min-h-[68px] flex items-center  bg-card border border-border text-text",
        isToolbarBottom && "-mt-6",
        isToolbarLeft && "ml-[100px]"
      )}
      style={{
        top: `${isToolbarLeft ? "50%" : position.top + "px"}`,
        transform: `${
          isToolbarLeft ? "translate(0,-50%)" : "translateX(-50%)"
        }`,
        left: `${isToolbarLeft ? "0" : "50%"}`,
        minWidth: `${isToolbarLeft ? "66px" : "400px"}`,
        maxWidth: `${isToolbarLeft ? "" : "calc(100% - 32px)"}`,
      }}
    >
      <div className='p-3 w-full'>
        <div
          className={cn("flex items-center gap-4", isToolbarLeft && "flex-col")}
        >
          {/* Blur Intensity Label */}
          <div className={cn("text-sm", isToolbarLeft && "mt-4")}>
            Blur Intensity
          </div>

          {/* Blur Intensity Slider */}
          <div
            className={cn(
              "flex items-center gap-2.5 flex-1 h-8",
              isToolbarLeft && "flex-col"
            )}
          >
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded h-6 flex items-center",
                "bg-border"
              )}
            >
              Low
            </span>
            <div className='relative flex-1 mx-0.5 h-6 flex items-center'>
              <Slider
                value={[blurIntensity]}
                min={1}
                max={20}
                step={1}
                orientation={isToolbarLeft ? "vertical" : "horizontal"}
                onValueChange={handleBlurChange}
                className='py-1'
              />
            </div>
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded h-6 flex items-center",
                "bg-border"
              )}
            >
              High
            </span>
          </div>

          {/* Blur Intensity Value */}
          <div
            className={cn(
              "min-w-[40px] text-center px-2 py-1 rounded text-sm",
              "bg-border"
            )}
          >
            {blurIntensity}
          </div>

          {/* Close Button */}
          <Button
            className={cn(
              "h-8 w-8 rounded-full transition-colors duration-200 justify-center",
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
    </div>
  );
}
