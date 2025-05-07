"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  RefObject,
  Ref,
} from "react";
import { toast } from "react-toastify";

// Define the context type
type ImageEditorContextType = {
  activeTool: string | null;
  isEditing: boolean;
  popupPosition: { top: number; left: number; width: number };
  isCropActive: boolean;
  setIsCropActive: (cropActive: boolean) => void;
  isHeightExpanded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsHeightExpanded: (isHeight: any) => void;
  uploadedImage: string | null | undefined;
  selectedShape: "square" | "rounded" | "circle" | "star";
  selectedArrowStyle:
    | "arrow-line"
    | "arrow-curve"
    | "double-arrow"
    | "line"
    | "curve-line"
    | "dotted-line";
  selectedPencilTool: "pencil" | "brush" | "highlighter";
  selectedTextArrowType: "text-arrow" | "page-text";
  toolbarPosition: "top" | "bottom";
  toolVisibility: Record<string, boolean>;
  showPremiumPopup: boolean;
  premiumFeatureName: string;
  premiumPopupsEnabled: boolean;
  toolbarRef: RefObject<HTMLDivElement | null>;
  fileInputRef: Ref<HTMLInputElement> | undefined;

  // Methods
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleToolChange: (
    tool: string,
    buttonRect: DOMRect | null,
    isPremium?: boolean
  ) => void;
  handlePremiumPopupsToggle: (enabled: boolean) => void;
  handleExitEditMode: () => void;
  handleClosePopup: () => void;
  handleCapture: () => void;
  handleUpload: () => void;
  handleToolVisibilityChange: (toolId: string, isVisible: boolean) => void;
  handleToggleAll: (visible: boolean) => void;
  handleRestoreDefaults: () => void;
  handleClosePremiumPopup: () => void;
  handleProfileClick: () => void;
  handleManageUploadsClick: () => void;
  handleHelpClick: () => void;
  handleLogoutClick: () => void;
  handleManagePlanClick: () => void;
  setUploadedImage: (img: string | null | undefined) => void;
  setSelectedShape: React.Dispatch<
    React.SetStateAction<"square" | "rounded" | "circle" | "star">
  >;
  setSelectedArrowStyle: React.Dispatch<
    React.SetStateAction<
      | "arrow-line"
      | "arrow-curve"
      | "double-arrow"
      | "line"
      | "curve-line"
      | "dotted-line"
    >
  >;
  setSelectedPencilTool: React.Dispatch<
    React.SetStateAction<"pencil" | "brush" | "highlighter">
  >;
  setSelectedTextArrowType: React.Dispatch<
    React.SetStateAction<"text-arrow" | "page-text">
  >;
  setToolbarPosition: React.Dispatch<React.SetStateAction<"top" | "bottom">>;
};

// Create the context with a default undefined value
const ImageEditorContext = createContext<ImageEditorContextType | undefined>(
  undefined
);

// Provider component
export const ImageEditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [isCropActive, setIsCropActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null | undefined>(
    null
  );
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
  const [toolbarPosition, setToolbarPosition] = useState<"top" | "bottom">(
    "top"
  );

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
  const [premiumPopupsEnabled, setPremiumPopupsEnabled] = useState(false);

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

  const handleExitEditMode = () => {
    setIsEditing(false);
    setActiveTool(null);
    setIsCropActive(false);
    setUploadedImage(null);
  };

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
    toast.success("Profile settings clicked");
  };

  const handleManageUploadsClick = () => {
    toast.success("Manage uploads clicked");
  };

  const handleHelpClick = () => {
    toast.success("Help & Support clicked");
  };

  const handleLogoutClick = () => {
    toast.success("Logged out successfully");
  };

  const handleManagePlanClick = () => {
    toast.success("Manage subscription plan clicked");
  };

  // Create the context value object
  const contextValue: ImageEditorContextType = {
    isHeightExpanded,
    setIsHeightExpanded,
    setUploadedImage,
    activeTool,
    isEditing,
    popupPosition,
    isCropActive,
    uploadedImage,
    selectedShape,
    selectedArrowStyle,
    selectedPencilTool,
    selectedTextArrowType,
    toolbarPosition,
    toolVisibility,
    showPremiumPopup,
    premiumFeatureName,
    premiumPopupsEnabled,
    toolbarRef,
    fileInputRef,
    // Methods
    setIsCropActive,
    handleFileUpload,
    handleToolChange,
    handlePremiumPopupsToggle,
    handleExitEditMode,
    handleClosePopup,
    handleCapture,
    handleUpload,
    handleToolVisibilityChange,
    handleToggleAll,
    handleRestoreDefaults,
    handleClosePremiumPopup,
    handleProfileClick,
    handleManageUploadsClick,
    handleHelpClick,
    handleLogoutClick,
    handleManagePlanClick,
    setSelectedShape,
    setSelectedArrowStyle,
    setSelectedPencilTool,
    setSelectedTextArrowType,
    setToolbarPosition,
  };

  return (
    <ImageEditorContext.Provider value={contextValue}>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: "none" }}
        accept='image/*'
        onChange={handleFileUpload}
      />
      {children}
    </ImageEditorContext.Provider>
  );
};

// Custom hook to use the context
export const useImageEditor = () => {
  const context = useContext(ImageEditorContext);
  if (context === undefined) {
    throw new Error(
      "useImageEditor must be used within an ImageEditorProvider"
    );
  }
  return context;
};
