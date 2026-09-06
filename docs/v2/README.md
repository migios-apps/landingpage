# Agenforce V2 Reference System

## Status

- [x] Reference page audited at desktop width.
- [x] Light and dark semantic tokens recorded.
- [x] Typography and container geometry recorded.
- [x] Section order and responsive composition recorded.
- [x] Motion entry states and hover behavior recorded.
- [x] Source asset inventory recorded.
- [x] V2 route contract defined.
- [x] `/v2` implementation completed.
- [x] Reference assets downloaded to the local V2 directory.
- [x] Desktop visual comparison completed.
- [x] Mobile visual comparison completed.
- [ ] Accessibility and reduced-motion verification completed.

## Scope

This folder describes a high-fidelity reference clone of the Agenforce marketing template. It intentionally preserves the reference visual language before any Migios branding or content adaptation.

Reference: <https://agenforce-marketing-template.vercel.app>

Audit date: 3 September 2026

## Route Contract

| Route | Purpose | Current state |
| --- | --- | --- |
| `/` | Existing landing page | Preserved |
| `/v2` | Agenforce reference clone | Implemented |
| `/demo` | Existing demo route | Preserved |

The V2 route must not replace or restyle `/`. Shared global tokens may only be changed if both variants remain visually stable.

## Documents

- [Design system](./DESIGN_SYSTEM.md)
- [Motion specification](./MOTION_SPEC.md)
- [Asset manifest](./ASSET_MANIFEST.md)

## Fidelity Rules

1. Reproduce hierarchy, proportion, whitespace, typography, surface treatment, and motion timing before changing copy or branding.
2. Keep the reference light and dark token pairs intact during the clone pass.
3. Preserve asymmetric card radii and large vertical gaps; these are structural, not decorative accidents.
4. Build all motion from shared variants and tokens rather than one-off values.
5. Keep offscreen content dormant until it reaches the viewport.
6. Every interactive state must have keyboard focus and reduced-motion behavior.
7. Do not modify the existing landing variant while implementing `/v2`.
