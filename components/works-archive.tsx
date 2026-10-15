"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData, Project } from "../data/projects";
import { CaseStudyView } from "./case-study-view";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WorksArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const caseStudyContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const activeProject = projectsData[activeIndex];

  // GSAP animation on active project change
  useEffect(() => {
    if (!activeCardRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      activeCardRef.current.querySelectorAll(".animate-switch-target"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0));
  };

  const handleViewProject = (proj: Project) => {
    setSelectedCaseStudy(proj);
    setTimeout(() => {
      caseStudyContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleBackToWorks = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setTimeout(() => {
      setSelectedCaseStudy(null);
    }, 600);
  };

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="works-archive-section w-full border-t border-[var(--hairline-strong)] bg-[var(--paper)] text-[var(--ink)] py-14 sm:py-20 lg:py-28 relative select-text"
      aria-labelledby="selected-works-heading"
    >
      <div className="px-[var(--space-gutter)]">
        {/* ==================== 1. TOP SECTION NUMBER ==================== */}
        <div className="pb-4">
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[var(--muted)]">
            03 /
          </span>
        </div>

        {/* ==================== 2. EDITORIAL HEADER COMPOSITION ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 sm:pb-16 border-b border-[var(--hairline)]">
          {/* Left: Giant "Selected Works" + Handwritten Annotation */}
          <div className="lg:col-span-7 flex flex-wrap items-baseline gap-4 sm:gap-6">
            <h2
              id="selected-works-heading"
              className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.035em] font-normal text-[var(--ink)] m-0"
            >
              <span className="font-display-serif italic font-normal">Selected</span>{" "}
              <span className="font-display-sans font-medium tracking-[-0.04em]">
                Works
              </span>
            </h2>

            {/* Handwritten Arrow & Note */}
            <div className="flex items-center gap-2 select-none pt-2">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9 text-[var(--muted)] rotate-[-12deg]"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M 5 32 Q 18 10 32 16"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 26 10 L 33 16 L 27 23"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-handwritten text-xl sm:text-2xl text-[var(--ink-secondary)] leading-tight">
                Real problems.
                <br />
                Working solutions.
              </span>
            </div>
          </div>

          {/* Right: Independent Description + Circular Controls */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-sm m-0">
              A collection of projects where I explore ideas, experiment with
              technology, and build real-world systems that create impact.
            </p>

            {/* Counter + Prev / Next Circular Controls */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-xs select-none">
              <span className="tracking-wider text-[var(--ink)] font-medium">
                [ 0{activeIndex + 1} / 0{projectsData.length} ]
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="w-9 h-9 rounded-full border border-[var(--ink)] flex items-center justify-center text-sm hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-150 cursor-pointer"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center text-sm hover:opacity-85 transition-opacity cursor-pointer shadow-sm"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 3. ASYMMETRIC HORIZONTAL PROJECT GALLERY ==================== */}
        <div className="pt-10 sm:pt-14 pb-8 overflow-x-auto scrollbar-none">
          <div className="flex gap-4 sm:gap-6 min-w-max items-stretch">
            {/* ---------- FEATURED ACTIVE PROJECT (DOMINANT SPOTLIGHT) ---------- */}
            <div
              ref={activeCardRef}
              className="w-[85vw] sm:w-[680px] lg:w-[820px] bg-[var(--paper)] border border-[var(--hairline-strong)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-sm"
            >
              {/* Top Index Rule */}
              <div className="flex items-center gap-3 pb-6 border-b border-[var(--hairline)]">
                <span className="font-mono text-xs font-bold text-[var(--ink)]">
                  {activeProject.index}
                </span>
                <span className="h-[1px] w-12 bg-[var(--ink)] opacity-50" />
                <span className="font-mono text-[0.65rem] tracking-widest uppercase text-[var(--muted)]">
                  {activeProject.tagsLine}
                </span>
              </div>

              {/* Main Content: 2-Column Split inside Active Project */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 py-6 items-center flex-1">
                {/* Left Side: Typography, Note, View Button */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="animate-switch-target font-display-serif text-5xl sm:text-6xl lg:text-7xl italic font-normal text-[var(--ink)] m-0 leading-[0.92] tracking-tight">
                      {activeProject.title}
                    </h3>
                    <p className="animate-switch-target font-display-sans text-xs sm:text-sm text-[var(--muted)] leading-relaxed m-0 font-light">
                      {activeProject.subtitle}
                    </p>
                  </div>

                  {/* Handwritten Note */}
                  {activeProject.handwrittenAnnotation && (
                    <div className="animate-switch-target pt-2">
                      <span className="font-handwritten text-xl sm:text-2xl text-[var(--ink-secondary)] block rotate-[-3deg] select-none">
                        {activeProject.handwrittenAnnotation}
                      </span>
                    </div>
                  )}

                  {/* View Project Interaction */}
                  <div className="animate-switch-target pt-2 flex items-center gap-4">
                    <button
                      onClick={() => handleViewProject(activeProject)}
                      className="group inline-flex items-center gap-3 font-sans text-sm font-medium text-[var(--ink)] cursor-pointer"
                    >
                      <span className="w-10 h-10 rounded-full border border-[var(--ink)] flex items-center justify-center group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)] transition-all duration-200">
                        →
                      </span>
                      <span className="border-b border-transparent group-hover:border-[var(--ink)] transition-colors">
                        View Project
                      </span>
                    </button>

                    <Link
                      href={`/works/${activeProject.id}`}
                      className="font-mono text-[0.68rem] text-[var(--muted)] hover:text-[var(--ink)] transition-colors uppercase tracking-wider hidden sm:inline border-b border-transparent hover:border-[var(--ink)]"
                    >
                      [Open Page ↗]
                    </Link>
                  </div>
                </div>

                {/* Right Side: Cinematic Image with Technical HUD Overlays */}
                <div
                  onClick={() => handleViewProject(activeProject)}
                  className="md:col-span-7 relative aspect-[16/10] w-full border border-[var(--hairline)] overflow-hidden bg-black/5 cursor-pointer group shadow-sm"
                  title="Click to view full case study"
                >
                  <Image
                    src={activeProject.heroImage}
                    alt={activeProject.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Technical Overlays matching reference */}
                  <div className="absolute top-3 left-3 font-mono text-[0.62rem] text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 tracking-wider border border-white/20">
                    {activeProject.index} ├────
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-[0.62rem] text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 tracking-wider border border-white/20">
                    {activeProject.title.toUpperCase()} / UAV-01
                  </div>

                  <div className="absolute bottom-3 right-3 font-mono text-xs text-white/70 select-none">
                    +
                  </div>

                  {/* Hover prompt */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 bg-[var(--paper)] text-[var(--ink)] border border-[var(--ink)] shadow-md">
                      OPEN CASE STUDY ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--hairline)] font-mono text-[0.65rem] text-[var(--muted)] uppercase">
                <span>YEAR: {activeProject.year}</span>
                <span>STATUS: VERIFIED REPOSITORY</span>
                <span>
                  {activeProject.metricsOrHighlights[0]?.label}:{" "}
                  <strong className="text-[var(--ink)] font-semibold">
                    {activeProject.metricsOrHighlights[0]?.value}
                  </strong>
                </span>
              </div>
            </div>

            {/* ---------- ADJACENT EDITORIAL PROJECT COLUMNS (02 TO 06) ---------- */}
            {projectsData.map((project, idx) => {
              if (idx === activeIndex) return null;

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className="w-[140px] sm:w-[160px] lg:w-[180px] bg-[var(--paper)] border border-[var(--hairline)] hover:border-[var(--ink)] p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer group select-none hover:shadow-md"
                >
                  {/* Top Header: Index & Category */}
                  <div className="space-y-1 pb-3 border-b border-[var(--hairline)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--ink)]">
                        {project.index}
                      </span>
                      <span className="h-[1px] w-6 bg-[var(--hairline-strong)]" />
                    </div>
                    <span className="font-mono text-[0.6rem] uppercase tracking-wider text-[var(--muted)] line-clamp-1 block">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <div className="py-3">
                    <h4 className="font-display-serif text-lg sm:text-xl italic font-normal text-[var(--ink)] group-hover:text-black transition-colors m-0 leading-tight">
                      {project.title}
                    </h4>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative aspect-[4/3] w-full border border-[var(--hairline)] overflow-hidden bg-black/5 my-2">
                    <Image
                      src={project.thumbnailImage}
                      alt={project.title}
                      fill
                      className="object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Action Verbs matching reference */}
                  <div className="pt-3 border-t border-[var(--hairline)] text-center font-mono text-[0.6rem] tracking-wider text-[var(--muted)] uppercase">
                    {project.actionVerbs.join(" / ")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== 4. IMMERSIVE CASE STUDY SECTION ==================== */}
      <div ref={caseStudyContainerRef}>
        {selectedCaseStudy && (
          <CaseStudyView
            project={selectedCaseStudy}
            onBackToWorks={handleBackToWorks}
            onNextProject={handleNext}
            onPrevProject={handlePrev}
          />
        )}
      </div>
    </section>
  );
}
