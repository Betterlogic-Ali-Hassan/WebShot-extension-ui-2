// components/Tooltip.tsx
import React, { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  id: string; // unique id for tooltip
  content: string;
  children: ReactNode;
  place?: "top" | "right" | "bottom" | "left";
  type?: "dark" | "success" | "warning" | "error" | "info" | "light";
  effect?: boolean | undefined;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  id,
  content,
  children,
  place = "top",
  type = "light",
  effect = false,
  className,
}) => {
  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>
      <ReactTooltip
        id={id}
        place={place}
        variant={type}
        float={effect}
        className={className}
      />
    </>
  );
};

export default Tooltip;
