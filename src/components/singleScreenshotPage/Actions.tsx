"use client";

import type React from "react";
import {
  Edit,
  Copy,
  FileText,
  Printer,
  PlusCircle,
  Heart,
  Eye,
  Tag,
  Calendar,
  Folder,
  ExternalLink,
} from "lucide-react";

import { screenShot } from "@/types/ScreenShot";
import { cn } from "@/lib/utils";
import { Toast } from "../ui/toast";

interface ActionsProps {
  screenshot: screenShot | null;
  activeTab: string;
  handleLike: () => void;
  liked: boolean;
  likeCount: number;
}

export const ScreenshotActions: React.FC<ActionsProps> = ({
  screenshot,
  activeTab,
  handleLike,
  liked,
  likeCount,
}) => {
  const handleCopyToClipboard = async () => {
    if (!screenshot) return;

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = screenshot.url;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);

      // Convert canvas to blob and copy to clipboard
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob,
              }),
            ]);

            Toast.success("Screenshot copied to clipboard successfully");
          } catch (err) {
            console.error("Failed to copy image: ", err);
            Toast.error("Could not copy image to clipboard");
          }
        }
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      Toast.error("Could not copy image to clipboard");
    }
  };

  const handleDownloadPDF = () => {
    if (!screenshot) return;

    Toast.success("Your PDF is being prepared for download");

    // In a real app, this would generate a PDF
    // For now, we'll simulate with a timeout
    setTimeout(() => {
      Toast.success(`"${screenshot.name}.pdf" has been downloaded`);
    }, 1500);
  };

  const handlePrint = () => {
    if (!screenshot) return;

    // Create a new window with just the image for printing
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print: ${screenshot.name}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              img {
                max-width: 100%;
                max-height: 100vh;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${screenshot.url}" alt="${screenshot.name}" />
            <script>
              // Auto print when loaded
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 500);
                }, 300);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleAddToAccount = () => {
    // In a real app, this would check if user is logged in
    const isLoggedIn = false;

    if (isLoggedIn) {
      Toast.success("Screenshot has been added to your collection");
    } else {
      Toast.error("Please log in to add this screenshot to your account");
    }
  };

  const handleAnnotate = () => {
    if (!screenshot) return;

    // In a real app, this would redirect to the editor
    Toast.success("Preparing screenshot for annotation");

    // Simulate redirect with a timeout
    setTimeout(() => {
      Toast.success("You can now annotate this screenshot");
    }, 1000);
  };

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div
        className={cn(
          "p-6 rounded-2xl transition-all duration-300 bg-background border",

          activeTab === "details" || window.innerWidth >= 768
            ? "block"
            : "hidden"
        )}
      >
        <h3 className='text-lg font-bold mb-5 flex items-center'>
          <ExternalLink size={18} className='mr-2 text-info' />
          Screenshot Details
        </h3>

        <div className='mb-5'>
          <div className='text-sm mb-2 flex items-center'>
            <Folder size={14} className='mr-1 text-foreground' />
            <span className='text-foreground'>Folder</span>
          </div>
          <div className='flex items-center p-3 rounded-lg bg-card'>
            <Folder size={16} className='mr-2 text-info' />
            <span className='font-medium'>
              {screenshot?.folder || "Uncategorized"}
            </span>
          </div>
        </div>

        <div className='mb-5'>
          <div className='text-sm mb-2 flex items-center'>
            <Calendar size={14} className='mr-1 text-foreground' />
            <span className='text-foreground'>Date</span>
          </div>
          <div className='flex items-center p-3 rounded-lg bg-card'>
            <Calendar size={16} className='mr-2 text-info' />
            <span className='font-medium'>{screenshot?.uploadDate}</span>
          </div>
        </div>

        <div>
          <div className='text-sm mb-2 flex items-center'>
            <Tag size={14} className='mr-1 text-foreground' />
            <span className='text-foreground'>Tags</span>
          </div>
          <div className='p-3 rounded-lg bg-card'>
            <div className='flex flex-wrap gap-2'>
              {screenshot?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className='px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer bg-hover hover:bg-tool-selected-color'
                >
                  #{tag}
                </span>
              ))}
              {(!screenshot?.tags || screenshot.tags.length === 0) && (
                <span className='text-foreground'>No tags</span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div className='md:hidden mt-5 flex justify-between'>
          <div className='flex items-center'>
            <Eye size={16} className='text-foreground' />
            <span className='ml-1 text-sm text-foreground'>
              {screenshot?.views || 0} views
            </span>
          </div>
          <button onClick={handleLike} className='flex items-center group'>
            <Heart
              size={16}
              className={cn(
                "transition-all duration-300 group-hover:text-error",
                liked && "fill-error text-error"
              )}
            />
            <span
              className={cn(
                "ml-1 text-sm transition-all duration-300 group-hover:text-error",
                liked && "text-error"
              )}
            >
              {likeCount} likes
            </span>
          </button>
        </div>
      </div>

      {/* Action Buttons Section with improved styling */}
      <div
        className={cn(
          "md:col-span-2 p-6 rounded-2xl transition-all duration-300 border bg-background",
          activeTab === "actions" || window.innerWidth >= 768
            ? "block"
            : "hidden"
        )}
      >
        <h3 className='text-lg font-bold mb-5 flex items-center'>
          <Edit size={18} className='mr-2 text-info' />
          Available Actions
        </h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {/* Copy to Clipboard with improved styling */}
          <button
            onClick={handleCopyToClipboard}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-md bg-card  hover:bg-tool-selected-color/40"
            )}
          >
            <div className='w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-hover'>
              <Copy size={20} className='text-info' />
            </div>
            <span className='font-medium'>Copy</span>
            <span className='text-xs mt-1 text-foreground'>To clipboard</span>
          </button>

          {/* Download as PDF with improved styling */}
          <button
            onClick={handleDownloadPDF}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-md bg-card hover:bg-tool-selected-color/40 "
            )}
          >
            <div className='w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-hover'>
              <FileText size={20} className='text-info' />
            </div>
            <span className='font-medium'>PDF</span>
            <span className='text-xs mt-1 text-foreground'>
              Save as document
            </span>
          </button>

          {/* Print with improved styling */}
          <button
            onClick={handlePrint}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-md bg-card hover:bg-tool-selected-color/40 "
            )}
          >
            <div className='w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-hover'>
              <Printer size={20} className='text-info' />
            </div>
            <span className='font-medium'>Print</span>
            <span className='text-xs mt-1 text-foreground'>Physical copy</span>
          </button>

          {/* Add to Your Account with improved styling */}
          <button
            onClick={handleAddToAccount}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-md bg-card hover:bg-tool-selected-color/40 "
            )}
          >
            <div className='w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-hover'>
              <PlusCircle size={20} className='text-info' />
            </div>
            <span className='font-medium'>Save</span>
            <span className='text-xs mt-1 text-foreground'>
              To your account
            </span>
          </button>

          {/* Annotate with improved styling - highlighted as primary action */}
          <button
            onClick={handleAnnotate}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "hover:scale-105 hover:shadow-md col-span-2 sm:col-span-1 text-text-primary bg-info hover:bg-info-hover"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                "bg-background/20"
              )}
            >
              <Edit size={20} className='text-text-primary' />
            </div>
            <span className='font-medium'>Annotate</span>
            <span className='text-xs mt-1 text-text-primary'>
              Edit screenshot
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
