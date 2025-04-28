import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage"; // Assume ye path sahi hai
import ProfilePage from "./pages/ProfilePage"; // Assume ye path sahi hai
import { ToastContainer } from "react-toastify";
import SubscriptionPage from "./pages/SubscriptionPage";
import SupportPage from "./pages/SupportPage";

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
            <Route path='/subscription' element={<SubscriptionPage />} />
            <Route path='/support' element={<SupportPage />} />
          </Routes>
        </BrowserRouter>
      </ImageEditorProvider>
    </ThemeProvider>
  );
}

export default App;
