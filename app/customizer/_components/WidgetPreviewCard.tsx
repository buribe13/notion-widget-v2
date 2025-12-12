import React from "react";
import { WidgetConfig, WidgetTheme } from "./useWidgetConfig";

interface Props {
  config: WidgetConfig;
}

const themeStyles: Record<WidgetTheme, string> = {
  Cream: "bg-gradient-to-br from-[#F7F7F7] to-[#FFF5E0] text-black",
  "Cool Ocean": "bg-gradient-to-br from-[#80CAFF] to-[#4D7999] text-white",
  Sandstorm: "bg-gradient-to-br from-[#FFB180] to-[#997B4D] text-white",
  Midnight: "bg-gradient-to-br from-[#1A1A1A] to-[#38024C] text-white",
  "Noir Glow": "bg-gradient-to-br from-gray-900 to-black text-white",
};

const ProgressBar = ({
  progress,
  theme,
}: {
  progress: number;
  theme: WidgetTheme;
}) => {
  const isDark = theme === "Midnight" || theme === "Noir Glow";
  const barBg = isDark ? "bg-white/20" : "bg-black/10";
  const fillBg = isDark ? "bg-white" : "bg-black";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium mb-1 opacity-80 font-rounded">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className={`h-2 w-full rounded-full ${barBg} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${fillBg}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const WidgetPreviewCard = ({ config }: Props) => {
  const containerClass = themeStyles[config.theme] || themeStyles["Cream"];
  const isDark = config.theme === "Midnight" || config.theme === "Noir Glow";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Widget Container */}
      <div
        className={`relative w-[340px] rounded-[24px] p-6 shadow-2xl ${containerClass} transition-all duration-300`}
        style={{
          aspectRatio: config.displayMode === "Compact" ? "1/1" : "1.8/1",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            {/* Notion-ish Icon */}
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${
                isDark ? "bg-white/10" : "bg-black/5"
              }`}
            >
              <span className="text-sm">N</span>
            </div>
            {config.visibleData.lastUpdate && (
              <div
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                  isDark
                    ? "bg-blue-500/20 text-blue-200"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                In Progress
              </div>
            )}
          </div>
          {/* Avatar / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
              {/* Placeholder Avatar */}
              <div className="w-full h-full bg-gradient-to-tr from-purple-400 to-pink-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold font-rounded leading-tight">
            {config.projectName}
          </h2>
          {config.clientName && (
            <p className="text-sm opacity-60 font-rounded">
              by {config.clientName}
            </p>
          )}
        </div>

        {/* Footer / Data */}
        <div className="mt-auto pt-6 flex flex-col gap-4">
          {config.displayMode === "Progress" && config.visibleData.progress && (
            <ProgressBar progress={75} theme={config.theme} />
          )}

          {config.displayMode === "Milestone" &&
            config.visibleData.nextMilestone && (
              <div
                className={`p-3 rounded-xl flex items-center justify-between ${
                  isDark ? "bg-white/10" : "bg-white/60"
                }`}
              >
                <div>
                  <p className="text-[10px] uppercase opacity-60 font-bold mb-0.5">
                    Next Milestone
                  </p>
                  <p className="text-sm font-medium">Usability Testing</p>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-md ${
                    isDark ? "bg-white/10" : "bg-black/5"
                  }`}
                >
                  Oct 31
                </div>
              </div>
            )}

          {/* Footer Meta */}
          <div className="flex justify-between items-center text-[10px] opacity-50 font-medium uppercase tracking-wider mt-2">
            {config.visibleData.lastUpdate && <span>Updated 2h ago</span>}
            <span className="flex items-center gap-1">
              Open Notion <span className="text-xs">↗</span>
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-notion-dark text-notion-text px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-black transition-colors flex items-center gap-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Save to Device
      </button>
    </div>
  );
};
