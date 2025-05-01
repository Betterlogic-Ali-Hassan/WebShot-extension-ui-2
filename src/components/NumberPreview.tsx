"use client";
import { getContrastTextColor } from "@/helper/getContrastColor";
import { cn } from "@/lib/utils";

export type NumberStyle = "circled" | "squared" | "plain";

export interface NumberPreviewProps {
  number: number;
  style: NumberStyle;
  color: string;
  strokeWidth?: number;
  useStandardColor?: boolean;
  className?: string;
}

export function NumberPreview({
  number,
  style,
  color,
  strokeWidth = 2,
  useStandardColor = false,
  className,
}: NumberPreviewProps) {
  const bgColor = useStandardColor ? "var(--info-color)" : color;
  const borderColor = useStandardColor ? "var(--border-color)" : color;
  const textColor = useStandardColor
    ? "var(--text)"
    : getContrastTextColor(color);
  if (style === "circled") {
    return (
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium bg-info text-text",
          className
        )}
        style={{
          background: bgColor,
          color: textColor,
          border: useStandardColor
            ? `1px solid ${borderColor}`
            : `${strokeWidth}px solid ${bgColor}`,
        }}
      >
        {number}
      </div>
    );
  } else if (style === "squared") {
    return (
      <div
        className={cn(
          "w-7 h-7 rounded-sm flex items-center justify-center text-sm font-medium bg-info text-text",
          className
        )}
        style={{
          background: bgColor,
          color: textColor,
          border: useStandardColor
            ? `1px solid ${borderColor}`
            : `${strokeWidth}px solid ${bgColor}`,
        }}
      >
        {number}
      </div>
    );
  } else {
    return (
      <div
        className={cn(
          "w-7 h-7 flex items-center justify-center text-lg font-bold",
          className
        )}
        style={{
          color: useStandardColor ? "var(--text-color)" : bgColor,
        }}
      >
        {number}
      </div>
    );
  }
}
