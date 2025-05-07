"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type ToastType = "success" | "error";

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
}

// Create a global event system for toasts
type ToastEvent =
  | {
      type: "SHOW_TOAST";
      payload: ToastProps;
    }
  | {
      type: "HIDE_TOAST";
    };

// Global event emitter (outside of React)
let listeners: ((event: ToastEvent) => void)[] = [];

// Global toast API that doesn't use hooks
export const Toast = {
  success: (message: string, duration?: number) => {
    emitToastEvent({
      type: "SHOW_TOAST",
      payload: { type: "success", message, duration },
    });
  },
  error: (message: string, duration?: number) => {
    emitToastEvent({
      type: "SHOW_TOAST",
      payload: { type: "error", message, duration },
    });
  },
  hide: () => {
    emitToastEvent({ type: "HIDE_TOAST" });
  },
};

function emitToastEvent(event: ToastEvent) {
  listeners.forEach((listener) => listener(event));
}

// Context for components that need to show toasts
const ToastContext = createContext<{
  showToast: (props: ToastProps) => void;
  hideToast: () => void;
}>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (props: ToastProps) => {
    setToast(props);
    setVisible(true);

    if (props.duration !== 0) {
      setTimeout(() => {
        hideToast();
      }, props.duration || 3000);
    }
  };

  const hideToast = () => {
    setVisible(false);
    setTimeout(() => setToast(null), 300); // Wait for animation to complete
  };

  // Listen for toast events
  useEffect(() => {
    const handleToastEvent = (event: ToastEvent) => {
      if (event.type === "SHOW_TOAST") {
        showToast(event.payload);
      } else if (event.type === "HIDE_TOAST") {
        hideToast();
      }
    };

    listeners.push(handleToastEvent);

    return () => {
      listeners = listeners.filter((listener) => listener !== handleToastEvent);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div
          className={cn(
            "fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-4 rounded-full shadow-lg transition-all duration-300 border bg-background  border-border text-text"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle className='h-5 w-5 text-green-500' />
            ) : (
              <AlertCircle className='h-5 w-5 text-red-500' />
            )}
            <p className='sm:text-sm text-xs'>{toast.message}</p>
            <button
              onClick={hideToast}
              className='ml-1 p-1 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center'
              aria-label='Close notification'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Hook for components that need to show toasts
export const useToast = () => useContext(ToastContext);
