import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage"; // Assume ye path sahi hai
import ProfilePage from "./pages/ProfilePage"; // Assume ye path sahi hai
import { ToastContainer } from "react-toastify";
import SubscriptionPage from "./pages/SubscriptionPage";
import SupportPage from "./pages/SupportPage";
import Billing from "./components/subscription/billing/Billing";
import { ModalProvider } from "./context/ModalsContext";
import { ScreenShotProvider } from "./context/ScreenShotContext";
import ScreenShotManager from "./components/screenShotManager/ScreenShotManager";

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
        <ModalProvider>
          <ScreenShotProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/subscription' element={<SubscriptionPage />} />
                <Route path='/support' element={<SupportPage />} />
                <Route path='/billing' element={<Billing />} />
                <Route path='/screenshot' element={<ScreenShotManager />} />
              </Routes>
            </BrowserRouter>
          </ScreenShotProvider>
        </ModalProvider>
      </ImageEditorProvider>
    </ThemeProvider>
  );
}

export default App;
