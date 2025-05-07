import { cn } from "@/lib/utils";
import { screenShot } from "@/types/ScreenShot";
import { ChevronLeft, Clock, Download, Eye, Heart, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { Toast } from "../ui/toast";
interface Props {
  screenshot: screenShot | null;
  handleLike: () => void;
  liked: boolean;
  likeCount: number;
}
const Header = ({ screenshot, liked, likeCount, handleLike }: Props) => {
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    Toast.success("Link copied!");
  };
  const handleDownload = () => {
    if (!screenshot) return;

    // Create a fake download
    const link = document.createElement("a");
    link.href = screenshot.url;
    link.download = `${screenshot.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Toast.success("Download started");
  };
  return (
    <header className='sticky top-0 z-10 py-4 backdrop-blur-lg bg-background'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-5 flex-wrap'>
        <div className='flex items-center'>
          <Link
            to='/'
            className='p-2 rounded-full transition-all duration-200 mr-3 hover:scale-105 bg-card hover:bg-hover'
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className='text-xl font-bold'>{screenshot?.name}</h1>
            <div className='flex items-center text-sm mt-1'>
              <Clock size={14} className='mr-1 text-gray-500' />
              <span className='text-foreground'>{screenshot?.date}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          {/* Stats */}
          <div className='hidden md:flex items-center space-x-4 mr-2'>
            <div className='flex items-center'>
              <Eye size={16} className='text-foreground' />
              <span className='ml-1 text-sm text-foreground'>
                {screenshot?.views || 0}
              </span>
            </div>
            <button onClick={handleLike} className='flex items-center group'>
              <Heart
                size={16}
                className={cn(
                  "transition-all duration-300 text-text group-hover:text-error",
                  liked && "fill-error text-error"
                )}
              />
              <span
                className={cn(
                  "ml-1 text-sm transition-all duration-300 text-text group-hover:text-error",
                  liked && "text-error"
                )}
              >
                {likeCount}
              </span>
            </button>
          </div>

          {/* Share button */}
          <button
            onClick={handleCopyLink}
            className='flex items-center space-x-1 px-4 py-2 ml-3 rounded-full transition-all duration-200 hover:scale-105 bg-card hover:bg-hover'
          >
            <Share size={16} className='mr-1' />
            <span className='text-sm font-medium'>Share</span>
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className='flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow hover:scale-105 bg-info text-text-primary hover:bg-info-hover'
          >
            <Download size={16} className='mr-1' />
            <span className='text-sm font-medium'>Download</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
