"use client";

import React from "react";
import { NotionSidebar } from "./NotionSidebar";
import { NotionTopbar } from "./NotionTopbar";

interface NotionShellProps {
  children: React.ReactNode;
  breadcrumbs: string[];
}

export const NotionShell = ({ children, breadcrumbs }: NotionShellProps) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-notion-dark text-notion-text overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <NotionSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <NotionTopbar breadcrumbs={breadcrumbs} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#141414] min-h-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
