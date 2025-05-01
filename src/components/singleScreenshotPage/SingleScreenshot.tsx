import { useEffect, useState } from "react";

import { screenShot } from "@/types/ScreenShot";
import MobileTabs from "./MobileTabs";
import { ScreenshotActions } from "./Actions";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { mockScreenshots } from "@/constant/MockScreenShot";
import Header from "./Header";
import { ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageViewer } from "../tools/ImageViewer";
import { useImageEditor } from "@/context/ImageContext";

const SingleScreenshot = () => {
  const { id } = useParams();
  const { setUploadedImage } = useImageEditor();
  const [screenshot, setScreenshot] = useState<screenShot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeTab, setActiveTab] = useState("actions");

  useEffect(() => {
    const foundScreenshot = mockScreenshots.find((s) => s.id === id);

    if (foundScreenshot) {
      if (foundScreenshot.isPrivate) {
        setIsAccessDenied(true);
      } else {
        setScreenshot(foundScreenshot);
        setUploadedImage("/placeholder.svg");
        setLikeCount(foundScreenshot.likes || 0);
        setIsAccessDenied(false); // Ensure access is allowed
      }
    } else {
      setIsAccessDenied(true);
    }

    setIsLoading(false);
    setLiked(false);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (!screenshot) {
    return <div>Loading...</div>;
  }
  if (isAccessDenied) {
    return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background'>
        <div className='max-w-md w-full p-8 rounded-2xl text-center border shadow-lg transition-all duration-200 bg-card'>
          <div className='mb-6'>
            <div className='w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-hover'>
              <Lock size={32} className='text-error' />
            </div>
          </div>
          <h1 className='text-2xl font-bold mb-4'>Access Denied</h1>
          <p className='text-lg mb-6'>
            This screenshot is private or doesn't exist.
          </p>
          <Link
            to='/'
            className={cn(
              "inline-flex items-center px-5 py-3 rounded-xl font-medium",
              "transition-all duration-200 shadow-sm hover:shadow bg-card hover:bg-hover"
            )}
          >
            <ArrowLeft size={18} className='mr-2' />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-background'>
        <div className='flex flex-col items-center'>
          <div className='w-16 h-16 border-4 border-t-info border-r-transparent border-b-info border-l-transparent rounded-full animate-spin'></div>
          <p className='mt-4 text-lg'>Loading screenshot...</p>
        </div>
      </div>
    );
  }
  return (
    <div className='max-h-screen w-full overflow-y-auto bg-body-color'>
      <Header
        handleLike={handleLike}
        likeCount={likeCount}
        screenshot={screenshot}
        liked={liked}
      />
      <main className='flex-1 py-8 pb-0 px-4 sm:px-6 flex flex-col items-center'>
        <div className='max-w-screen-xl w-full'>
          <div className='relative rounded-2xl min-h-[400px] overflow-hidden mb-8 shadow-lg transition-all duration-300 bg-card hover:bg-hover'>
            <ImageViewer
              disableWheelZoom={false}
              showZoomControls={true}
              fitToContainer={true}
            />
          </div>
          <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <ScreenshotActions
            screenshot={screenshot}
            activeTab={activeTab}
            handleLike={handleLike}
            liked={liked}
            likeCount={likeCount}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleScreenshot;
