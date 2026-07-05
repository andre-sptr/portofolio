# Design System — Andre Saputra Portfolio

> Direction: **Operations Terminal**. A network engineer's portfolio that looks
> like a NOC console, not a template. Every visual decision serves one memorable
> thing: *this person builds, automates, and monitors real production systems.*
>
> Live preview of this system: [`public/design-preview.html`](public/design-preview.html)
> (served at `/design-preview.html` by the dev server).

## Product Context
- **What this is:** Single-page portfolio for Andre Saputra — Full Stack Developer and Informatics Teacher shipping web apps, AI tools, and IoT systems.
- **Who it's for:** Recruiters, collaborators, and clients evaluating engineering credibility; secondarily students.
- **Space/industry:** Developer / engineering personal sites. Peers: dark dev portfolios (Linear-style templates) and the higher-craft tier (rauno.me, emilkowal.ski, paco.me).
- **Project type:** Marketing / portfolio single-page app (Vite + React 19 + Tailwind 4).

## Aesthetic Direction
- **Direction:** Operations Terminal — industrial / utilitarian with retro-futuristic phosphor CRT nostalgia.
- **Decoration level:** Intentional. Hairline borders, box-drawing dividers, a very faint scanline, one blinking cursor. No glassmorphism, no gradients, no glow, no film grain.
- **Mood:** Calm, precise, in-control. A live console monitoring healthy systems. Confident, not loud.
- **Reference sites:** rauno.me, emilkowal.ski, paco.me (craft/restraint); Bloomberg terminal, flight-deck / NOC dashboards, amber CRT monitors (the instrument metaphor).

## Typography
- **Display/Hero:** JetBrains Mono 800 (uppercase) — the terminal identity; the name reads like a hostname. Paid upgrade later: Berkeley Mono. Free alt: Commit Mono.
- **Body:** IBM Plex Sans 400/500 — a clean technical grotesque so long copy stays readable (avoids the "mono everything" legibility tax).
- **UI/Labels:** JetBrains Mono 500 (uppercase, letter-spacing 0.1–0.24em).
- **Data/Tables:** JetBrains Mono (has real tabular figures) — metrics, timestamps, IDs, versions.
- **Code:** JetBrains Mono.
- **Loading:** Google Fonts — `IBM Plex Sans:wght@400;500;600` + `JetBrains Mono:wght@400;500;700;800`. (Fontshare Clash Display/Satoshi are retired under this direction.)
- **Scale (px):** hero clamp(48→102) · h2 clamp(26→38) · h3 18 · body 16 (line-height 1.65) · label 13 · micro 11.

## Color
- **Approach:** Restrained. One accent (amber). Green/red exist only as status semantics, never decoration.
- **Primary:** `#F4B740` amber — actions, the accent name, focus rings, active nav. This replaces the old indigo `hsl(246 70% 68%)`.
- **Secondary:** none by design. (Dim info cyan `#5AC8E0` is allowed sparingly for a neutral "standby/secondary" node accent only.)
- **Neutrals (ink → light):** `#070A08` ink (page) · `#0C100D` surface-1 · `#12170F` surface-2 · `#171D14` surface-3 · `#242B20` border · `#37402F` border-strong · `#8A9082` muted text · `#E6E2D5` bone (primary text, warm off-white).
- **Semantic:** success `#3DDC84` · warning `#F4B740` · error `#FF5C5C` · info `#5AC8E0`.
- **Dark mode:** This system is dark-native (single theme). No light mode planned; if ever added, invert to warm paper `#F3F1EA` / ink `#14130F` and keep amber.

## Spacing
- **Base unit:** 4px.
- **Density:** Compact — it's an instrument panel, information-dense but breathable.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64). Section padding 64px vertical.

## Layout
- **Approach:** Grid-disciplined. Predictable columns, hairline separation, a persistent status bar. The monospace grid IS the composition.
- **Grid:** 12-col desktop / 6-col tablet / 4-col mobile. System rows use `132px | 1fr | auto`.
- **Max content width:** 1120px, centered, 24px gutters.
- **Border radius:** Sharp. 2px chips/badges · 3px controls/rows/cards · 4px panels/metric grid. No pill radii except intentional status dots. (Terminals are square; this is a deliberate departure from the old `--radius: 0.75rem`.)
- **Signature chrome:** sticky top status bar (hostname prompt · LEDs · live clock · uptime); ASCII box-drawing dividers (`├─── LABEL ───┤`) between sections; `SYS-0x` node labels; blinking block cursor.

## Motion
- **Approach:** Minimal-functional plus a few instrument touches. Keep GSAP/Lenis for scroll smoothing and entrance reveals; retire the Three.js gravity-well and glow pulses.
- **Signature motion:** blinking cursor (steps timing), live clock tick, optional count-up on metric readouts, terminal-style type-in on the hero prompt line. All gated behind `prefers-reduced-motion`.
- **Easing:** enter `ease-out` · exit `ease-in` · move `ease-in-out`.
- **Duration:** micro 50–100ms · short 150–250ms · medium 250–400ms · long 400–700ms.

## Safe vs. Risk
- **Safe (category literacy):** dark background; monospace for data/labels; single-page sectioned scroll. Engineers expect these — they keep the site fluent in its category.
- **Risk 1 — mono as *identity*, not just code.** Headings and the hero name are monospace. Gain: unmistakable terminal character. Cost: mono display can feel stark; mitigated by IBM Plex Sans body and generous sizing.
- **Risk 2 — amber phosphor accent instead of blue/indigo.** Gain: warm, CRT-nostalgic, and nobody in the peer set uses it — instant differentiation from the indigo-gradient crowd. Cost: amber can read "warning"; mitigated by reserving red for real faults and using amber consistently as the brand.
- **Risk 3 — real instrument chrome (status bar, box-drawing dividers, live readouts).** Gain: the concept becomes the design, earned by the actual NOC/telecom job. Cost: build effort and gimmick risk if overdone — keep readouts subtle and truthful.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-04 | Initial design system created (Operations Terminal) | Created by /design-consultation. Replaces the generic dark + indigo→cyan gradient + glassmorphism recipe with a terminal/instrument identity earned by the telecom-infra NOC role. |
| 2026-07-04 | Implemented on branch `redesign/operations-terminal` | Remapped HSL token layer + fonts (JetBrains Mono / IBM Plex Sans), retired the Three.js gravity-well hero (deleted `ThreeScene.tsx`), flattened glassmorphism utilities, and remapped all project/experience/skills accents to the amber/green/cyan/red terminal set. Build green; no new lint errors. |
