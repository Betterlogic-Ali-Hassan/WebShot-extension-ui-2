"use client";
import { Trash2 } from "lucide-react";
import { useScreenShot } from "@/context/ScreenShotContext";

export const RecycleBinInfo = () => {
  const { screenshots, setIsEmptyBinConfirmationOpen } = useScreenShot();
  return (
    <div className='mb-5 p-3 rounded-lg flex items-center bg-background border border-border flex-wrap gap-4'>
      <div className='flex-shrink-0 mr-3'>
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-card'>
          <Trash2 size={16} className='text-foreground' />
        </div>
      </div>
      <div className='flex-grow'>
        <p className='text-sm'>
          Items in the Recycle Bin will be automatically deleted after 30 days.
          You can restore items or delete them permanently.
        </p>
      </div>
      {screenshots.filter((s) => s.trash).length > 0 && (
        <button
          onClick={() => setIsEmptyBinConfirmationOpen(true)}
          className='flex-shrink-0 sm:ml-3 px-3 py-1.5 rounded-full text-sm transition-all duration-200 bg-error text-text-primary hover:bg-error/60'
        >
          Empty Bin
        </button>
      )}
    </div>
  );
};
