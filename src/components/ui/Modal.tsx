import { cn } from "@/lib/utils";

const Modal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200'>
      <div
        className={cn(
          "w-full max-w-md rounded-lg border border-border bg-background",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
