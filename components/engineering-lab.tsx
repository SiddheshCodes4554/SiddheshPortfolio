"use client";

import { useEffect, useRef, useState } from "react";

type LabMode = "vision" | "waveform" | "radar";

export function EngineeringLab() {
  const [mode, setMode] = useState<LabMode>("vision");
  const [timeStr, setTimeStr] = useState<string>("");
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 140, y: 110 });
  const [pingCount, setPingCount] = useState<number>(0);
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [waveOffset, setWaveOffset] = useState<number>(0);
  const canvasAreaRef = useRef<HTMLDivElement>(null);

  // 1. Live India Clock (IST UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Animation loop for Radar and Waveform modes
  useEffect(() => {
    let animId: number;

    const loop = () => {
      setRadarAngle((prev) => (prev + 1.8) % 360);
      setWaveOffset((prev) => (prev + 0.08) % (Math.PI * 2));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3. Pointer tracking within the vision viewport
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasAreaRef.current) return;
    const rect = canvasAreaRef.current.getBoundingClientRect();
    const x = Math.max(40, Math.min(rect.width - 40, e.clientX - rect.left));
    const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top));
    setPointerPos({ x: Math.round(x), y: Math.round(y) });
  };

  const handleCanvasClick = () => {
    setPingCount((prev) => prev + 1);
  };

  // Generate dynamic sine waveform path
  const generateWavePath = () => {
    const width = 320;
    const height = 180;
    const midY = height / 2;
    const points: string[] = [];

    for (let x = 0; x <= width; x += 6) {
      const freq = 0.045;
      const y =
        midY +
        Math.sin(x * freq + waveOffset) * 28 +
        Math.cos(x * 0.02 + waveOffset * 1.5) * 12;
      points.push(`${x === 0 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
    }

    return points.join(" ");
  };

  return (
    <div className="engineering-lab-card w-full max-w-md border border-[var(--hairline-strong)] p-3 bg-[var(--paper)] shadow-[12px_16px_36px_rgba(0,0,0,0.06)] relative flex flex-col gap-3">
      {/* ==================== CARD HEADER ==================== */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--hairline)] font-mono text-[0.58rem] text-[var(--muted)] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--ink)] animate-pulse" />
          <span className="text-[var(--ink)] font-bold">SYS.MONITOR // REAL-TIME</span>
        </div>
        <span>{timeStr || "09:40:00 AM IST"}</span>
      </div>

      {/* ==================== MODE SWITCHER TABS ==================== */}
      <div className="flex items-center justify-between gap-1 pb-1">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMode("vision")}
            className={`font-mono text-[0.58rem] uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors cursor-pointer ${
              mode === "vision"
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                : "bg-[var(--paper)] text-[var(--muted)] border-[var(--hairline)] hover:border-[var(--ink)]"
            }`}
          >
            [CV VISION]
          </button>
          <button
            type="button"
            onClick={() => setMode("waveform")}
            className={`font-mono text-[0.58rem] uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors cursor-pointer ${
              mode === "waveform"
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                : "bg-[var(--paper)] text-[var(--muted)] border-[var(--hairline)] hover:border-[var(--ink)]"
            }`}
          >
            [WAVEFORM]
          </button>
          <button
            type="button"
            onClick={() => setMode("radar")}
            className={`font-mono text-[0.58rem] uppercase tracking-wider px-2 py-0.5 rounded-sm border transition-colors cursor-pointer ${
              mode === "radar"
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                : "bg-[var(--paper)] text-[var(--muted)] border-[var(--hairline)] hover:border-[var(--ink)]"
            }`}
          >
            [RADAR]
          </button>
        </div>

        <span className="font-mono text-[0.55rem] text-[var(--muted)] uppercase">
          {mode === "vision" && "INTERACTIVE TRACKER"}
          {mode === "waveform" && "STREAMING TELEMETRY"}
          {mode === "radar" && "NODE SWEEP"}
        </span>
      </div>

      {/* ==================== INTERACTIVE VIEWPORT ==================== */}
      <div
        ref={canvasAreaRef}
        onPointerMove={handlePointerMove}
        onClick={handleCanvasClick}
        className="relative aspect-[4/3] w-full bg-[var(--paper-card)] border border-[var(--hairline)] overflow-hidden select-none cursor-crosshair flex items-center justify-center"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#121212_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* 4 Viewfinder Corner Brackets */}
        <span className="absolute top-2 left-2 font-mono text-[0.65rem] text-[var(--hairline-strong)]">+</span>
        <span className="absolute top-2 right-2 font-mono text-[0.65rem] text-[var(--hairline-strong)]">+</span>
        <span className="absolute bottom-2 left-2 font-mono text-[0.65rem] text-[var(--hairline-strong)]">+</span>
        <span className="absolute bottom-2 right-2 font-mono text-[0.65rem] text-[var(--hairline-strong)]">+</span>

        {/* -------------------- MODE 1: COMPUTER VISION HUD -------------------- */}
        {mode === "vision" && (
          <div className="relative w-full h-full pointer-events-none">
            {/* Center Focal Reticle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
              <div className="w-24 h-24 rounded-full border border-dashed border-[var(--ink)]" />
              <div className="absolute w-32 h-[1px] bg-[var(--ink)]" />
              <div className="absolute h-32 w-[1px] bg-[var(--ink)]" />
            </div>

            {/* Dynamic Cursor Bounding Box */}
            <div
              className="absolute transition-all duration-75 ease-out pointer-events-none"
              style={{
                left: `${pointerPos.x}px`,
                top: `${pointerPos.y}px`,
                transform: "translate(-50%, -50%)",
                width: "90px",
                height: "90px",
              }}
            >
              {/* Corner brackets bounding box */}
              <div className="w-full h-full border border-[var(--ink)] relative">
                {/* Crosshairs on box corners */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--ink)]" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[var(--ink)]" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[var(--ink)]" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--ink)]" />

                {/* Target label tag */}
                <div className="absolute -top-6 left-0 bg-[var(--ink)] text-[var(--paper)] font-mono text-[0.55rem] px-1 py-0.2 whitespace-nowrap uppercase tracking-widest font-semibold flex items-center gap-1">
                  <span>TARGET: DEV</span>
                  <span className="text-[0.45rem] opacity-75">99.8%</span>
                </div>

                {/* Subtag coordinates */}
                <div className="absolute -bottom-5 left-0 font-mono text-[0.5rem] text-[var(--ink)] tracking-wider whitespace-nowrap bg-[var(--paper)] px-1 border border-[var(--hairline)]">
                  X:{pointerPos.x} Y:{pointerPos.y}
                </div>
              </div>
            </div>

            {/* Bottom HUD stats */}
            <div className="absolute bottom-2 inset-x-3 flex justify-between items-end font-mono text-[0.52rem] text-[var(--muted)] uppercase tracking-wider">
              <span>FPS: 60 · INFERENCE: 14MS</span>
              <span>CLICKS: {pingCount}</span>
            </div>
          </div>
        )}

        {/* -------------------- MODE 2: TELEMETRY WAVEFORM -------------------- */}
        {mode === "waveform" && (
          <div className="relative w-full h-full flex flex-col justify-between p-3 pointer-events-none">
            <div className="flex justify-between items-center font-mono text-[0.55rem] text-[var(--muted)] uppercase">
              <span>STREAM: WEBSOCKET / LIVE</span>
              <span>PACKETS: 1,420/SEC</span>
            </div>

            {/* SVG Live Wave */}
            <svg
              viewBox="0 0 320 180"
              className="w-full h-28 overflow-visible my-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Baseline center hairline */}
              <line
                x1="0"
                y1="90"
                x2="320"
                y2="90"
                stroke="var(--hairline-strong)"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              {/* Animated Wave Path */}
              <path
                d={generateWavePath()}
                stroke="var(--ink)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div className="flex justify-between items-center font-mono text-[0.52rem] text-[var(--muted)] uppercase">
              <span>LATENCY: 12ms</span>
              <span>BUFFER: 0% LOSS</span>
            </div>
          </div>
        )}

        {/* -------------------- MODE 3: RADAR SWEEP -------------------- */}
        {mode === "radar" && (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Concentric radar rings */}
            <div className="w-44 h-44 rounded-full border border-[var(--hairline-strong)] absolute" />
            <div className="w-28 h-28 rounded-full border border-[var(--hairline)] absolute" />
            <div className="w-14 h-14 rounded-full border border-[var(--hairline)] absolute" />

            {/* Cross axes */}
            <div className="w-48 h-[1px] bg-[var(--hairline)] absolute" />
            <div className="h-48 w-[1px] bg-[var(--hairline)] absolute" />

            {/* Radar Sweep Line */}
            <div
              className="absolute w-44 h-44 rounded-full flex items-center justify-center"
              style={{ transform: `rotate(${radarAngle}deg)` }}
            >
              <div
                className="w-22 h-[1.5px] bg-[var(--ink)] absolute origin-left left-[50%]"
                style={{
                  background: "linear-gradient(90deg, var(--ink), transparent)",
                }}
              />
            </div>

            {/* Detected Node Targets on Radar */}
            <div className="absolute top-[32%] left-[40%] flex items-center gap-1 font-mono text-[0.5rem] text-[var(--ink)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
              <span>NODE.WEB</span>
            </div>
            <div className="absolute bottom-[30%] right-[32%] flex items-center gap-1 font-mono text-[0.5rem] text-[var(--ink)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
              <span>NODE.VISION</span>
            </div>

            <div className="absolute bottom-2 right-3 font-mono text-[0.52rem] text-[var(--muted)] uppercase">
              SCANNING 360°
            </div>
          </div>
        )}
      </div>

      {/* ==================== PERSONAL ENGINEERING OBSESSIONS / SPECS ==================== */}
      <div className="flex flex-col gap-2 pt-2 border-t border-[var(--hairline)]">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)] font-semibold">
          // ENGINEERING SPECS &amp; OBSESSIONS
        </span>

        <ul className="list-none p-0 m-0 space-y-1.5 font-sans text-[0.74rem] text-[var(--ink)]">
          <li className="flex items-start gap-2">
            <span className="font-mono text-[0.65rem] text-[var(--muted)]">01.</span>
            <span>
              <strong>Real-Time Architectures:</strong> Obsessed with low-latency event flows and sub-100ms response targets.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-[0.65rem] text-[var(--muted)]">02.</span>
            <span>
              <strong>Applied Computer Vision:</strong> Building practical camera tracking and object detection that runs efficiently on the edge.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-[0.65rem] text-[var(--muted)]">03.</span>
            <span>
              <strong>Mechkey Enthusiast:</strong> Custom 65% mechanical board builder (heavy tactile switches only).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono text-[0.65rem] text-[var(--muted)]">04.</span>
            <span>
              <strong>Craft Principle:</strong> Great engineering never compromises on clarity, speed, or typography.
            </span>
          </li>
        </ul>
      </div>

      {/* ==================== CARD FOOTER ==================== */}
      <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between font-mono text-[0.55rem] text-[var(--muted)] uppercase tracking-wider">
        <span>STATUS: ALL SYSTEMS NOMINAL</span>
        <span>INTERACT: MOVE / TAP CANVAS</span>
      </div>
    </div>
  );
}
