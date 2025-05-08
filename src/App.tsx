import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage"; // Assume ye path sahi hai

function App() {
  return (
    <>
      <ImageEditorProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ImageEditorProvider>
    </>
  );
}

export default App;
