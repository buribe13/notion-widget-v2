import React, { useState } from "react";
import {
  Star,
  BarChart3,
  GanttChartSquare,
  Clock,
  Contact,
  Image as ImageIcon,
  Filter,
  Plus,
} from "lucide-react";
import { WidgetConfig, WidgetTheme, DisplayMode } from "./useWidgetConfig";

interface Props {
  config: WidgetConfig;
  updateConfig: (updates: Partial<WidgetConfig>) => void;
  toggleVisibleData: (key: keyof WidgetConfig["visibleData"]) => void;
  size?: "S" | "M" | "L";
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`px-3 py-1.5 ${isOpen ? "mb-3" : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <span className="text-[11px] font-medium text-[#8E8B86]">{title}</span>
        <Plus className="w-3 h-3 text-[#8E8B86] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      {isOpen && <div className="mt-2 space-y-0.5 -ml-2">{children}</div>}
    </div>
  );
};

const THEMES: WidgetTheme[] = [
  "Cream",
  "Cool Ocean",
  "Sandstorm",
  "Midnight",
  "Forest",
  "Sunset",
];
const MODES: DisplayMode[] = ["Progress", "Compact", "Milestone"];

// Icon components for Display Mode
const ProgressIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="text-[#8E8B86]"
  >
    <rect x="2" y="8" width="3" height="4" fill="currentColor" />
    <rect x="6.5" y="6" width="3" height="6" fill="currentColor" />
    <rect x="11" y="4" width="3" height="8" fill="currentColor" />
  </svg>
);

const CompactIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="text-[#8E8B86]"
  >
    <rect x="2" y="7" width="12" height="1.5" fill="currentColor" />
    <rect x="2" y="9.5" width="12" height="1.5" fill="currentColor" />
    <rect x="2" y="12" width="12" height="1.5" fill="currentColor" />
  </svg>
);

const MilestoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="text-[#8E8B86]"
  >
    <circle cx="3" cy="5" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="13" cy="11" r="1" fill="currentColor" />
    <line x1="3" y1="5" x2="8" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="8" y1="8" x2="13" y2="11" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const Controls = ({
  config,
  updateConfig,
  toggleVisibleData,
  size = "L",
}: Props) => {
  const visibleDataItems = [
    { key: "progress", label: "Progress", icon: Filter },
    { key: "nextMilestone", label: "Next Milestone", icon: Star },
    { key: "chart", label: "Chart", icon: BarChart3 },
    { key: "gantt", label: "Gantt", icon: GanttChartSquare },
    { key: "lastUpdate", label: "Last Update", icon: Clock },
    { key: "contact", label: "Contact", icon: Contact },
    { key: "gallery", label: "Gallery", icon: ImageIcon },
  ];

  // Maximum components allowed based on widget size
  // Small: 2, Medium: 3, Large: 4 data components
  const maxComponents = {
    S: 2,
    M: 3,
    L: 4,
  }[size];

  // Count only the data components that are actually displayed in the widget
  // These are the components that count toward the limit: progress, nextMilestone, contact, lastUpdate
  const countableDataComponents = [
    "progress",
    "nextMilestone",
    "contact",
    "lastUpdate",
  ];
  const visibleCount = countableDataComponents.filter(
    (key) => config.visibleData[key as keyof typeof config.visibleData] ?? false
  ).length;

  const projects = [
    "Portfolio",
    "Q3 Marketing",
    "App Redesign",
    "Brand Identity",
    "E-commerce",
  ];

  return (
    <div className="flex flex-col w-full max-w-[320px]">
      {/* Section: Project */}
      <CollapsibleSection title="Select Project" defaultOpen={true}>
        <div className="w-full flex flex-wrap gap-2">
          {projects.map((project) => {
            const isSelected = config.projectName === project;
            return (
              <button
                key={project}
                onClick={() => updateConfig({ projectName: project })}
                className={`flex items-center gap-2 py-1.5 pl-[10px] pr-3 rounded-[24px] text-[13px] font-medium leading-none whitespace-nowrap transition-colors group border border-[#8E8B86]/30 ${
                  isSelected
                    ? "bg-white/5 text-[#8E8B86]"
                    : "hover:bg-white/5 text-[#8E8B86]"
                }`}
              >
                <span>{project}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Section: Display Mode */}
      <CollapsibleSection title="Display Mode" defaultOpen={true}>
        <div className="w-full flex flex-wrap gap-2">
          {MODES.map((mode) => {
            const isSelected = config.displayMode === mode;
            const IconComponent =
              mode === "Progress"
                ? ProgressIcon
                : mode === "Compact"
                ? CompactIcon
                : MilestoneIcon;

            return (
              <button
                key={mode}
                onClick={() => updateConfig({ displayMode: mode })}
                className={`flex items-center gap-2 py-1.5 pl-[10px] pr-3 rounded-[24px] text-[13px] font-medium leading-none whitespace-nowrap transition-colors group border border-[#8E8B86]/30 ${
                  isSelected
                    ? "bg-white/5 text-[#8E8B86]"
                    : "hover:bg-white/5 text-[#8E8B86]"
                }`}
              >
                <span>{mode}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Section: Visible Data */}
      <CollapsibleSection
        title={`Visible Data (${visibleCount}/${maxComponents})`}
        defaultOpen={true}
      >
        <div className="w-full flex flex-wrap gap-2">
          {visibleDataItems.map((item) => {
            const isChecked =
              config.visibleData[item.key as keyof typeof config.visibleData] ??
              false;
            const IconComponent = item.icon;
            // Only enforce limits on countable data components (progress, nextMilestone, contact, lastUpdate)
            const isCountableComponent = countableDataComponents.includes(
              item.key
            );
            const shouldDisable =
              isCountableComponent &&
              !isChecked &&
              visibleCount >= maxComponents;

            return (
              <button
                key={item.key}
                onClick={() => {
                  // Only allow toggling on if less than maxComponents items are selected (for countable components), or if this item is already checked
                  if (shouldDisable) {
                    return;
                  }
                  toggleVisibleData(
                    item.key as keyof typeof config.visibleData
                  );
                }}
                disabled={shouldDisable}
                className={`flex items-center gap-2 py-1.5 pl-[10px] pr-3 rounded-[24px] text-[13px] font-medium leading-none whitespace-nowrap transition-colors group ${
                  isChecked
                    ? "text-[#34C759] bg-[#34C759]/10 border border-[#34C759]"
                    : "text-[#8E8B86] hover:bg-white/5 border border-[#8E8B86]/30"
                } ${shouldDisable ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <IconComponent
                  className={`w-4 h-4 flex-shrink-0 ${
                    isChecked ? "text-[#34C759]" : "text-[#8E8B86]"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Section: Style */}
      <CollapsibleSection title="Select Style" defaultOpen={true}>
        <div className="w-full flex flex-wrap gap-2">
          {THEMES.map((theme) => {
            const isSelected = config.theme === theme;
            const colorSwatch =
              theme === "Cream"
                ? "bg-[#FCFBFB]"
                : theme === "Cool Ocean"
                ? "bg-[#4D7999]"
                : theme === "Sandstorm"
                ? "bg-[#997B4D]"
                : theme === "Midnight"
                ? "bg-[#38024C]"
                : theme === "Forest"
                ? "bg-[#2D5016]"
                : "bg-[#8B2D5C]"; // Sunset

            return (
              <button
                key={theme}
                onClick={() => updateConfig({ theme })}
                className={`flex items-center gap-2 py-1.5 pl-[10px] pr-3 rounded-[24px] text-[13px] font-medium leading-none whitespace-nowrap transition-colors group border border-[#8E8B86]/30 ${
                  isSelected
                    ? "bg-white/5 text-[#8E8B86]"
                    : "hover:bg-white/5 text-[#8E8B86]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${colorSwatch} border border-gray-300/20 flex-shrink-0`}
                />
                <span>{theme}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>
    </div>
  );
};
