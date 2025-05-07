"use client";

import { useImageEditor } from "@/context/ImageContext";
import { cn } from "@/lib/utils";

// Core components
import { Logo } from "./Logo";
import { EditorToolbar } from "./EditorToolbar";
import { CaptureCard } from "./CaptureCard";
import { ImageViewer } from "./tools/ImageViewer";
import { FooterControls } from "./FooterControl";
import { CropNotification } from "./CropNotification";

// Header controls

import { UserAvatarDropdown } from "./tools/UserAvatarDropdown";
import { SettingsButton } from "./SettingButton";

// Tool popups
import { ToolPopup } from "./tools/popups/ToolPopup";
import { ShapeToolPopup } from "./tools/popups/ShapToolPopup";
import { ArrowToolPopup } from "./tools/popups/ArrowToolPopup";
import { PencilToolPopup } from "./tools/popups/PencilToolPopup";
import { TextToolPopup } from "./tools/popups/TextToolPopup";
import { BlurToolPopup } from "./tools/popups/BlurToolPopup";
import { BorderToolPopup } from "./tools/popups/BorderToolPopup";
import { StickersToolPopup } from "./tools/popups/StickerToolPopup";
import { NumberToolPopup } from "./tools/popups/NumberToolPopup";
import { WatermarkToolPopup } from "./tools/popups/WatermarkToolPopup";
import { TextArrowToolPopup } from "./tools/popups/TextArrowPopup";
import { PremiumFeaturePopup } from "./tools/popups/PremiumFeaturePopup";
import ExportActionGroup from "./ExportActionGroup";

export function ScreenshotEditor() {
  const {
    // Editor state
    isEditing,
    isCropActive,
    activeTool,
    showPremiumPopup,
    toolbarPosition,
    // Refs
    fileInputRef,
    toolbarRef,
    // Handlers
    handleFileUpload,
    handleCapture,
    handleUpload,
    uploadedImage,
    isHeightExpanded,
  } = useImageEditor();

  /**
   * Renders the appropriate tool popup based on the active tool
   */
  const renderToolPopup = () => {
    if (!activeTool || activeTool === "crop") return null;

    const toolPopups = {
      square: <ShapeToolPopup />,
      arrow: <ArrowToolPopup />,
      pencil: <PencilToolPopup />,
      text: <TextToolPopup />,
      blur: <BlurToolPopup />,
      border: <BorderToolPopup />,
      stickers: <StickersToolPopup />,
      number: <NumberToolPopup />,
      watermark: <WatermarkToolPopup />,
      textarrow: <TextArrowToolPopup />,
    };

    return toolPopups[activeTool as keyof typeof toolPopups] || <ToolPopup />;
  };

  return (
    <div
      className={cn(
        "w-full max-w-6xl transition-colors duration-300 relative  ",
        "rounded-3xl  shadow-2xl bg-background text-text h-screen",
        uploadedImage && "sm:mt-[140px] mt-0 ",
        uploadedImage &&
          toolbarPosition === "bottom" &&
          "sm:mt-[100px]  h-[82vh] ",
        !uploadedImage && toolbarPosition === "bottom" && "!mt-[40px]  ",
        !uploadedImage && "mt-[100px] h-[82vh] ",
        !isHeightExpanded &&
          toolbarPosition !== "bottom" &&
          uploadedImage &&
          "sm:mt-[335px]",
        !isHeightExpanded && toolbarPosition === "bottom" && "sm:mt-0",
        isHeightExpanded && " h-[70vh]"
      )}
    >
      {/* Hidden file input for image uploads */}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleFileUpload}
      />

      {/* Editor toolbar with controls */}
      <EditorToolbar
        settingsButton={
          <>
            {isEditing && <ExportActionGroup />}
            <UserAvatarDropdown
              userName='Alex Johnson'
              userEmail='alex@example.com'
              subscriptionPlan='Pro'
              renewalDate='Sep 20, 2025'
            />
            <SettingsButton />
          </>
        }
        logo={<Logo />}
      />

      {/* Main content area */}
      {!isEditing ? (
        // Initial state - Upload or capture screen
        <div className='flex items-center justify-center h-full p-6'>
          <CaptureCard onCapture={handleCapture} onUpload={handleUpload} />
        </div>
      ) : (
        // Editing state - Image editor with tools
        <div className='relative h-full'>
          {/* Tool popup container */}
          <div className='z-40 relative' ref={toolbarRef}>
            {renderToolPopup()}
          </div>

          {/* Image viewer */}
          <div
            className={cn(
              "flex items-center justify-center ",
              !uploadedImage && "h-full"
            )}
          >
            <ImageViewer
              disableWheelZoom={false}
              showZoomControls={true}
              fitToContainer={true}
            />
          </div>

          {/* Conditional UI elements */}
          {isCropActive && <CropNotification />}
          {toolbarPosition !== "bottom" && <FooterControls />}
        </div>
      )}

      {/* Premium feature popup */}
      {showPremiumPopup && <PremiumFeaturePopup />}
    </div>
  );
}
