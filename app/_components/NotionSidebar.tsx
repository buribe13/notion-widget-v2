"use client";

import React, { useState } from "react";
import {
  Home,
  Calendar,
  Sparkles,
  Inbox,
  Settings,
  ShoppingCart,
  Trash2,
  HelpCircle,
  Zap,
  Plus,
  FileText,
  Mail,
  Search,
} from "lucide-react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({
  title,
  children,
  defaultOpen = true,
}: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="px-3 py-1.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <span className="text-[11px] font-medium text-[#8E8B86]">{title}</span>
        <Plus className="w-3 h-3 text-[#8E8B86] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      {isOpen && <div className="mt-2 space-y-0.5 -ml-2">{children}</div>}
    </div>
  );
};

export const NotionSidebar = () => {
  return (
    <aside className="w-[240px] bg-[#1E1E1E] border-r border-notion-border flex flex-col h-full overflow-y-auto">
      {/* Workspace Header */}
      <div className="px-3 py-2.5 mb-6 flex items-center justify-between group">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-5 h-5 rounded-2xl bg-red-500 flex-shrink-0 flex items-center justify-center text-[9px] text-white font-medium">
            b
          </div>
          <span className="text-[13px] font-medium text-notion-text truncate">
            benjamin's Notion
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded-[6px] text-[#8E8B86]">
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
          <button className="w-4 h-4 flex items-center justify-center hover:bg-white/10 rounded-[6px] text-[#8E8B86]">
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

      {/* Primary Navigation */}
      <div className="px-1 mb-[18px]">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] hover:text-[#8E8B86] transition-colors group">
          <Search className="w-4 h-4 text-[#8E8B86]" />
          <span>Search</span>
        </button>
        {[
          { icon: Home, label: "Home" },
          { icon: Calendar, label: "Meetings" },
          { icon: Sparkles, label: "Notion AI" },
          { icon: Inbox, label: "Inbox" },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] hover:text-[#8E8B86] transition-colors group"
            >
              <IconComponent className="w-4 h-4 text-[#8E8B86]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Favorites Section */}
      <CollapsibleSection title="Favorites">
        {[
          { icon: "📅", label: "WKLY AGENDA", badge: "17" },
          { icon: "⭐", label: "dashboard / breadcrumb st..." },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group"
          >
            <span className="text-[14px] relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="truncate flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </CollapsibleSection>

      {/* Workspace Section */}
      <CollapsibleSection title="Workspace">
        {[
          { icon: "⭐", label: "dashboard / breadcrumb st..." },
          { icon: "🍎", label: "My Dashboard" },
          { icon: "⚾", label: "UX project planner/tracker" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group"
          >
            <span className="text-[14px]">{item.icon}</span>
            <span className="truncate flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </CollapsibleSection>

      {/* Shared Section */}
      <CollapsibleSection title="Shared">
        <button className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group">
          <span className="text-[14px]">🍎</span>
          <span className="truncate flex-1 text-left">My Dashboard</span>
        </button>
      </CollapsibleSection>

      {/* Private Section */}
      <CollapsibleSection title="Private">
        {[
          { label: "MAX New Site Thoughts" },
          { label: "@October 30, 2025 4:03 PM" },
          { label: "Nike -> Business Engagem..." },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group"
          >
            <FileText className="w-4 h-4 text-[#8E8B86]" />
            <span className="truncate flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </CollapsibleSection>

      {/* Notion Apps Section */}
      <CollapsibleSection title="Notion apps">
        {[
          { icon: Mail, label: "Notion Mail" },
          { icon: Calendar, label: "Notion Calendar" },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group"
            >
              <IconComponent className="w-4 h-4 text-[#8E8B86]" />
              <span className="truncate flex-1 text-left">{item.label}</span>
            </button>
          );
        })}
      </CollapsibleSection>

      {/* Bottom Actions */}
      <div className="px-1 py-2 mt-[18px] space-y-0.5">
        {[
          { icon: Settings, label: "Settings" },
          { icon: ShoppingCart, label: "Marketplace" },
          { icon: Trash2, label: "Trash" },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] hover:text-[#8E8B86] transition-colors"
            >
              <IconComponent className="w-4 h-4 text-[#8E8B86]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Icons */}
      <div className="px-3 py-2 flex items-center gap-3">
        <button className="w-5 h-5 flex items-center justify-center hover:bg-white/5 rounded-[6px] text-[#8E8B86] hover:text-[#8E8B86] transition-colors">
          <HelpCircle className="w-4 h-4 text-[#8E8B86]" />
        </button>
        <button className="w-5 h-5 flex items-center justify-center hover:bg-white/5 rounded-[6px] text-[#8E8B86] hover:text-[#8E8B86] transition-colors">
          <Zap className="w-4 h-4 text-[#8E8B86]" />
        </button>
      </div>
    </aside>
  );
};
