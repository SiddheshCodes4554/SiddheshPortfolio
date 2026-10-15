import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projectsData } from "../../../data/projects";
import { CaseStudyView } from "../../../components/case-study-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found — Siddhesh Gawade",
    };
  }

  return {
    title: `${project.title} — Case Study | Siddhesh Gawade`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = projectsData.findIndex((p) => p.id === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject =
    currentIndex > 0
      ? projectsData[currentIndex - 1]
      : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : projectsData[0];

  return (
    <div className="portfolio-shell min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Editorial Top Bar */}
      <header className="px-[var(--space-gutter)] py-4 border-b border-[var(--hairline)] flex items-center justify-between bg-[var(--paper)] select-none">
        <Link
          href="/#works"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--ink)] hover:text-[var(--muted)] transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Return to Portfolio</span>
        </Link>

        <Link
          href="/"
          className="brand-monogram font-sans text-xs font-semibold tracking-wider"
          aria-label="Siddhesh Gawade Home"
        >
          SIDDHESH©
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[var(--muted)] hidden sm:inline">
            FOLIO VOL. 01 — 2026
          </span>
          <span className="font-semibold text-[var(--ink)]">
            [ 0{currentIndex + 1} / 0{projectsData.length} ]
          </span>
        </div>
      </header>

      {/* Full-bleed Dedicated Case Study View */}
      <main className="w-full">
        <CaseStudyView
          project={project}
          prevSlug={prevProject.id}
          nextSlug={nextProject.id}
        />
      </main>

      {/* Footer Navigation Bar */}
      <footer className="px-[var(--space-gutter)] py-8 border-t border-[var(--hairline)] bg-[var(--paper)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--muted)]">
        <Link
          href={`/works/${prevProject.id}`}
          className="hover:text-[var(--ink)] transition-colors flex items-center gap-2"
        >
          <span>← PREV:</span>
          <strong className="text-[var(--ink)] font-medium">
            {prevProject.title}
          </strong>
        </Link>

        <span className="text-center text-[0.65rem] tracking-widest uppercase">
          EVIDENCE-BASED ENGINEERING MONOGRAPH
        </span>

        <Link
          href={`/works/${nextProject.id}`}
          className="hover:text-[var(--ink)] transition-colors flex items-center gap-2"
        >
          <span>NEXT:</span>
          <strong className="text-[var(--ink)] font-medium">
            {nextProject.title}
          </strong>
          <span>→</span>
        </Link>
      </footer>
    </div>
  );
}
