import { useScreenShot } from "@/context/ScreenShotContext";
import Filters from "./filters/Filters";
import FolderSection from "./folderSection/FolderSection";
import Header from "./Header";
import ScreenshotSection from "./screenshotSection/ScreenshotSection";
import StorageUsage from "./StorageUsage";
import TabNavigation from "./TabNavigation";
import PreviewModal from "./modal/PreviewModal";
import CreateFolderModal from "./modal/CreateFolderModal";
import MoveToFolderModal from "./modal/MoveToFolderModal";
import MultiSelectBar from "./MultiSelectBar";
import DeleteModal from "./modal/DeleteModal";
import ContextMenu from "./ContextMenu";
import RenameModal from "./modal/RenameModal";
import EmptyBinModal from "./modal/EmptyBinModal";

const ScreenShotManager = () => {
  const {
    isPreviewOpen,
    previewImage,
    isCreateFolderOpen,
    isMoveFolderOpen,
    isMultiSelectMode,
    selectedScreenshots,
    isDeleteConfirmationOpen,
    contextMenu,
    renameModalOpen,
    isEmptyBinConfirmationOpen,
  } = useScreenShot();
  return (
    <div className='max-h-screen overflow-y-auto'>
      <Header />
      <main className='max-w-[1600px] mx-auto py-8 px-4 sm:px-6'>
        <Filters />
        <TabNavigation />
        <StorageUsage />
        <FolderSection />
        <ScreenshotSection />
      </main>
      {isPreviewOpen && previewImage && <PreviewModal />}
      {isCreateFolderOpen && <CreateFolderModal />}
      {isMoveFolderOpen && <MoveToFolderModal />}
      {isMultiSelectMode && selectedScreenshots.length > 0 && (
        <MultiSelectBar />
      )}
      {isDeleteConfirmationOpen && <DeleteModal />}
      {contextMenu.isOpen && <ContextMenu />}
      {renameModalOpen && <RenameModal />}
      {isEmptyBinConfirmationOpen && <EmptyBinModal />}
    </div>
  );
};

export default ScreenShotManager;
