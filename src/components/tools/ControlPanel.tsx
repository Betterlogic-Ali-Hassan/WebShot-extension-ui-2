"use client";

import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  tool: string;
  isDarkMode: boolean;
  onClose: () => void;
}

export function ControlPanel({ tool, isDarkMode, onClose }: ControlPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] p-4 shadow-md transition-all duration-300 relative",
        isDarkMode ? "bg-[#2C2C2E]" : "bg-white"
      )}
    >
      <Button className='absolute right-2 top-2 rounded-full' onClick={onClose}>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </Button>

      {tool === "zoom" && (
        <div className='space-y-4'>
          <h3 className='font-medium'>Zoom Controls</h3>
          <div className='flex items-center gap-4'>
            <Select defaultValue='100'>
              <SelectTrigger className='w-24'>
                <SelectValue placeholder='Zoom' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='50'>50%</SelectItem>
                <SelectItem value='75'>75%</SelectItem>
                <SelectItem value='100'>100%</SelectItem>
                <SelectItem value='150'>150%</SelectItem>
                <SelectItem value='200'>200%</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex items-center gap-2 flex-1'>
              <Button className='rounded-full'>
                <span className='text-lg'>-</span>
              </Button>
              <Slider
                defaultValue={[100]}
                max={200}
                min={50}
                step={1}
                className='flex-1'
              />
              <Button className='rounded-full'>
                <span className='text-lg'>+</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {tool === "square" && (
        <div className='space-y-4'>
          <h3 className='font-medium'>Shape Controls</h3>
          <div className='grid gap-4'>
            <RadioGroup defaultValue='square' className='flex gap-2'>
              <div className='flex flex-col items-center gap-1'>
                <label
                  htmlFor='square-shape'
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer border-2",
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  )}
                >
                  <RadioGroupItem
                    value='square'
                    id='square-shape'
                    className='sr-only'
                  />
                  <div className='w-6 h-6 bg-current'></div>
                </label>
                <span className='text-xs'>Square</span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <label
                  htmlFor='rounded-shape'
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer border-2",
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  )}
                >
                  <RadioGroupItem
                    value='rounded'
                    id='rounded-shape'
                    className='sr-only'
                  />
                  <div className='w-6 h-6 bg-current rounded-lg'></div>
                </label>
                <span className='text-xs'>Rounded</span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <label
                  htmlFor='circle-shape'
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer border-2",
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  )}
                >
                  <RadioGroupItem
                    value='circle'
                    id='circle-shape'
                    className='sr-only'
                  />
                  <div className='w-6 h-6 bg-current rounded-full'></div>
                </label>
                <span className='text-xs'>Circle</span>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <label
                  htmlFor='star-shape'
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-md cursor-pointer border-2",
                    isDarkMode ? "border-gray-600" : "border-gray-300"
                  )}
                >
                  <RadioGroupItem
                    value='star'
                    id='star-shape'
                    className='sr-only'
                  />
                  <div className='w-6 h-6 flex items-center justify-center'>
                    ★
                  </div>
                </label>
                <span className='text-xs'>Star</span>
              </div>
            </RadioGroup>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='color-select' className='text-sm block mb-2'>
                  Color
                </label>
                <div className='flex gap-2'>
                  {[
                    "#FF3B30",
                    "#FF9500",
                    "#FFCC00",
                    "#34C759",
                    "#007AFF",
                    "#AF52DE",
                  ].map((color) => (
                    <button
                      key={color}
                      className='w-6 h-6 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor='stroke-select' className='text-sm block mb-2'>
                  Stroke Width
                </label>
                <Select defaultValue='1'>
                  <SelectTrigger id='stroke-select'>
                    <SelectValue placeholder='Width' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1px</SelectItem>
                    <SelectItem value='2'>2px</SelectItem>
                    <SelectItem value='3'>3px</SelectItem>
                    <SelectItem value='4'>4px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {tool === "pencil" && (
        <div className='space-y-4'>
          <h3 className='font-medium'>Pencil Controls</h3>
          <div className='grid gap-4'>
            <div>
              <label htmlFor='pencil-color' className='text-sm block mb-2'>
                Color
              </label>
              <div className='flex gap-2'>
                {[
                  "#FF3B30",
                  "#FF9500",
                  "#FFCC00",
                  "#34C759",
                  "#007AFF",
                  "#AF52DE",
                ].map((color) => (
                  <button
                    key={color}
                    className='w-6 h-6 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <label htmlFor='pencil-size' className='text-sm block mb-2'>
                Stroke Size
              </label>
              <Slider defaultValue={[2]} max={10} min={1} step={1} />
            </div>
          </div>
        </div>
      )}

      {tool === "blur" && (
        <div className='space-y-4'>
          <h3 className='font-medium'>Blur Controls</h3>
          <div>
            <label htmlFor='blur-intensity' className='text-sm block mb-2'>
              Blur Intensity
            </label>
            <div className='flex items-center gap-2'>
              <span className='text-xs'>Low</span>
              <Slider
                defaultValue={[5]}
                max={20}
                min={1}
                step={1}
                className='flex-1'
              />
              <span className='text-xs'>High</span>
            </div>
          </div>
        </div>
      )}

      {tool === "stickers" && (
        <div className='space-y-4'>
          <h3 className='font-medium'>Stickers</h3>
          <div className='grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1'>
            {Array.from({ length: 16 }).map((_, i) => (
              <button
                key={i}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-lg text-xl",
                  isDarkMode
                    ? "bg-[#3A3A3C] hover:bg-[#4A4A4C]"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {
                  [
                    "😊",
                    "👍",
                    "❤️",
                    "🎉",
                    "🔥",
                    "⭐",
                    "💯",
                    "🤔",
                    "👀",
                    "💪",
                    "🚀",
                    "✅",
                    "❌",
                    "⚠️",
                    "💡",
                    "🎯",
                  ][i]
                }
              </button>
            ))}
          </div>
        </div>
      )}

      {(tool === "text" ||
        tool === "arrow" ||
        tool === "border" ||
        tool === "crop" ||
        tool === "revision") && (
        <div className='space-y-4'>
          <h3 className='font-medium'>
            {tool.charAt(0).toUpperCase() + tool.slice(1)} Controls
          </h3>
          <p className='text-sm text-gray-500'>
            Control panel for {tool} tool (UI only)
          </p>
        </div>
      )}
    </div>
  );
}
