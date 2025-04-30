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
import TagManagementModal from "./modal/TagManagementModal";

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
    isTagManagementOpen,
  } = useScreenShot();
  return (
    <div className='max-h-screen overflow-y-auto bg-body-color'>
      <Header />
      <main className='max-w-screen-2xl mx-auto p-6'>
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
      {isTagManagementOpen && <TagManagementModal />}
      {isDeleteConfirmationOpen && <DeleteModal />}
      {contextMenu.isOpen && <ContextMenu />}
      {renameModalOpen && <RenameModal />}
      {isEmptyBinConfirmationOpen && <EmptyBinModal />}
    </div>
  );
};

export default ScreenShotManager;
