"use client";

import React from "react";

interface NotionTopbarProps {
  breadcrumbs: string[];
}

export const NotionTopbar = ({ breadcrumbs }: NotionTopbarProps) => {
  return (
    <header className="h-[46px] bg-[#141414] flex items-center px-4 gap-3 flex-shrink-0 border-0 border-none">
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
      <div className="flex items-center gap-2 text-[13px] min-w-0 flex-1">
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

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-notion-text-dim">
          Edited just now
        </span>
        <button className="px-2.5 py-1 rounded hover:bg-white/5 text-[13px] text-notion-text-dim hover:text-notion-text transition-colors">
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
