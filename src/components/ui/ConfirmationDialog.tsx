import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "danger" | "success";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the confirm button when dialog opens
      confirmButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  // Handle click outside to close dialog
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onCancel();
      }
    };

    if (isOpen) {
      // Small delay to prevent immediate closing when opening
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 10);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getConfirmButtonClasses = () => {
    const baseClasses =
      "px-4 py-2 rounded-lg text-sm font-medium transition-colors ";

    switch (confirmVariant) {
      case "danger":
        return cn(baseClasses, "bg-error text-text-primary hover:bg-error");
      case "success":
        return cn(baseClasses, "bg-info text-text-primary hover:bg-info-hover");
      default:
        return cn(baseClasses, "bg-info text-text-primary hover:bg-info-hover");
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm'>
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        className='w-full max-w-md rounded-xl border shadow-lg bg-card border-border animate-in fade-in-50 zoom-in-95 duration-200 max-sm:mx-4'
      >
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h2 id='dialog-title' className='text-lg font-medium'>
            {title}
          </h2>
          <button
            onClick={onCancel}
            className='p-1.5 rounded-full transition-colors bg-background hover:bg-hover '
            aria-label='Close dialog'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='p-5'>
          <p id='dialog-description' className='text-sm mb-6'>
            {message}
          </p>

          <div className='flex justify-end gap-3'>
            <button
              onClick={onCancel}
              className='px-4 py-2 rounded-lg text-sm transition-colors bg-background border  hover:bg-hover'
            >
              {cancelText}
            </button>
            <button
              ref={confirmButtonRef}
              onClick={onConfirm}
              className={getConfirmButtonClasses()}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
