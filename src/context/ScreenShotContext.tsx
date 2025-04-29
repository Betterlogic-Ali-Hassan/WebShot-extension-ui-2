"use client";

import { initialFolders } from "@/constant/Folders";
import { initialScreenshots } from "@/constant/ScreenShots";
import { calendarTypes } from "@/types/Calendar";
import { folder } from "@/types/Folders";
import { screenShot } from "@/types/ScreenShot";
import type React from "react";
import { createContext, RefObject, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";

// Define the context type
type ScreenShotContextType = {
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: (select: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (view: "grid" | "list") => void;
  tagSearchQuery: string;
  setTagSearchQuery: (value: string) => void;
  currentFolder: string;
  setCurrentFolder: (value: string) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  folders: folder[];
  setFolders: (folder: folder[]) => void;
  searchQuery: string;
  setSearchQuery: (search: string) => void;
  tagDropdownRef: RefObject<HTMLInputElement | null>;
  isTagDropdownOpen: boolean;
  setIsTagDropdownOpen: (tag: boolean) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  screenshots: screenShot[];
  setScreenshots: (screenShot: screenShot[]) => void;
  dateDropdownRef: RefObject<HTMLInputElement | null>;
  isDateDropdownOpen: boolean;
  setIsDateDropdownOpen: (date: boolean) => void;
  dateRange: { start: string; end: string };
  setDateRange: (date: { start: string; end: string }) => void;
  calendarView: calendarTypes;
  setCalendarView: React.Dispatch<React.SetStateAction<calendarTypes>>;
  handleSelectDate: (date: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreateFolderOpen: boolean;
  setIsCreateFolderOpen: (folder: boolean) => void;
  subfolders: folder[];
};

// Create the context with a default undefined value
const ScreenShotContext = createContext<ScreenShotContextType | undefined>(
  undefined
);

// Provider component
export const ScreenShotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [folders, setFolders] = useState(initialFolders);
  const [currentFolder, setCurrentFolder] = useState("root");
  const [screenshots, setScreenshots] = useState(initialScreenshots);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tagDropdownRef = useRef<HTMLInputElement | null>(null);
  const dateDropdownRef = useRef<HTMLInputElement | null>(null);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  //   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  //   const [previewImage, setPreviewImage] = useState(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  //   const [newFolderName, setNewFolderName] = useState("");
  //   const [editingScreenshot, setEditingScreenshot] = useState(null);
  //   const [editingFolder, setEditingFolder] = useState(null);
  //   const [movingScreenshot, setMovingScreenshot] = useState(null);
  //   const [isMoveFolderOpen, setIsMoveFolderOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [calendarView, setCalendarView] = useState<calendarTypes>({
    leftMonth: new Date().getMonth(),
    leftYear: new Date().getFullYear(),
    rightMonth: (new Date().getMonth() + 1) % 12,
    rightYear:
      new Date().getMonth() === 11
        ? new Date().getFullYear() + 1
        : new Date().getFullYear(),
  });
  //   const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  //   const [tagManagementTarget, setTagManagementTarget] = useState(null);
  //   const [newTagInput, setNewTagInput] = useState("");
  //   const [allTags, setAllTags] = useState([]);
  //   const [tagSuggestions, setTagSuggestions] = useState([]);

  //   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
  //     useState(false);

  //   const [contextMenu, setContextMenu] = useState({
  //     isOpen: false,
  //     x: 0,
  //     y: 0,
  //     screenshotId: null,
  //   });
  //   const [renameModalOpen, setRenameModalOpen] = useState(false);
  //   const [renameInput, setRenameInput] = useState("");
  //   const [renameError, setRenameError] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  //   const [isEmptyBinConfirmationOpen, setIsEmptyBinConfirmationOpen] =
  //     useState(false);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);

      const newScreenshot = {
        id: `screenshot-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        url: url,
        folder: currentFolder === "root" ? "designs" : currentFolder,
        date: new Date().toISOString().split("T")[0],
        tags: [] as string[],
        trash: false,
      };

      setScreenshots([newScreenshot, ...screenshots]);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.success("Upload complete");
  };

  const handleSelectDate = (date: string) => {
    if (!dateRange.start) {
      setDateRange({ start: date, end: "" });
    } else if (dateRange.start && !dateRange.end) {
      if (new Date(date) > new Date(dateRange.start)) {
        setDateRange({ start: dateRange.start, end: date });
      } else {
        setDateRange({ start: date, end: dateRange.start });
      }
    } else {
      setDateRange({ start: date, end: "" });
    }
  };
  const subfolders = folders.filter(
    (folder) => folder.parent === currentFolder && folder.id !== "trash"
  );

  const contextValue: ScreenShotContextType = {
    subfolders,
    isCreateFolderOpen,
    setIsCreateFolderOpen,
    activeTab,
    setActiveTab,
    handleSelectDate,
    calendarView,
    setCalendarView,
    dateRange,
    setDateRange,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
    dateDropdownRef,
    screenshots,
    setScreenshots,
    tagSearchQuery,
    setTagSearchQuery,
    selectedTags,
    setSelectedTags,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    tagDropdownRef,
    searchQuery,
    setSearchQuery,
    folders,
    setFolders,
    currentFolder,
    setCurrentFolder,
    fileInputRef,
    handleUpload,
    viewMode,
    setViewMode,
    isMultiSelectMode,
    setIsMultiSelectMode,
  };

  return (
    <ScreenShotContext.Provider value={contextValue}>
      {children}
    </ScreenShotContext.Provider>
  );
};

// Custom hook to use the context
export const useScreenShot = () => {
  const context = useContext(ScreenShotContext);
  if (context === undefined) {
    throw new Error("useScreenShot must be used within an ScreenShotProvider");
  }
  return context;
};
