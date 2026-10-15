"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Project } from "../data/projects";

interface CaseStudyViewProps {
  project: Project;
  onBackToWorks: () => void;
  onNextProject: () => void;
  onPrevProject: () => void;
}

export function CaseStudyView({
  project,
  onBackToWorks,
  onNextProject,
  onPrevProject,
}: CaseStudyViewProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "problem" | "solution" | "architecture" | "techStack" | "results"
  >("overview");

  const containerRef = useRef<HTMLDivElement>(null);
  const contentPanelRef = useRef<HTMLDivElement>(null);

  // Tab switching animation
  useEffect(() => {
    if (!contentPanelRef.current) return;
    gsap.fromTo(
      contentPanelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeTab, project]);

  const tabs: {
    id: "overview" | "problem" | "solution" | "architecture" | "techStack" | "results";
    label: string;
    num: string;
  }[] = [
    { id: "overview", label: "Overview", num: "01" },
    { id: "problem", label: "Problem", num: "02" },
    { id: "solution", label: "Solution", num: "03" },
    { id: "architecture", label: "Architecture", num: "04" },
    { id: "techStack", label: "Tech Stack", num: "05" },
    { id: "results", label: "Results", num: "06" },
  ];

  return (
    <section
      ref={containerRef}
      id="case-study-section"
      className="w-full bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--hairline-strong)] relative overflow-hidden transition-all duration-500"
      aria-label={`${project.title} Case Study`}
    >
      {/* Top Breadcrumb Bar */}
      <div className="w-full px-[var(--space-gutter)] py-4 border-b border-[var(--hairline)] flex items-center justify-between bg-[var(--paper)] z-20 relative">
        <button
          onClick={onBackToWorks}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--ink)] hover:text-[var(--muted)] transition-colors cursor-pointer"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back to Works</span>
        </button>

        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-[var(--muted)] uppercase hidden sm:inline">
            CASE STUDY MONOGRAPH / [{project.index}] {project.title}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevProject}
              className="px-2 py-1 border border-[var(--hairline)] hover:border-[var(--ink)] transition-colors cursor-pointer"
              title="Previous project"
            >
              ←
            </button>
            <button
              onClick={onNextProject}
              className="px-2 py-1 border border-[var(--hairline)] hover:border-[var(--ink)] transition-colors cursor-pointer"
              title="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Dark Cinematic + Right Warm Editorial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[820px] w-full">
        {/* ==================== LEFT COLUMN: CINEMATIC DARK HERO ==================== */}
        <div className="lg:col-span-5 relative bg-[#0e0e0e] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--hairline-strong)]">
          {/* Background image with dramatic dark vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className="object-cover object-center opacity-45 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/75 to-[#0e0e0e]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/80 via-transparent to-[#0e0e0e]" />
          </div>

          {/* Top metadata line */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 font-mono text-[0.68rem] tracking-widest uppercase text-white/70">
              <span>{project.index} / 06</span>
              <span className="h-[1px] w-16 bg-white/40" />
              <span>→</span>
            </div>

            {/* Giant Italic Title */}
            <div>
              <h1 className="font-display-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal tracking-tight text-white m-0 leading-[0.92]">
                {project.title}
              </h1>
              <p className="font-display-sans text-xs sm:text-sm text-white/80 uppercase tracking-widest mt-3 font-light">
                {project.subtitle}
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-md pt-2">
              {project.shortDescription}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-sans text-xs font-medium hover:bg-white/90 transition-all cursor-pointer shadow-md"
                >
                  <span>View Live Demo</span>
                  <span>→</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-white font-sans text-xs font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                <span>View Code</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Inset Detection Window & Handwritten annotation */}
          <div className="relative z-10 pt-10 sm:pt-14 space-y-3">
            {project.detectionImage && (
              <div className="space-y-2 max-w-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/90">
                    <span className="font-handwritten text-lg sm:text-xl rotate-[-4deg] text-amber-200">
                      Real-time detection
                    </span>
                    <svg
                      className="w-5 h-5 text-amber-200/80 rotate-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M 4 8 Q 12 18 18 16"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 14 18 L 19 16 L 16 11"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative border border-white/25 bg-black/60 p-2 shadow-2xl backdrop-blur-sm">
                  {/* Top HUD metadata */}
                  <div className="flex items-center justify-between text-[0.6rem] font-mono text-white/70 pb-1.5 px-1 border-b border-white/15">
                    <span>AERIS / LIVE DETECTION</span>
                    <span className="flex items-center gap-1 text-red-500 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      REC
                    </span>
                  </div>

                  <div className="relative aspect-video w-full mt-1 overflow-hidden">
                    <Image
                      src={project.detectionImage}
                      alt="AERIS Detection Feed"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom micro note */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[0.6rem] font-mono uppercase text-white/50">
              <span>{project.handwrittenAnnotation || "BUILT FOR A SAFER TOMORROW."}</span>
              <span>2026 ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* ==================== RIGHT COLUMN: WARM EDITORIAL CASE STUDY ==================== */}
        <div className="lg:col-span-7 bg-[var(--paper)] text-[var(--ink)] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Top Section Navigation Tabs */}
          <div className="space-y-8">
            <nav
              className="flex items-center gap-4 sm:gap-8 border-b border-[var(--hairline)] pb-4 overflow-x-auto scrollbar-none"
              aria-label="Case study sections"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 font-sans text-xs sm:text-sm tracking-wide transition-colors cursor-pointer pb-1 relative ${
                      isActive
                        ? "text-[var(--ink)] font-semibold"
                        : "text-[var(--muted)] hover:text-[var(--ink)] font-normal"
                    }`}
                  >
                    <span className="font-mono text-[0.65rem] opacity-60 mr-1.5">
                      {tab.num}
                    </span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[var(--ink)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Dynamic Content Panel based on activeTab */}
            <div ref={contentPanelRef} className="space-y-10 min-h-[460px]">
              {/* TAB 01: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-10">
                  {/* Headline & Annotation */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                      <h2 className="font-display-serif text-4xl sm:text-5xl lg:text-6xl italic text-[var(--ink)] font-normal m-0 leading-tight">
                        {project.caseStudy.overview.headline}
                      </h2>
                      <span className="font-handwritten text-xl sm:text-2xl text-[var(--ink-secondary)]">
                        {project.caseStudy.overview.annotation}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
                      <p className="md:col-span-8 font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed m-0">
                        {project.caseStudy.overview.summary}
                      </p>

                      {project.detailImage && (
                        <div className="md:col-span-4 space-y-1.5">
                          <div className="relative aspect-[4/3] w-full border border-[var(--hairline)] overflow-hidden bg-[var(--paper-card)]">
                            <Image
                              src={project.detailImage}
                              alt={project.title}
                              fill
                              className="object-cover grayscale contrast-125"
                            />
                          </div>
                          <span className="block font-mono text-[0.6rem] text-[var(--muted)] uppercase tracking-wider leading-tight">
                            {project.caseStudy.overview.imageCaption || "RESEARCH ARCHIVE"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2-Column Grid: Key Features + My Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--hairline)]">
                    {/* Column 1: Key Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--ink)]">
                          01
                        </span>
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[var(--ink)] m-0">
                          Key Features
                        </h3>
                      </div>
                      <ul className="space-y-2.5 pt-1">
                        {project.caseStudy.overview.keyFeatures.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[var(--ink-secondary)]"
                          >
                            <span className="text-[var(--ink)] font-bold text-xs select-none">
                              ›
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: My Role */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--ink)]">
                          02
                        </span>
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[var(--ink)] m-0">
                          My Role
                        </h3>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed m-0">
                        {project.caseStudy.overview.myRole}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.caseStudy.overview.roleTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full border border-[var(--hairline)] bg-[var(--paper-card)] font-mono text-[0.65rem] text-[var(--ink)] uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 02: PROBLEM */}
              {activeTab === "problem" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display-serif text-4xl sm:text-5xl italic text-[var(--ink)] font-normal m-0">
                      {project.caseStudy.problem.title}
                    </h2>
                    <p className="font-display-sans text-sm sm:text-base text-[var(--muted)] mt-1">
                      {project.caseStudy.problem.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                    {project.caseStudy.problem.content}
                  </p>

                  {project.caseStudy.problem.bullets && (
                    <div className="p-6 bg-[var(--paper-card)] border border-[var(--hairline)] space-y-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ink)] block">
                        Core Constraints &amp; Bottlenecks
                      </span>
                      <ul className="space-y-2">
                        {project.caseStudy.problem.bullets.map((b, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink-secondary)]"
                          >
                            <span className="font-mono text-[var(--ink)] font-bold">
                              [0{idx + 1}]
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 03: SOLUTION */}
              {activeTab === "solution" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display-serif text-4xl sm:text-5xl italic text-[var(--ink)] font-normal m-0">
                      {project.caseStudy.solution.title}
                    </h2>
                    <p className="font-display-sans text-sm sm:text-base text-[var(--muted)] mt-1">
                      {project.caseStudy.solution.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                    {project.caseStudy.solution.content}
                  </p>

                  {project.caseStudy.solution.bullets && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.caseStudy.solution.bullets.map((b, idx) => (
                        <div
                          key={idx}
                          className="p-4 border border-[var(--hairline)] bg-[var(--paper-card)] space-y-1.5"
                        >
                          <span className="font-mono text-[0.65rem] text-[var(--muted)] uppercase">
                            PILLAR 0{idx + 1}
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-[var(--ink)] font-medium leading-normal m-0">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 04: ARCHITECTURE */}
              {activeTab === "architecture" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display-serif text-4xl sm:text-5xl italic text-[var(--ink)] font-normal m-0">
                      {project.caseStudy.architecture.title}
                    </h2>
                    <p className="font-display-sans text-sm sm:text-base text-[var(--muted)] mt-1">
                      {project.caseStudy.architecture.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                    {project.caseStudy.architecture.content}
                  </p>

                  {project.caseStudy.architecture.bullets && (
                    <div className="space-y-3 pt-2">
                      {project.caseStudy.architecture.bullets.map((b, idx) => (
                        <div
                          key={idx}
                          className="p-4 border-l-2 border-l-[var(--ink)] border-y border-r border-[var(--hairline)] bg-[var(--paper-card)]"
                        >
                          <span className="font-mono text-[0.65rem] text-[var(--muted)] uppercase block mb-1">
                            SUBSYSTEM {idx + 1}
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-[var(--ink)] m-0 leading-relaxed font-medium">
                            {b}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 05: TECH STACK */}
              {activeTab === "techStack" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display-serif text-4xl sm:text-5xl italic text-[var(--ink)] font-normal m-0">
                      {project.caseStudy.techStack.title}
                    </h2>
                    <p className="font-display-sans text-sm sm:text-base text-[var(--muted)] mt-1">
                      {project.caseStudy.techStack.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                    {project.caseStudy.techStack.description}
                  </p>

                  <div className="space-y-4 pt-2">
                    {project.caseStudy.techStack.categories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-[var(--hairline)] bg-[var(--paper-card)] space-y-2"
                      >
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-semibold block">
                          {cat.name}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 bg-[var(--paper)] border border-[var(--hairline)] font-mono text-[0.7rem] text-[var(--ink)] uppercase"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 06: RESULTS */}
              {activeTab === "results" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display-serif text-4xl sm:text-5xl italic text-[var(--ink)] font-normal m-0">
                      {project.caseStudy.results.title}
                    </h2>
                    <p className="font-display-sans text-sm sm:text-base text-[var(--muted)] mt-1">
                      {project.caseStudy.results.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                    {project.caseStudy.results.content}
                  </p>

                  {project.caseStudy.results.bullets && (
                    <div className="p-6 bg-[var(--paper-card)] border border-[var(--hairline)] space-y-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ink)] block">
                        Verified Outcomes &amp; Field Learnings
                      </span>
                      <ul className="space-y-2.5">
                        {project.caseStudy.results.bullets.map((b, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink-secondary)]"
                          >
                            <span className="text-emerald-700 font-bold select-none">
                              ✓
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Footer Row */}
          <div className="pt-8 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
            <button
              onClick={onBackToWorks}
              className="hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              ← RETURN TO WORKS GALLERY
            </button>
            <span>SIDDHESH GAWADE — 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
