"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Sparkles,
  Inbox,
  Settings,
  ShoppingCart,
  Trash2,
  ChevronRight,
  Search,
  PenLine,
  Users,
  Mail,
} from "lucide-react";

interface NotionSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

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
        <ChevronRight
          className={`w-3 h-3 text-[#8E8B86] opacity-0 group-hover:opacity-100 transition-all ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-2 space-y-0.5 -ml-2">{children}</div>}
    </div>
  );
};

export const NotionSidebar = ({
  collapsed,
  onToggleCollapsed,
}: NotionSidebarProps) => {
  const pathname = usePathname();

  // Don't render when collapsed - sidebar is completely hidden
  if (collapsed) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-[240px] bg-[#1E1E1E] border-r border-notion-border flex flex-col h-full overflow-y-auto transition-all duration-200">
      {/* Workspace Header */}
      <div className="px-3 py-2.5 flex items-center">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-[9px] text-white font-medium">
            b
          </div>
          <span className="text-[13px] font-medium text-notion-text truncate">
            benjamin&apos;s Notion
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="px-1 mb-[18px]">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] hover:text-[#8E8B86] transition-colors group">
          <Search className="w-4 h-4 text-[#8E8B86]" />
          <span>Search</span>
        </button>
        {[
          { icon: Home, label: "Home", href: "/home" },
          { icon: Calendar, label: "Meetings", href: "#" },
          { icon: Sparkles, label: "Notion AI", href: "#" },
          { icon: Inbox, label: "Inbox", href: "#" },
        ].map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors ${
                active
                  ? "bg-white/5 text-white"
                  : "hover:bg-white/5 text-[#8E8B86] hover:text-[#8E8B86]"
              }`}
            >
              <IconComponent
                className={`w-4 h-4 ${
                  active ? "text-white" : "text-[#8E8B86]"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Private Section */}
      <CollapsibleSection title="Private">
        {[
          { icon: "👋", label: "Getting Started" },
          { icon: "≡", label: "To Do List", isIcon: true },
          { icon: "👥", label: "1:1 notes", iconComponent: Users },
          { icon: "✏️", label: "Scratchpad", iconComponent: PenLine },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-2 py-1 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] transition-colors group"
          >
            {item.iconComponent ? (
              <item.iconComponent className="w-4 h-4 text-[#8E8B86]" />
            ) : (
              <span className="text-[14px] w-4 text-center">{item.icon}</span>
            )}
            <span className="truncate flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </CollapsibleSection>

      {/* Teamspaces Section */}
      <CollapsibleSection title="Teamspaces" defaultOpen={false}>
        <div className="px-2 py-1 text-[12px] text-[#8E8B86]">
          No teamspaces yet
        </div>
      </CollapsibleSection>

      {/* Notion apps Section */}
      <CollapsibleSection title="Notion apps" defaultOpen={true}>
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
      <div className="px-3 py-2 flex flex-col gap-1">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/5 text-[13px] font-medium text-[#8E8B86] hover:text-[#8E8B86] transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[#8E8B86]"
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M8 5v6M5 8h6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span>Upgrade plan</span>
        </button>
      </div>
    </aside>
  );
};
