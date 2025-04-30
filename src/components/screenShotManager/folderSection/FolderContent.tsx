import { useScreenShot } from "@/context/ScreenShotContext";
import { folder } from "@/types/Folders";
import { FolderOpen } from "lucide-react";

const FolderContent = ({ folder }: { folder: folder }) => {
  const {
    editingFolder,
    setEditingFolder,
    handleFolderClick,
    handleFolderRename,
  } = useScreenShot();

  return (
    <div
      onClick={() => handleFolderClick(folder.id)}
      className='flex flex-col items-center text-center '
    >
      <div className='w-16 h-16 flex items-center justify-center rounded-xl mb-2 transition-all duration-200 bg-info-hover/5 '>
        <FolderOpen size={32} className='text-info' />
      </div>

      {editingFolder && editingFolder.id === folder.id ? (
        <div className='mt-2 w-full'>
          <input
            type='text'
            defaultValue={folder.name}
            autoFocus
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleFolderRename(folder.id, e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                handleFolderRename(folder.id, target.value);
              } else if (e.key === "Escape") {
                setEditingFolder(null);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className='w-full px-2 py-1 text-center rounded-lg border transition-all duration-200 bg-background border-border'
          />
        </div>
      ) : (
        <p className='mt-1 text-sm font-medium truncate w-full'>
          {folder.name}
        </p>
      )}
    </div>
  );
};

export default FolderContent;
