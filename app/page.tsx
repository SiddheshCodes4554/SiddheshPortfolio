import { HeroIllustration } from "../components/hero-illustration";

const navItems = [
  { index: "01", label: "Works", href: "#works" },
  { index: "02", label: "About & Expertise", href: "#about" },
  { index: "03", label: "Playground", href: "#playground" },
  { index: "04", label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="portfolio-shell">
      <main className="hero-section" id="top" aria-label="Siddhesh Gawade Portfolio Hero">
        {/* ==================== 1. TOP EDITORIAL BAR ==================== */}
        <header className="top-editorial-bar reveal-item">
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

        {/* ==================== 2. OVERSIZED HERO TYPOGRAPHY ==================== */}
        <section className="hero-headline-wrap reveal-item delay-1" aria-label="Introduction">
          <h1 className="hero-main-title">
            <span className="title-first-name">Siddhesh</span>
            <span className="title-last-name-wrap">
              <span className="title-last-name">Gawade</span>
              <sup className="title-badge" aria-label="Computer Engineering">(CE)</sup>
            </span>
          </h1>
        </section>

        {/* ==================== 3. EDITORIAL GRID NAVIGATION ==================== */}
        <nav
          className="editorial-grid-nav-bar reveal-item delay-2"
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

        {/* ==================== 4. LOWER EDITORIAL TRIPTYCH ==================== */}
        <section
          className="editorial-triptych reveal-item delay-3"
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

          {/* Center Column: Iconic Handcrafted Line Illustration */}
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

        {/* ==================== 5. BOTTOM EDITORIAL CAPTION ==================== */}
        <footer className="bottom-editorial-caption reveal-item delay-4">
          <p className="editorial-tagline">
            <em>just</em> a curious engineer crafting software with care.
          </p>

          {/* Subtle Milestone Teaser / Section Anchor */}
          <div className="archive-preview-cue" id="works">
            <span>Milestone 01 · Hero Environment Ready</span>
            <a href="#top" className="cue-link" aria-label="Scroll back to top">
              Top ↑
            </a>
            <span>Works Archive · Milestone 02</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
