import { useScreenShot } from "@/context/ScreenShotContext";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const UploadBtn = ({ className }: { className?: string }) => {
  const { handleUpload, fileInputRef } = useScreenShot();
  return (
    <>
      <button
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:bg-info-hover bg-info text-text-primary ",
          className
        )}
      >
        <Upload size={16} />
        <span>Upload</span>
      </button>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleUpload}
        accept='image/*'
        multiple
        className='hidden'
      />
    </>
  );
};

export default UploadBtn;
