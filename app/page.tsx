"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroIllustration } from "../components/hero-illustration";
import { IntroSequence } from "../components/intro-sequence";
import { AboutSection } from "../components/about-section";
import { WorksArchive } from "../components/works-archive";

gsap.registerPlugin(useGSAP);

// Module-level session guard for Next.js client-side navigation:
// Prevents duplicate animation reruns when navigating back from project case studies,
// while running naturally on fresh page load or manual browser refresh (F5).
let hasPlayedInClientSession = false;

const navItems = [
  { index: "01", label: "Works", href: "#works" },
  { index: "02", label: "About & Expertise", href: "#about" },
  { index: "03", label: "Playground", href: "#playground" },
  { index: "04", label: "Contact", href: "#contact" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // If already played in this client session, skip intro immediately
  const [isIntroActive, setIsIntroActive] = useState<boolean>(() => !hasPlayedInClientSession);
  const [lampLit, setLampLit] = useState<boolean>(() => hasPlayedInClientSession);
  const [catHappy, setCatHappy] = useState<boolean>(false);

  // Safety fallback: ensure site never traps the user under any circumstance
  useEffect(() => {
    if (!isIntroActive) return;
    const safetyTimer = setTimeout(() => {
      handleSkip();
    }, 4500);
    return () => clearTimeout(safetyTimer);
  }, [isIntroActive]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    hasPlayedInClientSession = true;
    setLampLit(true);
    setCatHappy(false);
    setIsIntroActive(false);

    if (heroRef.current) {
      gsap.set(
        heroRef.current.querySelectorAll(
          ".hero-animate-target, .falling-rig, .hero-floor-shadow, .bulb-sparks, .bulb-glow-pulse"
        ),
        { clearProps: "all" }
      );
    }
  };

  useGSAP(
    () => {
      if (!isIntroActive) {
        gsap.set(
          [
            ".hero-animate-target",
            ".falling-rig",
            ".hero-floor-shadow",
            ".bulb-sparks",
            ".bulb-glow-pulse",
          ],
          { clearProps: "all" }
        );
        return;
      }

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        handleSkip();
        return;
      }

      // Master GSAP Timeline with Stage A -> B -> C -> D -> E flow
      const tl = gsap.timeline({
        onComplete: () => {
          hasPlayedInClientSession = true;
          setIsIntroActive(false);
          gsap.set(
            [
              ".hero-animate-target",
              ".falling-rig",
              ".hero-floor-shadow",
              ".bulb-sparks",
              ".bulb-glow-pulse",
            ],
            { clearProps: "all" }
          );
        },
      });

      timelineRef.current = tl;

      // -----------------------------------------------------------------------
      // STAGE A — Anticipation (0.0s – 0.35s)
      // Clean quiet screen, baseline cue & ground contact shadow begins to stir
      // -----------------------------------------------------------------------
      tl.set(".falling-rig", { y: -1200, scaleX: 1, scaleY: 1, transformOrigin: "320px 365px" });
      tl.set(".hero-floor-shadow", { scaleX: 0.18, opacity: 0.04, transformOrigin: "320px 365px" });
      tl.set(".bulb-sparks", { scale: 0, opacity: 0, transformOrigin: "432px 115px" });
      tl.set(".bulb-glow-pulse", { scale: 0.5, opacity: 0, transformOrigin: "432px 115px" });
      tl.set(".hero-animate-target", { autoAlpha: 0 });

      tl.to(
        ".hero-floor-shadow",
        {
          scaleX: 0.35,
          opacity: 0.08,
          duration: 0.35,
          ease: "power1.inOut",
        },
        0
      );

      // -----------------------------------------------------------------------
      // STAGE B — Entrance (0.35s – 1.05s)
      // Character drops down with smooth gravity-based acceleration (ease: power2.in)
      // -----------------------------------------------------------------------
      tl.to(
        ".falling-rig",
        {
          y: 0,
          duration: 0.7,
          ease: "power2.in",
        },
        0.35
      );

      tl.to(
        ".hero-floor-shadow",
        {
          scaleX: 1.0,
          opacity: 0.14,
          duration: 0.7,
          ease: "power2.in",
        },
        0.35
      );

      // -----------------------------------------------------------------------
      // STAGE C — Tactile Landing & Settling (1.05s – 1.4s)
      // 1. Tactile Impact Squash
      // -----------------------------------------------------------------------
      tl.to(
        ".falling-rig",
        {
          scaleY: 0.93,
          scaleX: 1.06,
          duration: 0.09,
          ease: "power1.out",
        },
        1.05
      );

      tl.to(
        ".hero-floor-shadow",
        {
          scaleX: 1.18,
          opacity: 0.22,
          duration: 0.09,
          ease: "power1.out",
        },
        1.05
      );

      // 2. Rebound Overshoot
      tl.to(
        ".falling-rig",
        {
          y: -12,
          scaleY: 1.02,
          scaleX: 0.99,
          duration: 0.14,
          ease: "power2.out",
        },
        1.14
      );

      tl.to(
        ".hero-floor-shadow",
        {
          scaleX: 0.92,
          opacity: 0.07,
          duration: 0.14,
          ease: "power2.out",
        },
        1.14
      );

      // 3. Settle to Rest
      tl.to(
        ".falling-rig",
        {
          y: 0,
          scaleY: 1.0,
          scaleX: 1.0,
          duration: 0.12,
          ease: "power3.out",
        },
        1.28
      );

      tl.to(
        ".hero-floor-shadow",
        {
          scaleX: 1.0,
          opacity: 0.08,
          duration: 0.12,
          ease: "power3.out",
        },
        1.28
      );

      // -----------------------------------------------------------------------
      // STAGE D — Settles into Scene (1.4s – 1.7s)
      // Lightbulb click & spark bursts, companion cat purr tail-wag
      // -----------------------------------------------------------------------
      tl.call(
        () => {
          setLampLit(true);
          setCatHappy(true);
        },
        undefined,
        1.4
      );

      tl.to(
        ".bulb-sparks",
        {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(2)",
        },
        1.42
      );

      tl.to(
        ".bulb-glow-pulse",
        {
          scale: 1,
          opacity: 0.85,
          duration: 0.35,
          ease: "power2.out",
        },
        1.42
      );

      tl.call(
        () => {
          setCatHappy(false);
        },
        undefined,
        2.2
      );

      // -----------------------------------------------------------------------
      // STAGE E — Hero Reveal (1.7s – 2.4s)
      // Main hero title, navigation bar, and flanking bio/philosophy cards reveal
      // -----------------------------------------------------------------------
      tl.to(
        ".intro-prelude-bar",
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        1.7
      );

      tl.fromTo(
        ".hero-headline-wrap",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" },
        1.75
      );

      tl.fromTo(
        ".top-editorial-bar",
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.8
      );

      tl.fromTo(
        ".editorial-grid-nav-bar",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
        1.85
      );

      tl.fromTo(
        [".triptych-card-left", ".triptych-card-right"],
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out" },
        1.9
      );

      tl.fromTo(
        ".bottom-editorial-caption",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        2.0
      );
    },
    { scope: heroRef, dependencies: [isIntroActive] }
  );

  return (
    <div
      className={`portfolio-shell ${isIntroActive ? "intro-active" : ""}`}
      ref={heroRef}
    >
      {/* ==================== MINIMAL PRELUDE HEADER & ESC CONTROLS ==================== */}
      {isIntroActive && <IntroSequence onSkip={handleSkip} />}

      {/* ==================== 01. HERO SECTION ==================== */}
      <main className="hero-section" id="top" aria-label="Siddhesh Gawade Portfolio Hero">
        {/* Top Editorial Bar */}
        <header className="top-editorial-bar hero-animate-target">
          <div className="top-bar-left">
            <span className="status-star" aria-hidden="true">
              ✻
            </span>
            <p className="status-text">
              Open for select
              <br />
              collaborations &amp; roles
            </p>
          </div>

          <a
            href="#top"
            className="brand-monogram"
            aria-label="Siddhesh Gawade - Home"
          >
            SIDDHESH©
          </a>

          <div className="top-bar-right">
            <p className="folio-volume">
              Folio
              <br />
              <strong>Vol. 01 — 2026</strong>
            </p>
          </div>
        </header>

        {/* Oversized Hero Typography */}
        <section className="hero-headline-wrap hero-animate-target" aria-label="Introduction">
          <h1 className="hero-main-title">
            <span className="title-first-name">Siddhesh</span>
            <span className="title-last-name-wrap">
              <span className="title-last-name">Gawade</span>
              <sup className="title-badge" aria-label="Computer Engineering">(CE)</sup>
            </span>
          </h1>
        </section>

        {/* Editorial Grid Navigation */}
        <nav
          className="editorial-grid-nav-bar hero-animate-target"
          aria-label="Portfolio index navigation"
        >
          <ul className="editorial-nav-list">
            {navItems.map((item) => (
              <li key={item.index}>
                <a href={item.href} className="nav-anchor-item">
                  <span className="nav-idx">{item.index}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
            <li className="nav-copyright" aria-label="Copyright year">
              ©2026
            </li>
          </ul>
        </nav>

        {/* Lower Editorial Triptych */}
        <section
          className="editorial-triptych"
          aria-label="Profile summary and illustration"
        >
          {/* Left Column: Student & Engineer Bio */}
          <div className="triptych-card triptych-card-left hero-animate-target">
            <span className="triptych-plus" aria-hidden="true">
              +
            </span>
            <p className="triptych-text">
              <strong>Siddhesh Gawade</strong>, a computer engineering student &amp; developer
              specializing in web applications, computer vision, AI systems, and
              real-time architectures.
            </p>
          </div>

          {/* Center Column: Handcrafted Line Illustration */}
          <HeroIllustration
            lampLit={lampLit}
            onLampToggle={() => setLampLit((prev) => !prev)}
            catHappy={catHappy}
            onCatToggle={() => setCatHappy((prev) => !prev)}
          />

          {/* Right Column: Engineering Philosophy */}
          <div className="triptych-card triptych-card-right hero-animate-target">
            <span className="triptych-plus" aria-hidden="true">
              +
            </span>
            <p className="triptych-text">
              Passionate about building scalable real-time systems, robust digital
              interfaces, and bridging practical engineering with uncompromising
              editorial aesthetics.
            </p>
          </div>
        </section>

        {/* Bottom Editorial Caption */}
        <footer className="bottom-editorial-caption hero-animate-target">
          <p className="editorial-tagline">
            <em>just</em> a curious engineer crafting software with care.
          </p>
        </footer>
      </main>

      {/* ==================== 02. INTERACTIVE WORKS ARCHIVE ==================== */}
      <WorksArchive />

      {/* ==================== 03. EDITORIAL ABOUT & EXPERTISE SECTION ==================== */}
      <AboutSection />
    </div>
  );
}
