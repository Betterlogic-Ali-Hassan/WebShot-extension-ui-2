import { folder } from "@/types/Folders";

export const initialFolders: folder[] = [
  { id: "root", name: "All Screenshots", parent: null },
  { id: "designs", name: "UI Designs", parent: "root" },
  { id: "documentation", name: "Documentation", parent: "root" },
  { id: "trash", name: "Trash", parent: null },
];
