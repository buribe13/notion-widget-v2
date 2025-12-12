"use client";

import React from "react";

interface NotionTopbarProps {
  breadcrumbs: string[];
  pageTitle?: string;
  pageIcon?: string;
}

export const NotionTopbar = ({
  breadcrumbs,
  pageTitle,
  pageIcon,
}: NotionTopbarProps) => {
  return (
    <header className="h-[46px] bg-[#2E2E2E] border-b border-notion-border flex items-center px-4 gap-3 flex-shrink-0">
      {/* Navigation Arrows */}
      <div className="flex items-center gap-1">
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded text-notion-text-dim hover:text-notion-text transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 11L5 7L9 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded text-notion-text-dim hover:text-notion-text transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 11L9 7L5 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm min-w-0 flex-1">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span className="text-notion-text-dim flex-shrink-0">/</span>
            )}
            <span
              className={`${
                idx === breadcrumbs.length - 1
                  ? "text-notion-text font-medium"
                  : "text-notion-text-dim"
              } ${
                idx < breadcrumbs.length - 1 && crumb.length > 15
                  ? "truncate max-w-[120px]"
                  : ""
              }`}
              title={crumb}
            >
              {idx < breadcrumbs.length - 1 && crumb.length > 15
                ? `${crumb.slice(0, 12)}...`
                : crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-1">
        {pageTitle && pageIcon && (
          <button className="px-3 py-1.5 rounded bg-white/5 text-sm text-notion-text transition-colors flex items-center gap-1.5 border border-notion-border">
            <span>{pageIcon}</span>
            <span>{pageTitle}</span>
          </button>
        )}
        <button className="px-3 py-1.5 rounded hover:bg-white/5 text-sm text-notion-text-dim hover:text-notion-text transition-colors flex items-center gap-1.5">
          <span>📅</span>
          <span>Meetings</span>
        </button>
        <button className="px-3 py-1.5 rounded hover:bg-white/5 text-sm text-notion-text-dim hover:text-notion-text transition-colors flex items-center gap-1.5">
          <span>⭐</span>
          <span>Templates</span>
        </button>
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded text-notion-text-dim hover:text-notion-text transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 3v8M3 7h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-notion-text-dim">Edited just now</span>
        <button className="px-2.5 py-1 rounded hover:bg-white/5 text-sm text-notion-text-dim hover:text-notion-text transition-colors">
          Share
        </button>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-notion-text-dim hover:text-notion-text transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2L8.62 5.56L12.5 6.1L9.75 8.69L10.5 12.5L7 10.56L3.5 12.5L4.25 8.69L1.5 6.1L5.38 5.56L7 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-notion-text-dim hover:text-notion-text transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="3" r="1" fill="currentColor" />
            <circle cx="7" cy="7" r="1" fill="currentColor" />
            <circle cx="7" cy="11" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
};
