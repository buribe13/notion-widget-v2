"use client";

import React, { useState } from "react";
import { NotionShell } from "./_components/NotionShell";
import { useWidgetConfig } from "./customizer/_components/useWidgetConfig";
import { Controls } from "./customizer/_components/Controls";
import { WidgetPreviewCard } from "./customizer/_components/WidgetPreviewCard";
import { RefreshCw, ExternalLink } from "lucide-react";

export default function Home() {
  const { config, updateConfig, toggleVisibleData } = useWidgetConfig();
  const [size, setSize] = useState<"S" | "M" | "L">("L");

  // Dynamic breadcrumb: last segment uses project name
  const breadcrumbs = ["dashboard", config.projectName || "Widget Builder"];

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving widget...", { config, size });
  };

  return (
    <NotionShell breadcrumbs={breadcrumbs}>
      <div className="max-w-[1600px] mx-auto pt-6 px-8 pb-6 flex flex-col gap-0 h-full">
        {/* Header Section - Split Layout */}
        <div className="mb-8 flex gap-4 flex-shrink-0">
          {/* Left Section: Branding */}
          <div className="flex items-start gap-3 px-8 py-6 flex-1">
            <div>
              <h1 className="text-[32px] font-bold text-white mb-1 leading-tight flex items-center gap-2">
                <span className="text-2xl">🧩</span>
                Widget Builder
              </h1>
              <p className="text-[13px] font-normal text-white leading-tight">
                Manage and execute projects from start to finish.
              </p>
            </div>
          </div>

          {/* Right Section: Dark Gray Container with Sync Feed Milestones */}
          <div className="bg-[#1E1E1E] rounded-xl flex-1 p-6 flex gap-8">
            {/* Sync Feed Milestones Component */}
            <div className="flex flex-col items-center flex-1 py-[65px] px-3">
              <div className="w-10 h-10 rounded-full bg-[#555555] flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5 text-[#B0B0B0]" />
              </div>
              <p className="text-[13px] font-normal text-[#B0B0B0] text-center mb-3 leading-tight max-w-[280px]">
                Sync Feed Milestones automatically in the Select Project button.
              </p>
              <a
                href="#"
                className="text-[13px] font-normal text-[#5078F2] hover:no-underline"
              >
                Select Project
              </a>
            </div>

            {/* Milestone List */}
            <div className="flex flex-col gap-6 flex-1 h-full justify-center">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-start gap-3">
                  <div className="w-px h-6 bg-[#555555] mt-0.5"></div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#B0B0B0] leading-tight">
                      Milestone {num}
                    </span>
                    <span className="text-[11px] font-normal text-[#B0B0B0] leading-tight">
                      DUE 12/17
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget Customizer Content */}
        <div className="flex gap-8 flex-1 min-h-0">
          {/* Left Panel: Controls */}
          <aside className="w-[380px] flex-shrink-0">
            <Controls
              config={config}
              updateConfig={updateConfig}
              toggleVisibleData={toggleVisibleData}
              size={size}
            />
          </aside>

          {/* Right Panel: Preview */}
          <section className="flex-1 min-w-0 min-h-0 flex flex-col">
            {/* Widget Preview Area */}
            <div className="bg-[#1E1E1E] rounded-xl p-12 flex-1 flex items-center justify-center relative overflow-hidden min-h-0">
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

            {/* Size Controls and Save Button - Fixed at Bottom */}
            <div className="bg-[#1E1E1E] rounded-b-xl px-12 pb-6 flex items-center justify-center gap-4 flex-shrink-0">
              {/* Size Controls */}
              <div className="flex gap-2">
                {(["S", "M", "L"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-9 h-9 rounded-xl text-xs font-medium transition-colors ${
                      size === s
                        ? "bg-[#141414] text-white"
                        : "bg-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Vertical Divider */}
              <div className="w-[2px] h-9 bg-white/20"></div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="bg-[#141414] hover:bg-[#353535] text-white px-[10px] py-[10px] rounded-xl text-xs font-medium transition-colors"
              >
                Save to Device
              </button>
            </div>
          </section>
        </div>
      </div>
    </NotionShell>
  );
}
