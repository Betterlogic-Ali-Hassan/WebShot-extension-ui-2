"use client";
import { Toast } from "@/components/ui/toast";
import { initialFolders } from "@/constant/Folders";
import { initialScreenshots } from "@/constant/ScreenShots";
import { getAllTags } from "@/helper/getAllTags";
import { calendarTypes } from "@/types/Calendar";
import { folder } from "@/types/Folders";
import { screenShot } from "@/types/ScreenShot";
import type React from "react";
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Tag = {
  name: string;
  count: number;
};
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
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, folderId: string) => void;
  handleDeleteFolder: (folderId: string) => void;
  editingFolder: folder | null;
  setEditingFolder: (edit: folder | null) => void;
  handleFolderClick: (id: string) => void;
  handleFolderRename: (id: string, name: string) => void;
  handleSelectAll: () => void;
  filteredScreenshots: screenShot[];
  selectedScreenshots: string[];
  setSelectedScreenshots: (selected: string[]) => void;
  isEmptyBinConfirmationOpen: boolean;
  setIsEmptyBinConfirmationOpen: (bin: boolean) => void;
  editingScreenshot: screenShot | null;
  setEditingScreenshot: (screenshot: screenShot | null) => void;
  handleToggleScreenshotSelection: (id: string) => void;
  handlePreview: (screenshot: screenShot) => void;
  handleShare: (screenshot: screenShot | null) => void;
  handleDelete: (id: string) => void;
  handleRestore: (id: string) => void;
  handlePermanentDelete: (id: string) => void;
  handleTagManagement: (id: string) => void;
  handleOpenRenameModal: (screenshot: screenShot) => void;
  handleRename: (id: string, name: string) => void;
  handleRemoveTag: (id: string, tag: string) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    screenshot: screenShot
  ) => void;
  handleContextMenu: (
    e: React.MouseEvent<HTMLDivElement>,
    screenshot: screenShot
  ) => void;
  setMovingScreenshot: (screenshot: screenShot | null) => void;
  movingScreenshot: screenShot | null;
  setIsMoveFolderOpen: (isOpen: boolean) => void;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (preview: boolean) => void;
  renameModalOpen: boolean;
  setRenameModalOpen: (rename: boolean) => void;
  previewImage: screenShot | null;
  setPreviewImage: (previewImage: screenShot | null) => void;
  handleDownload: (screenshot: screenShot | null) => void;
  newFolderName: string;
  setNewFolderName: (folder: string) => void;
  handleCreateFolder: () => void;
  handleMove: (id: string, targetFolder: string) => void;
  handleBulkMove: (targetFolder: string) => void;
  tagManagementTarget: string | null;
  setTagManagementTarget: (tag: string | null) => void;
  isTagManagementOpen: boolean;
  setIsTagManagementOpen: (isTag: boolean) => void;
  newTagInput: string;
  setNewTagInput: (newTag: string) => void;
  renameInput: string;
  setRenameInput: (rename: string) => void;
  renameError: string;
  setRenameError: (error: string) => void;
  isDeleteConfirmationOpen: boolean;
  setIsDeleteConfirmationOpen: (isDelete: boolean) => void;
  isMoveFolderOpen: boolean;
  tagSuggestions: string[];
  setTagSuggestions: (tag: string[]) => void;
  contextMenu: {
    isOpen: boolean;
    x: number;
    y: number;
    screenshotId: string | null;
  };
  handleTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTag: (tag: string) => void;
  allTags: Tag[];
  handleToggleTag: (tag: string) => void;
  isTagAssignedToAll: (tag: string) => boolean | undefined;
  isTagAssignedToSome: (tag: string) => boolean | undefined;
  handleBulkDelete: () => void;
  handleCloseContextMenu: () => void;
  handleSaveRename: () => void;
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
  const [screenshots, setScreenshots] =
    useState<screenShot[]>(initialScreenshots);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tagDropdownRef = useRef<HTMLInputElement | null>(null);
  const dateDropdownRef = useRef<HTMLInputElement | null>(null);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedScreenshots, setSelectedScreenshots] = useState<string[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<screenShot | null>(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingScreenshot, setEditingScreenshot] = useState<screenShot | null>(
    null
  );
  const [editingFolder, setEditingFolder] = useState<folder | null>(null);
  const [movingScreenshot, setMovingScreenshot] = useState<screenShot | null>(
    null
  );
  const [isMoveFolderOpen, setIsMoveFolderOpen] = useState(false);
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
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  const [tagManagementTarget, setTagManagementTarget] = useState<string | null>(
    null
  );
  const [newTagInput, setNewTagInput] = useState("");
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
    screenshotId: string | null;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    screenshotId: null,
  });
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  const [renameError, setRenameError] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const [isEmptyBinConfirmationOpen, setIsEmptyBinConfirmationOpen] =
    useState(false);
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

    Toast.success("Upload complete");
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
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleMove = (id: string, targetFolder: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        screenshot.id === id
          ? { ...screenshot, folder: targetFolder }
          : screenshot
      )
    );
    setMovingScreenshot(null);
    setIsMoveFolderOpen(false);

    Toast.success("Screenshot moved");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, folderId: string) => {
    e.preventDefault();
    const screenshotId = e.dataTransfer.getData("screenshotId");
    if (screenshotId) {
      handleMove(screenshotId, folderId);
    }
  };
  const handleDeleteFolder = (folderId: string) => {
    // Check if folder has screenshots
    const hasScreenshots = screenshots.some(
      (s) => s.folder === folderId && !s.trash
    );

    if (hasScreenshots) {
      // Move all screenshots to trash
      setScreenshots(
        screenshots.map((screenshot) =>
          screenshot.folder === folderId
            ? { ...screenshot, trash: true }
            : screenshot
        )
      );
    }

    setFolders(folders.filter((folder) => folder.id !== folderId));

    Toast.success("Folder deleted");
  };
  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };
  const handleFolderRename = (id: string, newName: string) => {
    setFolders(
      folders.map((folder) =>
        folder.id === id ? { ...folder, name: newName } : folder
      )
    );
    setEditingFolder(null);

    Toast.success("Folder renamed");
  };
  const filteredScreenshots = screenshots.filter((screenshot) => {
    // If we're in recycle bin tab, only show trashed items
    if (activeTab === "recycle-bin") {
      return screenshot.trash;
    }

    // Otherwise, use the existing folder-based filtering
    if (currentFolder === "root") {
      if (screenshot.trash) return false;
    } else if (currentFolder === "trash") {
      if (!screenshot.trash) return false;
    } else if (screenshot.folder !== currentFolder || screenshot.trash) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !screenshot.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      const hasAllTags = selectedTags.every(
        (tag) => screenshot.tags && screenshot.tags.includes(tag)
      );
      if (!hasAllTags) return false;
    }

    // Filter by date range
    if (
      dateRange.start &&
      new Date(screenshot.date) < new Date(dateRange.start)
    ) {
      return false;
    }
    if (dateRange.end && new Date(screenshot.date) > new Date(dateRange.end)) {
      return false;
    }

    return true;
  });
  const handleSelectAll = () => {
    if (selectedScreenshots.length === filteredScreenshots.length) {
      setSelectedScreenshots([]);
    } else {
      setSelectedScreenshots(filteredScreenshots.map((s) => s.id));
    }
  };

  const handleToggleScreenshotSelection = (id: string) => {
    if (selectedScreenshots.includes(id)) {
      setSelectedScreenshots(
        selectedScreenshots.filter((screenId) => screenId !== id)
      );
    } else {
      setSelectedScreenshots([...selectedScreenshots, id]);
    }
  };
  const handlePreview = (screenshot: screenShot) => {
    setPreviewImage(screenshot);
    setIsPreviewOpen(true);
  };
  const handleShare = (screenshot: screenShot | null) => {
    // Generate a fake shareable link
    const fakeLink = `https://screenshot-app.com/share/${screenshot?.id}`;

    // Copy to clipboard
    navigator.clipboard.writeText(fakeLink).then(() => {
      Toast.success("Link copied!");
    });
  };
  const handleRestore = (id: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        screenshot.id === id ? { ...screenshot, trash: false } : screenshot
      )
    );

    Toast.success("Screenshot restored");
  };
  const handlePermanentDelete = (id: string) => {
    setScreenshots(screenshots.filter((screenshot) => screenshot.id !== id));

    Toast.success("Screenshot permanently deleted");
  };
  const handleDelete = (id: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        screenshot.id === id ? { ...screenshot, trash: true } : screenshot
      )
    );

    Toast.success("Screenshot moved to trash");
  };
  const handleRename = (id: string | null, newName: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        screenshot.id === id ? { ...screenshot, name: newName } : screenshot
      )
    );
    setEditingScreenshot(null);

    Toast.success("Screenshot renamed");
  };
  const handleTagManagement = (target: string) => {
    setTagManagementTarget(target);
    setIsTagManagementOpen(true);
    setNewTagInput("");

    // If we're managing tags for a specific screenshot, filter suggestions based on existing tags
    if (target !== "bulk") {
      const screenshot = screenshots.find((s) => s.id === target);
      if (screenshot) {
        const existingTags = screenshot.tags || [];
        setTagSuggestions(
          allTags
            .filter((tag) => !existingTags.includes(tag.name))
            .map((tag) => tag.name)
        );
      }
    } else {
      // For bulk mode, show all tags
      setTagSuggestions(allTags.map((tag) => tag.name));
    }
  };
  const handleOpenRenameModal = (screenshot: screenShot) => {
    setRenameInput(screenshot.name);
    setRenameError("");
    setRenameModalOpen(true);
    setContextMenu({ isOpen: false, x: 0, y: 0, screenshotId: null });
  };
  const handleRemoveTag = (screenshotId: string, tagToRemove: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        screenshot.id === screenshotId
          ? {
              ...screenshot,
              tags: (screenshot.tags || []).filter(
                (tag) => tag !== tagToRemove
              ),
            }
          : screenshot
      )
    );
  };
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    screenshot: screenShot
  ) => {
    e.dataTransfer.setData("screenshotId", screenshot.id);
  };
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    screenshot: screenShot
  ) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      screenshotId: screenshot.id,
    });
  };
  const handleDownload = (screenshot: screenShot | null) => {
    if (!screenshot || !screenshot.url || !screenshot.name) {
      Toast.error("Download failed: Missing data");
      return;
    }
    const link = document.createElement("a");
    link.href = screenshot?.url;
    link.download = `${screenshot?.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Toast.success("Download started");
  };
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: newFolderName,
      parent: currentFolder,
    };

    setFolders([...folders, newFolder]);
    setNewFolderName("");
    setIsCreateFolderOpen(false);

    Toast.success("Folder created");
  };
  const handleBulkMove = (targetFolder: string) => {
    setScreenshots(
      screenshots.map((screenshot) =>
        selectedScreenshots.includes(screenshot.id)
          ? { ...screenshot, folder: targetFolder }
          : screenshot
      )
    );

    Toast.success("Screenshots moved");

    setIsMoveFolderOpen(false);
    setSelectedScreenshots([]);
  };
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTagInput(value);

    if (value.trim()) {
      // Filter suggestions based on input
      const filtered = allTags
        .map((tag) => tag.name)
        .filter((tag) => tag.toLowerCase().includes(value.toLowerCase()));
      setTagSuggestions(filtered);
    } else {
      // Show all tags when input is empty
      setTagSuggestions(allTags.map((tag) => tag.name));
    }
  };

  const handleAddTag = (tag: string) => {
    if (!tag.trim()) return;

    if (tagManagementTarget === "bulk") {
      // Add tag to all selected screenshots
      setScreenshots(
        screenshots.map((screenshot) =>
          selectedScreenshots.includes(screenshot.id)
            ? {
                ...screenshot,
                tags: [...new Set([...(screenshot.tags || []), tag])],
              }
            : screenshot
        )
      );
    } else {
      // Add tag to single screenshot
      setScreenshots(
        screenshots.map((screenshot) =>
          screenshot.id === tagManagementTarget
            ? {
                ...screenshot,
                tags: [...new Set([...(screenshot.tags || []), tag])],
              }
            : screenshot
        )
      );
    }

    setNewTagInput("");

    // Update suggestions
    const updatedSuggestions = tagSuggestions.filter((t) => t !== tag);
    setTagSuggestions(updatedSuggestions);

    // If this is a new tag, add it to allTags
    if (!allTags.some((t) => t.name === tag)) {
      setAllTags([...allTags, { name: tag, count: 1 }]);
    }
  };

  const handleToggleTag = (tag: string) => {
    if (tagManagementTarget === "bulk") {
      // Toggle tag for all selected screenshots
      setScreenshots(
        screenshots.map((screenshot) => {
          if (!selectedScreenshots.includes(screenshot.id)) return screenshot;

          const hasTag = (screenshot.tags || []).includes(tag);
          if (hasTag) {
            return {
              ...screenshot,
              tags: (screenshot.tags || []).filter((t) => t !== tag),
            };
          } else {
            return { ...screenshot, tags: [...(screenshot.tags || []), tag] };
          }
        })
      );
    } else {
      // Toggle tag for single screenshot
      setScreenshots(
        screenshots.map((screenshot) => {
          if (screenshot.id !== tagManagementTarget) return screenshot;

          const hasTag = (screenshot.tags || []).includes(tag);
          if (hasTag) {
            return {
              ...screenshot,
              tags: (screenshot.tags || []).filter((t) => t !== tag),
            };
          } else {
            return { ...screenshot, tags: [...(screenshot.tags || []), tag] };
          }
        })
      );
    }
  };
  const isTagAssignedToAll = (tag: string) => {
    if (tagManagementTarget === "bulk") {
      return selectedScreenshots.every((id) => {
        const screenshot = screenshots.find((s) => s.id === id);
        return screenshot && screenshot.tags && screenshot.tags.includes(tag);
      });
    } else {
      const screenshot = screenshots.find((s) => s.id === tagManagementTarget);
      return screenshot && screenshot.tags && screenshot.tags.includes(tag);
    }
  };

  const isTagAssignedToSome = (tag: string) => {
    if (tagManagementTarget === "bulk") {
      return (
        selectedScreenshots.some((id) => {
          const screenshot = screenshots.find((s) => s.id === id);
          return screenshot && screenshot.tags && screenshot.tags.includes(tag);
        }) && !isTagAssignedToAll(tag)
      );
    }
    return false;
  };
  const handleBulkDelete = () => {
    if (currentFolder === "trash") {
      setScreenshots(
        screenshots.filter(
          (screenshot) => !selectedScreenshots.includes(screenshot.id)
        )
      );
      Toast.success("Screenshots permanently deleted");
    } else {
      // Move to trash
      setScreenshots(
        screenshots.map((screenshot) =>
          selectedScreenshots.includes(screenshot.id)
            ? { ...screenshot, trash: true }
            : screenshot
        )
      );
      Toast.success("Screenshots moved to trash");
    }

    setSelectedScreenshots([]);
    setIsDeleteConfirmationOpen(false);
  };
  const handleCloseContextMenu = () => {
    setContextMenu({ isOpen: false, x: 0, y: 0, screenshotId: null });
  };
  const handleSaveRename = () => {
    const trimmedName = renameInput.trim();

    // Validation
    if (!trimmedName) {
      setRenameError("Screenshot name cannot be empty");
      return;
    }

    // Check for duplicates
    const isDuplicate = screenshots.some(
      (s) =>
        s.id !== contextMenu.screenshotId &&
        s.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setRenameError("A screenshot with this name already exists");
      return;
    }

    // Proceed with rename
    handleRename(contextMenu.screenshotId, trimmedName);
    setRenameModalOpen(false);
  };
  useEffect(() => {
    setAllTags(getAllTags(screenshots));
  }, [screenshots]);

  // Handle click outside for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTagDropdownOpen(false);
      }
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDateDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const contextValue: ScreenShotContextType = {
    handleSaveRename,
    handleCloseContextMenu,
    handleBulkDelete,
    isTagAssignedToAll,
    isTagAssignedToSome,
    handleToggleTag,
    allTags,
    handleTagInputChange,
    handleAddTag,
    contextMenu,
    tagSuggestions,
    setTagSuggestions,
    isMoveFolderOpen,
    setIsMoveFolderOpen,
    isDeleteConfirmationOpen,
    setIsDeleteConfirmationOpen,
    renameInput,
    setRenameInput,
    renameError,
    setRenameError,
    newTagInput,
    setNewTagInput,
    tagManagementTarget,
    setTagManagementTarget,
    isTagManagementOpen,
    setIsTagManagementOpen,
    handleBulkMove,
    handleMove,
    movingScreenshot,
    handleCreateFolder,
    newFolderName,
    setNewFolderName,
    handleDownload,
    renameModalOpen,
    setRenameModalOpen,
    previewImage,
    setPreviewImage,
    isPreviewOpen,
    setIsPreviewOpen,
    setMovingScreenshot,
    handleContextMenu,
    handleDragStart,
    handleRemoveTag,
    handleOpenRenameModal,
    handleTagManagement,
    handleRename,
    handleDelete,
    handlePermanentDelete,
    handleRestore,
    handleShare,
    handlePreview,
    handleToggleScreenshotSelection,
    editingScreenshot,
    setEditingScreenshot,
    isEmptyBinConfirmationOpen,
    setIsEmptyBinConfirmationOpen,
    handleSelectAll,
    filteredScreenshots,
    selectedScreenshots,
    setSelectedScreenshots,
    handleFolderRename,
    handleFolderClick,
    editingFolder,
    setEditingFolder,
    handleDeleteFolder,
    handleDrop,
    handleDragOver,
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
