# Agenforce V2 Asset Manifest

## 1. Asset Policy for the Reference Pass

This manifest records the assets currently requested by the deployed Agenforce page. It describes the raw reference state before any later rebranding.

The deployed asset URLs are recorded for audit and visual comparison. Implementation should store approved local copies under `public/v2/` or replace them with licensed equivalents before production release.

## 2. Product Screenshots

| ID | Source | Intrinsic size | Reference usage |
| --- | --- | --- | --- |
| `screenshot-3` | `https://assets.aceternity.com/screenshots/3.jpg` | `1920 × 1199` | Hero and product feature plane |
| `screenshot-4` | `https://assets.aceternity.com/screenshots/4.jpg` | `1920 × 1199` | Hero and product feature plane |
| `screenshot-5` | `https://assets.aceternity.com/screenshots/5.jpg` | `1920 × 991` | Governance or lower product demonstration |
| `screenshot-6` | `https://assets.aceternity.com/screenshots/6.jpg` | `1920 × 994` | Governance or lower product demonstration |

Target local paths:

```text
public/v2/images/product/screenshot-3.jpg
public/v2/images/product/screenshot-4.jpg
public/v2/images/product/screenshot-5.jpg
public/v2/images/product/screenshot-6.jpg
```

## 3. Trust Logos

| Brand | Source request | Intrinsic size |
| --- | --- | --- |
| OpenAI | `https://assets.aceternity.com/logos/openai.png` | `128 × 39` |
| Hello Patient | `https://assets.aceternity.com/logos/hello-patient.png` | `128 × 23` |
| Granola | `https://assets.aceternity.com/logos/granola.png` | `128 × 39` |
| Character AI | `https://assets.aceternity.com/logos/characterai.png` | `128 × 18` |
| Oracle | `https://assets.aceternity.com/logos/oracle.png` | `128 × 17` |
| Portola | `https://assets.aceternity.com/logos/portola.png` | `128 × 27` |

Target local path convention:

```text
public/v2/images/logos/<brand>.png
```

Logos render in a grayscale, low-contrast trust row and must retain transparent backgrounds.

## 4. Avatar Photography

The role-based access composition requests six portrait images through Unsplash:

| ID | Source photo |
| --- | --- |
| `avatar-1` | `photo-1534528741775-53994a69daeb` |
| `avatar-2` | `photo-1543610892-0b1f7e6d8ac1` |
| `avatar-3` | `photo-1654110455429-cf322b40a906` |
| `avatar-4` | `photo-1527980965255-d3b416303d12` |
| `avatar-5` | `photo-1507003211169-0a1dd7228f2d` |
| `avatar-6` | `photo-1607746882042-944635dfe10e` |

Target local paths:

```text
public/v2/images/avatars/avatar-01.webp
public/v2/images/avatars/avatar-02.webp
public/v2/images/avatars/avatar-03.webp
public/v2/images/avatars/avatar-04.webp
public/v2/images/avatars/avatar-05.webp
public/v2/images/avatars/avatar-06.webp
```

Normalize all local avatars to square WebP files at `256 × 256`, using centered face crops.

## 5. Brand and Interface Assets

Required assets not exposed as raster requests in the page audit:

| Asset | Format | Purpose |
| --- | --- | --- |
| Agenforce wordmark | SVG or text lockup | Header and footer |
| Agent symbol | SVG | Brand mark and favicon |
| Workflow icons | SVG | Feature cards and pipeline steps |
| Integration logos | SVG | Salesforce, HubSpot, Sheets, and connected services |
| Social icons | SVG | Footer |
| Plus and accordion controls | SVG or icon component | Cards and FAQ |
| Status symbols | SVG or icon component | Completed, processing, failed |

Target directory:

```text
public/v2/icons/
```

## 6. Code-Native Ornaments

The following must be generated in CSS, SVG, or canvas and should not be exported as large bitmap assets:

- Perspective grid plane.
- Workflow connector paths.
- Fading square grid masks.
- Status dots and activity pulses.
- Glass blur panels.
- Spotlight and edge masks.
- Soft canvas fades.
- Card border gradients.

## 7. Font Assets

| Family | Weight | Role |
| --- | --- | --- |
| Manrope | `700` | Display headings |
| System sans stack | `400`, `500`, `700` | Body and interface |
| System monospace stack | `400`, `500` | Technical values |

If Manrope is self-hosted, use WOFF2 and place it at:

```text
public/v2/fonts/manrope-700.woff2
```

## 8. Directory Contract

```text
public/v2/
  fonts/
  icons/
  images/
    avatars/
    logos/
    product/
```

## 9. Asset Preparation Checklist

- [ ] Confirm usage rights for the Aceternity screenshots.
- [ ] Confirm usage rights for every partner logo.
- [ ] Confirm Unsplash portrait usage and attribution requirements.
- [x] Download reference files to the local V2 directory.
- [x] Convert avatar photography to WebP.
- [ ] Preserve PNG or SVG transparency for logos.
- [x] Add explicit display dimensions through the component and CSS contracts.
- [x] Add meaningful alt text for content images.
- [x] Mark purely decorative avatar assets with empty alt text.
- [x] Verify that the implementation does not hotlink production images.

## 10. Runtime Asset Audit

The final audit scrolled the complete reference page and inspected both network resources and DOM-generated graphics.

| Asset family | Count | Local implementation |
| --- | ---: | --- |
| Product screenshots | 4 | `public/v2/images/product/` |
| Partner logos | 6 | `public/v2/images/logos/` |
| Avatar photographs | 6 | `public/v2/images/avatars/` |
| WOFF2 fonts | 2 | `public/v2/fonts/` |
| Inline SVG instances in reference | 95 | Recreated through Tabler React icons and code-native SVG structures |
| Canvas instances in reference | 1 | Recreated as code-native workflow and grid scenes |

Observed Tabler icon families include layout sidebar, dashed check, clock, ripple, alert, plus, check, loader, settings, sparkles, clipboard data, file data, feather, pointer, filter search, filled check, minus, send, sun, moon, Slack, Meta, Instagram, Twitter, and LinkedIn.

The V2 implementation uses `@tabler/icons-react`, keeping icons tree-shakeable and avoiding raster icon exports.
