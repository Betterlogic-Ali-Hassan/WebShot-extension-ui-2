"use client";
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
  const bgColor = useStandardColor ? "var(--searchbar)" : color;
  const borderColor = useStandardColor ? "var(--border)" : color;

  if (style === "circled") {
    return (
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium !bg-info text-text-primary",
          className
        )}
        style={{
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
          "w-7 h-7 rounded-sm flex items-center justify-center text-sm font-medium !bg-info text-text-primary",
          className
        )}
        style={{
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
          color: useStandardColor ? "var(--text)" : bgColor,
        }}
      >
        {number}
      </div>
    );
  }
}
