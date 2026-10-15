"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "../data/projects";
import { ProjectSchematic } from "./project-schematic";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  onSelectProject,
  allProjects,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // GSAP enter / exit animation
  useEffect(() => {
    if (!overlayRef.current || !sheetRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        display: "flex",
      });

      gsap.fromTo(
        sheetRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isOpen, project]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
      style={{ display: isOpen ? "flex" : "none", opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div
        ref={sheetRef}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-[var(--paper)] text-[var(--ink)] border border-[var(--hairline-strong)] shadow-2xl relative overflow-hidden"
      >
        {/* ==================== 1. MODAL TOP EDITORIAL BAR ==================== */}
        <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[var(--hairline)] bg-[var(--paper)] select-none shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-widest text-[var(--muted)] uppercase">
              CASE STUDY [{project.index}]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
            <span className="font-mono text-[0.68rem] tracking-wider text-[var(--ink)] uppercase hidden sm:inline">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.65rem] text-[var(--muted)] hidden md:inline">
              [ESC TO DISMISS]
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase px-3 py-1.5 border border-[var(--hairline)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150 cursor-pointer"
              aria-label="Close case study"
            >
              <span>✕</span>
              <span>CLOSE</span>
            </button>
          </div>
        </header>

        {/* ==================== 2. SCROLLABLE MONOGRAPH BODY ==================== */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 md:px-12 py-8 space-y-12 overscroll-contain">
          {/* Section A: Title & Metadata Matrix */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[0.7rem] text-[var(--muted)] tracking-widest uppercase">
                FOLIO ARCHIVE / PROJECT #{project.index}
              </span>
              <h1
                id="case-study-title"
                className="font-display-serif text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.98] text-[var(--ink)] m-0"
              >
                {project.title}
              </h1>
              <p className="font-display-sans text-base sm:text-xl text-[var(--ink-secondary)] font-normal max-w-2xl">
                {project.subtitle}
              </p>
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border-y border-[var(--hairline)] bg-[var(--paper-card)]">
              <div>
                <span className="block font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider mb-1">
                  ROLE
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-[var(--ink)]">
                  {project.role}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider mb-1">
                  TIMELINE
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-[var(--ink)]">
                  {project.timeline}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider mb-1">
                  CATEGORY
                </span>
                <span className="font-sans text-xs sm:text-sm font-medium text-[var(--ink)]">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider mb-1">
                  STATUS
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--ink)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  VERIFIED CODE
                </span>
              </div>
            </div>
          </div>

          {/* Section B: Key Metrics / Technical Specifications */}
          {project.metricsOrHighlights.length > 0 && (
            <div className="space-y-3">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
                01 / TECHNICAL BENCHMARKS &amp; SPECIFICATIONS
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metricsOrHighlights.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-[var(--hairline)] bg-[var(--paper)] flex flex-col justify-between"
                  >
                    <span className="font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider">
                      {m.label}
                    </span>
                    <span className="font-mono text-base sm:text-lg font-semibold text-[var(--ink)] mt-2">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section C: Architecture Schematic Diagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
                02 / SYSTEM TOPOLOGY &amp; DATA PIPELINE SCHEMATIC
              </span>
              <span className="font-mono text-[0.62rem] text-[var(--muted)] uppercase">
                FIGURE 1.0 — VECTOR RECONSTRUCTION
              </span>
            </div>

            <div className="border border-[var(--hairline)] bg-[var(--paper-card)] overflow-hidden">
              <ProjectSchematic
                type={project.schematicType}
                isExpanded={true}
                className="min-h-[220px] sm:min-h-[260px]"
              />
            </div>
            <p className="font-mono text-[0.68rem] text-[var(--muted)] leading-relaxed italic">
              * Architectural topology schematic illustrating node separation, data flow serialization, and state distribution protocols.
            </p>
          </div>

          {/* Section D: Narrative Overview & Problem Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4 border-t border-[var(--hairline)]">
            <div className="space-y-3">
              <h3 className="font-mono text-[0.72rem] tracking-widest text-[var(--ink)] uppercase font-semibold">
                THE CHALLENGE &amp; DOMAIN PROBLEM
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-[0.72rem] tracking-widest text-[var(--ink)] uppercase font-semibold">
                ENGINEERING EXECUTION
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          </div>

          {/* Section E: Architectural Nodes Breakdown */}
          {project.architectureNodes.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[var(--hairline)]">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
                03 / SUBSYSTEM BREAKDOWN &amp; INTERFACE CONTRACTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.architectureNodes.map((node, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-[var(--hairline)] bg-[var(--paper-card)] flex flex-col justify-start"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--hairline)]">
                      <span className="font-mono text-[0.65rem] text-[var(--muted)] uppercase">
                        NODE 0{idx + 1}
                      </span>
                      <span className="font-mono text-[0.65rem] font-medium text-[var(--ink)]">
                        {node.title}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section F: Key Architectural Decisions */}
          {project.keyDecisions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[var(--hairline)]">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
                04 / CORE ARCHITECTURAL DECISIONS &amp; TRADE-OFFS
              </span>
              <div className="space-y-3">
                {project.keyDecisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 border-l-2 border-l-[var(--ink)] border-y border-r border-[var(--hairline)] bg-[var(--paper)]"
                  >
                    <h4 className="font-sans text-sm sm:text-base font-semibold text-[var(--ink)] mb-1">
                      {idx + 1}. {decision.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                      {decision.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section G: Challenges Overcome */}
          {project.challenges.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[var(--hairline)]">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
                05 / ENGINEERING CONSTRAINTS &amp; EDGE CASES SOLVED
              </span>
              <ul className="space-y-2.5">
                {project.challenges.map((challenge, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed"
                  >
                    <span className="font-mono text-[var(--ink)] font-bold shrink-0 mt-0.5">
                      [{idx + 1}]
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section H: Technology Stack Matrix */}
          <div className="space-y-3 pt-4 border-t border-[var(--hairline)]">
            <span className="font-mono text-[0.65rem] tracking-widest text-[var(--muted)] uppercase">
              06 / TECHNOLOGY STACK &amp; DEPENDENCIES
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 font-mono text-[0.72rem] uppercase tracking-wide border border-[var(--hairline)] bg-[var(--paper-card)] text-[var(--ink)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section I: External Links & GitHub Repository */}
          <div className="pt-6 border-t border-[var(--hairline)] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="block font-mono text-[0.62rem] text-[var(--muted)] uppercase">
                SOURCE REPOSITORY &amp; VERIFICATION
              </span>
              <p className="font-sans text-xs text-[var(--ink-secondary)]">
                Inspected and maintained on GitHub by Siddhesh Gawade.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink)] text-[var(--paper)] font-mono text-xs tracking-wider uppercase hover:opacity-85 transition-opacity"
              >
                <span>GITHUB REPOSITORY</span>
                <span>↗</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--ink)] text-[var(--ink)] font-mono text-xs tracking-wider uppercase hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
                >
                  <span>LIVE DEMO</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ==================== 3. MODAL FOOTER PAGER ==================== */}
        <footer className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-t border-[var(--hairline)] bg-[var(--paper-card)] select-none shrink-0 text-xs font-mono">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer py-1"
          >
            <span>←</span>
            <span>PREV: {prevProject.title}</span>
          </button>

          <span className="text-[var(--muted)] hidden sm:inline">
            PROJECT {project.index} OF 06
          </span>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer py-1"
          >
            <span>NEXT: {nextProject.title}</span>
            <span>→</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
