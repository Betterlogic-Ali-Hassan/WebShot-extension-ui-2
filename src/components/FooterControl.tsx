"use client";

import { useState } from "react";
import {
  Undo2,
  Redo2,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  Upload,
  Check,
  Clipboard,
  Loader2,
  X,
  FileImage,
  ImageIcon,
  FileText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import Tooltip from "./ui/toolip";
import { useImageEditor } from "@/context/ImageContext";

export function FooterControls() {
  const { toolbarPosition } = useImageEditor();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Action bar handlers
  const handleDeleteClick = () => {
    setIsDeleting(true);
    setTimeout(() => setIsDeleting(false), 500);
    // deleteSelectedItems()
  };

  // Export panel handlers
  const handleCopyToClipboard = () => {
    toast("Copied to clipboard!");
  };

  const handleSaveAs = (format: string) => {
    const timestamp = new Date().getTime();
    const filename = `screenshot-${timestamp}.${format.toLowerCase()}`;
    toast(`Saving as ${filename}`);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploading(false);
    setUploadSuccess(true);
    setShareableLink("https://yourserver.com/view/abc123");
    toast("Uploaded successfully!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast("Link copied to clipboard!");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const isToolbarBottom = toolbarPosition === "bottom";

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0  left-0 right-0 z-20",
          isToolbarBottom && "top-0"
        )}
      >
        {/* Collapse toggle button */}
        <div className={cn("flex justify-center", isToolbarBottom && "hidden")}>
          <Button
            onClick={toggleCollapse}
            className='rounded-t-lg rounded-b-none border-t border-l border-r mb-[-1px] transition-colors bg-card border-border hover:bg-hover'
          >
            {isCollapsed ? (
              <ChevronUp className='h-4 w-4 flex-shrink-0' />
            ) : (
              <ChevronDown className='h-4 w-4 flex-shrink-0' />
            )}
            <span className='sr-only'>
              {isCollapsed ? "Expand" : "Collapse"} controls
            </span>
          </Button>
        </div>

        {/* Main controls container */}
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out border-t shadow-lg",
            "bg-card",
            isCollapsed
              ? "max-h-0 overflow-hidden opacity-0"
              : "max-h-24 opacity-100 py-3"
          )}
        >
          <div className='max-w-screen-lg mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-6'>
            {/* Edit actions group */}
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-full transition-all duration-300",
                "bg-border"
              )}
            >
              <Tooltip id='undo' content='Undo'>
                <Button
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground"
                  )}
                >
                  <Undo2 className='h-4 w-4 flex-shrink-0' />
                  <span className='sr-only'>Undo</span>
                </Button>
              </Tooltip>

              <Tooltip id='redo' content='Redo'>
                <Button
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground"
                  )}
                >
                  <Redo2 className='h-4 w-4 flex-shrink-0' />
                  <span className='sr-only'>Redo</span>
                </Button>
              </Tooltip>

              <Tooltip id='reset' content='Reset'>
                <Button
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground"
                  )}
                >
                  <RotateCcw className='h-4 w-4 flex-shrink-0' />
                  <span className='sr-only'>Reset</span>
                </Button>
              </Tooltip>

              <Tooltip id='delete-btn' content='Delete Selected'>
                <Button
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground",
                    isDeleting && "animate-delete-shake"
                  )}
                  onClick={handleDeleteClick}
                >
                  <Trash2
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      isDeleting && "text-red-500"
                    )}
                  />
                  <span className='sr-only'>Delete</span>
                </Button>
              </Tooltip>
            </div>

            {/* Export actions group */}
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-full transition-all duration-300",
                "bg-border"
              )}
            >
              <Tooltip id='Copy to Clipboard' content='Copy to Clipboard'>
                <Button
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground"
                  )}
                  onClick={handleCopyToClipboard}
                >
                  <Copy className='h-4 w-4 flex-shrink-0' />
                  <span className='sr-only'>Copy to Clipboard</span>
                </Button>
              </Tooltip>

              <DropdownMenu>
                <Tooltip id='Save As' content='Save As'>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className={cn(
                        "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                        "hover:bg-btn-hover hover:text-foreground"
                      )}
                    >
                      <Download className='h-4 w-4 flex-shrink-0' />
                      <span className='sr-only'>Save As</span>
                    </Button>
                  </DropdownMenuTrigger>
                </Tooltip>
                <DropdownMenuContent
                  align='center'
                  className={cn(
                    "min-w-[8rem] rounded-xl p-1.5",
                    "bg-card text-foreground border-border"
                  )}
                >
                  <DropdownMenuItem
                    className={cn(
                      "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                      "hover:bg-hover focus:bg-hover active:bg-btn-hover"
                    )}
                    onClick={() => handleSaveAs("PNG")}
                  >
                    <FileImage className='h-[18px] w-[18px] flex-shrink-0' />
                    <span>PNG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                      "hover:bg-hover focus:bg-hover active:bg-btn-hover"
                    )}
                    onClick={() => handleSaveAs("JPG")}
                  >
                    <ImageIcon className='h-[18px] w-[18px] flex-shrink-0' />
                    <span>JPG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "rounded-lg cursor-pointer flex items-center gap-2.5 px-3 py-2 transition-all duration-150",
                      "hover:bg-hover focus:bg-hover active:bg-btn-hover"
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
                  className={cn(
                    "rounded-full h-9 w-9 transition-colors duration-200 justify-center",
                    "hover:bg-btn-hover hover:text-foreground"
                  )}
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
          </div>
        </div>
        {/* Collapse toggle button */}
        <div
          className={cn("flex justify-center", !isToolbarBottom && "hidden")}
        >
          <Button
            onClick={toggleCollapse}
            className={cn(
              "rounded-b-lg rounded-t-none border-b border-l border-r mb-[-1px] transition-colors",
              "bg-card border-border hover:bg-hover"
            )}
          >
            {isCollapsed ? (
              <ChevronDown className='h-4 w-4 flex-shrink-0' />
            ) : (
              <ChevronUp className='h-4 w-4 flex-shrink-0' />
            )}
            <span className='sr-only'>
              {isCollapsed ? "Expand" : "Collapse"} controls
            </span>
          </Button>
        </div>
      </div>

      {/* Upload modal */}
      {(isUploading || uploadSuccess) && (
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
                  "hover:bg-hover text-[#999] hover:text-white"
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
                    "bg-searchbar"
                  )}
                >
                  <input
                    type='text'
                    readOnly
                    value={isUploading ? "Preparing link..." : shareableLink}
                    className={cn(
                      "flex-1 px-3 py-2.5 text-sm border-none outline-none w-full",
                      "bg-searchbar text-white"
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
                      onCopy={() => toast("Link copied to clipboard!")}
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
                      className='h-full bg-blue-500 rounded-full animate-progress'
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
                    "hover:bg-btn-hover hover:text-foreground"
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
      )}
    </>
  );
}

// Copy button component with animation
function CopyButton({
  textToCopy,
  onCopy,
}: {
  textToCopy: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onCopy();

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "px-3 py-1 mr-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1",
        copied
          ? "bg-green-500/20 text-green-500"
          : "bg-btn-hover hover:bg-hover text-foreground"
      )}
    >
      {copied ? (
        <>
          <Check className='h-3.5 w-3.5' />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className='h-3.5 w-3.5' />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
