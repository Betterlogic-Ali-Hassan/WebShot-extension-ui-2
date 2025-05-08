import { ScreenshotEditor } from "@/components/common/ScreenShotEditor";
import { useImageEditor } from "@/context/ImageContext";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { toolbarPosition, isHeightExpanded } = useImageEditor();
  return (
    <main
      className={cn(
        "max-h-screen  bg-background overflow-y-auto text-text flex flex-col items-center justify-center p-4",
        toolbarPosition === "bottom" && "justify-start max-h-[90vh]",
        isHeightExpanded && "overflow-hidden"
      )}
    >
      <ScreenshotEditor />
    </main>
  );
};

export default HomePage;
