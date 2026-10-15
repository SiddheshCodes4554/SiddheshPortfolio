"use client";

import React from "react";
import { Project } from "../data/projects";

interface ProjectSchematicProps {
  type: Project["schematicType"];
  className?: string;
  isExpanded?: boolean;
}

export function ProjectSchematic({
  type,
  className = "",
  isExpanded = false,
}: ProjectSchematicProps) {
  switch (type) {
    case "aeris-drone":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          {/* Top metadata row */}
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>SCHEMATIC / AERIS-UAV-01</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] animate-pulse" />
              EDGE CV ACTIVE
            </span>
            <span>20Hz RF LINK</span>
          </div>

          {/* SVG Diagram */}
          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* Coordinate Grid lines */}
              <defs>
                <pattern
                  id="aeris-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="20"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeOpacity="0.12"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="20"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeOpacity="0.12"
                  />
                </pattern>
              </defs>
              <rect width="400" height="220" fill="url(#aeris-grid)" />

              {/* Drone Body / Frame */}
              <g transform="translate(110, 85)">
                {/* Center chassis */}
                <circle
                  cx="0"
                  cy="0"
                  r="14"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="4"
                  fill="currentColor"
                  fillOpacity="0.8"
                />

                {/* Drone Arms */}
                <line
                  x1="-35"
                  y1="-30"
                  x2="35"
                  y2="30"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <line
                  x1="-35"
                  y1="30"
                  x2="35"
                  y2="-30"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />

                {/* Rotors */}
                <circle
                  cx="-35"
                  cy="-30"
                  r="12"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <circle
                  cx="35"
                  cy="30"
                  r="12"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <circle
                  cx="-35"
                  cy="30"
                  r="12"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <circle
                  cx="35"
                  cy="-30"
                  r="12"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />

                {/* Rotor center pins */}
                <circle cx="-35" cy="-30" r="2" fill="currentColor" />
                <circle cx="35" cy="30" r="2" fill="currentColor" />
                <circle cx="-35" cy="30" r="2" fill="currentColor" />
                <circle cx="35" cy="-30" r="2" fill="currentColor" />

                {/* Gimbal Sensor Projection Cone */}
                <path
                  d="M 0 14 L -45 105 L 45 105 Z"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  strokeOpacity="0.45"
                  fill="currentColor"
                  fillOpacity="0.04"
                />
                <text
                  x="0"
                  y="55"
                  textAnchor="middle"
                  fontSize="7"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  SENSOR FOV 84°
                </text>
              </g>

              {/* RF Serial Wave Link */}
              <g transform="translate(195, 80)">
                <path
                  d="M 0 0 C 25 -20, 45 20, 70 0"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  strokeOpacity="0.6"
                />
                <polygon
                  points="70,-3 76,0 70,3"
                  fill="currentColor"
                  stroke="none"
                />
                <text
                  x="35"
                  y="-12"
                  textAnchor="middle"
                  fontSize="7"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.08em"
                >
                  2.4GHz RF PACKETS
                </text>
              </g>

              {/* Ground Station Command Node */}
              <g transform="translate(305, 50)">
                <rect
                  x="0"
                  y="0"
                  width="78"
                  height="65"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                {/* Header bar */}
                <line
                  x1="0"
                  y1="14"
                  x2="78"
                  y2="14"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
                <text
                  x="6"
                  y="10"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.06em"
                >
                  GCS COMMAND
                </text>

                {/* Mini Map radar display in GCS */}
                <circle
                  cx="39"
                  cy="38"
                  r="16"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  strokeOpacity="0.4"
                />
                <line
                  x1="39"
                  y1="22"
                  x2="39"
                  y2="54"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                <line
                  x1="23"
                  y1="38"
                  x2="55"
                  y2="38"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                {/* Target blip */}
                <circle cx="45" cy="33" r="2.5" fill="currentColor" />
                <circle
                  cx="45"
                  cy="33"
                  r="5"
                  strokeWidth="0.7"
                  strokeOpacity="0.5"
                />
              </g>

              {/* Bounding box detection on ground */}
              <g transform="translate(70, 175)">
                <rect
                  x="0"
                  y="0"
                  width="50"
                  height="26"
                  strokeWidth="1"
                  strokeDasharray="2 1"
                  strokeOpacity="0.85"
                />
                <text
                  x="4"
                  y="10"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  TARGET: SURVIVOR
                </text>
                <text
                  x="4"
                  y="19"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  CONF: 94.2%
                </text>
              </g>

              {/* Coordinate readouts */}
              <text
                x="15"
                y="205"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                LAT: 18.5204° N / LNG: 73.8567° E / ALT: 42.5m
              </text>
              <text
                x="385"
                y="205"
                textAnchor="end"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                PAYLOAD: JETSON-TENSORRT
              </text>
            </svg>
          </div>

          {/* Bottom telemetry indicators */}
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>PACKET DROP: 0.02%</span>
            <span>INFERENCE: 38ms</span>
            <span>STATUS: STABLE</span>
          </div>
        </div>
      );

    case "drishti-vision":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>HOMOGRAPHY CALIBRATION / DRISHTI</span>
            <span>4-STREAM PIPELINE</span>
            <span>ACCURACY: ±0.4m</span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* RTSP Camera Frustum */}
              <g transform="translate(30, 40)">
                <rect
                  x="0"
                  y="0"
                  width="40"
                  height="28"
                  strokeWidth="1.2"
                  strokeOpacity="0.9"
                  fill="var(--paper)"
                />
                <circle cx="20" cy="14" r="6" strokeWidth="0.8" />
                <circle cx="20" cy="14" r="2.5" fill="currentColor" />
                <text
                  x="20"
                  y="38"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                >
                  RTSP CAM 01
                </text>

                {/* Perspective projection rays */}
                <line
                  x1="40"
                  y1="5"
                  x2="140"
                  y2="30"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  strokeOpacity="0.4"
                />
                <line
                  x1="40"
                  y1="23"
                  x2="140"
                  y2="130"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  strokeOpacity="0.4"
                />
              </g>

              {/* 2D Camera Frame Matrix */}
              <g transform="translate(140, 25)">
                <rect
                  x="0"
                  y="0"
                  width="95"
                  height="115"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                  fill="var(--paper)"
                />
                <text
                  x="8"
                  y="12"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  2D IMAGE PLANE (x, y)
                </text>

                {/* Target box */}
                <rect
                  x="22"
                  y="30"
                  width="32"
                  height="55"
                  strokeWidth="1"
                  strokeOpacity="0.9"
                />
                <text
                  x="25"
                  y="40"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                >
                  ID: 042 [HUMAN]
                </text>
                <circle cx="38" cy="85" r="2" fill="currentColor" />
                <text
                  x="43"
                  y="87"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                >
                  BASE
                </text>
              </g>

              {/* Transform Arrow with Homography Equation */}
              <g transform="translate(245, 75)">
                <path
                  d="M 5 15 L 35 15"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                />
                <polygon
                  points="35,12 42,15 35,18"
                  fill="currentColor"
                  stroke="none"
                />
                <text
                  x="22"
                  y="5"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.06em"
                >
                  [ H · x = X ]
                </text>
                <text
                  x="22"
                  y="28"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  3×3 MATRIX
                </text>
              </g>

              {/* 3D GIS Floor Map Ground Plane */}
              <g transform="translate(295, 30)">
                {/* Skewed quadrilateral representing ground map */}
                <polygon
                  points="20,15 85,5 95,95 5,115"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                {/* Internal coordinate grid lines */}
                <line
                  x1="20"
                  y1="55"
                  x2="90"
                  y2="50"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />
                <line
                  x1="52"
                  y1="10"
                  x2="50"
                  y2="105"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />

                {/* Projected point */}
                <circle cx="50" cy="62" r="3" fill="currentColor" />
                <circle
                  cx="50"
                  cy="62"
                  r="7"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <text
                  x="25"
                  y="130"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  GIS WORLD (X, Y)
                </text>
              </g>

              {/* Bottom tracking summary */}
              <text
                x="15"
                y="200"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                DEEPSORT TRACKING: ACTIVE / FPS: 30 / OCCLUSION TOLERANCE: 30F
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>MODEL: YOLOV8 + DEEPSORT</span>
            <span>PERSISTENCE: 94.2%</span>
            <span>LATENCY: 22ms</span>
          </div>
        </div>
      );

    case "market-sentiment":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>FINBERT PIPELINE / MARKETMOOD</span>
            <span>ROLLING SENTIMENT vs PRICE</span>
            <span>DAILY: 5K+ HEADLINES</span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* News Feeds Input */}
              <g transform="translate(20, 45)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="80"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="8"
                  y="12"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  NEWS WIRE
                </text>
                <line
                  x1="8"
                  y1="22"
                  x2="62"
                  y2="22"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
                <line
                  x1="8"
                  y1="34"
                  x2="55"
                  y2="34"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
                <line
                  x1="8"
                  y1="46"
                  x2="60"
                  y2="46"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
                <text
                  x="8"
                  y="65"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  MINHASH DEDUP
                </text>
              </g>

              {/* Arrow to FinBERT */}
              <g transform="translate(95, 80)">
                <line
                  x1="0"
                  y1="5"
                  x2="28"
                  y2="5"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <polygon
                  points="28,2 34,5 28,8"
                  fill="currentColor"
                  stroke="none"
                />
              </g>

              {/* FinBERT Transformer Core */}
              <g transform="translate(135, 40)">
                <rect
                  x="0"
                  y="0"
                  width="85"
                  height="90"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                <text
                  x="42"
                  y="16"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.06em"
                >
                  FinBERT MODEL
                </text>
                <text
                  x="42"
                  y="26"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  ATTENTION HEADS
                </text>

                {/* Transformer Layers schematic */}
                <line
                  x1="12"
                  y1="38"
                  x2="73"
                  y2="38"
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                />
                <line
                  x1="12"
                  y1="50"
                  x2="73"
                  y2="50"
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                />
                <line
                  x1="12"
                  y1="62"
                  x2="73"
                  y2="62"
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                />

                <circle cx="25" cy="74" r="2" fill="currentColor" />
                <circle cx="42" cy="74" r="2" fill="currentColor" />
                <circle cx="59" cy="74" r="2" fill="currentColor" />
                <text
                  x="42"
                  y="84"
                  textAnchor="middle"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.7"
                >
                  [-1.0 ↔ +1.0]
                </text>
              </g>

              {/* Arrow to Chart */}
              <g transform="translate(225, 80)">
                <line
                  x1="0"
                  y1="5"
                  x2="28"
                  y2="5"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <polygon
                  points="28,2 34,5 28,8"
                  fill="currentColor"
                  stroke="none"
                />
              </g>

              {/* Divergence Chart Window */}
              <g transform="translate(260, 30)">
                <rect
                  x="0"
                  y="0"
                  width="125"
                  height="115"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="10"
                  y="14"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  SENTIMENT CORRELATION
                </text>

                {/* Zero centerline */}
                <line
                  x1="10"
                  y1="60"
                  x2="115"
                  y2="60"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  strokeOpacity="0.4"
                />

                {/* Sentiment curve (dashed) */}
                <path
                  d="M 12 70 Q 35 40, 55 50 T 90 35 T 115 45"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                  strokeOpacity="0.8"
                />

                {/* Price curve (solid) */}
                <path
                  d="M 12 78 Q 40 65, 60 70 T 95 48 T 115 42"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                />

                {/* Legend */}
                <line
                  x1="12"
                  y1="98"
                  x2="24"
                  y2="98"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
                <text
                  x="28"
                  y="100"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                >
                  FinBERT Sentiment
                </text>

                <line
                  x1="70"
                  y1="98"
                  x2="82"
                  y2="98"
                  strokeWidth="1.5"
                />
                <text
                  x="86"
                  y="100"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                >
                  Asset Price
                </text>
              </g>

              {/* Footnote */}
              <text
                x="15"
                y="195"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                LATENCY: &lt; 250ms / REDIS TIMESERIES PERSISTENCE / FINBERT POLARITY
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>ACCURACY: 88.6%</span>
            <span>VECTOR DB: REDIS</span>
            <span>INFERENCE: GPU CLOUD</span>
          </div>
        </div>
      );

    case "filesense-rag":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>LOCAL RAG RETRIEVAL / FILESENSE</span>
            <span>HYBRID DENSE + BM25</span>
            <span>ZERO CLOUD LEAKAGE</span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* Document Input Stack */}
              <g transform="translate(20, 35)">
                <rect
                  x="4"
                  y="4"
                  width="50"
                  height="70"
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                  fill="var(--paper)"
                />
                <rect
                  x="0"
                  y="0"
                  width="50"
                  height="70"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                <text
                  x="6"
                  y="12"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  PDF CORPUS
                </text>
                <line
                  x1="8"
                  y1="22"
                  x2="42"
                  y2="22"
                  strokeWidth="0.7"
                  strokeOpacity="0.3"
                />
                <line
                  x1="8"
                  y1="32"
                  x2="38"
                  y2="32"
                  strokeWidth="0.7"
                  strokeOpacity="0.3"
                />
                <line
                  x1="8"
                  y1="42"
                  x2="40"
                  y2="42"
                  strokeWidth="0.7"
                  strokeOpacity="0.3"
                />
                <text
                  x="6"
                  y="62"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  CHUNK 512t
                </text>
              </g>

              {/* Dual Branch Fork */}
              <g transform="translate(75, 65)">
                <path
                  d="M 0 5 L 20 5 L 40 -20 L 55 -20"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <path
                  d="M 0 5 L 20 5 L 40 30 L 55 30"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
              </g>

              {/* Dual Index Nodes */}
              <g transform="translate(135, 30)">
                <rect
                  x="0"
                  y="0"
                  width="75"
                  height="34"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="6"
                  y="12"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  FAISS DENSE INDEX
                </text>
                <text
                  x="6"
                  y="24"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Semantic Vectors
                </text>
              </g>

              <g transform="translate(135, 80)">
                <rect
                  x="0"
                  y="0"
                  width="75"
                  height="34"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="6"
                  y="12"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  BM25 SPARSE INDEX
                </text>
                <text
                  x="6"
                  y="24"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Exact Keywords
                </text>
              </g>

              {/* Merge to Cross Encoder */}
              <g transform="translate(215, 65)">
                <path
                  d="M 0 -20 L 15 -20 L 30 5 L 40 5"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <path
                  d="M 0 30 L 15 30 L 30 5 L 40 5"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
              </g>

              {/* Reranker & Output */}
              <g transform="translate(260, 40)">
                <rect
                  x="0"
                  y="0"
                  width="125"
                  height="85"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                <text
                  x="8"
                  y="14"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  GROUNDED CITATION OUTPUT
                </text>
                <rect
                  x="8"
                  y="24"
                  width="109"
                  height="22"
                  strokeWidth="0.7"
                  strokeOpacity="0.4"
                />
                <text
                  x="12"
                  y="35"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                >
                  "Section 4.2 confirms 12V..."
                </text>
                <text
                  x="12"
                  y="42"
                  fontSize="4.5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.7"
                >
                  [Source: Doc_B.pdf, Page 14]
                </text>

                <text
                  x="8"
                  y="62"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  ZERO HALLUCINATION
                </text>
                <text
                  x="8"
                  y="72"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Cross-Encoder Rerank Score: 0.96
                </text>
              </g>

              <text
                x="15"
                y="190"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                FAISS 8-BIT QUANTIZED / BM25 HYBRID RANK / 100% PROVABLE CITATION
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>INDEX SIZE: &lt; 500MB</span>
            <span>HYBRID RECALL: 98.4%</span>
            <span>PRIVACY: AIR-GAPPED</span>
          </div>
        </div>
      );

    case "finance-ledger":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>LOCAL CRYPTO VAULT / FINANCE TRACKER</span>
            <span>AES-256-GCM</span>
            <span>SVG CHARTING CORE</span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* Client Crypto Vault */}
              <g transform="translate(25, 40)">
                <rect
                  x="0"
                  y="0"
                  width="85"
                  height="90"
                  strokeWidth="1.2"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                <text
                  x="10"
                  y="16"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  BROWSER VAULT
                </text>
                <line
                  x1="10"
                  y1="24"
                  x2="75"
                  y2="24"
                  strokeWidth="0.6"
                  strokeOpacity="0.3"
                />

                {/* Key lock glyph */}
                <circle cx="42" cy="45" r="10" strokeWidth="1" />
                <rect x="39" y="45" width="6" height="15" fill="currentColor" />

                <text
                  x="42"
                  y="74"
                  textAnchor="middle"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.7"
                >
                  IndexedDB + AES-GCM
                </text>
              </g>

              {/* Data stream arrow */}
              <g transform="translate(115, 80)">
                <line
                  x1="0"
                  y1="5"
                  x2="35"
                  y2="5"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <polygon
                  points="35,2 42,5 35,8"
                  fill="currentColor"
                  stroke="none"
                />
                <text
                  x="20"
                  y="-4"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                >
                  DECIPHER
                </text>
              </g>

              {/* Tactile SVG Chart Display */}
              <g transform="translate(165, 30)">
                <rect
                  x="0"
                  y="0"
                  width="215"
                  height="115"
                  strokeWidth="1"
                  strokeOpacity="0.8"
                  fill="var(--paper)"
                />
                <text
                  x="12"
                  y="16"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  CASHFLOW VELOCITY &amp; PREDICTED RUNWAY
                </text>

                {/* Grid guidelines */}
                <line
                  x1="12"
                  y1="40"
                  x2="200"
                  y2="40"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  strokeOpacity="0.2"
                />
                <line
                  x1="12"
                  y1="70"
                  x2="200"
                  y2="70"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  strokeOpacity="0.2"
                />
                <line
                  x1="12"
                  y1="100"
                  x2="200"
                  y2="100"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                  strokeOpacity="0.2"
                />

                {/* Area fill */}
                <path
                  d="M 15 95 L 45 75 L 80 82 L 120 55 L 160 48 L 195 32 L 195 105 L 15 105 Z"
                  fill="currentColor"
                  fillOpacity="0.05"
                  stroke="none"
                />

                {/* Net wealth trajectory curve */}
                <path
                  d="M 15 95 L 45 75 L 80 82 L 120 55 L 160 48 L 195 32"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                />

                {/* Points on curve */}
                <circle cx="45" cy="75" r="2.5" fill="currentColor" />
                <circle cx="80" cy="82" r="2.5" fill="currentColor" />
                <circle cx="120" cy="55" r="2.5" fill="currentColor" />
                <circle cx="160" cy="48" r="2.5" fill="currentColor" />
                <circle cx="195" cy="32" r="3" fill="currentColor" />
                <circle
                  cx="195"
                  cy="32"
                  r="6"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />

                {/* Projected indicator */}
                <text
                  x="195"
                  y="22"
                  textAnchor="end"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                >
                  PROJECTED +34%
                </text>
              </g>

              <text
                x="15"
                y="190"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                NO THIRD-PARTY TRACKERS / CLIENT-DERIVED PBKDF2 KEY / MEMOIZED 60FPS
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>PERFORMANCE: 60 FPS</span>
            <span>STORAGE: LOCAL ONLY</span>
            <span>BUNDLE OVERHEAD: 0KB</span>
          </div>
        </div>
      );

    case "school-erp":
      return (
        <div
          className={`w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[var(--paper-card)] border border-[var(--hairline)] relative select-none font-mono ${className}`}
        >
          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] tracking-wider uppercase border-b border-[var(--hairline)] pb-2 mb-2">
            <span>RBAC ENTERPRISE ARCHITECTURE / SCHOOL ERP</span>
            <span>POSTGRESQL RELATIONAL LEDGER</span>
            <span>ATOMIC TRANSACTIONS</span>
          </div>

          <div className="relative w-full flex-1 flex items-center justify-center my-2 min-h-[160px]">
            <svg
              viewBox="0 0 400 220"
              className="w-full h-full max-h-[240px] text-[var(--ink)] overflow-visible"
              fill="none"
              stroke="currentColor"
            >
              {/* User Roles */}
              <g transform="translate(20, 25)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="22"
                  strokeWidth="0.8"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="35"
                  y="14"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                >
                  ADMIN PORTAL
                </text>

                <rect
                  x="0"
                  y="30"
                  width="70"
                  height="22"
                  strokeWidth="0.8"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="35"
                  y="44"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                >
                  FACULTY PORTAL
                </text>

                <rect
                  x="0"
                  y="60"
                  width="70"
                  height="22"
                  strokeWidth="0.8"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="35"
                  y="74"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                >
                  STUDENT PORTAL
                </text>

                <rect
                  x="0"
                  y="90"
                  width="70"
                  height="22"
                  strokeWidth="0.8"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="35"
                  y="104"
                  textAnchor="middle"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                >
                  ACCOUNTS DEPT
                </text>
              </g>

              {/* Arrows into Auth Gate */}
              <g transform="translate(95, 36)">
                <path
                  d="M 0 0 L 25 35"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 0 30 L 25 35"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 0 60 L 25 35"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 0 90 L 25 35"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity="0.6"
                />
              </g>

              {/* RBAC Middleware Gateway */}
              <g transform="translate(125, 45)">
                <rect
                  x="0"
                  y="0"
                  width="85"
                  height="65"
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                  fill="var(--paper)"
                />
                <text
                  x="42"
                  y="16"
                  textAnchor="middle"
                  fontSize="6.5"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.06em"
                >
                  RBAC GATEWAY
                </text>
                <line
                  x1="10"
                  y1="25"
                  x2="75"
                  y2="25"
                  strokeWidth="0.6"
                  strokeOpacity="0.3"
                />
                <text
                  x="42"
                  y="38"
                  textAnchor="middle"
                  fontSize="5.5"
                  fill="currentColor"
                  stroke="none"
                >
                  JWT Guard
                </text>
                <text
                  x="42"
                  y="48"
                  textAnchor="middle"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Deterministic Scopes
                </text>
              </g>

              {/* Fork to Database & PDF Generator */}
              <g transform="translate(215, 75)">
                <path
                  d="M 0 0 L 30 -25"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
                <path
                  d="M 0 0 L 30 25"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  strokeOpacity="0.7"
                />
              </g>

              {/* PostgreSQL Data Core */}
              <g transform="translate(250, 25)">
                <rect
                  x="0"
                  y="0"
                  width="135"
                  height="45"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="10"
                  y="14"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  POSTGRESQL RELATIONAL CORE
                </text>
                <text
                  x="10"
                  y="26"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Row-level Locks · Enrollment Transactions
                </text>
                <text
                  x="10"
                  y="36"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Prisma ORM · Normalized Ledger
                </text>
              </g>

              {/* PDF Document Synthesis */}
              <g transform="translate(250, 85)">
                <rect
                  x="0"
                  y="0"
                  width="135"
                  height="45"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                  fill="var(--paper)"
                />
                <text
                  x="10"
                  y="14"
                  fontSize="6"
                  fill="currentColor"
                  stroke="none"
                  letterSpacing="0.05em"
                >
                  ON-DEMAND PDF ENGINE
                </text>
                <text
                  x="10"
                  y="26"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Official Grade Transcripts · Fee Invoices
                </text>
                <text
                  x="10"
                  y="36"
                  fontSize="5"
                  fill="currentColor"
                  stroke="none"
                  opacity="0.6"
                >
                  Deterministic Print Layouts
                </text>
              </g>

              <text
                x="15"
                y="195"
                fontSize="6.5"
                fill="currentColor"
                stroke="none"
                opacity="0.6"
              >
                ROLE-BASED ACCESS CONTROL / MULTI-TENANT ISOLATION / CONCURRENCY LOCKS
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[0.62rem] text-[var(--muted)] border-t border-[var(--hairline)] pt-2 mt-1">
            <span>DATABASE: POSTGRESQL</span>
            <span>REPORT GENERATION: PDFKIT</span>
            <span>AUTH: RBAC JWT</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
