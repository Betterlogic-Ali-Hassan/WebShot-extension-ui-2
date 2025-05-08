import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <ImageEditorProvider>
        <HomePage />
      </ImageEditorProvider>
    </>
  );
}

export default App;
