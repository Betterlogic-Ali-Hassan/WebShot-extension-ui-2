import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { FolderOpen, Trash2 } from "lucide-react";
const TabNavigation = () => {
  const { screenshots, activeTab, setActiveTab } = useScreenShot();
  return (
    <div className='mb-8 mt-4'>
      <div className='flex items-center gap-1 p-1 max-sm:flex-col rounded-lg max-w-md transition-all duration-300  bg-hover/25 text-text'>
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "flex-1 px-4 py-2.5 font-medium text-sm rounded-md transition-all duration-200 relative flex items-center justify-center hover:bg-background/50 text-foreground/80 hover:text-text max-sm:w-full",
            activeTab === "all" && "bg-background text-text"
          )}
        >
          <div className='flex items-center justify-center'>
            <FolderOpen size={16} className='mr-2' />
            <span>All Screenshots</span>
          </div>
          {activeTab === "all" && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 transition-colors duration-200 bg-info animate-in fade-in'></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("recycle-bin")}
          className={cn(
            "flex-1 px-4 py-2.5 font-medium text-sm rounded-md transition-all duration-200 relative flex items-center justify-center hover:bg-background/50 text-foreground/80 hover:text-text max-sm:w-full",
            activeTab === "recycle-bin" && "bg-background text-text"
          )}
        >
          <div className='flex items-center justify-center'>
            <Trash2 size={16} className='mr-2' />
            <span>Recycle Bin</span>
            {screenshots.filter((s) => s.trash).length > 0 && (
              <span className='ml-2 px-2 py-0.5 rounded-full text-xs inline-flex items-center justify-center bg-hover text-foreground'>
                {screenshots.filter((s) => s.trash).length}
              </span>
            )}
          </div>
          {activeTab === "recycle-bin" && (
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 transition-colors duration-200 animate-in fade-in bg-info'></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
