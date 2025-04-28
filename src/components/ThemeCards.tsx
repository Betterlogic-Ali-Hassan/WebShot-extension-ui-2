import { Monitor, Moon, Sun } from "lucide-react";
import ThemeCard from "./ThemeCard";

const ThemeCards = () => {
  return (
    <div className='space-y-4 pb-6 border-b border-border'>
      <h3 className='text-sm font-medium text-text'>Theme</h3>

      <div className='flex flex-col space-y-2'>
        {/* Theme Options */}
        <div className='grid grid-cols-3 gap-2'>
          {/* Light Theme */}
          <ThemeCard
            icon={<Sun className='h-5 w-5 mb-1' />}
            theme='light'
            name='Light'
          />

          {/* Dark Theme */}

          <ThemeCard
            icon={<Moon className='h-5 w-5 mb-1' />}
            theme='dark'
            name='Dark'
          />

          {/* System Theme */}
          <ThemeCard
            icon={<Monitor className='h-5 w-5 mb-1' />}
            theme='system'
            name='System'
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeCards;
