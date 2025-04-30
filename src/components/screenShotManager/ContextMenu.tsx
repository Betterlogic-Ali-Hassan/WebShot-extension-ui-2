import { useScreenShot } from "@/context/ScreenShotContext";
import { Pencil, Trash2 } from "lucide-react";

const ContextMenu = () => {
  const {
    contextMenu,
    screenshots,
    handleOpenRenameModal,
    handleDelete,
    handleCloseContextMenu,
  } = useScreenShot();

  return (
    <div
      className='context-menu absolute z-50 rounded-md shadow-lg overflow-hidden'
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <button
        onClick={() => {
          const screenshot = screenshots.find(
            (s) => s.id === contextMenu.screenshotId
          );
          if (screenshot) {
            handleOpenRenameModal(screenshot);
          }
        }}
        className='flex items-center w-full px-4 py-2 text-left text-sm transition-colors duration-200 hover:bg-hover'
      >
        <Pencil size={14} className='mr-2' />
        Rename
      </button>
      <button
        onClick={() => {
          const screenshot = screenshots.find(
            (s) => s.id === contextMenu.screenshotId
          );
          if (screenshot) {
            handleDelete(screenshot.id);
          }
          handleCloseContextMenu();
        }}
        className='flex items-center w-full px-4 py-2 text-left text-sm text-error transition-colors duration-200 hover:bg-hover '
      >
        <Trash2 size={14} className='mr-2' />
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
