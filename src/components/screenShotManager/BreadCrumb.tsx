import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { folder } from "@/types/Folders";
import { ChevronRight } from "lucide-react";

const BreadCrumb = () => {
  const { currentFolder, folders, setCurrentFolder } = useScreenShot();

  const getBreadcrumbPath = () => {
    const path = [];
    let current: folder | null | undefined = folders.find(
      (f) => f.id === currentFolder
    );

    while (current) {
      path.unshift(current);
      if (current) {
        current = current.parent
          ? folders.find((f) => f.id === current?.parent)
          : null;
      }
    }

    return path;
  };
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };
  return (
    <div className='flex items-center space-x-2 mb-6 mt-4'>
      {getBreadcrumbPath().map((folder, index) => (
        <div key={folder.id} className='flex items-center'>
          {index > 0 && (
            <ChevronRight size={16} className='mx-2 text-foreground' />
          )}
          <button
            onClick={() => handleFolderClick(folder.id)}
            className={cn(
              "hover:underline transition-colors duration-200",
              currentFolder === folder.id ? "font-medium" : ""
            )}
          >
            {folder.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
