# Agenforce V2 Design System

## 1. Visual Direction

The reference uses a restrained monochrome product-marketing system. Its identity comes from scale, whitespace, asymmetric rounding, three-dimensional product planes, and soft interface motion rather than saturated color.

Core characteristics:

- White or near-black page canvas.
- Near-black primary actions.
- Neutral gray cards with no conventional drop shadow.
- Large Manrope display headlines.
- Compact system-font body copy.
- Sparse green, orange, purple, blue, and red status accents.
- Large empty vertical intervals around product demonstrations.
- Product interfaces rotated in three-dimensional perspective.
- Section reveals based on opacity, blur, and vertical translation.

## 2. Semantic Color Tokens

The values below were read from the reference page's computed CSS custom properties.

### Light theme

| Token | Reference value | Usage |
| --- | --- | --- |
| `--v2-background` | `lab(100% 0 0)` | Page background |
| `--v2-foreground` | `lab(2.75381% 0 0)` | Primary text |
| `--v2-card` | `lab(100% 0 0)` | White card surface |
| `--v2-card-foreground` | `lab(2.75381% 0 0)` | Card text |
| `--v2-primary` | `lab(7.78201% -0.0000149012 0)` | Primary button and dark emphasis |
| `--v2-primary-foreground` | `lab(98.26% 0 0)` | Text on primary |
| `--v2-secondary` | `lab(96.52% -0.0000298023 0.0000119209)` | Secondary surface |
| `--v2-secondary-foreground` | `lab(7.78201% -0.0000149012 0)` | Secondary content |
| `--v2-muted` | `lab(96.52% -0.0000298023 0.0000119209)` | Muted blocks and FAQ rows |
| `--v2-muted-foreground` | `lab(48.496% 0 0)` | Supporting copy |
| `--v2-accent` | `lab(96.52% -0.0000298023 0.0000119209)` | Hover surface |
| `--v2-accent-foreground` | `lab(7.78201% -0.0000149012 0)` | Hover content |
| `--v2-border` | `lab(90.952% 0 -0.0000119209)` | Hairline border |
| `--v2-input` | `lab(90.952% 0 -0.0000119209)` | Input outline |
| `--v2-ring` | `lab(66.128% -0.0000298023 0.0000119209)` | Focus ring |
| `--v2-sidebar` | `lab(98.26% 0 0)` | Embedded application side rail |

### Dark theme

| Token | Reference value | Usage |
| --- | --- | --- |
| `--v2-background` | `lab(2.75381% 0 0)` | Page background |
| `--v2-foreground` | `lab(98.26% 0 0)` | Primary text |
| `--v2-card` | `lab(7.78201% -0.0000149012 0)` | Raised dark card |
| `--v2-card-foreground` | `lab(98.26% 0 0)` | Card text |
| `--v2-primary` | `lab(90.952% 0 -0.0000119209)` | Primary action |
| `--v2-primary-foreground` | `lab(7.78201% -0.0000149012 0)` | Text on primary |
| `--v2-secondary` | `lab(15.204% 0 -0.00000596046)` | Secondary surface |
| `--v2-secondary-foreground` | `lab(98.26% 0 0)` | Secondary content |
| `--v2-muted` | `lab(15.204% 0 -0.00000596046)` | Muted blocks |
| `--v2-muted-foreground` | `lab(66.128% -0.0000298023 0.0000119209)` | Supporting copy |
| `--v2-accent` | `lab(15.204% 0 -0.00000596046)` | Hover surface |
| `--v2-accent-foreground` | `lab(98.26% 0 0)` | Hover content |
| `--v2-border` | `lab(100% 0 0 / 0.1)` | Hairline border |
| `--v2-input` | `lab(100% 0 0 / 0.15)` | Input outline |
| `--v2-ring` | `lab(48.496% 0 0)` | Focus ring |
| `--v2-sidebar` | `lab(7.78201% -0.0000149012 0)` | Embedded application side rail |

### Functional accent palette

| Accent | Value | Role |
| --- | --- | --- |
| Green 100 | `lab(96.1861% -13.8464 6.52365)` | Success wash |
| Green 500 | `lab(70.5521% -66.5147 45.8073)` | Success state and active node |
| Orange 100 | `lab(94.7127% 3.58394 14.3151)` | Warning wash |
| Orange 500 | `lab(64.272% 57.1788 90.3583)` | Processing and attention |
| Red 100 | `lab(92.243% 10.2865 3.83865)` | Error wash |
| Red 500 | `lab(55.4814% 75.0732 48.8528)` | Failed state |
| Blue 100 | `lab(92.0301% -2.24757 -11.6453)` | Informational wash |
| Blue 500 | `lab(54.1736% 13.3369 -74.6839)` | Informational state |
| Purple 100 | `lab(93.3333% 6.97437 -9.83434)` | AI feature wash |
| Purple 500 | `lab(52.0183% 66.11 -78.2316)` | AI feature accent |

## 3. Typography

### Font families

| Role | Family |
| --- | --- |
| Display | `Manrope, "Manrope Fallback"` |
| Body and UI | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif` |
| Code and technical values | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

### Desktop type scale

| Style | Size | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Hero and major section display | `60px` | `700` | `60px` | `-1.5px` |
| Section supporting heading | `18px` | `500` | `28px` | Normal |
| Feature title | `18px` | `700` | `28px` | Normal |
| Body | `16px` | `400` | `24px` | Normal |
| Small UI | `14px` | `400–500` | `20px` | Normal |
| Caption | `12px` | `400–500` | `16px` | Normal |

### Responsive behavior

- Hero and major section headings scale down to approximately `36–40px` on compact screens.
- Display line height stays near `1` to preserve the dense two-line silhouette.
- Supporting copy should not exceed `60–68ch`.
- Navigation and product UI remain on the system font, not Manrope.

## 4. Geometry and Layout

### Global measurements

| Token | Value |
| --- | --- |
| Maximum content width | `1280px` |
| Desktop horizontal padding | `32px` |
| Mobile horizontal padding | `16px` |
| Major desktop section padding | `128px 0` |
| Medium section padding | `80px 0` |
| Mobile section padding | `40px 0` |
| Reference base radius | `10px` |
| Large card radius | `16px` |
| Extra-large card radius | `24px` |

### Spacing scale

Use a four-pixel base with the following named steps:

| Name | Value |
| --- | --- |
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `20px` |
| `space-6` | `24px` |
| `space-8` | `32px` |
| `space-10` | `40px` |
| `space-12` | `48px` |
| `space-16` | `64px` |
| `space-20` | `80px` |
| `space-24` | `96px` |
| `space-32` | `128px` |

### Asymmetric feature cards

The first three-card feature row uses deliberate asymmetric corners:

- First card: `24px 10px 10px 24px`.
- Middle card: `10px` on all corners.
- Last card: `10px 24px 24px 10px`.
- Desktop gap: `16px`.
- Card height at `1440px` viewport: approximately `432px`.

## 5. Shadows, Borders, and Glass

### Brand shadow

The primary action adds the following stacked shadow on hover:

```css
-82px 54px 27px 0 #00000003,
-52px 35px 25px 0 #0000000a,
-29px 19px 21px 0 #00000026,
-13px 9px 16px 0 #00000040,
-3px 2px 9px 0 #0000004a
```

Dark mode mirrors the same stack with white alpha values.

### Border rules

- Standard cards rely on tonal separation before borders.
- Interactive frames use one-pixel semantic borders.
- Focus-visible controls use a three-pixel ring at fifty percent ring alpha.
- Embedded application frames use faint internal hairlines rather than large shadows.

### Glass rules

Observed backdrop blur values:

- `12px` for compact floating controls.
- `16.73px` for workflow glass surfaces.
- `17.47px` for approval and governance overlays.

Glass must remain subtle. It is used over diagram canvases and product imagery, never as the primary page surface.

## 6. Ornament System

The page uses product-oriented ornaments rather than decorative illustrations.

### Perspective product planes

- Hero images: `rotateY(20deg) rotateX(40deg) rotateZ(-20deg)`.
- Workflow demonstration: `rotateY(20deg) rotateX(20deg) rotateZ(-20deg)`.
- Approval queue composition: `rotateY(20deg) rotateX(50deg) rotateZ(40deg)`.
- Footer grid plane: `rotateX(60deg)`.
- Perspective distance: `1200px`.

### Grid and diagram ornaments

- Faint square grids use neutral hairlines and large masks so edges dissolve into the page.
- Workflow connectors use slim neutral paths with green, orange, or red active nodes.
- Status chips use pale color washes and compact text.
- Large diagram sections preserve substantial empty canvas around the active interface.
- Decorative backgrounds must fade out through masks rather than end with hard rectangular boundaries.

### Product image treatment

- Images are shown as application surfaces, not editorial photography.
- Hero product images overlap with opposite rotations to create depth.
- Lower product screenshots appear inside masked, oversized canvases.
- Product planes may extend beyond their card boundaries when the parent section permits overflow.

## 7. Component Inventory

### Navigation

- Compact brand mark on the left.
- Centered desktop links: Features, Product, FAQs, Pricing.
- Login and primary Sign up action on the right.
- Low visual weight with no heavy header container.
- Mobile uses a collapsed navigation control.

### Hero

- Two-line Manrope headline aligned left on desktop.
- Supporting paragraph capped at a readable width.
- Primary and secondary actions on one row.
- Two overlapping perspective screenshots beneath the copy.
- No conventional colored hero illustration.

### Trust row

- Centered two-line supporting statement.
- Six grayscale partner logos.
- Generous whitespace above and below.

### Three-card feature grid

- Large section heading and supporting paragraph.
- Three asymmetric neutral cards.
- Each card combines a product diagram, title, and plus control.

### Speed and scale section

- Large section heading.
- Oversized empty demonstration canvas.
- Two-column primary capability row.
- Three compact supporting features beneath.

### Governance section

- Major heading and supporting paragraph.
- Four capability areas: Audit Trail, Role-Based Access, Approval Queue, Guardrail Engine.
- Product diagrams dominate over prose.
- Activity entries animate independently.

### Pricing

- Two-column section introduction and pricing stack.
- Price cards use neutral surfaces, compact bullet lists, and dark actions.
- Supporting trust line sits above the heading.

### FAQ

- Five neutral accordion rows.
- Rounded rows with a circular plus control.
- Content expands vertically with opacity transition.

### Footer

- Four-column content organization.
- Newsletter input and compact submit action.
- Large faint perspective grid behind the lower region.
- Legal links and social icons on the bottom edge.

## 8. Responsive Composition

### Desktop, `>= 1024px`

- Maximum content width is `1280px`.
- Hero text remains left aligned.
- Three feature cards remain in one row.
- Governance panels use two-column compositions.
- Product planes retain their full rotations.

### Tablet, `768–1023px`

- Horizontal padding reduces to `24px`.
- Product rotations reduce in magnitude to limit clipping.
- Two-column content may stack when diagrams lose legibility.

### Mobile, `< 768px`

- Horizontal padding is `16px`.
- Headlines scale to `36–40px`.
- Primary and secondary actions may stack.
- Three-card feature grid becomes a single column.
- Asymmetric card corners normalize to `20px` when the cards no longer share an edge.
- Product planes may remain rotated but must fit within the viewport without horizontal scrolling.

## 9. Accessibility Contract

- Every button and link must expose a visible focus state.
- Product screenshots require descriptive alt text unless purely decorative.
- Decorative diagram layers use `aria-hidden="true"`.
- Accordion triggers expose expanded state and control relationships.
- Status cannot rely on color alone.
- Text contrast must remain valid in both semantic themes.
- Reduced-motion mode removes blur movement, 3D hover lift, auto-marquee, and parallax while keeping content visible.

