import { useScreenShot } from "@/context/ScreenShotContext";
import { getAllTags } from "@/helper/getAllTags";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Search, Tag } from "lucide-react";

const TagsSelectionFilter = () => {
  const {
    tagDropdownRef,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    selectedTags,
    setSelectedTags,
    tagSearchQuery,
    setTagSearchQuery,
    screenshots,
  } = useScreenShot();
  return (
    <div className='relative w-full' ref={tagDropdownRef}>
      <button
        onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-full max-sm:w-full max-sm:justify-between",
          "border transition-all duration-200 bg-background border-border hover:bg-hover",
          isTagDropdownOpen && "bg-hover",
          selectedTags.length > 0 && "border-info"
        )}
      >
        <div className='flex items-center gap-2'>
          <Tag size={16} />
          <span>
            {selectedTags.length > 0 ? `Tags (${selectedTags.length})` : "Tags"}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            isTagDropdownOpen && "transform rotate-180"
          )}
        />
      </button>
      {isTagDropdownOpen && (
        <div className='absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-10  transition-all duration-200 animate-in fade-in bg-background border max-[450px]:left-0 '>
          {/* Search field */}
          <div className='p-3 border-b border-border'>
            <div className='relative'>
              <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground' />
              <input
                type='text'
                placeholder='Search tags...'
                className='w-full pl-8 pr-3 py-1.5 rounded-lg text-sm border transition-all duration-200 input border-border'
                value={tagSearchQuery || ""}
                onChange={(e) => setTagSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tags list */}
          <div className='p-2 max-h-[280px] overflow-y-auto no-scrollbar'>
            {getAllTags(screenshots)
              .filter(
                (tag) =>
                  !tagSearchQuery ||
                  tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tag) => (
                <div
                  key={tag.name}
                  className='mb-1.5'
                  onClick={() => {
                    if (selectedTags.includes(tag.name)) {
                      setSelectedTags(
                        selectedTags.filter((t) => t !== tag.name)
                      );
                    } else {
                      setSelectedTags([...selectedTags, tag.name]);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-full cursor-pointer transition-all duration-200 bg-background border border-border hover:bg-card",
                      selectedTags.includes(tag.name) && "bg-hover"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 mr-2 flex items-center justify-center rounded-sm",
                        "transition-all duration-200 border border-border",
                        selectedTags.includes(tag.name) && "border-info"
                      )}
                    >
                      {selectedTags.includes(tag.name) && <Check size={12} />}
                    </div>
                    <span className='text-sm'>{tag.name}</span>
                  </div>
                </div>
              ))}
            {getAllTags(screenshots).filter(
              (tag) =>
                !tagSearchQuery ||
                tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
            ).length === 0 && (
              <div className='px-3 py-4 text-center text-foreground text-sm'>
                {tagSearchQuery
                  ? "No matching tags found"
                  : "No tags available"}
              </div>
            )}
          </div>

          {/* Actions footer */}
          {selectedTags.length > 0 && (
            <div className='p-2 border-t border-border flex justify-between'>
              <button
                onClick={() => setSelectedTags([])}
                className='text-xs px-2 py-1 rounded transition-all duration-200 text-error hover:bg-hover'
              >
                Clear all
              </button>
              <button
                onClick={() => setIsTagDropdownOpen(false)}
                className='text-xs px-2 py-1 rounded transition-all duration-200 bg-text text-card hover:opacity-60'
              >
                Apply ({selectedTags.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagsSelectionFilter;
