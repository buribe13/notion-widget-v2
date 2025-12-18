"use client";

import React, { useState } from "react";
import { NotionSidebar } from "./NotionSidebar";
import { NotionTopbar } from "./NotionTopbar";

interface NotionShellProps {
  children: React.ReactNode;
  breadcrumbs: string[];
}

export const NotionShell = ({ children, breadcrumbs }: NotionShellProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-notion-dark text-notion-text overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar - Only show when not collapsed */}
        {!sidebarCollapsed && (
          <NotionSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapsed={toggleSidebar}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <NotionTopbar
            breadcrumbs={breadcrumbs}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={toggleSidebar}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#141414] min-h-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
