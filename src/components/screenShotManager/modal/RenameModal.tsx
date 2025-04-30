import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";
import { X } from "lucide-react";

const RenameModal = () => {
  const {
    setRenameModalOpen,
    renameInput,
    setRenameInput,
    renameError,
    handleSaveRename,
  } = useScreenShot();
  return (
    <Modal className='rounded-2xl'>
      <div className='relative max-w-md w-full rounded-2xl  overflow-hidden  shadow-lg transition-all duration-200 bg-background'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='font-medium'>Rename Screenshot</h3>
          <button
            onClick={() => setRenameModalOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          <label className='block text-sm mb-1'>New Name</label>
          <input
            type='text'
            value={renameInput}
            onChange={(e) => setRenameInput(e.target.value)}
            placeholder='Enter new name'
            autoFocus
            className='w-full px-3 py-2 rounded-lg border transition-all duration-200 bg-background'
          />
          {renameError && (
            <p className='mt-2 text-sm text-error'>{renameError}</p>
          )}
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t'>
          <button
            onClick={() => setRenameModalOpen(false)}
            className='px-4 py-2 rounded-full mr-2 transition-all duration-200 hover:bg-hover border'
          >
            Cancel
          </button>
          <button
            onClick={handleSaveRename}
            className='px-4 py-2 rounded-full transition-all duration-200 bg-info hover:bg-info-hover text-text-primary'
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameModal;
