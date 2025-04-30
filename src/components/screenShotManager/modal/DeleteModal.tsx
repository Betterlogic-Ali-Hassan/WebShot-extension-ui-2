import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";
import { X } from "lucide-react";

const DeleteModal = () => {
  const {
    setIsDeleteConfirmationOpen,
    currentFolder,
    selectedScreenshots,
    handleBulkDelete,
  } = useScreenShot();
  return (
    <Modal>
      <div className='relative max-w-md w-full mx-4 rounded-2xl overflow-hidden border shadow-lg transition-all duration-200 bg-background'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='font-medium'>Confirm Delete</h3>
          <button
            onClick={() => setIsDeleteConfirmationOpen(false)}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4'>
          <p>
            Are you sure you want to delete{" "}
            {currentFolder === "trash" ? "permanently delete" : "move to trash"}{" "}
            {selectedScreenshots.length} screenshot
            {selectedScreenshots.length > 1 ? "s" : ""}?
          </p>
          {currentFolder !== "trash" && (
            <p className='mt-2 text-sm text-foreground'>
              You can restore them from the trash folder.
            </p>
          )}
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t'>
          <button
            onClick={() => setIsDeleteConfirmationOpen(false)}
            className='px-4 py-2 rounded-full mr-2 transition-all duration-200 hover:bg-hover'
          >
            Cancel
          </button>
          <button
            onClick={handleBulkDelete}
            className='px-4 py-2 rounded-full transition-all duration-200 bg-error hover:bg-error/80 text-text-primary'
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
