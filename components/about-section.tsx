"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EngineeringLab } from "./engineering-lab";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ExpertiseItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
}

const expertiseData: ExpertiseItem[] = [
  {
    id: "web-dev",
    index: "01",
    title: "Web Development",
    subtitle: "Modern Frontend & Full-Stack Applications",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    description:
      "Architecting robust, end-to-end full-stack web applications. Focusing on server-side rendering, type-safe API boundaries, predictable state, and resilient interfaces designed for clarity and performance.",
  },
  {
    id: "ai-vision",
    index: "02",
    title: "AI & Computer Vision",
    subtitle: "Visual Computing & Applied Machine Intelligence",
    tags: ["Python", "OpenCV", "Object Detection", "Neural Networks", "Inference Pipelines"],
    description:
      "Building practical vision-based systems and intelligent workflows. Experienced in object detection pipelines, real-time camera tracking, and integrating machine learning models into accessible digital interfaces.",
  },
  {
    id: "realtime-systems",
    index: "03",
    title: "Systems & Real-Time Applications",
    subtitle: "Telemetry, Dashboards & Low-Latency Data Flows",
    tags: ["WebSockets", "Streaming APIs", "Telemetry", "State Synchrony", "Event Architectures"],
    description:
      "Designing low-latency data pipelines, telemetry dashboards, and asynchronous systems that reliably capture, transmit, and visualize live data with minimal overhead and zero friction.",
  },
  {
    id: "creative-dev",
    index: "04",
    title: "Creative Development",
    subtitle: "Motion Design, Editorial Layouts & Micro-Interactions",
    tags: ["GSAP", "ScrollTrigger", "Vector Linework", "Tactile UI", "Experimental Motion"],
    description:
      "Crafting expressive animations, purposeful micro-interactions, and editorial layouts. Exploring typography and movement to transform standard software into a tactile, memorable experience.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useGSAP(
    () => {
      // Check reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".about-animate-fade", { opacity: 1, y: 0 });
        gsap.set(".about-animate-row", { opacity: 1, y: 0 });
        return;
      }

      // 1. Section Header & Bio Stagger Reveal
      gsap.fromTo(
        ".about-animate-fade",
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Portrait Subtle Parallax
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { yPercent: -4 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Expertise Rows Stagger
      gsap.fromTo(
        ".about-animate-row",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expertise-index-grid",
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-editorial-section w-full border-t border-[var(--hairline-strong)] bg-[var(--paper)] text-[var(--ink)] px-[var(--space-gutter)] py-16 sm:py-24 lg:py-32 relative"
      aria-labelledby="about-section-heading"
    >
      {/* ==================== 1. SECTION COORDINATE HEADER ==================== */}
      <div className="about-coord-bar flex items-center justify-between pb-8 sm:pb-12 border-b border-[var(--hairline)] about-animate-fade">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.68rem] tracking-widest text-[var(--muted)] uppercase">
            02 / ABOUT &amp; EXPERTISE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] opacity-70" />
        </div>

        <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase">
          ENGINEERING ARCHIVE — 2026
        </span>
      </div>

      {/* ==================== 2. OVERSIZED EDITORIAL HEADLINE ==================== */}
      <div className="about-headline-wrap pt-10 sm:pt-14 pb-12 sm:pb-20 about-animate-fade">
        <h2
          id="about-section-heading"
          className="text-[clamp(2.8rem,7.5vw,7.8rem)] leading-[0.95] tracking-[-0.04em] text-[var(--ink)] m-0 font-normal"
        >
          <span className="font-display-serif italic font-normal">Curiosity</span>{" "}
          <span className="font-display-sans font-medium">by Nature,</span>
          <br />
          <span className="font-display-sans font-medium">Builder</span>{" "}
          <span className="font-display-serif italic font-normal">by Discipline.</span>
        </h2>
      </div>

      {/* ==================== 3. ASYMMETRICAL EDITORIAL COMPOSITION ==================== */}
      <div className="about-composition-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 sm:pb-28">
        {/* Left Narrative Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8 about-animate-fade">
          <div className="space-y-6">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--muted)] block">
              // 01 — BACKGROUND &amp; IDENTITY
            </span>

            {/* Oversized Lede Paragraph */}
            <p className="font-display-sans text-[clamp(1.15rem,1.8vw,1.6rem)] leading-[1.38] font-normal tracking-[-0.015em] text-[var(--ink)] m-0">
              I&apos;m <strong>Siddhesh Gawade</strong> — a computer engineering student and developer focused on crafting software that is both technically dependable and thoughtfully designed.
            </p>

            {/* Editorial Body Text */}
            <p className="font-display-sans text-[clamp(0.88rem,1.1vw,1rem)] leading-[1.65] text-[var(--ink-secondary)] m-0">
              My work bridges foundational computer engineering concepts with modern interactive digital experiences. I spend my time untangling complex challenges across full-stack web architectures, training computer vision models, and building real-time dashboards where system predictability and low latency matter.
            </p>

            <p className="font-display-sans text-[clamp(0.88rem,1.1vw,1rem)] leading-[1.65] text-[var(--ink-secondary)] m-0">
              Rather than chasing superficial complexity, I believe in software crafted with deliberate attention to detail — clear component design, type safety, accessible typography, and motion that informs rather than distracts.
            </p>
          </div>

          {/* Personal Engineering Philosophy Callout */}
          <div className="about-philosophy-card border-l-2 border-[var(--ink)] pl-6 py-2 my-2 bg-gradient-to-r from-[rgba(18,18,18,0.02)] to-transparent">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)] block mb-2">
              PHILOSOPHY / STATEMENT
            </span>
            <blockquote className="font-display-serif italic text-[clamp(1.2rem,2.1vw,1.85rem)] leading-[1.28] text-[var(--ink)] m-0">
              &ldquo;Great software exists where rigorous engineering discipline meets uncompromising aesthetic care.&rdquo;
            </blockquote>
          </div>

          {/* Quick Technical Metadata Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--hairline)]">
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-widest text-[var(--muted)] block">
                CURRENT DISCIPLINE
              </span>
              <p className="font-sans text-[0.78rem] font-semibold text-[var(--ink)] mt-1 mb-0">
                Computer Engineering
              </p>
            </div>
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-widest text-[var(--muted)] block">
                LOCATION
              </span>
              <p className="font-sans text-[0.78rem] font-semibold text-[var(--ink)] mt-1 mb-0">
                India · Available Worldwide
              </p>
            </div>
            <div>
              <span className="font-mono text-[0.58rem] uppercase tracking-widest text-[var(--muted)] block">
                STATUS
              </span>
              <p className="font-sans text-[0.78rem] font-semibold text-[var(--ink)] mt-1 mb-0">
                Open for Collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Engineering Telemetry & Computer Vision Lab (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div ref={portraitRef} className="w-full max-w-md will-change-transform">
            <EngineeringLab />
          </div>
        </div>
      </div>

      {/* ==================== 4. EDITORIAL EXPERTISE INDEX ==================== */}
      <div className="about-expertise-wrap pt-12 sm:pt-16 border-t border-[var(--hairline-strong)]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 sm:mb-14 gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] tracking-widest text-[var(--muted)] uppercase">
              // 02 — CORE AREAS OF EXPERTISE
            </span>
          </div>
          <span className="font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider">
            HOVER OR TAP ENTRY FOR DETAILS
          </span>
        </div>

        {/* Expertise Rows List */}
        <div className="expertise-index-grid flex flex-col divide-y divide-[var(--hairline)] border-b border-[var(--hairline)]">
          {expertiseData.map((item) => {
            const isExpanded = activeItem === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item.id)}
                onMouseLeave={() => setActiveItem(null)}
                onClick={() => setActiveItem(isExpanded ? null : item.id)}
                className={`about-animate-row group py-8 sm:py-10 transition-colors duration-300 cursor-pointer ${
                  isExpanded ? "bg-[rgba(18,18,18,0.015)]" : "hover:bg-[rgba(18,18,18,0.01)]"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                  {/* Column 1: Index Number (1 col) */}
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[0.75rem] sm:text-[0.82rem] text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                      {item.index}
                    </span>
                  </div>

                  {/* Column 2: Large Category Title & Subtitle (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col">
                    <h3 className="font-display-sans text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium tracking-tight text-[var(--ink)] m-0 group-hover:translate-x-1.5 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <span className="font-sans text-[0.72rem] sm:text-[0.78rem] text-[var(--muted)] tracking-wide mt-1">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Column 3: Tech Tags & Description (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    {/* Tags pill list */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.58rem] sm:text-[0.62rem] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--hairline)] text-[var(--ink)] bg-[var(--paper)] group-hover:border-[var(--ink)] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Detailed narrative description */}
                    <p className="font-sans text-[0.78rem] sm:text-[0.84rem] leading-relaxed text-[var(--ink-secondary)] m-0">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== 5. SECTION TRANSITION CUE ==================== */}
      <div className="about-transition-cue pt-12 sm:pt-16 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span>03 / SELECTED WORKS ARCHIVE</span>
          <span className="text-[var(--ink)]">→</span>
        </div>
        <span className="hidden sm:inline">NEXT MILESTONE</span>
      </div>
    </section>
  );
}
