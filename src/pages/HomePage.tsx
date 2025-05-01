import { ScreenshotEditor } from "@/components/ScreenShotEditor";
import { useImageEditor } from "@/context/ImageContext";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { toolbarPosition } = useImageEditor();
  return (
    <main
      className={cn(
        "min-h-screen bg-background text-text flex flex-col items-center justify-center p-4",
        toolbarPosition === "bottom" && "justify-start"
      )}
    >
      <ScreenshotEditor />
    </main>
  );
};

export default HomePage;
