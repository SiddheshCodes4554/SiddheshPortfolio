"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const STORAGE_KEY = "sg_intro_sequence_completed_v1";

interface IntroSequenceProps {
  onIntroComplete?: () => void;
  onIntroRevealHero?: () => void;
  forceReplay?: boolean;
}

export function IntroSequence({
  onIntroComplete,
  onIntroRevealHero,
  forceReplay = false,
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
    }, 4500);

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
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage unavailable, ignore safely
    }
    setIsActive(false);
    onIntroRevealHero?.();
    onIntroComplete?.();
  };

  const handleSkip = () => {
    if (hasSkipped) return;
    setHasSkipped(true);

    if (timelineRef.current) {
      // Kill active timeline and fast-forward cleanly
      timelineRef.current.kill();
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
        onComplete: handleComplete,
      });
    } else {
      handleComplete();
    }
  };

  useGSAP(
    () => {
      // 1. Reduced-motion check: immediately skip animation if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // 2. Session check: if already seen in current session and not forced
      const urlParams = new URLSearchParams(window.location.search);
      const isForcedByUrl = urlParams.get("intro") === "true" || urlParams.get("intro") === "replay";
      const alreadyPlayed =
        !forceReplay && !isForcedByUrl && sessionStorage.getItem(STORAGE_KEY) === "true";

      if (prefersReducedMotion || alreadyPlayed) {
        setIsActive(false);
        onIntroRevealHero?.();
        onIntroComplete?.();
        return;
      }

      // 3. Build the Coordinated Cinematic Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          handleComplete();
        },
      });

      timelineRef.current = tl;

      // Initial state setups for zero FOUC
      gsap.set(".intro-meta-item", { opacity: 0, y: 8 });
      gsap.set(".intro-title-line", { yPercent: 120, rotate: 1 });
      gsap.set(".intro-signature", { opacity: 0, y: 12 });
      gsap.set(".intro-accent-star", { opacity: 0, scale: 0.6, rotate: -45 });
      gsap.set(".intro-skip-btn", { opacity: 0, y: -6 });

      /* =========================================================================
         SCENE 01: The Folio Appears (0.0s – 0.6s)
         Full-viewport warm paper background with corner metadata & skip button
         ========================================================================= */
      tl.addLabel("scene1", 0.05);

      tl.to(
        ".intro-meta-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "scene1"
      );

      tl.to(
        ".intro-skip-btn",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "scene1+=0.15"
      );

      /* =========================================================================
         SCENE 02: The Name is Revealed (0.45s – 1.6s)
         Oversized Instrument Serif italic 'Siddhesh' + Sans-Serif 'Gawade'
         revealed through crisp overflow clipping masks
         ========================================================================= */
      tl.addLabel("scene2", 0.45);

      // 'Siddhesh' rises through mask with editorial grace
      tl.to(
        ".intro-word-siddhesh",
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.95,
          ease: "power4.out",
        },
        "scene2"
      );

      // 'Gawade' follows with slight editorial delay & overlap
      tl.to(
        ".intro-word-gawade",
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.95,
          ease: "power4.out",
        },
        "scene2+=0.18"
      );

      // Rotating decorative asterisk in center
      tl.to(
        ".intro-accent-star",
        {
          opacity: 0.75,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          ease: "back.out(1.5)",
        },
        "scene2+=0.3"
      );

      /* =========================================================================
         SCENE 03: Personal Signature (1.3s – 2.0s)
         '(CE)' badge, engineering discipline tags, and subtle line-art accents
         ========================================================================= */
      tl.addLabel("scene3", 1.25);

      tl.to(
        ".intro-signature",
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
        },
        "scene3"
      );

      tl.to(
        ".intro-accent-star",
        {
          rotate: 90,
          duration: 1.2,
          ease: "power1.inOut",
        },
        "scene3+=0.1"
      );

      /* =========================================================================
         SCENE 04: Seamless Transition into Homepage (2.1s – 2.9s)
         Expanding curtain lift and coordinated hero entry
         ========================================================================= */
      tl.addLabel("scene4", 2.1);

      // Start revealing the underlying hero composition right as the curtain starts to retract
      tl.call(
        () => {
          onIntroRevealHero?.();
        },
        undefined,
        "scene4+=0.1"
      );

      // Name elements glide upward gracefully
      tl.to(
        [".intro-title-line", ".intro-signature", ".intro-accent-star"],
        {
          yPercent: -40,
          opacity: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.in",
        },
        "scene4"
      );

      // Corner metadata departs cleanly
      tl.to(
        [".intro-meta-item", ".intro-skip-btn"],
        {
          opacity: 0,
          y: -8,
          duration: 0.35,
          stagger: 0.03,
          ease: "power2.in",
        },
        "scene4+=0.05"
      );

      // The full paper overlay curtain retracts with an editorial wipe/lift
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "scene4+=0.15"
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
      className="intro-overlay fixed inset-0 z-[9999] flex flex-col justify-between p-[var(--space-gutter)] bg-[var(--paper)] text-[var(--ink)] overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Folio introductory sequence"
    >
      {/* Background paper texture & hairline framing */}
      <div className="pointer-events-none absolute inset-x-[var(--space-gutter)] top-0 h-[1px] bg-[var(--hairline)]" />
      <div className="pointer-events-none absolute inset-x-[var(--space-gutter)] bottom-0 h-[1px] bg-[var(--hairline)]" />

      {/* ==================== TOP METADATA & SKIP BUTTON ==================== */}
      <header className="relative z-20 flex items-start justify-between w-full pt-1">
        {/* Top-Left Metadata */}
        <div className="intro-meta-item flex flex-col gap-0.5">
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--muted)]">
            INDEPENDENT DEVELOPER
          </span>
          <span className="font-sans text-[0.68rem] tracking-wide text-[var(--ink)] font-medium">
            STUDENT OF COMPUTING &amp; AI
          </span>
        </div>

        {/* Top-Center / Right Skip Control */}
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

          {/* Top-Right Metadata */}
          <div className="intro-meta-item hidden sm:flex flex-col items-end gap-0.5 text-right">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--muted)]">
              PORTFOLIO / 2026
            </span>
            <span className="font-sans text-[0.68rem] tracking-wide text-[var(--ink)] font-medium">
              VOL. 01 — PRELUDE
            </span>
          </div>
        </div>
      </header>

      {/* ==================== CENTER STAGE: SCENE 02 & 03 ==================== */}
      <main className="intro-center-stage relative z-10 flex flex-col items-center justify-center my-auto w-full text-center px-2">
        {/* Decorative Floating Asterisk */}
        <div className="intro-accent-star mb-3 text-[1.4rem] text-[var(--ink)] font-mono leading-none select-none">
          ✻
        </div>

        {/* Word 1: 'Siddhesh' with Masked Overflow */}
        <div className="intro-mask-wrap overflow-hidden py-1 w-full flex justify-center">
          <h1 className="intro-title-line intro-word-siddhesh font-display-serif italic font-normal text-[var(--ink)] text-[clamp(3.5rem,13vw,12rem)] leading-[0.88] tracking-[-0.04em] m-0">
            Siddhesh
          </h1>
        </div>

        {/* Word 2: 'Gawade (CE)' with Masked Overflow */}
        <div className="intro-mask-wrap overflow-hidden py-1 w-full flex justify-center">
          <div className="intro-title-line intro-word-gawade flex items-baseline justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="font-display-sans font-medium text-[var(--ink)] text-[clamp(3.5rem,13vw,12rem)] leading-[0.88] tracking-[-0.06em]">
              Gawade
            </span>
            <span className="font-display-sans font-normal text-[clamp(1.2rem,3.4vw,3.2rem)] text-[var(--ink)] tracking-tight align-super">
              (CE)
            </span>
          </div>
        </div>

        {/* Scene 03: Engineering Disciplines & Signature Rule */}
        <div className="intro-signature flex items-center justify-center gap-3 sm:gap-5 mt-6 sm:mt-8 max-w-xl">
          <span className="h-[1px] w-6 sm:w-12 bg-[var(--hairline-strong)]" />
          <p className="font-editorial-mono text-[0.65rem] sm:text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)] m-0 whitespace-nowrap">
            Computer Engineering · Web · AI Systems
          </p>
          <span className="h-[1px] w-6 sm:w-12 bg-[var(--hairline-strong)]" />
        </div>
      </main>

      {/* ==================== BOTTOM METADATA ==================== */}
      <footer className="relative z-20 flex items-end justify-between w-full pb-1">
        {/* Bottom-Left Folio Coordinates */}
        <div className="intro-meta-item flex flex-col gap-0.5">
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--muted)]">
            [00 — INDEX]
          </span>
          <span className="font-mono text-[0.65rem] tracking-widest text-[var(--ink)]">
            SYS.PREVIEW_RUN
          </span>
        </div>

        {/* Center Hint on Mobile */}
        <div className="intro-meta-item sm:hidden text-center">
          <span className="font-mono text-[0.6rem] text-[var(--muted)] uppercase">
            PORTFOLIO / 2026
          </span>
        </div>

        {/* Bottom-Right Coordinates */}
        <div className="intro-meta-item flex flex-col items-end gap-0.5 text-right">
          <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[var(--muted)]">
            SCENE 01 / 04
          </span>
          <span className="font-sans text-[0.68rem] tracking-wide text-[var(--ink)] font-medium">
            EDITORIAL PREVIEW
          </span>
        </div>
      </footer>
    </div>
  );
}
