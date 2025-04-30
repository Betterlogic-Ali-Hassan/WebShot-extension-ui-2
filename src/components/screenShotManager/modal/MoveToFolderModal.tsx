import Modal from "@/components/ui/Modal";
import { useScreenShot } from "@/context/ScreenShotContext";
import { FolderOpen, X } from "lucide-react";

const MoveToFolderModal = () => {
  const {
    selectedScreenshots,
    setIsMoveFolderOpen,
    setMovingScreenshot,
    movingScreenshot,
    folders,
    handleMove,
    handleBulkMove,
  } = useScreenShot();

  return (
    <Modal>
      <div className='relative max-w-md w-full rounded-2xl overflow-hidden  shadow-lg transition-all duration-200 bg-background'>
        {/* Modal header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <h3 className='font-medium'>
            {selectedScreenshots.length > 0
              ? `Move ${selectedScreenshots.length} screenshots to folder`
              : "Move to Folder"}
          </h3>
          <button
            onClick={() => {
              setIsMoveFolderOpen(false);
              setMovingScreenshot(null);
            }}
            className='p-1.5 rounded-full transition-all duration-200 hover:bg-hover'
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4 max-h-60 overflow-y-auto no-scrollbar'>
          {folders
            .filter(
              (folder) =>
                folder.id !== "trash" &&
                (movingScreenshot
                  ? folder.id !== movingScreenshot.folder
                  : true)
            )
            .map((folder) => (
              <button
                key={folder.id}
                onClick={() => {
                  if (movingScreenshot) {
                    handleMove(movingScreenshot.id, folder.id);
                  } else if (selectedScreenshots.length > 0) {
                    handleBulkMove(folder.id);
                  }
                }}
                className='flex items-center w-full px-3 py-2 rounded-lg mb-1 text-left transition-all duration-200 hover:bg-hover'
              >
                <FolderOpen size={16} className='mr-2 text-info' />
                <span>{folder.name}</span>
              </button>
            ))}

          {folders.filter(
            (folder) =>
              folder.id !== "trash" &&
              (movingScreenshot ? folder.id !== movingScreenshot.folder : true)
          ).length === 0 && (
            <div className='text-center py-4 text-foreground'>
              No other folders available
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className='flex items-center justify-end p-4 border-t'>
          <button
            onClick={() => {
              setIsMoveFolderOpen(false);
              setMovingScreenshot(null);
            }}
            className='px-4 py-2 rounded-full transition-all duration-200 hover:bg-hover'
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MoveToFolderModal;
