import { useState } from "react";

export type WidgetTheme =
  | "Cream"
  | "Cool Ocean"
  | "Sandstorm"
  | "Midnight"
  | "Forest"
  | "Sunset";
export type DisplayMode = "Progress" | "Compact" | "Milestone";

export interface WidgetConfig {
  projectName: string;
  clientName: string;
  displayMode: DisplayMode;
  theme: WidgetTheme;
  visibleData: {
    progress: boolean;
    nextMilestone: boolean;
    lastUpdate: boolean;
    chart: boolean;
    gantt: boolean;
    list: boolean;
    contact: boolean;
    gallery: boolean;
  };
}

export const initialConfig: WidgetConfig = {
  projectName: "Portfolio Website",
  clientName: "Breadcrumb Studio",
  displayMode: "Progress",
  theme: "Cream",
  visibleData: {
    progress: true,
    nextMilestone: true,
    lastUpdate: true,
    chart: false,
    gantt: false,
    list: false,
    contact: true,
    gallery: false,
  },
};

export function useWidgetConfig() {
  const [config, setConfig] = useState<WidgetConfig>(initialConfig);

  const updateConfig = (updates: Partial<WidgetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const toggleVisibleData = (key: keyof WidgetConfig["visibleData"]) => {
    setConfig((prev) => ({
      ...prev,
      visibleData: {
        ...prev.visibleData,
        [key]: !prev.visibleData[key],
      },
    }));
  };

  return { config, updateConfig, toggleVisibleData };
}
