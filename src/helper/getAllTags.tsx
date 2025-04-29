import { screenShot } from "@/types/ScreenShot";

export const getAllTags = (screenshots: screenShot[]) => {
  const tagsMap = new Map();
  screenshots.forEach((screenshot) => {
    if (screenshot.tags) {
      screenshot.tags.forEach((tag) => {
        if (tagsMap.has(tag)) {
          tagsMap.set(tag, tagsMap.get(tag) + 1);
        } else {
          tagsMap.set(tag, 1);
        }
      });
    }
  });
  return Array.from(tagsMap).map(([name, count]) => ({ name, count }));
};
