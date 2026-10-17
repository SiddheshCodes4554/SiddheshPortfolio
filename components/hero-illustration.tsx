"use client";

import { useState } from "react";

interface HeroIllustrationProps {
  lampLit?: boolean;
  onLampToggle?: () => void;
  catHappy?: boolean;
  onCatToggle?: () => void;
}

export function HeroIllustration({
  lampLit: controlledLampLit,
  onLampToggle,
  catHappy: controlledCatHappy,
  onCatToggle,
}: HeroIllustrationProps = {}) {
  const [internalLampLit, setInternalLampLit] = useState(true);
  const [internalCatHappy, setInternalCatHappy] = useState(false);

  const isControlledLamp = controlledLampLit !== undefined;
  const isControlledCat = controlledCatHappy !== undefined;

  const lampLit = isControlledLamp ? controlledLampLit : internalLampLit;
  const catHappy = isControlledCat ? controlledCatHappy : internalCatHappy;

  const handleToggleLamp = () => {
    if (onLampToggle) {
      onLampToggle();
    } else {
      setInternalLampLit((prev) => !prev);
    }
  };

  const handleToggleCat = () => {
    if (onCatToggle) {
      onCatToggle();
    } else {
      setInternalCatHappy((prev) => !prev);
    }
  };

  return (
    <div
      className="hero-illustration-container"
      role="region"
      aria-label="Illustration: Siddhesh working comfortably with laptop and cat"
    >
      {/* Floating interactive tooltip hints */}
      <div className="illustration-subtle-hint">
        {catHappy ? "ฅ^•ﻌ•^ฅ *purr*" : lampLit ? "idea in progress" : "midnight coding"}
      </div>

      <svg
        className="hero-art-svg"
        viewBox="0 0 640 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.09" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Idea Glow when light is lit */}
        {lampLit && (
          <circle
            cx="432"
            cy="115"
            r="65"
            fill="url(#lampGlow)"
            className="bulb-glow-pulse"
          />
        )}

        {/* ===================== FLOATING IDEA / LIGHTBULB ===================== */}
        <g
          className="interactive-bulb"
          onClick={handleToggleLamp}
          tabIndex={0}
          role="button"
          aria-label="Toggle idea lightbulb"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggleLamp();
            }
          }}
        >
          {/* Hanging thin cord */}
          <line
            x1="432"
            y1="40"
            x2="432"
            y2="92"
            stroke="var(--ink)"
            strokeWidth="1.25"
            strokeDasharray="2 2"
          />

          {/* Spark rays around bulb */}
          {lampLit && (
            <g className="bulb-sparks" stroke="var(--ink)" strokeWidth="1.2">
              <line x1="432" y1="80" x2="432" y2="72" />
              <line x1="452" y1="90" x2="460" y2="84" />
              <line x1="458" y1="112" x2="467" y2="112" />
              <line x1="406" y1="112" x2="397" y2="112" />
              <line x1="412" y1="90" x2="404" y2="84" />
            </g>
          )}

          {/* Bulb cap */}
          <rect
            x="427"
            y="92"
            width="10"
            height="5"
            rx="1"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />

          {/* Bulb body */}
          <path
            d="M424 100 C416 106 416 118 422 126 C426 131 428 135 432 135 C436 135 438 131 442 126 C448 118 448 106 440 100 Z"
            fill={lampLit ? "var(--paper)" : "transparent"}
            stroke="var(--ink)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Filament inside */}
          <path
            d="M428 122 L430 112 L434 112 L436 122"
            stroke="var(--ink)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={lampLit ? 1 : 0.3}
          />
        </g>

        {/* Small floating idea bubble dots */}
        <circle cx="414" cy="148" r="2.5" fill="var(--ink)" />
        <circle cx="406" cy="162" r="1.75" fill="var(--ink)" />

        {/* ===================== GROUND FLOOR (STATIC) ===================== */}
        <g className="hero-ground-layer">
          {/* Grounding fine baseline */}
          <line
            className="hero-floor-baseline"
            x1="120"
            y1="365"
            x2="520"
            y2="365"
            stroke="var(--hairline-dark)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Dynamic contact shadow under bench */}
          <ellipse
            className="hero-floor-shadow"
            cx="320"
            cy="365"
            rx="210"
            ry="7"
            fill="var(--ink)"
            opacity="0.08"
            style={{ transformOrigin: "320px 365px" }}
          />
        </g>

        {/* ===================== THE FALLING RIG (SOFA + DEV + CAT) ===================== */}
        <g className="falling-rig" style={{ transformOrigin: "320px 365px" }}>
          {/* ===================== THE LOUNGE SOFA / DAYBED ===================== */}
          <g className="sofa-group">

          {/* Sofa wooden/metal legs */}
          <line
            x1="190"
            y1="320"
            x2="175"
            y2="365"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="220"
            y1="320"
            x2="212"
            y2="365"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="440"
            y1="320"
            x2="445"
            y2="365"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="465"
            y1="320"
            x2="480"
            y2="365"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Sofa base frame */}
          <rect
            x="165"
            y="312"
            width="320"
            height="10"
            rx="3"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />

          {/* Cushioned mattress */}
          <rect
            x="160"
            y="292"
            width="330"
            height="22"
            rx="6"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />
          {/* Cushion seam lines */}
          <line
            x1="265"
            y1="294"
            x2="265"
            y2="312"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="1 3"
          />
          <line
            x1="375"
            y1="294"
            x2="375"
            y2="312"
            stroke="var(--ink)"
            strokeWidth="1"
            strokeDasharray="1 3"
          />

          {/* Angled headrest pillow / back bolster on left */}
          <path
            d="M170 300 C155 270 168 238 190 232 C210 226 226 248 214 280 L188 300 Z"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Pillow folds */}
          <path
            d="M182 250 C186 265 194 275 204 282"
            stroke="var(--ink)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>

        {/* ===================== THE DEVELOPER CHARACTER ===================== */}
        <g className="developer-character">
          {/* Torso reclined back against pillow */}
          <path
            d="M208 275 C215 240 235 220 270 215 C295 212 312 232 308 270"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Casual crewneck collar */}
          <path
            d="M260 216 C268 222 280 220 286 215"
            stroke="var(--ink)"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Neck */}
          <path
            d="M268 215 L268 200 M282 214 L282 198"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Head & Face */}
          <path
            d="M265 198 C265 185 275 174 290 174 C305 174 314 186 312 200 C310 212 298 220 285 220 C274 220 265 210 265 198 Z"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.8"
          />

          {/* Expressive Hair with slight tuft / sweep */}
          <path
            d="M263 194 C260 178 272 165 292 164 C306 163 318 172 322 186 C320 182 312 178 304 180 C294 182 286 177 278 184 C272 189 268 190 263 194 Z"
            fill="var(--ink)"
          />

          {/* Minimalist Glasses / Eyewear & Nose */}
          <path
            d="M292 194 L308 192 M294 190 A5 5 0 0 1 302 190 M307 190 A4 4 0 0 1 315 190"
            stroke="var(--ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Focused Smile */}
          <path
            d="M298 206 C304 207 308 205 311 202"
            stroke="var(--ink)"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bent Legs raised comfortably on sofa */}
          {/* Back leg */}
          <path
            d="M305 275 L350 250 L395 285 L420 288"
            stroke="var(--ink)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
          />
          {/* Front Leg bent at knees with relaxed drape */}
          <path
            d="M295 280 C315 275 335 252 355 242 C372 234 388 250 405 270 C418 285 435 290 455 290"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Minimalist modern sneaker / socks */}
          <path
            d="M452 291 C462 291 472 287 476 280 C474 276 466 276 456 282"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* Reclining Left Arm holding keyboard position */}
          <path
            d="M245 240 C258 262 278 272 315 270"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm extended forward typing */}
          <path
            d="M275 235 C295 246 320 256 348 255"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* ===================== LAPTOP ===================== */}
          <g className="laptop-device">
            {/* Base / Keyboard resting near bent knees */}
            <line
              x1="335"
              y1="258"
              x2="385"
              y2="252"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Screen open at ergonomic angle */}
            <polygon
              points="340,256 348,214 382,210 376,252"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Screen inner bezel glow */}
            <line
              x1="350"
              y1="220"
              x2="378"
              y2="216"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            {/* Developer sticker mark on laptop lid */}
            <circle cx="362" cy="233" r="2.5" fill="var(--ink)" />
          </g>

          {/* Hands over keyboard */}
          <circle cx="347" cy="254" r="3" fill="var(--ink)" />
          <circle cx="355" cy="253" r="2.5" fill="var(--ink)" />
        </g>

        {/* ===================== THE COMPANION CAT ===================== */}
        <g
          className="cat-companion"
          onMouseEnter={() => {
            if (!isControlledCat) setInternalCatHappy(true);
          }}
          onMouseLeave={() => {
            if (!isControlledCat) setInternalCatHappy(false);
          }}
          tabIndex={0}
          role="button"
          aria-label="Pet the companion cat"
          onClick={handleToggleCat}
        >
          {/* Subtle cat shadow */}
          <ellipse
            cx="145"
            cy="364"
            rx="24"
            ry="4"
            fill="var(--ink)"
            opacity="0.12"
          />

          {/* Cat body: solid ink silhouette with smooth curves */}
          <path
            d="M132 362 C126 358 124 345 130 334 C135 325 145 324 152 332 C158 340 160 354 156 362 Z"
            fill="var(--ink)"
          />

          {/* Cat head with perked ears */}
          <path
            d="M140 326 L137 315 L144 319 L150 315 L148 326 C152 329 152 334 148 337 C142 340 138 338 135 334 C134 330 136 327 140 326 Z"
            fill="var(--ink)"
          />

          {/* Whiskers */}
          <line
            x1="133"
            y1="331"
            x2="124"
            y2="330"
            stroke="var(--ink)"
            strokeWidth="0.75"
          />
          <line
            x1="133"
            y1="334"
            x2="125"
            y2="336"
            stroke="var(--ink)"
            strokeWidth="0.75"
          />
          <line
            x1="152"
            y1="331"
            x2="160"
            y2="330"
            stroke="var(--ink)"
            strokeWidth="0.75"
          />
          <line
            x1="151"
            y1="334"
            x2="159"
            y2="336"
            stroke="var(--ink)"
            strokeWidth="0.75"
          />

          {/* Cat Tail: graceful curl upward */}
          <path
            d="M130 358 C122 355 116 348 118 340 C119 334 125 334 124 339 C123 343 125 348 131 352"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            className={catHappy ? "cat-tail-wiggle" : "cat-tail-idle"}
          />

          {/* Tiny heart or purr bubble when stroked */}
          {catHappy && (
            <g className="cat-purr-bubble">
              <text
                x="115"
                y="318"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--ink)"
                fontWeight="bold"
              >
                purr~
              </text>
            </g>
          )}
        </g>
        </g>

        {/* Small editorial coordinates & marks */}
        <text
          x="165"
          y="395"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
          fill="var(--muted)"
        >
          [DEV_ENV.INIT — FIG.01]
        </text>
        <circle cx="490" cy="392" r="1.5" fill="var(--muted)" />
        <circle cx="496" cy="392" r="1.5" fill="var(--muted)" />
        <circle cx="502" cy="392" r="1.5" fill="var(--muted)" />
      </svg>
    </div>
  );
}
