import { useScreenShot } from "@/context/ScreenShotContext";
import AddNewFolder from "./AddNewFolder";

import FolderActions from "./FolderActions";
import FolderContent from "./FolderContent";
import { Plus } from "lucide-react";

const FolderSection = () => {
  const {
    currentFolder,
    activeTab,
    subfolders,
    handleDragOver,
    handleDrop,
    setIsCreateFolderOpen,
  } = useScreenShot();
  return (
    <>
      {currentFolder !== "trash" && activeTab !== "recycle-bin" && (
        <div className='mb-8'>
          <AddNewFolder />

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {subfolders.map((folder) => (
              <div
                key={folder.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, folder.id)}
                className='relative group cursor-pointer rounded-2xl p-4 border bg-background  hover:shadow transition-all  duration-300 transform hover:scale-[1.02]'
              >
                {/* Folder actions */}
                <FolderActions folder={folder} />

                {/* Folder content */}
                <FolderContent folder={folder} />
              </div>
            ))}

            {/* Create folder button */}
            <button
              onClick={() => setIsCreateFolderOpen(true)}
              className='flex flex-col items-center justify-center h-full w-full rounded-2xl p-4 border-2 border-dashed transition-all duration-300 transform hover:scale-[1.02] bg-background border-border hover:border-hover'
            >
              <div className='w-16 h-16 flex items-center justify-center rounded-xl mb-2 transition-all duration-200 bg-info-hover/5 '>
                <Plus size={24} className='text-info' />
              </div>
              <p className='text-sm font-medium'>Create Folder</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FolderSection;
