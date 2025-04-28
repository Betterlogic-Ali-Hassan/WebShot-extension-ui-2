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
import { Toggle } from "@/components/ui/toggle";
import { useImageEditor } from "@/context/ImageContext";

export function ToolPopup() {
  const {
    popupPosition: position,
    handleClosePopup: onClose,
    activeTool: tool,
  } = useImageEditor();
  return (
    <div
      className='fixed z-40 rounded-xl shadow-lg transition-all duration-200 overflow-hidden bg-background border-border'
      style={{
        top: `${position.top}px`,
        left: `${Math.max(16, position.left - 100 + position.width / 2)}px`,
        minWidth: "220px",
        maxWidth: "280px",
      }}
    >
      <div className='p-3'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium capitalize'>{tool}</h3>
          <Button className='h-6 w-6 p-0 rounded-full' onClick={onClose}>
            <X className='h-3 w-3' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        {tool === "zoom" && (
          <div className='space-y-3'>
            <Select defaultValue='100'>
              <SelectTrigger className='w-full h-8 text-xs'>
                <SelectValue placeholder='Zoom level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='25'>25%</SelectItem>
                <SelectItem value='50'>50%</SelectItem>
                <SelectItem value='100'>100%</SelectItem>
                <SelectItem value='150'>150%</SelectItem>
                <SelectItem value='200'>200%</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex items-center gap-2'>
              <Button className='h-6 w-6 rounded-full p-0 text-xs'>-</Button>
              <Slider
                defaultValue={[100]}
                max={200}
                min={25}
                step={1}
                className='flex-1'
              />
              <Button className='h-6 w-6 rounded-full p-0 text-xs'>+</Button>
            </div>
          </div>
        )}

        {tool === "square" && (
          <div className='space-y-3'>
            <div className='flex flex-wrap gap-1'>
              <Toggle
                aria-label='Square'
                className='h-8 w-8 p-0 data-[state=on]:bg-[#3A3A3C]'
              >
                <div className='h-4 w-4 bg-current'></div>
              </Toggle>
              <Toggle
                aria-label='Rounded'
                className='h-8 w-8 p-0 data-[state=on]:bg-[#3A3A3C]'
              >
                <div className='h-4 w-4 bg-current rounded-md'></div>
              </Toggle>
              <Toggle
                aria-label='Circle'
                className='h-8 w-8 p-0 data-[state=on]:bg-[#3A3A3C]'
              >
                <div className='h-4 w-4 bg-current rounded-full'></div>
              </Toggle>
              <Toggle
                aria-label='Star'
                className='h-8 w-8 p-0 data-[state=on]:bg-[#3A3A3C]'
              >
                <div className='h-4 w-4 flex items-center justify-center'>
                  ★
                </div>
              </Toggle>
            </div>
            <div className='flex flex-wrap gap-1'>
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
            <Select defaultValue='1'>
              <SelectTrigger className='w-full h-8 text-xs'>
                <SelectValue placeholder='Stroke width' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1px</SelectItem>
                <SelectItem value='2'>2px</SelectItem>
                <SelectItem value='3'>3px</SelectItem>
                <SelectItem value='4'>4px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {tool === "text" && (
          <div className='space-y-3'>
            <Select defaultValue='system-ui'>
              <SelectTrigger className='w-full h-8 text-xs'>
                <SelectValue placeholder='Font' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='system-ui'>System</SelectItem>
                <SelectItem value='arial'>Arial</SelectItem>
                <SelectItem value='helvetica'>Helvetica</SelectItem>
                <SelectItem value='georgia'>Georgia</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex gap-2'>
              <Toggle aria-label='Bold' className='flex-1 h-8'>
                B
              </Toggle>
              <Toggle aria-label='Italic' className='flex-1 h-8'>
                <i>I</i>
              </Toggle>
            </div>
            <div className='flex flex-wrap gap-1'>
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
        )}

        {tool === "pencil" && (
          <div className='space-y-3'>
            <div className='flex flex-wrap gap-1'>
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
            <div>
              <p className='text-xs mb-1'>Stroke width</p>
              <Slider defaultValue={[2]} max={10} min={1} step={1} />
            </div>
          </div>
        )}

        {tool === "blur" && (
          <div className='space-y-3'>
            <p className='text-xs mb-1'>Blur intensity</p>
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
        )}

        {tool === "stickers" && (
          <div className='space-y-2'>
            <div className='flex gap-1 overflow-x-auto py-1 max-w-[240px]'>
              {[
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
              ].map((emoji) => (
                <button
                  key={emoji}
                  className='w-8 h-8 flex items-center justify-center rounded-lg text-xl hover:bg-hover'
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {tool === "border" && (
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-xs'>Border</span>
              <Toggle aria-label='Toggle border'>On</Toggle>
            </div>
            <Select defaultValue='1'>
              <SelectTrigger className='w-full h-8 text-xs'>
                <SelectValue placeholder='Thickness' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1px</SelectItem>
                <SelectItem value='2'>2px</SelectItem>
                <SelectItem value='3'>3px</SelectItem>
                <SelectItem value='4'>4px</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex flex-wrap gap-1'>
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
        )}

        {tool === "crop" && (
          <div className='space-y-3'>
            <Select defaultValue='free'>
              <SelectTrigger className='w-full h-8 text-xs'>
                <SelectValue placeholder='Aspect ratio' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='free'>Free</SelectItem>
                <SelectItem value='1:1'>1:1</SelectItem>
                <SelectItem value='4:3'>4:3</SelectItem>
                <SelectItem value='16:9'>16:9</SelectItem>
              </SelectContent>
            </Select>
            <div className='flex justify-end gap-2'>
              <Button className='h-7 text-xs'>Cancel</Button>
              <Button className='h-7 text-xs'>Apply</Button>
            </div>
          </div>
        )}

        {tool === "revision" && (
          <div className='space-y-2'>
            <div className='grid grid-cols-2 gap-2'>
              <Button className='h-8 text-xs justify-start'>
                <span className='mr-2'>↩️</span> Undo
              </Button>
              <Button className='h-8 text-xs justify-start'>
                <span className='mr-2'>↪️</span> Redo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
