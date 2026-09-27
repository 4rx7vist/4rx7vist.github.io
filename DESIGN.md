---
name: PORTVAULT
description: Engineering knowledge becomes real systems.
colors:
  paper: "#ffffff"
  ink: "#181a1f"
  muted: "#61656f"
  line: "#e3e5e9"
  blue: "#2457eb"
  soft: "#f5f6f8"
  inspector: "#131b28"
  inspector-surface: "#1b2637"
  inspector-text: "#f5f7fb"
  inspector-muted: "#b2bfd2"
  inspector-accent: "#a9bfff"
  blue-hover: "#1943c1"
  selected: "#eef3ff"
  selected-text: "#183fae"
  selection: "#dce5ff"
  focus: "#477aff"
  field-line: "#d4d8df"
  error: "#9a2828"
  error-bg: "#fff5f5"
  dark-paper: "#0f1115"
  dark-ink: "#f2f4f8"
  dark-muted: "#a8adb7"
  dark-line: "#2b2f37"
  dark-blue: "#7d9cff"
  dark-soft: "#181b21"
typography:
  display:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "clamp(3rem, 5.1vw, 5rem)"
    fontWeight: 550
    letterSpacing: "-0.04em"
    lineHeight: 1.04
  body:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.65
  bodySmall:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.65
  section:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.3rem)"
    fontWeight: 550
    lineHeight: 1.12
  projectTitle:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "clamp(1.6rem, 2.3vw, 2.2rem)"
    fontWeight: 550
    lineHeight: 1.18
  title:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
  brandMark:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
  control:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "0.8125rem"
  controlMobile:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "1rem"
  label:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "0.75rem"
  caption:
    fontFamily: "Nata Sans, sans-serif"
    fontSize: "0.6875rem"
rounded:
  control: "6px"
  media: "12px"
spacing:
  group: "24px"
  section: "112px"
---

## Overview
PORTVAULT is an engineer's work collection. Editorial whitespace, real project evidence, and one purposeful transformation replace agency language. The opening demonstrates components becoming a connected system.

## Colors
Light mode uses white paper; dark mode uses a neutral near-black paper without changing section hierarchy. Ink carries display type and diagrams. Blue marks interaction, selection, scroll progress, and focus. The theme control stays visually transparent so the portfolio remains one continuous surface.

## Typography
Nata Sans globally, including all controls. The rule lives in src/styles/global.css. Sentence-case display text; uppercase only for compact technical metadata. No gradient lettering or decorative monospace.

SVG node metadata is secondary to full-size labels and the plain-text flow description. On small screens the graph recomposes into two columns rather than scaling the desktop diagram down.

## Layout
1280px maximum content width, fluid gutters. Asymmetrical two-column hero, media-led work listing, compact system index, about and tools, Lab, then two-column contact. Stack below 800px. At 320px controls wrap and diagrams switch to a vertical flow.

## Elevation & Depth
Flat white surfaces and borders. No decorative glass or glow. Native scroll and cursor remain intact.

## Shapes
Restrained media corners. SVG components change position and connecting paths morph into a meaningful request flow. Explicit controls operate the two states.

## Components
Motion tokens: 180ms fast, 260ms UI, 550ms section, 900ms morph; cubic-bezier(0.16, 1, 0.3, 1). Fine-pointer desktop uses eased scrolling; touch devices keep native scrolling and shorter animation budgets. Reduced motion uses immediate state updates. Form inputs have persistent labels and native selection controls. Contact uses a configured endpoint or a mail draft, never simulated delivery.

## Do's and Don'ts
- Keep Nata Sans on all active components.
- Use first person and supplied project facts.
- Mark unverified project facts TODO.
- Keep existing 3D resources archived without loading them.
- Do not add runtime UI frameworks, logo walls, fake statistics, arbitrary motion, or fake submission success.
