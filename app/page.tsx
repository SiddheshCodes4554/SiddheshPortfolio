"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroIllustration } from "../components/hero-illustration";
import { IntroSequence } from "../components/intro-sequence";
import { AboutSection } from "../components/about-section";

gsap.registerPlugin(useGSAP);

const navItems = [
  { index: "01", label: "Works", href: "#works" },
  { index: "02", label: "About & Expertise", href: "#about" },
  { index: "03", label: "Playground", href: "#playground" },
  { index: "04", label: "Contact", href: "#contact" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Triggered during Frame 06 of the intro sequence as the paper curtain lifts
  const handleRevealHero = () => {
    if (!heroRef.current) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(".hero-animate-target", { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ".hero-animate-target",
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  };

  return (
    <div className="portfolio-shell" ref={heroRef}>
      {/* ==================== CINEMATIC INTRO OVERLAY ==================== */}
      <IntroSequence onIntroRevealHero={handleRevealHero} />

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
          className="editorial-triptych hero-animate-target"
          aria-label="Profile summary and illustration"
        >
          {/* Left Column: Student & Engineer Bio */}
          <div className="triptych-card triptych-card-left">
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
          <HeroIllustration />

          {/* Right Column: Engineering Philosophy */}
          <div className="triptych-card triptych-card-right">
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

      {/* ==================== 02. EDITORIAL ABOUT & EXPERTISE SECTION ==================== */}
      <AboutSection />
    </div>
  );
}
