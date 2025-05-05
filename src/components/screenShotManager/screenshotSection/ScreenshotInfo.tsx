import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { screenShot } from "@/types/ScreenShot";
import { ArrowUpRight, Trash2, X } from "lucide-react";
interface Props {
  screenshot: screenShot;
}
const ScreenshotInfo = ({ screenshot }: Props) => {
  const {
    handleRemoveTag,
    handleTagManagement,
    handleRename,
    activeTab,
    viewMode,
    editingScreenshot,
    setEditingScreenshot,
    handleRestore,
    handlePermanentDelete,
  } = useScreenShot();
  return (
    <div className={cn(viewMode === "grid" ? "p-3" : "flex-1 p-3")}>
      {editingScreenshot && editingScreenshot.id === screenshot.id ? (
        <div className='mb-1'>
          <input
            type='text'
            defaultValue={screenshot.name}
            autoFocus
            onBlur={(e) => handleRename(screenshot.id, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                handleRename(screenshot.id, target.value);
              } else if (e.key === "Escape") {
                setEditingScreenshot(null);
              }
            }}
            className='w-full px-2 py-1 rounded-lg border transition-all duration-200 bg-card border-border text-text'
          />
        </div>
      ) : (
        <h3
          className={cn(
            "font-medium truncate cursor-pointer transition-colors duration-200 hover:text-info",
            activeTab === "recycle-bin" && "text-foreground"
          )}
          onClick={() => !screenshot.trash && setEditingScreenshot(screenshot)}
        >
          {screenshot.name}
        </h3>
      )}

      <div className='flex items-center text-xs text-foreground mt-1'>
        <span>{screenshot.date}</span>
        {screenshot.tags &&
          screenshot.tags.length > 0 &&
          activeTab !== "recycle-bin" && (
            <div className='flex items-center ml-2'>
              <span className='mx-1'>•</span>
              <div className='flex flex-wrap gap-1 mt-1'>
                {screenshot.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-0.5 rounded-full text-xs group relative bg-card text-foreground transition-colors duration-200'
                  >
                    {tag}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(screenshot.id, tag);
                      }}
                      className={cn(
                        "absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        "bg-error text-text-primary"
                      )}
                    >
                      <X size={8} />
                    </button>
                  </span>
                ))}
                {screenshot.tags.length > 2 && (
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs cursor-pointer",
                      "transition-colors duration-200 bg-card text-text"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagManagement(screenshot.id);
                    }}
                  >
                    +{screenshot.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Add recycle bin specific actions */}
        {activeTab === "recycle-bin" && (
          <div className='flex ml-auto space-x-1'>
            <button
              onClick={() => handleRestore(screenshot.id)}
              className={cn(
                "p-1 rounded transition-colors duration-200 hover:bg-hover text-info"
              )}
              title='Restore'
            >
              <ArrowUpRight size={14} />
            </button>
            <button
              onClick={() => handlePermanentDelete(screenshot.id)}
              className={cn(
                "p-1 rounded transition-colors duration-200 hover:bg-card text-error"
              )}
              title='Delete Permanently'
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenshotInfo;
