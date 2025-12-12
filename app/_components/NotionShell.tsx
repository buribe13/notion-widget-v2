"use client";

import React from "react";
import { NotionSidebar } from "./NotionSidebar";
import { NotionTopbar } from "./NotionTopbar";

interface NotionShellProps {
  children: React.ReactNode;
  breadcrumbs: string[];
  pageTitle?: string;
  pageIcon?: string;
}

export const NotionShell = ({
  children,
  breadcrumbs,
  pageTitle,
  pageIcon,
}: NotionShellProps) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-notion-dark text-notion-text overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <NotionSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <NotionTopbar
            breadcrumbs={breadcrumbs}
            pageTitle={pageTitle}
            pageIcon={pageIcon}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-[#1E1E1E]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
