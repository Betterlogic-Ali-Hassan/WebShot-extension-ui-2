import { useScreenShot } from "@/context/ScreenShotContext";
import { Plus } from "lucide-react";

const AddNewFolder = () => {
  const { setIsCreateFolderOpen } = useScreenShot();
  return (
    <div className='flex items-center justify-between mb-4'>
      <h2 className='text-lg font-medium'>Folders</h2>
      <button
        onClick={() => setIsCreateFolderOpen(true)}
        className='flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:bg-hover bg-background border border-border '
      >
        <Plus size={16} />
        <span>New Folder</span>
      </button>
    </div>
  );
};

export default AddNewFolder;
