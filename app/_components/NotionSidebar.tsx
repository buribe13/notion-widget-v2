"use client";

import React from "react";

export const NotionSidebar = () => {
  return (
    <aside className="w-[240px] bg-[#2E2E2E] border-r border-notion-border flex flex-col h-full overflow-y-auto">
      {/* Workspace Header */}
      <div className="px-3 py-2.5 flex items-center justify-between group">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-5 h-5 rounded bg-red-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white font-medium">
            b
          </div>
          <span className="text-sm font-medium text-notion-text truncate">
            benjamin's Notion
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="4"
                y="2"
                width="4"
                height="4"
                rx="0.5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 4.5L6 1.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 mb-2">
        <div className="relative">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle
                cx="6"
                cy="6"
                r="4.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M9 9l3 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Q Search"
            className="w-full pl-8 pr-2.5 py-1.5 text-sm bg-white/5 border border-transparent rounded hover:bg-white/8 focus:bg-white/10 focus:border-white/20 text-notion-text placeholder:text-notion-text-dim focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="px-1.5 mb-1">
        {[
          { icon: "🏠", label: "Home" },
          { icon: "📅", label: "Meetings" },
          { icon: "✨", label: "Notion AI" },
          { icon: "📥", label: "Inbox" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-white/5 text-sm text-notion-text-dim hover:text-notion-text transition-colors group"
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-notion-border mx-3 my-1" />

      {/* Favorites Section */}
      <div className="px-3 py-1.5">
        <button className="w-full flex items-center justify-between group">
          <span className="text-[11px] font-medium text-notion-text-dim uppercase tracking-wider">
            Favorites
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <div className="mt-1 space-y-0.5">
          {[
            { icon: "📅", label: "WKLY AGENDA", badge: "17" },
            { icon: "⭐", label: "dashboard / breadcrumb st..." },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-notion-text transition-colors group"
            >
              <span className="text-base relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="truncate flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Section */}
      <div className="px-3 py-1.5">
        <button className="w-full flex items-center justify-between group">
          <span className="text-[11px] font-medium text-notion-text-dim uppercase tracking-wider">
            Workspace
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <div className="mt-1 space-y-0.5">
          {[
            { icon: "⭐", label: "dashboard / breadcrumb st..." },
            { icon: "🍎", label: "My Dashboard" },
            { icon: "⚾", label: "UX project planner/tracker" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-notion-text transition-colors group"
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shared Section */}
      <div className="px-3 py-1.5">
        <button className="w-full flex items-center justify-between group">
          <span className="text-[11px] font-medium text-notion-text-dim uppercase tracking-wider">
            Shared
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <div className="mt-1 space-y-0.5">
          <button className="w-full flex items-center gap-2 px-2 py-1 rounded bg-white/5 text-sm text-notion-text transition-colors group">
            <span className="text-base">🍎</span>
            <span className="truncate flex-1 text-left">My Dashboard</span>
          </button>
        </div>
      </div>

      {/* Private Section */}
      <div className="px-3 py-1.5">
        <button className="w-full flex items-center justify-between group">
          <span className="text-[11px] font-medium text-notion-text-dim uppercase tracking-wider">
            Private
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <div className="mt-1 space-y-0.5">
          {[
            { icon: "📄", label: "MAX New Site Thoughts" },
            { icon: "📄", label: "@October 30, 2025 4:03 PM" },
            { icon: "📄", label: "Nike -> Business Engagem..." },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-notion-text transition-colors group"
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notion Apps Section */}
      <div className="px-3 py-1.5">
        <button className="w-full flex items-center justify-between group">
          <span className="text-[11px] font-medium text-notion-text-dim uppercase tracking-wider">
            Notion apps
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <div className="mt-1 space-y-0.5">
          {[
            { icon: "✈️", label: "Notion Mail" },
            { icon: "📅", label: "Notion Calendar" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 text-sm text-notion-text transition-colors group"
            >
              <span className="text-base">{item.icon}</span>
              <span className="truncate flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Actions */}
      <div className="px-3 py-2 border-t border-notion-border space-y-0.5">
        {[
          { icon: "⚙️", label: "Settings" },
          { icon: "🛒", label: "Marketplace" },
          { icon: "🗑️", label: "Trash" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-sm text-notion-text-dim hover:text-notion-text transition-colors"
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Icons */}
      <div className="px-3 py-2 flex items-center gap-3 justify-center border-t border-notion-border">
        <button className="w-5 h-5 flex items-center justify-center hover:bg-white/5 rounded">
          <span className="text-sm">?</span>
        </button>
        <button className="w-5 h-5 flex items-center justify-center hover:bg-white/5 rounded">
          <span className="text-xs">⚡</span>
        </button>
      </div>
    </aside>
  );
};
