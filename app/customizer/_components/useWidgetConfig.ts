import { useState } from "react";

export type WidgetTheme =
  | "Cream"
  | "Cool Ocean"
  | "Sandstorm"
  | "Midnight"
  | "Forest"
  | "Sunset";

// Templates define which data components are shown
export type WidgetTemplate =
  | "Dashboard"
  | "Client View"
  | "Timeline"
  | "Minimal";

// Template presets - each template has a predefined set of visible data
export const templatePresets: Record<
  WidgetTemplate,
  WidgetConfig["visibleData"]
> = {
  Dashboard: {
    progress: true,
    nextMilestone: true,
    lastUpdate: true,
    chart: false,
    gantt: false,
    list: false,
    contact: false,
    gallery: false,
  },
  "Client View": {
    progress: true,
    nextMilestone: true,
    lastUpdate: false,
    chart: false,
    gantt: false,
    list: false,
    contact: true,
    gallery: false,
  },
  Timeline: {
    progress: true,
    nextMilestone: true,
    lastUpdate: true,
    chart: false,
    gantt: false,
    list: false,
    contact: false,
    gallery: false,
  },
  Minimal: {
    progress: true,
    nextMilestone: false,
    lastUpdate: false,
    chart: false,
    gantt: false,
    list: false,
    contact: false,
    gallery: false,
  },
};

export interface WidgetConfig {
  projectName: string;
  clientName: string;
  template: WidgetTemplate;
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
  clientName: "",
  template: "Client View",
  theme: "Cream",
  visibleData: {
    progress: true,
    nextMilestone: true,
    lastUpdate: false,
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

  // When selecting a template, apply its preset visible data
  const setTemplate = (template: WidgetTemplate) => {
    setConfig((prev) => ({
      ...prev,
      template,
      visibleData: templatePresets[template],
    }));
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

  return { config, updateConfig, setTemplate, toggleVisibleData };
}
