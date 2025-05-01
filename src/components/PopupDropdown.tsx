"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";

export interface DropdownOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  placeholder?: string;
  renderOption?: (option: DropdownOption, isSelected: boolean) => ReactNode;
  renderValue?: (option: DropdownOption | undefined) => ReactNode;
}

export function Dropdown({
  options,
  value,
  onChange,
  className,
  buttonClassName,
  dropdownClassName,
  placeholder = "Select option",
  renderOption,
  renderValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const { toolbarPosition } = useImageEditor();
  const isToolbarBottom = toolbarPosition === "bottom";
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Default render functions
  const defaultRenderOption = (option: DropdownOption, isSelected: boolean) => (
    <div
      className={cn(
        "px-3 py-2 cursor-pointer transition-all duration-200",
        "hover:bg-hover",
        isSelected && "bg-hover"
      )}
    >
      <div className='flex items-center gap-2'>
        {option.icon && <span className='flex-shrink-0'>{option.icon}</span>}
        <span className='text-sm'>{option.label}</span>
      </div>
    </div>
  );

  const defaultRenderValue = (option: DropdownOption | undefined) => (
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center gap-2 truncate'>
        {option?.icon && <span className='flex-shrink-0'>{option.icon}</span>}
        <span className='text-sm truncate'>
          {option ? option.label : placeholder}
        </span>
      </div>
      <ChevronDown className='h-3.5 w-3.5 opacity-70 flex-shrink-0 ml-1' />
    </div>
  );

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 px-3 py-1.5 rounded-md cursor-pointer border transition-all duration-200",
          "bg-border border-tool-selected-color text-text hover:bg-border/80 max-h-8",
          buttonClassName
        )}
      >
        {renderValue
          ? renderValue(selectedOption)
          : defaultRenderValue(selectedOption)}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 mt-1 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto no-scrollbar",
            "bg-card border border-border",
            dropdownClassName,
            isToolbarBottom ? "bottom-full mb-2" : "top-full"
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {renderOption
                ? renderOption(option, option.value === value)
                : defaultRenderOption(option, option.value === value)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
