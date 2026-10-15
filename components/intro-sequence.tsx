"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface IntroSequenceProps {
  onIntroComplete?: () => void;
  onIntroRevealHero?: () => void;
}

export function IntroSequence({
  onIntroComplete,
  onIntroRevealHero,
}: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);

  // Safety fallback: ensure overlay never traps the user under any circumstance
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (isActive) {
        handleComplete();
      }
    }, 5500);

    return () => clearTimeout(safetyTimer);
  }, [isActive]);

  // Keyboard shortcut: ESC to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  const handleComplete = () => {
    setIsActive(false);
    onIntroRevealHero?.();
    onIntroComplete?.();
  };

  const handleSkip = () => {
    if (hasSkipped) return;
    setHasSkipped(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: handleComplete,
      });
    } else {
      handleComplete();
    }
  };

  useGSAP(
    () => {
      // Reduced-motion check: immediately skip animation if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        handleComplete();
        return;
      }

      // Master Timeline setup with exact storyboard frames
      const tl = gsap.timeline({
        onComplete: () => {
          handleComplete();
        },
      });

      timelineRef.current = tl;

      // 1. Initial State: Strict Visibility Isolation using autoAlpha (opacity + visibility)
      gsap.set(".intro-frame-1", { autoAlpha: 1 });
      gsap.set(".intro-frame-2", { autoAlpha: 0 });
      gsap.set(".intro-frame-3", { autoAlpha: 0 });
      gsap.set(".intro-frame-4", { autoAlpha: 0 });
      gsap.set(".intro-frame-5", { autoAlpha: 0 });

      // Frame 2 internals
      gsap.set(".f2-keyword", { y: 16, opacity: 0 });
      gsap.set(".f2-meta", { opacity: 0, x: 8 });
      gsap.set(".f2-cross", { opacity: 0, scale: 0.5 });

      // Frame 3 internals
      gsap.set(".f3-blueprint-line", { scaleX: 0 });
      gsap.set(".f3-name-outline", { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" });

      // Frame 4 internals
      gsap.set(".f4-name-siddhesh", { opacity: 0, y: 18 });
      gsap.set(".f4-name-gawade", { opacity: 0, y: 22 });
      gsap.set(".f4-badge", { opacity: 0, scale: 0.8 });
      gsap.set(".f4-meta", { opacity: 0, x: 10 });

      // Frame 5 internals
      gsap.set(".f5-tagline-word", { opacity: 0, y: 18 });
      gsap.set(".f5-art-group", { opacity: 0, y: 14 });

      /* =========================================================================
         FRAME 01 — 0.0s to 0.4s: Minimal Loading Dot & "LOADING IDEAS ..."
         ========================================================================= */
      tl.addLabel("frame1", 0.0);

      tl.to(
        ".f1-dot",
        {
          scale: 1.3,
          duration: 0.22,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "frame1"
      );

      // Frame 1 transitions out cleanly
      tl.to(
        ".intro-frame-1",
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.14,
          ease: "power2.in",
        },
        "frame1+=0.34"
      );

      /* =========================================================================
         FRAME 02 — 0.4s to 1.0s: Keywords (IDEAS, CODE, SYSTEMS, PEOPLE, IMPACT)
         ========================================================================= */
      tl.addLabel("frame2", 0.4);

      tl.to(".intro-frame-2", { autoAlpha: 1, duration: 0.1 }, "frame2");

      tl.to(
        ".f2-cross",
        {
          opacity: 0.65,
          scale: 1,
          duration: 0.22,
          stagger: 0.04,
          ease: "power2.out",
        },
        "frame2"
      );

      tl.to(
        ".f2-keyword",
        {
          y: 0,
          opacity: 1,
          duration: 0.32,
          stagger: 0.06,
          ease: "power3.out",
        },
        "frame2+=0.04"
      );

      tl.to(
        ".f2-meta",
        {
          opacity: 1,
          x: 0,
          duration: 0.32,
          ease: "power2.out",
        },
        "frame2+=0.12"
      );

      // Frame 2 exits cleanly
      tl.to(
        ".intro-frame-2",
        {
          autoAlpha: 0,
          y: -12,
          duration: 0.14,
          ease: "power2.in",
        },
        "frame2+=0.55"
      );

      /* =========================================================================
         FRAME 03 — 1.0s to 1.6s: Name Reveal "Siddhesh" with Drafting Wireframe
         ========================================================================= */
      tl.addLabel("frame3", 1.0);

      tl.to(".intro-frame-3", { autoAlpha: 1, duration: 0.1 }, "frame3");

      tl.to(
        ".f3-blueprint-line",
        {
          scaleX: 1,
          duration: 0.38,
          stagger: 0.05,
          ease: "power3.out",
        },
        "frame3"
      );

      tl.to(
        ".f3-name-outline",
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.48,
          ease: "power3.inOut",
        },
        "frame3+=0.05"
      );

      // Frame 3 exits into Frame 4
      tl.to(
        ".intro-frame-3",
        {
          autoAlpha: 0,
          duration: 0.14,
          ease: "power2.in",
        },
        "frame3+=0.55"
      );

      /* =========================================================================
         FRAME 04 — 1.6s to 2.2s: Full Name (Gawade) + (CE) + Discipline Tag
         ========================================================================= */
      tl.addLabel("frame4", 1.6);

      tl.to(".intro-frame-4", { autoAlpha: 1, duration: 0.1 }, "frame4");

      tl.to(
        ".f4-name-siddhesh",
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power4.out",
        },
        "frame4"
      );

      tl.to(
        ".f4-name-gawade",
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: "power4.out",
        },
        "frame4+=0.08"
      );

      tl.to(
        ".f4-badge",
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.6)",
        },
        "frame4+=0.15"
      );

      tl.to(
        ".f4-meta",
        {
          opacity: 1,
          x: 0,
          duration: 0.32,
          ease: "power2.out",
        },
        "frame4+=0.18"
      );

      // Frame 4 exits into Frame 5
      tl.to(
        ".intro-frame-4",
        {
          autoAlpha: 0,
          y: -14,
          duration: 0.15,
          ease: "power2.in",
        },
        "frame4+=0.55"
      );

      /* =========================================================================
         FRAME 05 — 2.2s to 2.8s: Handcrafted Illustration + Tagline
         ========================================================================= */
      tl.addLabel("frame5", 2.2);

      tl.to(".intro-frame-5", { autoAlpha: 1, duration: 0.1 }, "frame5");

      tl.to(
        ".f5-tagline-word",
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: "power3.out",
        },
        "frame5"
      );

      tl.to(
        ".f5-art-group",
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power3.out",
        },
        "frame5+=0.08"
      );

      tl.to(
        ".f5-bulb-sparks",
        {
          opacity: 1,
          scale: 1.15,
          transformOrigin: "center center",
          duration: 0.22,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "frame5+=0.22"
      );

      /* =========================================================================
         FRAME 06 — 2.8s to 3.2s: Directional Page Split / Editorial Curl Wipe
         ========================================================================= */
      tl.addLabel("frame6", 2.8);

      // Trigger hero elements to begin settling beneath right as page peel starts
      tl.call(
        () => {
          onIntroRevealHero?.();
        },
        undefined,
        "frame6"
      );

      // Peel/curl the intro stage away from right to left with perspective and drop shadow
      tl.to(
        containerRef.current,
        {
          xPercent: -105,
          rotate: -1.2,
          transformOrigin: "bottom left",
          duration: 0.55,
          ease: "power4.inOut",
        },
        "frame6"
      );

      /* =========================================================================
         FRAME 07 — 3.2s to 3.6s+: Hero Settles Into Live Interactive State
         ========================================================================= */
      tl.addLabel("frame7", 3.2);

      tl.call(
        () => {
          handleComplete();
        },
        undefined,
        "frame7+=0.1"
      );
    },
    { scope: containerRef }
  );

  if (!isActive) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="intro-overlay fixed inset-0 z-[9999] flex flex-col justify-between p-[var(--space-gutter)] bg-[var(--paper)] text-[var(--ink)] overflow-hidden select-none shadow-[20px_0_50px_rgba(0,0,0,0.22)]"
      role="dialog"
      aria-modal="true"
      aria-label="Folio introductory sequence"
    >
      {/* Background subtle texture lines */}
      <div className="pointer-events-none absolute inset-x-[var(--space-gutter)] top-0 h-[1px] bg-[var(--hairline)]" />
      <div className="pointer-events-none absolute inset-x-[var(--space-gutter)] bottom-0 h-[1px] bg-[var(--hairline)]" />

      {/* ==================== PERSISTENT TOP BAR ==================== */}
      <header className="relative z-30 flex items-center justify-between w-full pt-1">
        <span className="font-sans text-[0.68rem] tracking-[0.06em] text-[var(--ink)] font-semibold uppercase">
          SIDDHESH.GAWADE ©
        </span>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSkip}
            className="intro-skip-btn flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--ink)] py-1.5 px-3 rounded-full border border-[var(--hairline-strong)] hover:border-[var(--ink)] bg-[var(--paper)] transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label="Skip introductory animation (Press Escape)"
          >
            <span>Skip intro</span>
            <span className="opacity-50 text-[0.55rem]">[ESC]</span>
          </button>

          <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase">
            PORTFOLIO / 2026
          </span>
        </div>
      </header>

      {/* ==================== MAIN STAGE: INDIVIDUAL FRAMES ==================== */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full my-auto overflow-hidden">
        {/* -------------------- FRAME 01: MINIMAL LOADING DOT -------------------- */}
        <div className="intro-frame intro-frame-1">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="f1-dot inline-block w-2.5 h-2.5 rounded-full bg-[var(--ink)] mb-4" />
            <p className="font-mono text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.24em] text-[var(--muted)] m-0">
              LOADING IDEAS ...
            </p>
          </div>
        </div>

        {/* -------------------- FRAME 02: KEYWORDS CLUSTER -------------------- */}
        <div className="intro-frame intro-frame-2">
          <div className="relative w-full max-w-2xl px-6 py-8 flex items-center justify-between">
            {/* 4 Quadrant Crosshairs */}
            <span className="f2-cross absolute top-0 left-0 font-mono text-xs text-[var(--hairline-strong)]">
              +
            </span>
            <span className="f2-cross absolute top-0 right-0 font-mono text-xs text-[var(--hairline-strong)]">
              +
            </span>
            <span className="f2-cross absolute bottom-0 left-0 font-mono text-xs text-[var(--hairline-strong)]">
              +
            </span>
            <span className="f2-cross absolute bottom-0 right-0 font-mono text-xs text-[var(--hairline-strong)]">
              +
            </span>

            {/* Left Column: Stack of Keywords */}
            <div className="flex flex-col text-left">
              {["IDEAS", "CODE", "SYSTEMS", "PEOPLE", "IMPACT"].map((kw) => (
                <span
                  key={kw}
                  className="f2-keyword font-sans font-medium text-[clamp(1.5rem,3.8vw,2.9rem)] leading-[1.08] tracking-tight text-[var(--ink)]"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Right Column: Student Metadata */}
            <div className="f2-meta text-left max-w-[12rem] font-mono text-[0.65rem] sm:text-[0.7rem] leading-relaxed text-[var(--muted)] tracking-wider">
              <span className="text-[var(--ink)] font-semibold">• // A</span>
              <br />
              COMPUTER
              <br />
              ENGINEERING
              <br />
              STUDENT
            </div>
          </div>
        </div>

        {/* -------------------- FRAME 03: WIREFRAME BLUEPRINT "SIDDHESH" -------------------- */}
        <div className="intro-frame intro-frame-3">
          <div className="relative w-full max-w-4xl px-4 flex items-center justify-center">
            {/* Drafting grid lines */}
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none gap-6 sm:gap-10">
              <div className="f3-blueprint-line w-full h-[1px] bg-[var(--hairline)] origin-left" />
              <div className="f3-blueprint-line w-full h-[1px] bg-[var(--hairline-strong)] origin-left" />
              <div className="f3-blueprint-line w-full h-[1px] bg-[var(--hairline)] origin-left" />
            </div>

            {/* Architectural Outline Text */}
            <svg
              className="f3-name-outline w-full h-auto max-h-[16rem] overflow-visible"
              viewBox="0 0 850 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="50%"
                y="130"
                textAnchor="middle"
                className="font-display-serif italic"
                fontSize="140"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.25"
                strokeDasharray="4 2"
                letterSpacing="-0.03em"
              >
                Siddhesh
              </text>
            </svg>
          </div>
        </div>

        {/* -------------------- FRAME 04: FULL NAME (GAWADE) + (CE) + DISCIPLINE -------------------- */}
        <div className="intro-frame intro-frame-4">
          <div className="w-full max-w-4xl px-4 flex items-center justify-between flex-wrap gap-6">
            {/* Left: Oversized Siddhesh Gawade (CE) */}
            <div className="flex flex-col text-left">
              <h1 className="f4-name-siddhesh font-display-serif italic font-normal text-[var(--ink)] text-[clamp(3.5rem,11.5vw,9.5rem)] leading-[0.88] tracking-[-0.035em] m-0">
                Siddhesh
              </h1>
              <div className="flex items-baseline gap-2 sm:gap-4 mt-1">
                <span className="f4-name-gawade font-display-sans font-medium text-[var(--ink)] text-[clamp(3.5rem,11.5vw,9.5rem)] leading-[0.88] tracking-[-0.06em]">
                  Gawade
                </span>
                <span className="f4-badge font-display-sans font-normal text-[clamp(1.2rem,3.2vw,3rem)] text-[var(--ink)] align-super">
                  (CE)
                </span>
              </div>
            </div>

            {/* Right: Technical Discipline Tag */}
            <div className="f4-meta text-left font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-wider text-[var(--ink)] leading-relaxed max-w-[14rem] border-l border-[var(--hairline-strong)] pl-4">
              <span className="text-[var(--muted)]">FOCUS:</span>
              <br />
              COMPUTER ENGINEERING
              <br />
              WEB / AI / COMPUTER VISION
              <br />
              REAL-TIME SYSTEMS
            </div>
          </div>
        </div>

        {/* -------------------- FRAME 05: ILLUSTRATION + TAGLINE -------------------- */}
        <div className="intro-frame intro-frame-5">
          <div className="w-full max-w-5xl px-4 flex items-center justify-between flex-col md:flex-row gap-6 md:gap-10">
            {/* Left: Tagline */}
            <div className="flex flex-col text-left md:w-5/12">
              <span className="f5-tagline-word font-display-serif italic text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-[var(--ink)]">
                Turning
              </span>
              <span className="f5-tagline-word font-display-serif italic text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-[var(--ink)] pl-3">
                Ideas
              </span>
              <span className="f5-tagline-word font-display-serif italic text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-[var(--ink)]">
                into
              </span>
              <span className="f5-tagline-word font-display-serif italic text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] text-[var(--ink)] pl-5">
                Impact.
              </span>
            </div>

            {/* Right: Complete Handcrafted Vector Scene with Plants & Cat */}
            <div className="f5-art-group w-full md:w-7/12 flex justify-center">
              <svg
                viewBox="0 0 620 340"
                className="w-full h-auto max-h-[19rem] overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grounding hairline */}
                <line
                  x1="50"
                  y1="300"
                  x2="570"
                  y2="300"
                  stroke="var(--hairline-strong)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />

                {/* Left Potted Plant on Tripod Stand */}
                <g className="f5-plant-left">
                  <line x1="85" y1="240" x2="70" y2="300" stroke="var(--ink)" strokeWidth="1.5" />
                  <line x1="95" y1="240" x2="85" y2="300" stroke="var(--ink)" strokeWidth="1.2" />
                  <line x1="105" y1="240" x2="115" y2="300" stroke="var(--ink)" strokeWidth="1.5" />
                  <path d="M78 215 L112 215 L106 242 L84 242 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
                  <path d="M95 215 C80 195 65 200 68 180 C80 185 92 195 95 215" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                  <path d="M95 215 C100 185 115 180 120 170 C125 185 110 200 95 215" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                  <path d="M95 215 C95 190 90 170 95 160 C100 175 102 195 95 215" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                </g>

                {/* Center: Lounging Developer with Laptop */}
                <g className="f5-dev">
                  <rect x="150" y="260" width="280" height="10" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                  <rect x="145" y="244" width="290" height="18" rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                  <line x1="180" y1="270" x2="168" y2="300" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="390" y1="270" x2="400" y2="300" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />

                  <path d="M190 235 C198 205 218 190 248 185 C268 182 282 200 280 230" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                  <circle cx="260" cy="168" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
                  <path d="M250 162 C252 152 262 148 272 150 C276 156 270 160 266 160" fill="var(--ink)" />
                  <circle cx="264" cy="168" r="3" fill="none" stroke="var(--ink)" strokeWidth="1.2" />

                  <path d="M225 205 C240 220 260 225 285 224" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
                  <polygon points="280,224 286,192 312,188 308,220" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
                  <line x1="276" y1="225" x2="315" y2="220" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />

                  <path d="M270 235 C290 230 310 205 328 198 C342 192 355 205 370 220 C382 235 398 240 415 240" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" fill="none" />

                  {/* Glowing Lightbulb Overhead */}
                  <g className="f5-bulb">
                    <line x1="330" y1="90" x2="330" y2="125" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2" />
                    <rect x="326" y="125" width="8" height="4" rx="1" stroke="var(--ink)" strokeWidth="1.2" fill="var(--paper)" />
                    <path d="M324 130 C318 134 318 142 322 148 C325 152 327 155 330 155 C333 155 335 152 338 148 C342 142 342 134 336 130 Z" stroke="var(--ink)" strokeWidth="1.4" fill="var(--paper)" />
                    <g className="f5-bulb-sparks" stroke="var(--ink)" strokeWidth="1.2">
                      <line x1="330" y1="118" x2="330" y2="112" />
                      <line x1="344" y1="126" x2="350" y2="122" />
                      <line x1="348" y1="140" x2="355" y2="140" />
                      <line x1="316" y1="126" x2="310" y2="122" />
                      <line x1="312" y1="140" x2="305" y2="140" />
                    </g>
                  </g>
                </g>

                {/* Right Potted Plant on Stand */}
                <g className="f5-plant-right">
                  <line x1="470" y1="245" x2="460" y2="300" stroke="var(--ink)" strokeWidth="1.5" />
                  <line x1="490" y1="245" x2="500" y2="300" stroke="var(--ink)" strokeWidth="1.5" />
                  <path d="M462 220 L498 220 L492 246 L468 246 Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.4" />
                  <path d="M480 220 C465 195 450 195 455 175 C468 180 478 195 480 220" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                  <path d="M480 220 C485 190 500 185 505 175 C510 190 495 205 480 220" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
                </g>

                {/* Sitting Companion Cat beside daybed */}
                <g className="f5-cat">
                  <path d="M525 298 C520 295 518 285 523 276 C527 268 535 268 541 274 C546 281 547 292 544 298 Z" fill="var(--ink)" />
                  <path d="M532 270 L529 260 L535 264 L540 260 L538 270 Z" fill="var(--ink)" />
                  <path d="M523 295 C516 292 511 286 513 280 C514 275 518 275 518 279 C517 282 518 287 523 290" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== FOOTER HINT ==================== */}
      <footer className="relative z-30 flex items-center justify-between w-full pb-1 font-mono text-[0.62rem] text-[var(--muted)] uppercase tracking-wider">
        <span>[INDEX.00 — PRELUDE]</span>
        <span>SCENE 01 / FOLIO SEQUENCE</span>
      </footer>
    </div>
  );
}
