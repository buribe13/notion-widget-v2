"use client";

import React, { useState } from "react";
import { NotionShell } from "./_components/NotionShell";
import { useWidgetConfig } from "./customizer/_components/useWidgetConfig";
import { Controls } from "./customizer/_components/Controls";
import { WidgetPreviewCard } from "./customizer/_components/WidgetPreviewCard";

export default function Home() {
  const { config, updateConfig, toggleVisibleData } = useWidgetConfig();
  const [size, setSize] = useState<"S" | "M" | "L">("S");

  // Dynamic breadcrumb: last segment uses project name
  const breadcrumbs = [
    "dashboard",
    "breadcrumb st...",
    config.projectName || "Widget Builder",
  ];

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving widget...", { config, size });
  };

  return (
    <NotionShell breadcrumbs={breadcrumbs}>
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[22px]">
              🌐
            </div>
            <div>
              <h1 className="text-[32px] font-bold text-notion-text mb-1">
                Widget Builder
              </h1>
              <p className="text-[13px] text-notion-text-dim">
                Manage and execute projects from start to finish.
              </p>
            </div>
          </div>
        </div>

        {/* Widget Customizer Content */}
        <div className="flex gap-8">
          {/* Left Panel: Controls */}
          <aside className="w-[380px] flex-shrink-0">
            <Controls
              config={config}
              updateConfig={updateConfig}
              toggleVisibleData={toggleVisibleData}
            />
          </aside>

          {/* Right Panel: Preview */}
          <section className="flex-1 min-w-0">
            {/* Widget Preview Area */}
            <div className="bg-[#141414] rounded-lg p-12 flex items-center justify-center min-h-[600px] relative overflow-hidden">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />

              <WidgetPreviewCard
                config={config}
                size={size}
                onSizeChange={setSize}
                onSave={handleSave}
              />
            </div>
          </section>
        </div>
      </div>
    </NotionShell>
  );
}
