import React, { ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useTheme } from "../common/ThemeProvider";
import { cn } from "@/lib/utils";
import "tippy.js/themes/light.css";
interface TooltipProps {
  content: string;
  children: ReactNode;
  place?: "top" | "bottom";
  effect?: boolean;
  className?: string;
  id?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  place = "top",
  effect = false,
  className,
}) => {
  const { theme } = useTheme();

  return (
    <Tippy
      content={content}
      placement={place}
      animation={effect ? "shift-away" : "fade"}
      theme={theme === "light" ? "dark" : "light"}
      className={cn(
        "z-50 !h-[32px] !px-1 flex items-center justify-center !text-[15px] font-medium",
        className
      )}
    >
      <span>{children}</span>
    </Tippy>
  );
};

export default Tooltip;
