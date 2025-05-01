import { cn } from "@/lib/utils";
import {
  Copy,
  Download,
  FileImage,
  FileText,
  ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";

import Button from "./ui/button";
import Tooltip from "./ui/toolip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "react-toastify";
import { useState } from "react";
import UploadSeverImageModal from "./UploadSeverImageModal";

const ExportActionGroup = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const handleCopyToClipboard = () => {
    toast.success("Copied to clipboard!");
  };
  const handleSaveAs = (format: string) => {
    const timestamp = new Date().getTime();
    const filename = `screenshot-${timestamp}.${format.toLowerCase()}`;
    toast.success(`Saving as ${filename}`);
  };
  const handleUpload = async () => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploading(false);
    setUploadSuccess(true);
    setShareableLink("https://yourserver.com/view/abc123");
    toast.success("Uploaded successfully!");
  };
  return (
    <>
      <div className='flex items-center gap-2 py-2 px-3 rounded-[20px] mr-12 transition-all duration-300 bg-card'>
        <Tooltip id='Copy to Clipboard' content='Copy to Clipboard'>
          <Button
            className='cursor-pointer px-3 py-2 text-sm font-semibold text-text disabled:cursor-not-allowed whitespace-nowrap flex items-center rounded-xl transition-all duration-200 hover:scale-110 min-w-10 h-[40px] hover:bg-hover'
            onClick={handleCopyToClipboard}
          >
            <Copy className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Copy to Clipboard</span>
          </Button>
        </Tooltip>

        <DropdownMenu>
          <Tooltip id='Save As' content='Save As'>
            <DropdownMenuTrigger>
              <Button className='cursor-pointer px-3 py-2 text-sm font-semibold text-text disabled:cursor-not-allowed whitespace-nowrap flex items-center rounded-xl transition-all duration-200 hover:scale-110 min-w-10 h-[40px] hover:bg-hover'>
                <Download className='h-4 w-4 flex-shrink-0' />
                <span className='sr-only'>Save As</span>
              </Button>
            </DropdownMenuTrigger>
          </Tooltip>
          <DropdownMenuContent
            align='center'
            className={cn(
              "min-w-[8rem] rounded-xl p-1.5 my-3",
              "bg-card text-foreground border-border"
            )}
          >
            <DropdownMenuItem
              className={cn(
                "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                "hover:bg-tool-selected-color focus:bg-hover active:bg-btn-hover"
              )}
              onClick={() => handleSaveAs("PNG")}
            >
              <FileImage className='h-[18px] w-[18px] flex-shrink-0' />
              <span>PNG</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                "hover:bg-tool-selected-color focus:bg-hover active:bg-btn-hover"
              )}
              onClick={() => handleSaveAs("JPG")}
            >
              <ImageIcon className='h-[18px] w-[18px] flex-shrink-0' />
              <span>JPG</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                "hover:bg-tool-selected-color focus:bg-hover active:bg-btn-hover"
              )}
              onClick={() => handleSaveAs("PDF")}
            >
              <FileText className='h-[18px] w-[18px] flex-shrink-0' />
              <span>PDF</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip id='Upload to Server' content='Upload to Server'>
          <Button
            className='cursor-pointer px-3 py-2 text-sm font-semibold text-text disabled:cursor-not-allowed whitespace-nowrap flex items-center rounded-xl transition-all duration-200 hover:scale-110 min-w-10 h-[40px] hover:bg-hover'
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Upload className='h-4 w-4 flex-shrink-0' />
            )}
            <span className='sr-only'>Upload to Server</span>
          </Button>
        </Tooltip>
      </div>
      {(isUploading || uploadSuccess) && (
        <UploadSeverImageModal
          shareableLink={shareableLink}
          setIsUploading={setIsUploading}
          setUploadSuccess={setUploadSuccess}
          isUploading={isUploading}
        />
      )}
    </>
  );
};

export default ExportActionGroup;
