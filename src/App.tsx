import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage"; // Assume ye path sahi hai
import ProfilePage from "./pages/ProfilePage"; // Assume ye path sahi hai
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider>
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
        theme='dark'
      />
      <ImageEditorProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </ImageEditorProvider>
    </ThemeProvider>
  );
}

export default App;
