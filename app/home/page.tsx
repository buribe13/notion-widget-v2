"use client";

import React from "react";
import Link from "next/link";
import { NotionShell } from "../_components/NotionShell";
import {
  Clock,
  Book,
  Calendar,
  Plus,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";

// Learn cards data
const LEARN_CARDS = [
  {
    id: "block",
    title: "What is a block?",
    duration: "2m read",
    icon: Book,
    image: "/images/blocks.png",
    href: "#",
  },
  {
    id: "widget",
    title: "Widget customizer",
    duration: "Easy",
    icon: Book,
    image: null,
    href: "/customizer",
    isWidgetCard: true,
  },
  {
    id: "first-page",
    title: "Create your first page",
    duration: "2m watch",
    icon: Clock,
    image: "/images/first-page.png",
    href: "#",
  },
  {
    id: "subpage",
    title: "Create a subpage",
    duration: "2m read",
    icon: Book,
    image: "/images/subpage.png",
    href: "#",
  },
];

// Upcoming events data
const UPCOMING_EVENTS = [
  {
    date: "Today",
    dateNum: "Dec 18",
    title: "Team standup",
    time: "9 AM · Office",
    action: "Join and take notes",
  },
  {
    date: "Fri",
    dateNum: "Dec 19",
    title: "Project check-in",
    time: "10 AM · Office",
    action: null,
  },
];

export default function HomePage() {
  const breadcrumbs = ["Home"];

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <NotionShell breadcrumbs={breadcrumbs}>
      <div className="max-w-[900px] mx-auto pt-12 px-12 pb-8">
        {/* Top Right Actions */}
        <div className="absolute top-[52px] right-4">
          <button className="w-7 h-7 flex items-center justify-center hover:bg-white/5 rounded text-[#9B9A97]">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Greeting */}
        <h1 className="text-[32px] font-bold text-white mb-10 text-center">
          {getGreeting()}
        </h1>

        {/* Recently visited */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#9B9A97]" />
            <span className="text-[13px] text-[#9B9A97] font-medium">
              Recently visited
            </span>
          </div>

          {/* New page card and Dashboard link */}
          <div className="flex gap-4">
            <div className="w-[140px] h-[100px] bg-[#2F2F2F] hover:bg-[#3A3A3A] rounded-lg border border-[#3E3E3E] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors">
              <Plus className="w-5 h-5 text-[#9B9A97]" />
              <span className="text-[13px] text-[#9B9A97]">New page</span>
            </div>
            <a
              href="https://notion-client-2025.vercel.app/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[180px] bg-[#2F2F2F] hover:bg-[#3A3A3A] rounded-lg overflow-hidden transition-colors border border-transparent hover:border-[#555555]"
            >
              {/* Card Image Area */}
              <div className="h-[90px] bg-[#F5F5F5] flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              {/* Card Content */}
              <div className="p-3">
                <h3 className="text-[13px] font-medium text-white mb-2">
                  Olivia&apos;s Site
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] text-[#9B9A97] min-w-0">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    Jordan Lee&apos;s Design Workspace
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Learn */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Book className="w-4 h-4 text-[#9B9A97]" />
            <span className="text-[13px] text-[#9B9A97] font-medium">
              Learn
            </span>
          </div>

          {/* Learn cards grid */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {LEARN_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="flex-shrink-0 w-[180px] bg-[#2F2F2F] hover:bg-[#3A3A3A] rounded-lg overflow-hidden transition-colors border border-transparent hover:border-[#555555]"
              >
                {/* Card Image/Illustration Area */}
                <div className="h-[90px] bg-[#F5F5F5] flex items-center justify-center">
                  {card.isWidgetCard ? (
                    <div className="flex items-center justify-center">
                      <span className="text-3xl">🧩</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        width="60"
                        height="50"
                        viewBox="0 0 60 50"
                        fill="none"
                      >
                        {/* Simple block illustration */}
                        <rect
                          x="5"
                          y="10"
                          width="20"
                          height="15"
                          rx="2"
                          fill="#2D2D2D"
                          transform="rotate(-10 5 10)"
                        />
                        <rect
                          x="25"
                          y="15"
                          width="20"
                          height="15"
                          rx="2"
                          fill="#2D2D2D"
                        />
                        <rect
                          x="15"
                          y="25"
                          width="20"
                          height="15"
                          rx="2"
                          fill="#2D2D2D"
                          transform="rotate(5 15 25)"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-3">
                  <h3 className="text-[13px] font-medium text-white mb-2">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#9B9A97]">
                    <card.icon className="w-3 h-3" />
                    <span>{card.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming events */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[#9B9A97]" />
            <span className="text-[13px] text-[#9B9A97] font-medium">
              Upcoming events
            </span>
          </div>

          {/* Events container */}
          <div className="bg-[#2F2F2F] rounded-lg overflow-hidden">
            <div className="flex">
              {/* Left side - Calendar connect CTA */}
              <div className="flex-1 p-6 border-r border-[#3E3E3E]">
                <div className="w-10 h-10 bg-[#3E3E3E] rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5 text-[#9B9A97]" />
                </div>
                <h3 className="text-[14px] font-medium text-white mb-1">
                  Connect AI Meeting Notes
                </h3>
                <p className="text-[14px] text-[#9B9A97] mb-1">
                  with your Calendar events
                </p>
                <p className="text-[13px] text-[#9B9A97] mb-4">
                  Join calls, transcribe audio, and summarize meetings all in
                  Notion.
                </p>
                <button className="text-[13px] text-[#5078F2] hover:text-[#6B8FF5] font-medium transition-colors">
                  Connect Notion Calendar
                </button>
              </div>

              {/* Right side - Events list */}
              <div className="flex-1 p-4">
                {UPCOMING_EVENTS.map((event, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 ${
                      idx > 0 ? "mt-4 pt-4 border-t border-[#3E3E3E]" : ""
                    }`}
                  >
                    {/* Date column */}
                    <div className="w-12 flex-shrink-0">
                      <div className="text-[12px] text-[#9B9A97]">
                        {event.date}
                      </div>
                      <div className="text-[12px] text-[#9B9A97]">
                        {event.dateNum}
                      </div>
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-white mb-0.5">
                        {event.title}
                      </div>
                      <div className="text-[12px] text-[#9B9A97]">
                        {event.time}
                      </div>
                      {event.action && (
                        <button className="mt-2 flex items-center gap-1.5 text-[12px] text-[#9B9A97] hover:text-white transition-colors">
                          <span className="w-4 h-4 bg-[#3E3E3E] rounded flex items-center justify-center">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="currentColor"
                            >
                              <rect width="10" height="10" rx="2" />
                            </svg>
                          </span>
                          {event.action}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured templates */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[#9B9A97]"
            >
              <path
                d="M8 1L10 5.5L15 6.2L11.5 9.5L12.4 14.5L8 12L3.6 14.5L4.5 9.5L1 6.2L6 5.5L8 1Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[13px] text-[#9B9A97] font-medium">
              Featured templates
            </span>
          </div>
        </section>
      </div>
    </NotionShell>
  );
}
