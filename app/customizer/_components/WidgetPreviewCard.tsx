import React from "react";
import { ExternalLink } from "lucide-react";
import { WidgetConfig, WidgetTheme } from "./useWidgetConfig";
import { useWidgetVisibility, WidgetSize } from "./useWidgetVisibility";

interface Props {
  config: WidgetConfig;
  size?: WidgetSize;
  onSizeChange?: (size: WidgetSize) => void;
  onSave?: () => void;
}

const themeStyles: Record<WidgetTheme, string> = {
  Cream: "bg-[#FCFBFB]",
  "Cool Ocean": "bg-gradient-to-br from-[#80CAFF] to-[#4D7999]",
  Sandstorm: "bg-gradient-to-br from-[#FFB180] to-[#997B4D]",
  Midnight: "bg-gradient-to-br from-[#1A1A1A] to-[#38024C]",
  Forest: "bg-gradient-to-br from-[#2D5016] to-[#1A3009]",
  Sunset: "bg-gradient-to-br from-[#FF6B6B] to-[#8B2D5C]",
};

// Helper to determine if a theme is dark (for text color contrast)
const isDarkTheme = (theme: WidgetTheme): boolean => {
  return theme !== "Cream";
};

// Progress Bar Component - adapts to size and theme
const ProgressBar = ({
  progress,
  isDark,
  compact = false,
}: {
  progress: number;
  isDark: boolean;
  compact?: boolean;
}) => {
  const barBg = isDark ? "bg-white/10" : "bg-gray-100";
  const fillBg = isDark ? "bg-white" : "bg-[#F54242]";
  const textColor = isDark ? "text-white/70" : "text-gray-500";
  const segments = compact ? 5 : 10;
  const segmentWidth = 100 / segments;

  return (
    <div className="w-full">
      <div
        className={`flex justify-between ${
          compact ? "text-[10px]" : "text-[11px]"
        } font-medium mb-1.5 ${textColor}`}
      >
        <span>Progress</span>
        <span className="font-semibold">{progress}%</span>
      </div>
      <div className="flex gap-0.5 w-full">
        {Array.from({ length: segments }).map((_, index) => {
          const segmentProgress = (index + 1) * segmentWidth;
          const isFilled = progress >= segmentProgress;
          return (
            <div
              key={index}
              className={`flex-1 ${
                compact ? "h-1.5" : "h-2"
              } rounded-sm overflow-hidden ${barBg}`}
            >
              {isFilled && <div className={`h-full ${fillBg} rounded-sm`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Compact Progress (inline text for small widgets)
const CompactProgress = ({
  progress,
  isDark,
}: {
  progress: number;
  isDark: boolean;
}) => (
  <div className="flex items-center gap-1.5">
    <span
      className={`text-[10px] font-medium ${
        isDark ? "text-white/70" : "text-gray-500"
      }`}
    >
      Progress
    </span>
    <span
      className={`text-base font-bold ${isDark ? "text-white" : "text-black"}`}
    >
      {progress}%
    </span>
  </div>
);

// Milestone Card - adapts to size and theme
const MilestoneCard = ({
  size,
  isDark,
  compact = false,
}: {
  size: WidgetSize;
  isDark: boolean;
  compact?: boolean;
}) => {
  const cardBg = isDark
    ? "bg-white/10 border-white/10"
    : "bg-white/80 border-gray-100";
  const titleColor = isDark ? "text-white" : "text-black";
  const subtitleColor = isDark ? "text-white/60" : "text-gray-500";

  if (compact || size === "S") {
    return (
      <div
        className={`${cardBg} rounded-lg py-1.5 px-2 border flex flex-col justify-center`}
      >
        <p className="text-[8px] font-semibold text-[#F54242] mb-0.5">
          Next Milestone
        </p>
        <p
          className={`text-[11px] font-bold ${titleColor} leading-tight truncate`}
        >
          Usability Testing
        </p>
        <p className={`text-[8px] ${subtitleColor}`}>Oct 31</p>
      </div>
    );
  }
  return (
    <div
      className={`${cardBg} rounded-xl py-2 px-3 border flex flex-col justify-center h-full`}
    >
      <p className="text-[9px] font-semibold text-[#F54242] mb-0.5">
        Next Milestone
      </p>
      <p className={`text-sm font-bold ${titleColor} leading-tight truncate`}>
        Usability Testing
      </p>
      <p className={`text-[9px] ${subtitleColor}`}>Oct 31, 2025</p>
    </div>
  );
};

// Contact Button - adapts to size and theme
const ContactButton = ({
  compact = false,
  isDark,
}: {
  compact?: boolean;
  isDark: boolean;
}) => (
  <button
    className={`${compact ? "px-2 py-1.5 text-[11px]" : "px-3 py-2 text-sm"} ${
      isDark
        ? "bg-white/10 hover:bg-white/20 text-white"
        : "bg-gray-100 hover:bg-gray-200 text-black"
    } rounded-lg font-medium flex items-center gap-1.5 transition-colors justify-center h-full`}
  >
    Contact
    <ExternalLink className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
  </button>
);

// Open Notion Button - adapts to size and theme
const OpenNotionButton = ({
  compact = false,
  isDark,
}: {
  compact?: boolean;
  isDark: boolean;
}) => (
  <button
    className={`${compact ? "px-2 py-1.5 text-[11px]" : "px-3 py-2 text-sm"} ${
      isDark
        ? "bg-white/10 hover:bg-white/20 text-white"
        : "bg-gray-100 hover:bg-gray-200 text-black"
    } rounded-lg font-medium flex items-center gap-1.5 transition-colors justify-center h-full`}
  >
    Open Notion
    <ExternalLink className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
  </button>
);

// Last Update Footer - adapts to theme
const LastUpdateFooter = ({
  compact = false,
  isDark,
}: {
  compact?: boolean;
  isDark: boolean;
}) => (
  <div
    className={`flex justify-between items-center ${
      compact ? "text-[10px]" : "text-xs"
    } ${
      isDark ? "text-white/60 border-white/20" : "text-gray-500 border-gray-200"
    } pt-2 border-t`}
  >
    <span>Last Update</span>
    <span>2 hours ago</span>
  </div>
);

export const WidgetPreviewCard = ({
  config,
  size = "S",
  onSizeChange,
  onSave,
}: Props) => {
  const containerClass = themeStyles[config.theme] || themeStyles["Cream"];
  const isDark = isDarkTheme(config.theme);

  // Strict fixed widget dimensions (in pixels)
  // S: 162×162, M: 344×162, L: 344×344, XL: 688×344
  const sizeDimensions: Record<WidgetSize, string> = {
    S: "w-[162px] h-[162px]",
    M: "w-[344px] h-[162px]",
    L: "w-[344px] h-[344px]",
    XL: "w-[688px] h-[344px]",
  };

  // Size-based padding (tighter for smaller widgets)
  const sizePadding: Record<WidgetSize, string> = {
    S: "p-3",
    M: "p-3",
    L: "p-4",
    XL: "p-4",
  };

  // Use visibility utility to determine which components to show based on size limits
  const visibility = useWidgetVisibility(config, size);

  // Render content based on template visibility and size
  const renderContent = () => {
    // SMALL WIDGET (162×162) - max 2 components
    if (size === "S") {
      return (
        <div className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-hidden">
          {visibility.progress && (
            <CompactProgress progress={75} isDark={isDark} />
          )}
          {visibility.nextMilestone && (
            <MilestoneCard size={size} isDark={isDark} compact />
          )}
        </div>
      );
    }

    // MEDIUM WIDGET (344×162) - max 3 components, horizontal layout
    if (size === "M") {
      return (
        <div className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-hidden">
          {visibility.progress && (
            <ProgressBar progress={75} isDark={isDark} compact />
          )}
          <div className="flex gap-2 flex-1 min-h-0">
            {visibility.nextMilestone && (
              <div className="flex-1">
                <MilestoneCard size={size} isDark={isDark} compact />
              </div>
            )}
            {visibility.contact && (
              <div className="flex-shrink-0">
                <ContactButton compact isDark={isDark} />
              </div>
            )}
          </div>
        </div>
      );
    }

    // LARGE WIDGET (344×344) - max 4 components
    if (size === "L") {
      return (
        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
          {visibility.progress && <ProgressBar progress={75} isDark={isDark} />}
          <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
            {visibility.nextMilestone && (
              <MilestoneCard size={size} isDark={isDark} />
            )}
            <div className="flex flex-col gap-2">
              {visibility.contact && <ContactButton isDark={isDark} />}
              {visibility.openButton && <OpenNotionButton isDark={isDark} />}
            </div>
          </div>
          {visibility.lastUpdate && <LastUpdateFooter isDark={isDark} />}
        </div>
      );
    }

    // XL WIDGET (688×344) - max 5 components, wide layout
    if (size === "XL") {
      return (
        <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-hidden">
          {visibility.progress && <ProgressBar progress={75} isDark={isDark} />}
          <div className="flex-1 grid grid-cols-3 gap-3 min-h-0">
            {visibility.nextMilestone && (
              <MilestoneCard size={size} isDark={isDark} />
            )}
            {visibility.contact && <ContactButton isDark={isDark} />}
            {visibility.openButton && <OpenNotionButton isDark={isDark} />}
          </div>
          {visibility.lastUpdate && <LastUpdateFooter isDark={isDark} />}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        fontFamily:
          '"SF Pro Rounded", "SF Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Widget Container - Strictly fixed dimensions */}
      <div
        className={`relative ${sizeDimensions[size]} ${sizePadding[size]} rounded-2xl shadow-md ${containerClass} transition-all duration-300 overflow-hidden flex flex-col flex-shrink-0 flex-grow-0`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-2 ${
            size === "S" ? "mb-1" : "mb-2"
          } flex-shrink-0`}
        >
          <div
            className={`${
              size === "S"
                ? "px-1.5 py-0.5 text-[8px]"
                : "px-2 py-0.5 text-[9px]"
            } rounded-full font-medium bg-[#E3F2FD] text-[#1976D2]`}
          >
            In Progress
          </div>
        </div>

        {/* Title Section */}
        <div className={`flex-shrink-0 ${size === "S" ? "mb-1" : "mb-2"}`}>
          <h2
            className={`${
              size === "S" ? "text-base" : size === "M" ? "text-lg" : "text-xl"
            } font-bold ${
              isDark ? "text-white" : "text-black"
            } leading-tight truncate`}
          >
            {config.projectName}
          </h2>
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>
    </div>
  );
};
