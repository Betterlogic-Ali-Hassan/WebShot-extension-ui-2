"use client";

import { Trash2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";
import { Toast } from "@/components/ui/toast";

const EmptyBinModal = () => {
  const { setIsEmptyBinConfirmationOpen, screenshots, setScreenshots } =
    useScreenShot();
  return (
    <Modal>
      <div className='relative max-w-md w-full mx-4 rounded-2xl overflow-hidden border shadow-lg transition-all duration-200 bg-card'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h3 className='font-medium flex items-center'>
            <Trash2 size={18} className='mr-2 text-error' />
            Empty Recycle Bin
          </h3>
          <button
            onClick={() => setIsEmptyBinConfirmationOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} className='text-foreground' />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          <div className='flex flex-col items-center justify-center py-4'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-error/20'>
              <Trash2 size={32} className='text-error' />
            </div>
            <p className='text-center mb-2 font-medium text-foreground'>
              Are you sure you want to empty the Recycle Bin?
            </p>
            <p className='text-center text-sm text-muted'>
              This will permanently delete{" "}
              {screenshots.filter((s) => s.trash).length} item
              {screenshots.filter((s) => s.trash).length !== 1 ? "s" : ""}. This
              action cannot be undone.
            </p>
          </div>
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t border-border'>
          <button
            onClick={() => setIsEmptyBinConfirmationOpen(false)}
            className='px-4 py-2 rounded-full mr-2 transition-all duration-200 hover:bg-hover text-foreground'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setScreenshots(screenshots.filter((s) => !s.trash));
              setIsEmptyBinConfirmationOpen(false);
              Toast.error("Recycle Bin emptied");
            }}
            className='px-4 py-2 rounded-full transition-all duration-200 bg-error hover:bg-error/80 text-primary'
          >
            Empty Bin
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmptyBinModal;
