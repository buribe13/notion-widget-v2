import React from "react";
import { WidgetConfig, WidgetTheme, DisplayMode } from "./useWidgetConfig";

interface Props {
  config: WidgetConfig;
  updateConfig: (updates: Partial<WidgetConfig>) => void;
  toggleVisibleData: (key: keyof WidgetConfig["visibleData"]) => void;
}

const THEMES: WidgetTheme[] = ["Cream", "Cool Ocean", "Sandstorm", "Midnight"];
const MODES: DisplayMode[] = ["Progress", "Compact", "Milestone"];

export const Controls = ({
  config,
  updateConfig,
  toggleVisibleData,
}: Props) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[320px]">
      {/* Section: Project */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-notion-text-dim">
            Select Project
          </label>
          <button className="w-4 h-4 flex items-center justify-center hover:bg-white/5 rounded opacity-50 hover:opacity-100 transition-opacity">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2L4 4M10 2L8 4M4 4L6 6M8 4L6 6M6 6V10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="bg-notion-panel border border-notion-border rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3.33V10M10 10V16.67M10 10H16.67M10 10H3.33"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-notion-text-dim"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-notion-text-dim leading-relaxed">
                Sync Feed Milestones automatically in the Select Project button.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              // Cycle through projects for demo
              const projects = [
                "Portfolio Website",
                "Q3 Marketing Campaign",
                "Mobile App Redesign",
              ];
              const currentIndex = projects.indexOf(config.projectName);
              const nextIndex = (currentIndex + 1) % projects.length;
              updateConfig({ projectName: projects[nextIndex] });
            }}
            className="text-sm text-notion-blue hover:underline text-left"
          >
            Select Project
          </button>
        </div>
      </div>

      {/* Section: Display Mode */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-medium uppercase tracking-wider text-notion-text-dim">
          Display Mode
        </label>
        <div className="flex p-1 bg-notion-panel border border-notion-border rounded-lg">
          {MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => updateConfig({ displayMode: mode })}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                config.displayMode === mode
                  ? "bg-white/10 text-notion-text shadow-sm"
                  : "text-notion-text-dim hover:text-notion-text"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Section: Visible Data */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <label className="text-[11px] font-medium uppercase tracking-wider text-notion-text-dim">
            Visible Data
          </label>
          <span className="text-[10px] text-notion-text-dim opacity-60">
            {Object.values(config.visibleData).filter(Boolean).length}/4
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { key: "progress", label: "Progress", icon: "→" },
            { key: "nextMilestone", label: "Next Milestone", icon: "⭐" },
            { key: "chart", label: "Chart", icon: "📊" },
            { key: "lastUpdate", label: "Last Update", icon: "🕐" },
          ].map((item) => {
            const isChecked =
              config.visibleData[item.key as keyof typeof config.visibleData] ??
              false;
            return (
              <label
                key={item.key}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors ${
                  isChecked ? "bg-white/5" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {isChecked && (
                    <span className="text-sm text-green-500">{item.icon}</span>
                  )}
                  <span
                    className={`text-sm ${
                      isChecked ? "text-green-500" : "text-notion-text"
                    } group-hover:text-white`}
                  >
                    {item.label}
                  </span>
                </div>
                <input
                  type="checkbox"
                  className="accent-notion-green w-4 h-4 rounded-sm bg-transparent border-notion-border"
                  checked={isChecked}
                  onChange={() =>
                    toggleVisibleData(
                      item.key as keyof typeof config.visibleData
                    )
                  }
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Section: Style */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-medium uppercase tracking-wider text-notion-text-dim">
          Select Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => updateConfig({ theme })}
              className={`group flex items-center gap-3 p-2 rounded-lg border transition-all ${
                config.theme === theme
                  ? "bg-white/10 border-notion-blue/50 ring-1 ring-notion-blue/50"
                  : "bg-transparent border-transparent hover:bg-white/5"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full shadow-inner ${
                  theme === "Cream"
                    ? "bg-gradient-to-b from-white to-amber-50"
                    : theme === "Cool Ocean"
                    ? "bg-gradient-to-b from-blue-300 to-blue-500"
                    : theme === "Sandstorm"
                    ? "bg-gradient-to-b from-orange-300 to-orange-500"
                    : "bg-gradient-to-b from-gray-800 to-purple-900"
                }`}
              />
              <span
                className={`text-sm ${
                  config.theme === theme
                    ? "text-notion-text"
                    : "text-notion-text-dim"
                }`}
              >
                {theme}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
