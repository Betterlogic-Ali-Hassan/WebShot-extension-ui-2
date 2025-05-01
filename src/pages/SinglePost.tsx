import { ScreenshotActions } from "@/components/singleScreenshotPage/Actions";
import { ScreenshotDetails } from "@/components/singleScreenshotPage/Details";
import { ScreenshotHeader } from "@/components/singleScreenshotPage/Header";
import { ImageViewer } from "@/components/singleScreenshotPage/ImageViewer";
import { mockScreenshots } from "@/constant/MockScreenShot";
import { screenShot } from "@/types/ScreenShot";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [screenshot, setScreenshot] = useState<screenShot | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const foundScreenshot = mockScreenshots.find((s) => s.id === id);
    if (foundScreenshot) setScreenshot(foundScreenshot);
    setLiked(false);
    setLikeCount(foundScreenshot?.likes || 0);
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (!screenshot) {
    return <div>Loading...</div>;
  }
  return (
    <div className='bg-var(--color-body-color)'>
      <ScreenshotHeader
        screenshot={screenshot}
        liked={liked}
        likeCount={likeCount}
        handleLike={handleLike}
      />

      <main className='max-w-screen-2xl mx-auto px-4 sm:px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Image Viewer */}
        <div className='md:col-span-1 relative'>
          <ImageViewer imageUrl={screenshot.url} showZoomControls />
        </div>

        {/* Details & Actions */}
        <ScreenshotDetails
          screenshot={screenshot}
          activeTab={activeTab}
          liked={liked}
          likeCount={likeCount}
          handleLike={handleLike}
        />
        <ScreenshotActions screenshot={screenshot} activeTab={activeTab} />
      </main>
    </div>
  );
};

export default SinglePost;
