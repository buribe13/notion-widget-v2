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

  // Size-based width
  const sizeWidths = {
    S: "w-[340px]",
    M: "w-[420px]",
    L: "w-[500px]",
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Widget Container */}
      <div
        className={`relative ${sizeWidths[size]} rounded-2xl p-6 shadow-md ${containerClass} transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {/* Notion Icon */}
            <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm">
              <span className="text-sm font-semibold text-black">N</span>
            </div>
            <div className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#E3F2FD] text-[#1976D2]">
              In Progress
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-2xl font-bold text-black leading-tight">
            {config.projectName}
          </h2>
          {config.clientName && (
            <p className="text-sm text-gray-600">by {config.clientName}</p>
          )}
        </div>

        {/* Progress Section */}
        {config.displayMode === "Progress" && (
          <div className="mb-6">
            <ProgressBar progress={75} theme={config.theme} />
          </div>
        )}

        {/* Information Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Next Milestone Card */}
          {config.visibleData.nextMilestone && (
            <div className="bg-[#FCFBFB] rounded-xl p-4 border border-gray-100">
              <p className="text-[10px] font-semibold text-[#F54242] uppercase mb-1">
                Next Milestone
              </p>
              <p className="text-base font-bold text-black mb-1">
                Usability Testing
              </p>
              <p className="text-xs text-gray-500">Oct 31, 2025</p>
            </div>
          )}

          {/* Contact Card */}
          {config.visibleData.contact && (
            <div className="bg-black rounded-xl p-4">
              <p className="text-[10px] font-semibold text-white uppercase mb-1">
                Contact
              </p>
              <p className="text-base font-bold text-white">
                {config.clientName}
              </p>
            </div>
          )}
        </div>

        {/* Open Notion Button */}
        <div className="flex justify-center mb-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-black flex items-center gap-2 transition-colors">
            Open Notion
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer */}
        {config.visibleData.lastUpdate && (
          <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-200">
            <span>Last Update</span>
            <span>2 hours ago</span>
          </div>
        )}
      </div>

      {/* Size Controls and Save Button */}
      <div className="flex items-center gap-4">
        {/* Size Controls */}
        <div className="flex gap-2">
          {(["S", "M", "L"] as const).map((s) => (
            <button
              key={s}
              onClick={() => onSizeChange?.(s)}
              className={`w-9 h-9 rounded text-xs font-medium transition-colors ${
                size === s
                  ? "bg-white text-black"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          className="bg-[#2C2C2B] hover:bg-[#353535] text-white px-6 py-2.5 rounded-lg text-xs font-medium transition-colors"
        >
          Save to Device
        </button>
      </div>
    </div>
  );
};
