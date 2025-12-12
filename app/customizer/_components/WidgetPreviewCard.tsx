import React from "react";
import { ExternalLink } from "lucide-react";
import { WidgetConfig, WidgetTheme } from "./useWidgetConfig";
import { useWidgetVisibility } from "./useWidgetVisibility";

interface Props {
  config: WidgetConfig;
  size?: "S" | "M" | "L";
  onSizeChange?: (size: "S" | "M" | "L") => void;
  onSave?: () => void;
}

const themeStyles: Record<WidgetTheme, string> = {
  Cream: "bg-[#FCFBFB] text-black",
  "Cool Ocean": "bg-gradient-to-br from-[#80CAFF] to-[#4D7999] text-white",
  Sandstorm: "bg-gradient-to-br from-[#FFB180] to-[#997B4D] text-white",
  Midnight: "bg-gradient-to-br from-[#1A1A1A] to-[#38024C] text-white",
  Forest: "bg-gradient-to-br from-[#2D5016] to-[#1A3009] text-white",
  Sunset: "bg-gradient-to-br from-[#FF6B6B] to-[#8B2D5C] text-white",
};

const ProgressBar = ({
  progress,
  theme,
}: {
  progress: number;
  theme: WidgetTheme;
}) => {
  const isDark =
    theme === "Midnight" ||
    theme === "Cool Ocean" ||
    theme === "Sandstorm" ||
    theme === "Forest" ||
    theme === "Sunset";
  const barBg = isDark ? "bg-white/10" : "bg-gray-100";
  const fillBg = isDark ? "bg-white" : "bg-[#F54242]";

  // Create 10 segments for a more granular progress display
  const segments = 10;
  const segmentWidth = 100 / segments;

  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-medium mb-2.5 text-gray-500">
        <span style={{ fontSize: "11px" }}>Progress</span>
        <span className="font-semibold">{progress}%</span>
      </div>
      <div className="flex gap-1 w-full">
        {Array.from({ length: segments }).map((_, index) => {
          const segmentProgress = (index + 1) * segmentWidth;
          const isFilled = progress >= segmentProgress;
          const isPartiallyFilled =
            progress > index * segmentWidth && progress < segmentProgress;
          const fillPercentage = isPartiallyFilled
            ? ((progress - index * segmentWidth) / segmentWidth) * 100
            : 0;

          return (
            <div
              key={index}
              className={`flex-1 h-2 rounded-sm overflow-hidden ${barBg}`}
            >
              {isFilled ? (
                <div className={`h-full ${fillBg} rounded-sm`} />
              ) : isPartiallyFilled ? (
                <div
                  className={`h-full ${fillBg} rounded-sm`}
                  style={{ width: `${fillPercentage}%` }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WidgetPreviewCard = ({
  config,
  size = "S",
  onSizeChange,
  onSave,
}: Props) => {
  const containerClass = themeStyles[config.theme] || themeStyles["Cream"];
  const isDark =
    config.theme === "Midnight" ||
    config.theme === "Cool Ocean" ||
    config.theme === "Sandstorm" ||
    config.theme === "Forest" ||
    config.theme === "Sunset";

  // Size-based dimensions matching iOS/macOS/iPadOS standards
  // iOS/iPadOS: Small (170×170), Medium (360×170), Large (360×360)
  const sizeDimensions = {
    S: "w-[170px] h-[170px]",
    M: "w-[360px] h-[170px]",
    L: "w-[360px] h-[360px]",
  };

  // Use visibility utility to determine which components to show based on size limits
  const visibility = useWidgetVisibility(config, size);

  // Determine display modes for progress
  const showProgressBar = visibility.progress && size !== "S";
  const showCompactProgress = visibility.progress && size === "S";

  // Determine which data components to show
  const showNextMilestone = visibility.nextMilestone;
  const showContact = visibility.contact;
  const showFooter = visibility.lastUpdate;
  const showOpenButton = visibility.openButton;

  // Information cards section (for medium and large)
  const showInformationCards =
    size !== "S" && (showNextMilestone || showContact || showOpenButton);

  // Size-based padding following iOS guidelines (16pt standard margins)
  const sizePadding = {
    S: "p-4", // 16px padding for small widget
    M: "p-5", // 20px padding for medium widget
    L: "p-6", // 24px padding for large widget
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        fontFamily:
          '"SF Pro Rounded", "SF Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Widget Container */}
      <div
        className={`relative ${sizeDimensions[size]} ${sizePadding[size]} rounded-2xl shadow-md ${containerClass} transition-all duration-300 overflow-hidden flex flex-col h-full`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-start ${
            size === "S" ? "mb-2" : "mb-3"
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <div
              className={`${
                size === "S"
                  ? "px-2 py-0.5 text-[9px]"
                  : "px-2.5 py-1 text-[10px]"
              } rounded-full font-medium bg-[#E3F2FD] text-[#1976D2]`}
            >
              In Progress
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <h2
            className={`${
              size === "S" ? "text-lg" : "text-2xl"
            } font-bold text-black leading-tight`}
          >
            {config.projectName}
          </h2>
        </div>

        {/* Content Area - Flex container that fills height and prevents overflow */}
        <div className="flex-1 flex flex-col min-h-0 h-full gap-2 overflow-hidden">
          {/* Compact Progress for Small Widget */}
          {showCompactProgress && (
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Progress
                </span>
                <span className="text-lg font-bold text-black">75%</span>
              </div>
            </div>
          )}

          {/* Progress Bar for Medium and Large */}
          {showProgressBar && (
            <div className="flex-shrink-0">
              <ProgressBar progress={75} theme={config.theme} />
            </div>
          )}

          {/* Small Widget: Single Milestone Card */}
          {size === "S" && showNextMilestone && (
            <div className="flex-1 h-full flex flex-col min-h-0">
              <div className="bg-[#FCFBFB] rounded-xl py-2 px-3 border border-gray-100 h-full flex flex-col justify-center">
                <p className="text-[9px] font-semibold text-[#F54242] mb-0.5">
                  Next Milestone
                </p>
                <p className="text-sm font-bold text-black leading-tight">
                  Usability Testing
                </p>
                <p className="text-[10px] text-gray-500">Oct 31, 2025</p>
              </div>
            </div>
          )}

          {/* Information Cards for Medium and Large */}
          {showInformationCards && (
            <div
              className={`flex-1 min-h-0 h-full grid ${
                size === "M" ? "grid-cols-1" : "grid-cols-2"
              } gap-1`}
              style={{ rowGap: "4px" }}
            >
              {/* Next Milestone Card */}
              {showNextMilestone && (
                <div
                  className="bg-[#FCFBFB] rounded-xl py-3 px-4 border border-gray-100 h-full flex flex-col"
                  style={{ gap: "4px" }}
                >
                  <p className="text-[9px] font-medium text-[#F54242] mb-1">
                    Next Milestone
                  </p>
                  <p className="text-base font-bold text-black mb-1">
                    Usability Testing
                  </p>
                  <p className="text-[9px] text-gray-500">Oct 31, 2025</p>
                </div>
              )}

              {/* Right Side Container: Contact and Open Notion - Only in Large */}
              {size === "L" && (showContact || showOpenButton) && (
                <div className="flex flex-col gap-1 h-full">
                  {/* Contact Card */}
                  {showContact && (
                    <button className="flex-1 h-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-black flex items-center gap-2 transition-colors justify-center">
                      Contact
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Open Notion Button */}
                  {showOpenButton && (
                    <button className="flex-1 h-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-black flex items-center gap-2 transition-colors justify-center">
                      Open Notion
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer - Only in Large */}
          {showFooter && (
            <div className="flex-shrink-0 flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-200 mt-auto">
              <span>Last Update</span>
              <span>2 hours ago</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
