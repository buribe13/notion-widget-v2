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
  LayoutDashboard,
  Users,
  CalendarDays,
  Minimize2,
} from "lucide-react";
import { WidgetConfig, WidgetTheme, WidgetTemplate } from "./useWidgetConfig";

interface Props {
  config: WidgetConfig;
  updateConfig: (updates: Partial<WidgetConfig>) => void;
  setTemplate: (template: WidgetTemplate) => void;
  toggleVisibleData: (key: keyof WidgetConfig["visibleData"]) => void;
  size?: "S" | "M" | "L" | "XL";
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

const TEMPLATES: {
  name: WidgetTemplate;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    description: "Progress, Milestone, Last Update",
  },
  {
    name: "Client View",
    icon: Users,
    description: "Progress, Milestone, Contact",
  },
  {
    name: "Timeline",
    icon: CalendarDays,
    description: "Progress, Milestone, Updates",
  },
  { name: "Minimal", icon: Minimize2, description: "Progress only" },
];

export const Controls = ({
  config,
  updateConfig,
  setTemplate,
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
  // Small: 2, Medium: 3, Large: 4, Extra Large: 5 data components
  const maxComponents = {
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
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

  return (
    <div className="flex flex-col w-full max-w-[320px]">
      {/* Section: Template */}
      <CollapsibleSection title="Template" defaultOpen={true}>
        <div className="w-full flex flex-wrap gap-2">
          {TEMPLATES.map(({ name, icon: IconComponent }) => {
            const isSelected = config.template === name;

            return (
              <button
                key={name}
                onClick={() => setTemplate(name)}
                className={`flex items-center gap-2 py-1.5 pl-[10px] pr-3 rounded-[24px] text-[13px] font-medium leading-none whitespace-nowrap transition-colors group border ${
                  isSelected
                    ? "border-[#34C759] bg-[#34C759]/10 text-[#34C759]"
                    : "border-[#8E8B86]/30 hover:bg-white/5 text-[#8E8B86]"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${
                    isSelected ? "text-[#34C759]" : "text-[#8E8B86]"
                  }`}
                />
                <span>{name}</span>
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
