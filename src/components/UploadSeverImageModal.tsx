import { cn } from "@/lib/utils";
import { Check, Clipboard, X } from "lucide-react";
import { toast } from "react-toastify";
import Button from "./ui/button";
import { CopyButton } from "./CopyButton";
interface Props {
  shareableLink: string;
  isUploading: boolean;
  setIsUploading: (upload: boolean) => void;
  setUploadSuccess: (upload: boolean) => void;
}
const UploadSeverImageModal = ({
  shareableLink,
  isUploading,
  setIsUploading,
  setUploadSuccess,
}: Props) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copied to clipboard!");
  };
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

        <div className='flex-1 flex flex-col justify-center mb-4'>
          <div className='relative'>
            <div
              className={cn(
                "flex items-center rounded-lg overflow-hidden",
                "bg-border"
              )}
            >
              <input
                type='text'
                readOnly
                value={isUploading ? "Preparing link..." : shareableLink}
                className={cn(
                  "flex-1 px-3 py-2.5 text-sm border-none outline-none w-full",
                  "bg-border text-text "
                )}
                onClick={(e) => {
                  if (!isUploading) {
                    e.currentTarget.select();
                  }
                }}
              />

              {!isUploading && (
                <CopyButton
                  textToCopy={shareableLink}
                  onCopy={() => toast.success("Link copied to clipboard!")}
                />
              )}
            </div>
          </div>
        </div>

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
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {!isUploading && (
          <div className='mt-auto'>
            <Button
              className={cn(
                "rounded-full px-4 py-2 transition-colors duration-200 flex items-center gap-2",
                "hover:bg-hover border hover:text-foreground"
              )}
              onClick={handleCopyLink}
            >
              <Clipboard className='h-4 w-4 flex-shrink-0' />
              <span>Copy Link</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSeverImageModal;
