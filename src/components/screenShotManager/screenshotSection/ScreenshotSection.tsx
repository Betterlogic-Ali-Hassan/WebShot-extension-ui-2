"use client";

import { cn } from "@/lib/utils";
import { ScreenshotHeader } from "./ScreenshotHeader";
import { RecycleBinInfo } from "./RecyclebinInfo";
import { ScreenshotCard } from "./ScreenshotCard";
import { EmptyState } from "./EmpyState";
import { useScreenShot } from "@/context/ScreenShotContext";

const ScreenshotSection = () => {
  const { activeTab, filteredScreenshots, viewMode } = useScreenShot();
  return (
    <div
      className={cn(
        "rounded-xl border p-6 mb-6",
        "transition-all duration-300 animate-in fade-in-50 bg-background border-border"
      )}
    >
      <ScreenshotHeader />

      {activeTab === "recycle-bin" && <RecycleBinInfo />}

      {filteredScreenshots.length > 0 ? (
        <div
          className={cn(
            "space-y-4",
            viewMode === "grid" &&
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          )}
        >
          {filteredScreenshots.map((screenshot) => (
            <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default ScreenshotSection;
