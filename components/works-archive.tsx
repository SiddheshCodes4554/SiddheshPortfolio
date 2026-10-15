"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projectsData, Project } from "../data/projects";
import { ProjectSchematic } from "./project-schematic";
import { ProjectModal } from "./project-modal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WorksArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  // Scroll listener to update active index and progress bar
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));

    // Calculate which card is closest to the left edge
    const cards = el.querySelectorAll<HTMLDivElement>(".project-archive-card");
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      const distance = Math.abs(rect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Navigate to specific project card
  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLDivElement>(".project-archive-card");
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  };

  const handlePrev = () => {
    const targetIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(targetIdx);
  };

  const handleNext = () => {
    const targetIdx = Math.min(projectsData.length - 1, activeIndex + 1);
    scrollToIndex(targetIdx);
  };

  // Open modal
  const handleOpenCaseStudy = (project: Project) => {
    if (hasDragged.current) return;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Mouse drag handlers for tactile reel navigation
  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isDragging.current = false;
    // reset hasDragged after micro delay so click events can read it
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  };

  // GSAP Entrance Animations
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // 1. Header fade
      gsap.fromTo(
        ".works-animate-header",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );

      // 2. Project cards reveal
      gsap.fromTo(
        ".project-archive-card",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="works"
      className="works-archive-section w-full border-t border-[var(--hairline-strong)] bg-[var(--paper)] text-[var(--ink)] py-16 sm:py-24 lg:py-32 relative select-text"
      aria-labelledby="works-section-heading"
    >
      {/* ==================== 1. SECTION COORDINATE BAR ==================== */}
      <div className="px-[var(--space-gutter)]">
        <div className="works-coord-bar flex items-center justify-between pb-8 sm:pb-12 border-b border-[var(--hairline)] works-animate-header">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-widest text-[var(--muted)] uppercase">
              01 / SELECTED WORKS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] opacity-70" />
            <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase hidden sm:inline">
              INDEX: 06 ENTRIES
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase hidden md:inline">
              STATUS: PRODUCTION &amp; RESEARCH REPOSITORIES
            </span>
            <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase">
              FOLIO 2026
            </span>
          </div>
        </div>

        {/* ==================== 2. OVERSIZED EDITORIAL HEADLINE & MONOGRAPH ==================== */}
        <div className="pt-10 sm:pt-14 pb-12 sm:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end works-animate-header">
          <div className="lg:col-span-8">
            <h2
              id="works-section-heading"
              className="text-[clamp(2.8rem,7.5vw,7.8rem)] leading-[0.95] tracking-[-0.04em] text-[var(--ink)] m-0 font-normal"
            >
              <span className="font-display-serif italic font-normal block sm:inline">
                Selected
              </span>{" "}
              <span className="font-display-sans font-light tracking-[-0.03em]">
                Works
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed m-0">
              An archival collection of autonomous drone telemetry, visual intelligence pipelines, market sentiment engines, and full-stack software built with rigorous systems thinking and editorial restraint.
            </p>
            <div className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase flex items-center gap-2">
              <span>EXPLORE MONOGRAPHS &amp; SCHEMATICS BELOW</span>
              <span className="animate-pulse">↓</span>
            </div>
          </div>
        </div>

        {/* ==================== 3. ARCHIVE NAVIGATION & PROGRESS CONTROLLER ==================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-[var(--hairline)] mb-8 works-animate-header">
          {/* Left: Active Index Display */}
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[var(--ink)] font-bold">
              [ 0{activeIndex + 1} / 0{projectsData.length} ]
            </span>
            <span className="text-[var(--muted)] hidden sm:inline">
              CURRENT: <strong className="text-[var(--ink)]">{projectsData[activeIndex].title}</strong>
            </span>
          </div>

          {/* Center: Jump Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none font-mono text-[0.65rem]">
            {projectsData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => scrollToIndex(idx)}
                className={`px-2.5 py-1 uppercase tracking-wider transition-colors cursor-pointer border ${
                  idx === activeIndex
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-semibold"
                    : "border-[var(--hairline)] bg-[var(--paper-card)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
                aria-label={`Jump to project ${p.title}`}
              >
                0{idx + 1} {p.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Right: Tactile Prev / Next buttons */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`px-3 py-1.5 border border-[var(--hairline)] transition-colors cursor-pointer ${
                activeIndex === 0
                  ? "opacity-35 cursor-not-allowed"
                  : "hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              }`}
              aria-label="Previous project"
            >
              ← PREV
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === projectsData.length - 1}
              className={`px-3 py-1.5 border border-[var(--hairline)] transition-colors cursor-pointer ${
                activeIndex === projectsData.length - 1
                  ? "opacity-35 cursor-not-allowed"
                  : "hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              }`}
              aria-label="Next project"
            >
              NEXT →
            </button>
          </div>
        </div>

        {/* Continuous Scrub Line */}
        <div className="w-full h-[2px] bg-[var(--hairline)] relative mb-8 overflow-hidden">
          <div
            className="h-full bg-[var(--ink)] transition-all duration-150 ease-out"
            style={{ width: `${Math.max(8, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* ==================== 4. HORIZONTAL INTERACTIVE REEL ==================== */}
      <div
        ref={scrollContainerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        className="horizontal-reel-container flex gap-6 sm:gap-8 overflow-x-auto px-[var(--space-gutter)] pb-8 pt-2 select-none scroll-smooth cursor-grab active:cursor-grabbing overscroll-x-contain"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projectsData.map((project, idx) => {
          const isCurrent = idx === activeIndex;

          return (
            <article
              key={project.id}
              className={`project-archive-card shrink-0 w-[88vw] sm:w-[540px] md:w-[620px] lg:w-[680px] bg-[var(--paper)] border flex flex-col justify-between transition-all duration-300 relative ${
                isCurrent
                  ? "border-[var(--ink)] shadow-lg"
                  : "border-[var(--hairline)] hover:border-[var(--hairline-strong)]"
              }`}
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Card Header Coordinate Row */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[var(--hairline)] bg-[var(--paper-card)]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[var(--ink)]">
                    [{project.index}]
                  </span>
                  <span className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-wider text-[var(--muted)]">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[0.65rem] sm:text-xs text-[var(--muted)]">
                  <span>{project.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] m-0 leading-tight">
                      {project.title}
                    </h3>
                    <p className="font-display-sans text-xs sm:text-sm text-[var(--muted)] mt-1 font-normal">
                      {project.subtitle}
                    </p>
                  </div>

                  <span className="font-mono text-[0.65rem] text-[var(--muted)] uppercase border border-[var(--hairline)] px-2 py-1 shrink-0">
                    {project.role.split("&")[0].trim()}
                  </span>
                </div>
              </div>

              {/* Card Center: Architectural Vector Schematic */}
              <div
                onClick={() => handleOpenCaseStudy(project)}
                className="px-5 sm:px-6 cursor-pointer group"
                title="Click to expand case study"
              >
                <div className="border border-[var(--hairline)] overflow-hidden transition-all duration-200 group-hover:border-[var(--ink)] group-hover:shadow-sm relative">
                  <ProjectSchematic
                    type={project.schematicType}
                    className="min-h-[190px] sm:min-h-[220px]"
                  />

                  {/* Hover Inspect Overlay Badge */}
                  <div className="absolute inset-0 bg-[var(--ink)]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="font-mono text-xs uppercase px-3 py-1.5 bg-[var(--paper)] text-[var(--ink)] border border-[var(--ink)] shadow-md tracking-wider">
                      CLICK TO INSPECT CASE STUDY ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Narrative Overview */}
              <div className="p-5 sm:p-6 pt-4 space-y-4">
                <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed m-0">
                  {project.shortDescription}
                </p>

                {/* Key Spec Highlight Pill */}
                {project.metricsOrHighlights.length > 0 && (
                  <div className="flex items-center gap-3 p-2.5 bg-[var(--paper-card)] border border-[var(--hairline)] font-mono text-[0.68rem]">
                    <span className="text-[var(--muted)] uppercase">
                      {project.metricsOrHighlights[0].label}:
                    </span>
                    <strong className="text-[var(--ink)] font-semibold">
                      {project.metricsOrHighlights[0].value}
                    </strong>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider border border-[var(--hairline)] text-[var(--ink-secondary)] bg-[var(--paper)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 font-mono text-[0.65rem] text-[var(--muted)]">
                      +{project.technologies.length - 5} MORE
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-5 sm:p-6 pt-3 border-t border-[var(--hairline)] bg-[var(--paper-card)] flex items-center justify-between gap-3 font-mono text-xs">
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--ink)] text-[var(--paper)] hover:opacity-85 transition-opacity cursor-pointer font-semibold uppercase tracking-wider"
                >
                  <span>INSPECT CASE STUDY</span>
                  <span>→</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 border border-[var(--hairline)] hover:border-[var(--ink)] hover:text-[var(--ink)] text-[var(--muted)] transition-colors uppercase tracking-wider"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>GITHUB</span>
                  <span>↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* ==================== 5. FOOTER HINT & INSTRUCTION ==================== */}
      <div className="px-[var(--space-gutter)] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[0.65rem] text-[var(--muted)] uppercase">
        <div className="flex items-center gap-2">
          <span>* TIP: DRAG HORIZONTALLY OR USE ARROW KEYS TO BROWSE</span>
        </div>
        <div>
          <span>TOTAL CATALOGUE: 06 REPOSITORIES INSPECTED</span>
        </div>
      </div>

      {/* ==================== 6. CASE STUDY DETAIL MODAL ==================== */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectProject={(newProj) => setSelectedProject(newProj)}
        allProjects={projectsData}
      />
    </section>
  );
}
