import { ScreenshotEditor } from "./components/ScreenShotEditor";
import { ThemeProvider } from "./components/ThemeProvider";
import { ImageEditorProvider } from "./context/ImageContext";

function App() {
  return (
    <ThemeProvider>
      <ImageEditorProvider>
        <main className='min-h-screen bg-background text-text flex flex-col items-center justify-center p-4'>
          <ScreenshotEditor />
        </main>
      </ImageEditorProvider>
    </ThemeProvider>
  );
}

export default App;
