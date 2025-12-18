"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#191919] text-white overflow-hidden">
      {/* Top Bar - mimics Notion's onboarding header */}
      <header className="h-[46px] flex items-center justify-between px-4 flex-shrink-0">
        {/* Left: notion.so / Onboarding breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#9B9A97]">
          <span>notion.so</span>
          <span>/</span>
          <span>Onboarding</span>
        </div>

        {/* Right: Theme toggle + Chat */}
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-[#9B9A97]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 text-[13px] text-[#9B9A97]">
            <span className="text-base">🗨️</span>
            Chat
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-8">
        {/* Back + Language Selector Row */}
        <div className="w-full max-w-[860px] px-4 mb-8">
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center hover:bg-white/5 rounded text-[#9B9A97]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 text-[13px] text-white hover:bg-white/5 px-2 py-1 rounded">
              English (US)
              <ChevronDown className="w-3.5 h-3.5 text-[#9B9A97]" />
            </button>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center w-full max-w-[500px] px-4">
          {/* Title */}
          <h1 className="text-[28px] font-semibold text-white mb-3 text-center">
            Collaborate with teammates
          </h1>
          <p className="text-[15px] text-[#9B9A97] mb-10 text-center">
            Connect with your team, or create your own space to get started
          </p>

          {/* Workspace Card */}
          <div className="w-full bg-[#2F2F2F] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded bg-[#5078F2] flex items-center justify-center text-white text-lg font-medium">
                  L
                </div>
                {/* Info */}
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-white">
                    Leng Sixuan的工作空间
                  </span>
                  <span className="text-[13px] text-[#9B9A97]">4 members</span>
                </div>
              </div>
              {/* Join Button */}
              <Link
                href="/home"
                className="text-[14px] font-medium text-[#5078F2] hover:text-[#6B8FF5] transition-colors"
              >
                Join
              </Link>
            </div>
          </div>

          {/* Divider with "or" */}
          <div className="flex items-center w-full gap-4 mb-6">
            <div className="flex-1 h-px bg-[#3E3E3E]"></div>
            <span className="text-[13px] text-[#9B9A97]">or</span>
            <div className="flex-1 h-px bg-[#3E3E3E]"></div>
          </div>

          {/* Create new workspace button */}
          <button className="w-full bg-[#5078F2] hover:bg-[#4068E0] text-white text-[14px] font-medium py-2.5 rounded-lg transition-colors">
            Create new workspace
          </button>
        </div>
      </main>
    </div>
  );
}
