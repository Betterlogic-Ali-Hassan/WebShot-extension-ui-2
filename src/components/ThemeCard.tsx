import { Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const ThemeCard = ({
  icon,
  name,
  theme,
}: {
  icon: React.ReactNode;
  name: string;
  theme: "light" | "dark" | "system";
}) => {
  const { theme: themeValue, setTheme } = useTheme();
  const handleSetTheme = () => setTheme(theme);
  const isSelected = themeValue === theme;
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-lg relative  hover:bg-info/20 text-text border border-border",
        isSelected && "bg-info/20 border-info"
      )}
      onClick={handleSetTheme}
    >
      {icon}
      <span className='text-xs'>{name}</span>
      {isSelected && (
        <div className='absolute top-1 right-1 h-3 w-3 rounded-full bg-info flex items-center justify-center'>
          <Check className='h-2 w-2 text-text-primary' />
        </div>
      )}
    </button>
  );
};

export default ThemeCard;
