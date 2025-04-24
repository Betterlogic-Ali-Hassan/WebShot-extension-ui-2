"use client";

import { cn } from "@/lib/utils";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { EditorToolbar } from "./EditorToolbar";

import { ScreenshotManagerButton } from "./ScreenshotManagerButton";
import { UserAvatarDropdown } from "./tools/UserAvatarDropdown";
import { SettingsButton } from "./SettingButton";
import { Logo } from "./Logo";
import { CaptureCard } from "./CaptureCard";
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
import { ToolPopup } from "./tools/popups/ToolPopup";
import { ImageViewer } from "./tools/ImageViewer";
import { CropNotification } from "./CropNotification";
import { FooterControls } from "./FooterControl";
import { PremiumFeaturePopup } from "./tools/popups/PremiumFeaturePopup";

export function ScreenshotEditor() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [isCropActive, setIsCropActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add these new state variables after the existing state declarations
  const [selectedShape, setSelectedShape] = useState<
    "square" | "rounded" | "circle" | "star"
  >("square");
  const [selectedArrowStyle, setSelectedArrowStyle] = useState<
    | "arrow-line"
    | "arrow-curve"
    | "double-arrow"
    | "line"
    | "curve-line"
    | "dotted-line"
  >("arrow-line");
  const [selectedPencilTool, setSelectedPencilTool] = useState<
    "pencil" | "brush" | "highlighter"
  >("pencil");
  const [selectedTextArrowType, setSelectedTextArrowType] = useState<
    "text-arrow" | "page-text"
  >("text-arrow");

  // Add a new state variable for toolbar position after the existing state declarations
  const [toolbarPosition, setToolbarPosition] = useState<
    "top" | "left" | "bottom"
  >("top");

  // Tool visibility state
  const [toolVisibility, setToolVisibility] = useState<Record<string, boolean>>(
    {
      zoom: false, // Set zoom to false by default
      crop: true,
      pencil: true,
      square: true,
      arrow: true,
      text: true,
      textarrow: true,
      number: true,
      stickers: true,
      blur: true,
      border: true,
      watermark: true,
      revision: true,
    }
  );

  // Add state for premium feature popup
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [premiumFeatureName, setPremiumFeatureName] = useState("");

  // Add a new state variable for premium popup toggle after the existing state declarations
  const [premiumPopupsEnabled, setPremiumPopupsEnabled] = useState(true);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, etc.)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const result = e.target?.result as string;
                setUploadedImage(result);
                setIsEditing(true);
              };
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  // Handle drag and drop
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();

      if (e.dataTransfer?.files) {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            setUploadedImage(result);
            setIsEditing(true);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  // Update the handleToolChange function to adjust popup positioning based on toolbar position
  const handleToolChange = (
    tool: string,
    buttonRect: DOMRect | null,
    isPremium?: boolean
  ) => {
    // Handle premium features
    if (isPremium && premiumPopupsEnabled) {
      // Map tool IDs to readable feature names
      const featureNames: Record<string, string> = {
        textarrow: "Text Arrow",
        number: "Numbers",
        stickers: "Stickers",
        blur: "Blur",
        border: "Border",
        watermark: "Watermark",
      };

      // Show premium popup
      setPremiumFeatureName(featureNames[tool] || tool);
      setShowPremiumPopup(true);
      return;
    }

    // Special handling for crop tool
    if (tool === "crop") {
      if (activeTool === "crop") {
        // If crop is already active, deactivate it
        setActiveTool(null);
        setIsCropActive(false);
      } else {
        // Activate crop but don't show popup
        setActiveTool("crop");
        setIsCropActive(true);
        // Close any other open popup
        setPopupPosition({ top: 0, left: 0, width: 0 });
      }
      return;
    }

    // Normal handling for other tools
    if (activeTool === tool) {
      setActiveTool(null);
      return;
    }

    setActiveTool(tool);
    setIsCropActive(false);

    if (buttonRect) {
      // Calculate position based on toolbar position
      if (toolbarPosition === "top") {
        // Top toolbar - popup appears below
        const toolbarHeight = 60;
        setPopupPosition({
          top: toolbarHeight + 12,
          left: buttonRect.left,
          width: buttonRect.width,
        });
      } else if (toolbarPosition === "left") {
        // Left toolbar - popup appears to the right
        setPopupPosition({
          top: buttonRect.top,
          left: 72, // Width of left toolbar + margin
          width: buttonRect.width,
        });
      } else {
        // Bottom toolbar - popup appears above
        const viewportHeight = window.innerHeight;
        setPopupPosition({
          top: viewportHeight - 140, // Position above bottom toolbar
          left: buttonRect.left,
          width: buttonRect.width,
        });
      }
    }

    if (!isEditing) setIsEditing(true);
  };

  // Add a function to toggle premium popups
  const handlePremiumPopupsToggle = (enabled: boolean) => {
    setPremiumPopupsEnabled(enabled);
  };

  //     setIsCropActive(false);
  //     setUploadedImage(null);
  //   };

  const handleClosePopup = () => {
    setActiveTool(null);
  };

  const handleCapture = () => {
    // In a real app, this would capture from URL
    // For now, just trigger the file upload dialog
    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle tool visibility change
  const handleToolVisibilityChange = (toolId: string, isVisible: boolean) => {
    setToolVisibility((prev) => ({
      ...prev,
      [toolId]: isVisible,
    }));
  };

  // Toggle all tools visibility
  const handleToggleAll = (visible: boolean) => {
    const updatedVisibility: Record<string, boolean> = {};
    Object.keys(toolVisibility).forEach((toolId) => {
      updatedVisibility[toolId] = visible;
    });
    setToolVisibility(updatedVisibility);
  };

  // Restore default tool visibility
  const handleRestoreDefaults = () => {
    setToolVisibility({
      zoom: false, // Keep zoom disabled by default
      crop: true,
      pencil: true,
      square: true,
      arrow: true,
      text: true,
      textarrow: true,
      number: true,
      stickers: true,
      blur: true,
      border: true,
      watermark: true,
      revision: true,
    });
  };

  // Add a function to close the premium popup
  const handleClosePremiumPopup = () => {
    setShowPremiumPopup(false);
  };

  // Handle user avatar dropdown actions
  const handleProfileClick = () => {
    toast("Profile settings clicked");
  };

  const handleManageUploadsClick = () => {
    toast("Manage uploads clicked");
  };

  const handleHelpClick = () => {
    toast("Help & Support clicked");
  };

  const handleLogoutClick = () => {
    toast("Logged out successfully");
  };

  const handleManagePlanClick = () => {
    toast("Manage subscription plan clicked");
  };

  // Calculate content padding based on toolbar position
  const getContentPadding = () => {
    if (!isEditing) return "";

    if (toolbarPosition === "top") return "pt-16 pb-24";
    if (toolbarPosition === "left") return "pl-16 pb-24";
    return "pb-32"; // Extra padding for bottom toolbar + footer controls
  };

  // Pass toolbarPosition to SettingsButton and EditorToolbar
  return (
    <div
      className={cn(
        "w-full max-w-6xl transition-colors duration-300 relative min-h-[80vh] rounded-3xl overflow-hidden shadow-2xl",
        isDarkMode ? "bg-[#1C1C1E] text-[#F2F2F7]" : "bg-white text-[#111111]"
      )}
    >
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleFileUpload}
      />

      <EditorToolbar
        activeTool={activeTool}
        onToolChange={handleToolChange}
        isDarkMode={isDarkMode}
        toolVisibility={toolVisibility}
        toolbarPosition={toolbarPosition}
        settingsButton={
          <>
            <ScreenshotManagerButton isDarkMode={isDarkMode} />
            <UserAvatarDropdown
              isDarkMode={isDarkMode}
              toolbarPosition={toolbarPosition}
              userName='Alex Johnson'
              userEmail='alex@example.com'
              subscriptionPlan='Pro'
              renewalDate='Sep 20, 2025'
              onProfileClick={handleProfileClick}
              onManageUploadsClick={handleManageUploadsClick}
              onHelpClick={handleHelpClick}
              onLogoutClick={handleLogoutClick}
              onManagePlanClick={handleManagePlanClick}
            />
            <SettingsButton
              setIsDarkMode={setIsDarkMode}
              isDarkMode={isDarkMode}
              toolVisibility={toolVisibility}
              toolbarPosition={toolbarPosition}
              onToolbarPositionChange={setToolbarPosition}
              onToolVisibilityChange={handleToolVisibilityChange}
              onToggleAll={handleToggleAll}
              onRestoreDefaults={handleRestoreDefaults}
              premiumPopupsEnabled={premiumPopupsEnabled}
              onPremiumPopupsToggle={handlePremiumPopupsToggle}
            />
          </>
        }
        selectedShape={selectedShape}
        selectedArrowStyle={selectedArrowStyle}
        selectedPencilTool={selectedPencilTool}
        selectedTextArrowType={selectedTextArrowType}
        logo={<Logo isDarkMode={isDarkMode} />}
      />

      {!isEditing ? (
        <div className='flex items-center justify-center h-full p-6'>
          <CaptureCard
            isDarkMode={isDarkMode}
            onCapture={handleCapture}
            onUpload={handleUpload}
          />
        </div>
      ) : (
        <div className={cn("relative h-full", getContentPadding())}>
          <div className='z-40 relative' ref={toolbarRef}>
            {activeTool === "square" ? (
              <ShapeToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
                onShapeSelect={(shape) => setSelectedShape(shape)}
                selectedShape={selectedShape}
              />
            ) : activeTool === "arrow" ? (
              <ArrowToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
                onArrowStyleSelect={(style) => setSelectedArrowStyle(style)}
                selectedArrowStyle={selectedArrowStyle}
              />
            ) : activeTool === "pencil" ? (
              <PencilToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
                onToolSelect={(tool) => setSelectedPencilTool(tool)}
                selectedTool={selectedPencilTool}
              />
            ) : activeTool === "text" ? (
              <TextToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "blur" ? (
              <BlurToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "border" ? (
              <BorderToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "stickers" ? (
              <StickersToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "number" ? (
              <NumberToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "watermark" ? (
              <WatermarkToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
              />
            ) : activeTool === "textarrow" ? (
              <TextArrowToolPopup
                toolbarPosition={toolbarPosition}
                position={popupPosition}
                isDarkMode={isDarkMode}
                onClose={handleClosePopup}
                onTextArrowTypeSelect={(type) => setSelectedTextArrowType(type)}
                selectedTextArrowType={selectedTextArrowType}
              />
            ) : (
              activeTool &&
              activeTool !== "crop" && (
                <ToolPopup
                  tool={activeTool}
                  position={popupPosition}
                  isDarkMode={isDarkMode}
                  onClose={handleClosePopup}
                />
              )
            )}
          </div>

          <div className='flex items-center justify-center h-[calc(100vh-200px)] overflow-hidden'>
            <ImageViewer
              imageUrl={uploadedImage}
              isDarkMode={isDarkMode}
              disableWheelZoom={false}
              showZoomControls={true}
              fitToContainer={true}
            />
          </div>

          {isCropActive && <CropNotification isDarkMode={isDarkMode} />}
          <FooterControls
            isDarkMode={isDarkMode}
            toolbarPosition={toolbarPosition}
          />
          {/* <NotificationBar
            onExitEditMode={handleExitEditMode}
            isDarkMode={isDarkMode}
          /> */}
        </div>
      )}
      {showPremiumPopup && (
        <PremiumFeaturePopup
          position={popupPosition}
          isDarkMode={isDarkMode}
          onClose={handleClosePremiumPopup}
          featureName={premiumFeatureName}
        />
      )}
    </div>
  );
}
