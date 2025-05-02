import { cn } from "@/lib/utils";
import { Share, X } from "lucide-react";
import SocialSlider from "./SocialSlider";
import ShareLinkInput from "./ShareLinkInput";

interface Props {
  setShowShareLinkModal: (link: boolean) => void;
  shareableLink: string;
}
const ShareLinkModal = ({ setShowShareLinkModal, shareableLink }: Props) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
      <div
        className={cn(
          "w-[420px] min-h-[220px] p-5 rounded-2xl shadow-lg transition-all duration-300 flex flex-col",
          "border border-opacity-10",
          "bg-card text-foreground border-border"
        )}
      >
        <div className='flex justify-between items-start mb-4'>
          <div className='flex items-start'>
            <div className='bg-card p-1.5 rounded-full mr-2.5 mt-0.5'>
              <Share className='h-4 w-4 text-text' />
            </div>

            <h3 className='text-lg font-bold'>Share Link</h3>
          </div>
          <button
            onClick={() => {
              setShowShareLinkModal(false);
            }}
            className={cn(
              "rounded-full p-1.5 transition-colors justify-center",
              "hover:bg-hover text-foreground hover:text-text"
            )}
            aria-label='Close'
          >
            <X className='h-4 w-4 flex-shrink-0' />
          </button>
        </div>
        <div>
          <SocialSlider />
          <ShareLinkInput
            shareableLink={shareableLink}
            isUploading={false}
            className='mt-6'
          />
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
