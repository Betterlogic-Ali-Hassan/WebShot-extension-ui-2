"use client";

import { ChevronDown } from "lucide-react";
import { Dropdown, type DropdownOption } from "./PopupDropdown";
import { cn } from "@/lib/utils";

export interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  fonts?: string[];
  className?: string;
}

export function FontSelector({
  value,
  onChange,
  fonts = [
    "Calibri",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "SF Pro",
    "Roboto",
    "Open Sans",
  ],
  className,
}: FontSelectorProps) {
  const options: DropdownOption[] = fonts.map((font) => ({
    value: font,
    label: font,
  }));

  const renderOption = (option: DropdownOption, isSelected: boolean) => (
    <div
      className={cn(
        "px-3 py-2 cursor-pointer transition-all duration-200",
        "hover:bg-hover",
        isSelected && "bg-hover"
      )}
      style={{ fontFamily: option.value }}
    >
      <span className='text-sm'>{option.label}</span>
    </div>
  );

  const renderValue = (option: DropdownOption | undefined) => (
    <div className='flex items-center justify-between w-full'>
      <span className='text-sm truncate' style={{ fontFamily: option?.value }}>
        {option?.label || "Select font"}
      </span>
      <span className=' opacity-70 flex-shrink-0 ml-1'>
        <ChevronDown className='h-4 w-4' />
      </span>
    </div>
  );

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      renderOption={renderOption}
      renderValue={renderValue}
      className={className}
      buttonClassName='w-[155px]'
      dropdownClassName='w-[155px] max-h-60'
    />
  );
}
