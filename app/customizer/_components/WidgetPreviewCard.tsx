import React from "react";
import { ExternalLink } from "lucide-react";
import { WidgetConfig, WidgetTheme } from "./useWidgetConfig";

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
  const barBg = isDark ? "bg-white/20" : "bg-gray-200";
  const fillBg = isDark ? "bg-white" : "bg-[#F54242]";

  // Create 5 circles along the progress bar at 0%, 25%, 50%, 75%, 100%
  const circlePositions = [0, 25, 50, 75, 100];

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm font-medium mb-2 text-gray-500">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div
        className={`h-1 w-full ${barBg} relative rounded-full overflow-visible`}
      >
        {/* Progress fill */}
        <div
          className={`h-full ${fillBg} rounded-full`}
          style={{ width: `${progress}%` }}
        />
        {/* Circles positioned along the bar */}
        {circlePositions.map((position, i) => {
          const isFilled = position <= progress;
          return (
            <div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${
                isFilled ? fillBg : barBg
              }`}
              style={{ left: `${position}%` }}
            />
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

  // Size-based visibility rules following iOS widget guidelines:
  // Small: Extremely focused, single purpose, glanceable content
  // Medium: More space, can support multiple elements horizontally
  // Large: Rich, comprehensive information with full layout
  const showProgressBar = size !== "S" && config.displayMode === "Progress";
  const showInformationCards = size !== "S";
  const showNextMilestone = size !== "S" && config.visibleData.nextMilestone;
  const showContact = size === "L" && config.visibleData.contact; // Only show in large, medium gets nextMilestone
  const showOpenButton = size === "L";
  const showFooter = size === "L" && config.visibleData.lastUpdate;

  // Small widget: show compact progress percentage if in Progress mode
  const showCompactProgress = size === "S" && config.displayMode === "Progress";
  // Small widget: show next milestone if available (most important info)
  const showSmallMilestone = size === "S" && config.visibleData.nextMilestone;

  // Size-based padding following iOS guidelines (16pt standard margins)
  const sizePadding = {
    S: "p-4", // 16px padding for small widget
    M: "p-5", // 20px padding for medium widget
    L: "p-6", // 24px padding for large widget
  };

  return (
    <div className="flex flex-col items-center">
      {/* Widget Container */}
      <div
        className={`relative ${sizeDimensions[size]} ${sizePadding[size]} rounded-2xl shadow-md ${containerClass} transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-start ${
            size === "S" ? "mb-2" : "mb-3"
          }`}
        >
          <div className="flex items-center gap-2">
            {/* Notion Icon */}
            <div
              className={`${
                size === "S" ? "w-5 h-5" : "w-6 h-6"
              } rounded bg-white flex items-center justify-center shadow-sm`}
            >
              <span
                className={`${
                  size === "S" ? "text-xs" : "text-sm"
                } font-semibold text-black`}
              >
                N
              </span>
            </div>
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
        <div className="flex flex-col gap-1 mb-3">
          <h2
            className={`${
              size === "S" ? "text-lg" : "text-2xl"
            } font-bold text-black leading-tight`}
          >
            {config.projectName}
          </h2>
          {size !== "S" && config.clientName && (
            <p className="text-sm text-gray-600">by {config.clientName}</p>
          )}
        </div>

        {/* Compact Progress for Small Widget */}
        {showCompactProgress && (
          <div className="mb-3">
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
          <div className="mb-4">
            <ProgressBar progress={75} theme={config.theme} />
          </div>
        )}

        {/* Small Widget: Single Milestone Card */}
        {showSmallMilestone && (
          <div className="mb-3 flex-1">
            <div className="bg-[#FCFBFB] rounded-xl py-2 px-3 border border-gray-100">
              <p className="text-[9px] font-semibold text-[#F54242] uppercase mb-0.5">
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
            className={`grid ${
              size === "M" ? "grid-cols-1" : "grid-cols-2"
            } gap-3 mb-4`}
          >
            {/* Next Milestone Card */}
            {showNextMilestone && (
              <div className="bg-[#FCFBFB] rounded-xl py-3 px-4 border border-gray-100 h-full">
                <p className="text-[10px] font-semibold text-[#F54242] uppercase mb-1">
                  Next Milestone
                </p>
                <p className="text-base font-bold text-black mb-1">
                  Usability Testing
                </p>
                <p className="text-xs text-gray-500">Oct 31, 2025</p>
              </div>
            )}

            {/* Contact Card - Only in Large */}
            {showContact && (
              <div className="bg-black rounded-xl py-3 px-4 h-full">
                <p className="text-[10px] font-semibold text-white uppercase mb-1">
                  Contact
                </p>
                <p className="text-base font-bold text-white">
                  {config.clientName}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Open Notion Button - Only in Large */}
        {showOpenButton && (
          <div className="flex justify-center mb-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-black flex items-center gap-2 transition-colors">
              Open Notion
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Footer - Only in Large */}
        {showFooter && (
          <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-200 mt-auto">
            <span>Last Update</span>
            <span>2 hours ago</span>
          </div>
        )}
      </div>
    </div>
  );
};
