# Agenforce V2 Motion Specification

## 1. Motion Principles

The reference motion system communicates depth and system activity. It avoids large bounces and continuous decorative movement.

1. Motion begins when content enters the viewport.
2. Related items reveal with short stagger intervals.
3. Three-dimensional planes preserve their resting rotation during reveal.
4. Hover states are quick and controlled.
5. Blur is used for entering interface fragments, not for every paragraph.
6. Status activity animates item-by-item to imply a running system.
7. Reduced-motion mode resolves immediately to the final visual state.

## 2. Core Timing Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `motion-instant` | `100ms` | Icon and micro-state response |
| `motion-fast` | `150ms` | Button hover and compact UI |
| `motion-base` | `300ms` | Card hover and small reveal |
| `motion-enter` | `500ms` | Standard section content entrance |
| `motion-product` | `700ms` | Large product plane entrance |
| `motion-scene` | `900ms` | Diagram or hero composition entrance |
| `stagger-tight` | `40ms` | Characters and status chips |
| `stagger-default` | `80ms` | Cards and list items |
| `stagger-wide` | `120ms` | Large product fragments |

## 3. Easing Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Reference CSS hover transition |
| `ease-enter` | `cubic-bezier(0.22, 1, 0.36, 1)` | Decelerating entrances |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Fast exits |
| `ease-linear` | `linear` | Marquee only |

The reference exposes a default `150ms cubic-bezier(0.4, 0, 0.2, 1)` transition for interactive controls.

## 4. Observed Entrance States

The following states were read directly from offscreen elements before their viewport entrance:

### Blur-up reveal

```ts
hidden: { opacity: 0, filter: "blur(10px)", y: -10 }
visible: { opacity: 1, filter: "blur(0px)", y: 0 }
```

Use for glass panels and floating product fragments.

### Long vertical reveal

```ts
hidden: { opacity: 0, y: -100 }
visible: { opacity: 1, y: 0 }
```

Use for large product planes entering a masked diagram scene.

### Activity-row reveal

```ts
hidden: { opacity: 0, y: 10 }
visible: { opacity: 1, y: 0 }
```

Use for audit trail, approval queue, and recent activity items.

### Blur-only reveal

```ts
hidden: { opacity: 0, filter: "blur(10px)" }
visible: { opacity: 1, filter: "blur(0px)" }
```

Use for compact labels and governance fragments.

### Character reveal

```ts
hidden: { opacity: 0 }
visible: { opacity: 1 }
```

Characters reveal with `stagger-tight` when the interface needs a generated-output effect.

## 5. Scroll Trigger Contract

- Use `whileInView="visible"` for section content.
- Initial state is `hidden`.
- Default viewport threshold is approximately `20%` visibility.
- Standard marketing content reveals once.
- Interactive diagrams may replay only when replay communicates a workflow state.
- Do not trigger all page animations at initial mount.
- Parent section headings reveal before their diagram or card grid.
- Children use `stagger-default` or `stagger-wide` based on visual size.

## 6. Hero Motion

### Sequence

1. Navigation resolves first.
2. Hero headline fades and rises approximately `16–20px`.
3. Supporting copy follows after `80ms`.
4. Actions follow after another `80ms`.
5. Product planes enter last with a longer duration.

### Product-plane resting transforms

- Front plane: `rotateY(20deg) rotateX(40deg) rotateZ(-20deg)`.
- Rear plane uses the same family with mirrored placement.
- Transform origin stays near the center.
- Perspective container uses `1200px`.

### Hover

- Preserve the plane's base rotation.
- Translate upward by no more than `4–6px`.
- Reduce or increase rotation by no more than `2deg`.
- Duration: `300ms`.
- No spring bounce.

## 7. Button Motion

### Primary button

- Resting background uses the primary token.
- Hover background moves to ninety-percent primary opacity.
- Hover applies the stacked brand shadow from the design system.
- Transition: `150ms ease-standard`.
- Tap scale: `0.98`.
- Focus uses the semantic three-pixel ring.

### Secondary button

- Hover moves from background to accent surface.
- Text moves to accent foreground.
- No stacked shadow.
- Transition: `150ms ease-standard`.
- Tap scale: `0.98`.

## 8. Card Motion

- Neutral feature cards do not float continuously.
- Hover may move the card upward `2–4px` and slightly strengthen the internal diagram contrast.
- Plus controls rotate up to `45deg` when the card exposes more detail.
- Border color transitions before any shadow change.
- Duration: `300ms ease-enter`.
- Card scale must not exceed `1.01`.

## 9. Workflow and Governance Motion

### Workflow composition

- Resting transform: `rotateY(20deg) rotateX(20deg) rotateZ(-20deg)`.
- Pipeline steps reveal in their execution order.
- Status chips enter with blur-up reveal.
- Active connectors may use a single directional traversal.

### Approval queue composition

- Resting transform: `rotateY(20deg) rotateX(50deg) rotateZ(40deg)`.
- Queue rows enter with activity-row reveal.
- Processing states may pulse opacity subtly.
- Failed states do not shake.

### Audit activity

- Rows reveal independently with `80ms` stagger.
- Generated text may use character reveal at `40ms` stagger.
- Completed, processing, and failed states must remain readable after animation ends.

## 10. Accordion Motion

- Closed: `height: 0`, `opacity: 0`.
- Open: measured content height, `opacity: 1`.
- Duration: `300ms ease-enter`.
- Plus icon rotates `45deg`.
- Content must remain clipped during height interpolation.

## 11. Marquee and Logo Motion

- Logo motion is linear and constant when present.
- Pause on pointer hover and keyboard focus.
- Duplicate the visual sequence for a seamless loop.
- Do not apply blur to brand logos.
- Reduced-motion mode renders a static wrapped row.

## 12. Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Set all reveal elements directly to `opacity: 1`.
- Remove blur filters.
- Remove vertical translation.
- Preserve static three-dimensional composition only when it does not impede readability.
- Disable hover lift and tap scale.
- Stop marquee and auto-running diagram motion.
- Keep accordion state changes immediate or under `100ms`.

## 13. Verification Checklist

- [ ] Each section starts only when it enters the viewport.
- [ ] No offscreen section animates on page load.
- [ ] Headings precede cards and diagrams.
- [ ] Hover transitions match the `150ms` or `300ms` token.
- [ ] Product transforms preserve perspective at rest and hover.
- [ ] Accordion height and opacity finish together.
- [ ] Keyboard focus is visible on every control.
- [ ] Reduced-motion mode exposes all content without delay.
- [ ] Mobile has no hover-only dependency.
- [ ] Animation never causes horizontal overflow.

