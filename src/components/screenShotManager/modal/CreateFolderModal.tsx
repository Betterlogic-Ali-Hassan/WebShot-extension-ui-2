import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const CreateFolderModal = () => {
  const {
    setIsCreateFolderOpen,
    newFolderName,
    setNewFolderName,
    handleCreateFolder,
  } = useScreenShot();
  return (
    <Modal className='rounded-2xl'>
      <div className='relative max-w-md w-full  rounded-2xl overflow-hidden bg-background '>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='font-medium'>Create New Folder</h3>
          <button
            onClick={() => setIsCreateFolderOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          <label className='block text-sm mb-1'>Folder Name</label>
          <input
            type='text'
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder='Enter folder name'
            autoFocus
            className='w-full px-3 py-2 rounded-lg border transition-all duration-200 bg-background '
          />
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t '>
          <button
            onClick={() => setIsCreateFolderOpen(false)}
            className='px-4 py-2 rounded-full mr-2 transition-all hover:bg-hover duration-200 border'
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFolder}
            disabled={!newFolderName.trim()}
            className={cn(
              "px-4 py-2 rounded-full bg-text text-card cursor-not-allowed hover:bg-text/80 disabled:opacity-60 disabled:hover:bg-text",
              newFolderName.trim() && "bg-info "
            )}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFolderModal;
