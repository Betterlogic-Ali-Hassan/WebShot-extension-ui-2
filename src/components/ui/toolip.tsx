// components/Tooltip.tsx
import React, { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useTheme } from "../ThemeProvider";
import { cn } from "@/lib/utils";

interface TooltipProps {
  id: string; // unique id for tooltip
  content: string;
  children: ReactNode;
  place?: "top" | "right" | "bottom" | "left";
  effect?: boolean | undefined;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  id,
  content,
  children,
  place = "top",
  effect = false,
  className,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>
      <ReactTooltip
        id={id}
        place={place}
        variant={theme === "light" ? "dark" : "light"}
        float={effect}
        className={cn("z-50", className)}
      />
    </>
  );
};

export default Tooltip;
