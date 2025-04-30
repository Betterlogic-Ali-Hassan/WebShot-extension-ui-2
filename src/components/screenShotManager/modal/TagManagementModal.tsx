"use client";

import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";

const TagManagementModal = () => {
  const {
    tagManagementTarget,
    selectedScreenshots,
    setIsTagManagementOpen,
    newTagInput,
    handleAddTag,
    handleTagInputChange,
    tagSuggestions,
    allTags,
    handleToggleTag,
    isTagAssignedToAll,
    isTagAssignedToSome,
  } = useScreenShot();
  return (
    <Modal className='rounded-2xl'>
      <div className='relative max-w-md w-full  rounded-2xl overflow-hidden  shadow-lg transition-all duration-200 bg-card'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h3 className='font-medium text-foreground'>
            {tagManagementTarget === "bulk"
              ? `Manage Tags (${selectedScreenshots.length} screenshots)`
              : "Manage Tags"}
          </h3>
          <button
            onClick={() => setIsTagManagementOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} className='text-foreground' />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          {/* Add new tag */}
          <div className='mb-4'>
            <label className='block text-sm mb-1 text-foreground'>
              Add Tag
            </label>
            <div className='relative'>
              <input
                type='text'
                value={newTagInput}
                onChange={handleTagInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTagInput.trim()) {
                    handleAddTag(newTagInput.trim());
                  }
                }}
                placeholder='Type to add a new tag...'
                className='w-full px-3 py-2 rounded-lg border border-border bg-searchbar text-foreground transition-all duration-200'
              />
              <button
                onClick={() =>
                  newTagInput.trim() && handleAddTag(newTagInput.trim())
                }
                disabled={!newTagInput.trim()}
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2",
                  "p-1 rounded-full transition-all duration-200",
                  newTagInput.trim()
                    ? "bg-info text-primary hover:bg-info-hover"
                    : "bg-hover text-muted cursor-not-allowed"
                )}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Tag suggestions */}
            {newTagInput.trim() && tagSuggestions.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-1'>
                {tagSuggestions.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className='px-2 py-0.5 rounded-full text-xs bg-hover text-foreground hover:bg-hover transition-all duration-200'
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Existing tags */}
          <div>
            <label className='block text-sm mb-2 text-foreground'>
              Available Tags
            </label>
            <div className='max-h-60 overflow-y-auto pr-1 no-scrollbar'>
              {allTags.length > 0 ? (
                <div className='space-y-1'>
                  {allTags.map((tag) => (
                    <div
                      key={tag.name}
                      onClick={() => handleToggleTag(tag.name)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer",
                        "transition-all duration-200 border",
                        isTagAssignedToAll(tag.name)
                          ? "bg-info/10 border-info/50"
                          : isTagAssignedToSome(tag.name)
                          ? "bg-info/10 border-info/30"
                          : "bg-card border-border hover:bg-hover"
                      )}
                    >
                      <div className='flex items-center'>
                        <div
                          className={cn(
                            "w-4 h-4 mr-2 flex items-center justify-center rounded-sm",
                            "transition-all duration-200",
                            isTagAssignedToAll(tag.name)
                              ? "bg-info text-text-primary"
                              : isTagAssignedToSome(tag.name)
                              ? "bg-info/50 text-text-primary"
                              : "border border-border"
                          )}
                        >
                          {isTagAssignedToAll(tag.name) && <Check size={12} />}
                          {isTagAssignedToSome(tag.name) && (
                            <div className='w-2 h-2 bg-primary rounded-sm'></div>
                          )}
                        </div>
                        <span className='text-sm text-foreground'>
                          {tag.name}
                        </span>
                      </div>
                      <span className='text-xs text-muted'>{tag.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-4 text-muted'>
                  No tags available. Create your first tag above.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t border-border'>
          <button
            onClick={() => setIsTagManagementOpen(false)}
            className='px-4 py-2 rounded-full transition-all duration-200 bg-info hover:bg-info-hover text-text-primary'
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TagManagementModal;
