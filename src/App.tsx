import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImageEditorProvider } from "./context/ImageContext";
import HomePage from "./pages/HomePage"; // Assume ye path sahi hai
import ProfilePage from "./pages/ProfilePage"; // Assume ye path sahi hai

import SubscriptionPage from "./pages/SubscriptionPage";
import SupportPage from "./pages/SupportPage";
import Billing from "./components/subscription/billing/Billing";
import { ModalProvider } from "./context/ModalsContext";
import { ScreenShotProvider } from "./context/ScreenShotContext";
import ScreenShotManager from "./components/screenShotManager/ScreenShotManager";
import "react-toastify/dist/ReactToastify.css";

import SingleScreenshot from "./components/singleScreenshotPage/SingleScreenshot";
function App() {
  return (
    <>
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
                <Route path='/s/:id' element={<SingleScreenshot />} />
              </Routes>
            </BrowserRouter>
          </ScreenShotProvider>
        </ModalProvider>
      </ImageEditorProvider>
    </>
  );
}

export default App;
