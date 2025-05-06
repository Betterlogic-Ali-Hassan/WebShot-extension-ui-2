import { ScreenshotEditor } from "@/components/ScreenShotEditor";
import { useImageEditor } from "@/context/ImageContext";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { toolbarPosition, isHeightExpanded } = useImageEditor();
  return (
    <main
      className={cn(
        "max-h-screen bg-background overflow-y-auto text-text flex flex-col items-center justify-center p-4",
        toolbarPosition === "bottom" && "justify-start",
        isHeightExpanded && "overflow-hidden"
      )}
    >
      <ScreenshotEditor />
    </main>
  );
};

export default HomePage;
