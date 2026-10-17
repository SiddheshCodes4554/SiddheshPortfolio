"use client";

import { useEffect } from "react";

interface IntroSequenceProps {
  onSkip: () => void;
}

export function IntroSequence({ onSkip }: IntroSequenceProps) {
  // Global ESC key listener to skip intro animation immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  return (
    <header
      className="intro-prelude-bar flex items-center justify-between w-full"
      role="region"
      aria-label="Folio prelude controls"
    >
      {/* Brand Monogram */}
      <span className="font-sans text-[0.78rem] tracking-[0.08em] text-[var(--ink)] font-bold uppercase select-none">
        SIDDHESH©
      </span>

      {/* Skip Button and Metadata */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onSkip}
          className="intro-skip-btn flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--ink)] py-1.5 px-3 rounded-full border border-[var(--hairline-strong)] hover:border-[var(--ink)] bg-[var(--paper)] transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Skip introductory animation (Press Escape)"
        >
          <span>Skip intro</span>
          <span className="opacity-50 text-[0.55rem]">[ESC]</span>
        </button>

        <span className="font-mono text-[0.65rem] tracking-wider text-[var(--muted)] uppercase hidden sm:inline-block select-none">
          PORTFOLIO / 2026
        </span>
      </div>
    </header>
  );
}
