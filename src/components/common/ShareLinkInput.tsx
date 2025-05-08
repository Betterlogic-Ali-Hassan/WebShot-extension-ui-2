import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";
import { Toast } from "../ui/toast";

interface Props {
  isUploading: boolean;
  shareableLink: string;
  className?: string;
}
const ShareLinkInput = ({ isUploading, shareableLink, className }: Props) => {
  return (
    <div className={cn("flex-1 flex flex-col justify-center mb-4", className)}>
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
              onCopy={() => Toast.success("Link copied to clipboard!")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareLinkInput;
