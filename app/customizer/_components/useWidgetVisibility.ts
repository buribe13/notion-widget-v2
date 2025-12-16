import { WidgetConfig } from "./useWidgetConfig";

export type WidgetSize = "S" | "M" | "L";

export interface VisibleComponents {
  progress: boolean;
  nextMilestone: boolean;
  contact: boolean;
  lastUpdate: boolean;
  openButton: boolean;
}

/**
 * Determines which components should be visible based on widget size and configuration.
 *
 * Component limits:
 * - Small (S): Maximum 2 data components
 * - Medium (M): Maximum 3 data components
 * - Large (L): Maximum 4 data components
 *
 * Priority order (most important first):
 * 1. Progress (if displayMode is Progress)
 * 2. Next Milestone
 * 3. Contact
 * 4. Last Update
 *
 * Note: Open Button is always shown in Large size (doesn't count toward limit)
 */
export function useWidgetVisibility(
  config: WidgetConfig,
  size: WidgetSize
): VisibleComponents {
  const maxComponents = {
    S: 2,
    M: 3,
    L: 4,
  }[size];

  const visibleComponents: VisibleComponents = {
    progress: false,
    nextMilestone: false,
    contact: false,
    lastUpdate: false,
    openButton: size === "L", // Always show in large, doesn't count toward limit
  };

  let componentCount = 0;

  // Priority 1: Progress (if displayMode is Progress)
  if (
    config.displayMode === "Progress" &&
    config.visibleData.progress &&
    componentCount < maxComponents
  ) {
    visibleComponents.progress = true;
    componentCount++;
  }

  // Priority 2: Next Milestone
  if (config.visibleData.nextMilestone && componentCount < maxComponents) {
    visibleComponents.nextMilestone = true;
    componentCount++;
  }

  // Priority 3: Contact
  if (config.visibleData.contact && componentCount < maxComponents) {
    visibleComponents.contact = true;
    componentCount++;
  }

  // Priority 4: Last Update
  if (config.visibleData.lastUpdate && componentCount < maxComponents) {
    visibleComponents.lastUpdate = true;
    componentCount++;
  }

  return visibleComponents;
}


