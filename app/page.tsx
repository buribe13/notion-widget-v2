"use client";

import React from "react";
import { NotionShell } from "./_components/NotionShell";
import { useWidgetConfig } from "./customizer/_components/useWidgetConfig";
import { Controls } from "./customizer/_components/Controls";
import { WidgetPreviewCard } from "./customizer/_components/WidgetPreviewCard";

export default function Home() {
  const { config, updateConfig, toggleVisibleData } = useWidgetConfig();

  // Dynamic breadcrumb: last segment uses project name
  const breadcrumbs = [
    "dashboard",
    "breadcrumb st...",
    config.projectName || "Widget Builder",
  ];

  return (
    <NotionShell
      breadcrumbs={breadcrumbs}
      pageTitle="Widget Builder"
      pageIcon="🌐"
    >
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">
              🌐
            </div>
            <div>
              <h1 className="text-4xl font-bold text-notion-text mb-1">
                Widget Builder
              </h1>
              <p className="text-sm text-notion-text-dim">
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
          <section className="flex-1 min-w-0 space-y-4">
            {/* Milestone List Card */}
            <div className="bg-notion-panel border border-notion-border rounded-lg p-4">
              <div className="grid grid-cols-4 gap-3">
                {[
                  "Milestone 1",
                  "Milestone 2",
                  "Milestone 3",
                  "Milestone 4",
                ].map((milestone, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-xs text-notion-text-dim">
                      {milestone}
                    </span>
                    <span className="text-xs font-medium text-notion-text">
                      DUE 12/17
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget Preview Area */}
            <div className="bg-[#191919] rounded-lg p-12 flex items-center justify-center min-h-[600px] relative overflow-hidden">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />

              <WidgetPreviewCard config={config} />
            </div>
          </section>
        </div>
      </div>
    </NotionShell>
  );
}
