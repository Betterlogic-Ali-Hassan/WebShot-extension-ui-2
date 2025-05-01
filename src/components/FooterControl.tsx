"use client";

import { useState } from "react";
import { Undo2, Redo2, RotateCcw, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Tooltip from "./ui/toolip";
import { useImageEditor } from "@/context/ImageContext";

export function FooterControls() {
  const { toolbarPosition } = useImageEditor();
  const [isDeleting, setIsDeleting] = useState(false);

  // Action bar handlers
  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => setIsDeleting(false), 500);
  };

  const isToolbarBottom = toolbarPosition === "bottom";

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 p-2 max-w-max rounded-full transition-all duration-300 fixed w-full bg-border  left-1/2 -translate-x-1/2",
          isToolbarBottom ? "top-2" : " bottom-2"
        )}
      >
        <Tooltip id='undo' content='Undo'>
          <Button
            className={cn(
              "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
              "hover:bg-tool-selected-color hover:text-foreground"
            )}
          >
            <Undo2 className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Undo</span>
          </Button>
        </Tooltip>

        <Tooltip id='redo' content='Redo'>
          <Button
            className={cn(
              "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
              "hover:bg-tool-selected-color hover:text-foreground"
            )}
          >
            <Redo2 className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Redo</span>
          </Button>
        </Tooltip>

        <Tooltip id='reset' content='Reset'>
          <Button
            className={cn(
              "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
              "hover:bg-tool-selected-color hover:text-foreground"
            )}
          >
            <RotateCcw className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Reset</span>
          </Button>
        </Tooltip>

        <Tooltip id='delete-btn' content='Delete Selected'>
          <Button
            className={cn(
              "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
              "hover:bg-tool-selected-color hover:text-foreground",
              isDeleting && "animate-delete-shake"
            )}
            onClick={handleDeleteClick}
          >
            <Trash2
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isDeleting && "text-red-500"
              )}
            />
            <span className='sr-only'>Delete</span>
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
