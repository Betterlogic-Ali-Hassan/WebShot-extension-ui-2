import { useScreenShot } from "@/context/ScreenShotContext";
import { folder } from "@/types/Folders";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const FolderActions = ({ folder }: { folder: folder }) => {
  const { handleDeleteFolder, setEditingFolder } = useScreenShot();
  return (
    <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
      <div className='relative'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            document
              .getElementById(`folder-menu-${folder.id}`)
              ?.classList.toggle("hidden");
          }}
          className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
        >
          <MoreVertical size={16} />
        </button>

        {/* Folder menu */}
        <div
          id={`folder-menu-${folder.id}`}
          className='absolute right-0 mt-1 w-40 rounded-xl shadow-lg z-10 hidden border transition-all duration-200 bg-background border-border'
        >
          <div className='py-1'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingFolder(folder);
                document
                  .getElementById(`folder-menu-${folder.id}`)
                  ?.classList.add("hidden");
              }}
              className='flex items-center w-full px-4 py-2 text-left text-sm hover:bg-hover transition-colors duration-200'
            >
              <Pencil size={14} className='mr-2' />
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder(folder.id);
                document
                  .getElementById(`folder-menu-${folder.id}`)
                  ?.classList.add("hidden");
              }}
              className='flex items-center w-full px-4 py-2 text-left text-sm text-error hover:bg-hover transition-colors duration-200'
            >
              <Trash2 size={14} className='mr-2' />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderActions;
