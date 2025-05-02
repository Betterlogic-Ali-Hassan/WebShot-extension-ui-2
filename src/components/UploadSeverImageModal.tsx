import { cn } from "@/lib/utils";
import { Check, Share, X } from "lucide-react";
import Button from "./ui/button";
import { useState } from "react";
import ShareLinkModal from "./ShareLinkModal";
import ShareLinkInput from "./ShareLinkInput";
interface Props {
  shareableLink: string;
  isUploading: boolean;
  setIsUploading: (upload: boolean) => void;
  setUploadSuccess: (upload: boolean) => void;
  uploadProgress: number;
}
const UploadSeverImageModal = ({
  shareableLink,
  isUploading,
  setIsUploading,
  setUploadSuccess,
  uploadProgress,
}: Props) => {
  const [showShareLinkModal, setShareableLinkModal] = useState(false);
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
            {!isUploading && (
              <div className='bg-green-500/20 p-1.5 rounded-full mr-2.5 mt-0.5'>
                <Check className='h-4 w-4 text-green-500' />
              </div>
            )}
            <h3 className='text-lg font-bold'>
              {isUploading
                ? "Uploading to cloud... Please wait."
                : "Upload complete!"}
            </h3>
          </div>
          <button
            onClick={() => {
              setUploadSuccess(false);
              setIsUploading(false);
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

        <ShareLinkInput
          shareableLink={shareableLink}
          isUploading={isUploading}
        />

        {isUploading && (
          <div className='flex-1 flex items-center justify-center mb-2'>
            <div className='w-full'>
              <div
                className={cn(
                  "h-1.5 rounded-full overflow-hidden bg-opacity-20",
                  "bg-border"
                )}
              >
                <div
                  className='h-full bg-info rounded-full animate-progress'
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {!isUploading && (
          <div className='mt-auto'>
            <Button
              onClick={() => {
                setShareableLinkModal(true);
              }}
              className={cn(
                "rounded-full px-4 py-2 transition-colors duration-200 flex items-center gap-2",
                "hover:bg-hover border hover:text-foreground"
              )}
            >
              <Share className='h-4 w-4 flex-shrink-0' />
              <span>Share Link</span>
            </Button>
          </div>
        )}
        {showShareLinkModal && (
          <ShareLinkModal
            setShowShareLinkModal={setShareableLinkModal}
            shareableLink={shareableLink}
          />
        )}
      </div>
    </div>
  );
};

export default UploadSeverImageModal;
