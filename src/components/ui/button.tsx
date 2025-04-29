import { cn } from "@/lib/utils";

interface buttonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit" | "reset";
  ref?: (el: HTMLButtonElement | null) => void;
}

const Button = ({
  ref,
  type,
  children,
  className,
  onClick,
  id,
  disabled,
  title,
}: buttonProps) => {
  return (
    <button
      ref={ref}
      id={id}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded-md  cursor-pointer  px-3 py-2 text-sm font-semibold text-text  disabled:cursor-not-allowed whitespace-nowrap flex items-center",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
