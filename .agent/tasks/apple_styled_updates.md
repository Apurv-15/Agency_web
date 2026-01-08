# Apple-Styled Design Updates

## Objective
Update the website design to be more Apple-like with improved typography, background colors, and hidden video section.

## Tasks Completed ✅

1. **Hidden Video Section**
   - Commented out `<FullscreenFeature />` component in `page.tsx`
   - Video section is now hidden from the page

2. **Apple-Styled Typography**
   - Added SF Pro Display font stack to all headings in `globals.css`
   - Updated font-weight, letter-spacing, and line-height for Apple aesthetic
   - Changed all headings to pure white color (#ffffff)
   - Removed gradient effects from h2 headings in Projects and Services sections

3. **Font Configuration**
   - Added multiple font weights (300, 400, 500, 600, 700) to Inter font in `layout.tsx`

## Remaining Tasks 🔄

4. **Background Color Update**
   - Change from pure black (#000000) to a softer dark color
   - Suggested options:
     - **Deep Navy**: `#0a0e27` (dark blue-black, Apple-like)
     - **Charcoal**: `#1a1a1a` (softer black)
     - **Dark Slate**: `#0f1419` (Twitter-like dark)
     - **Deep Purple**: `#0d0d1f` (subtle purple tint)
   
   Files to update:
   - Section backgrounds in `projects.tsx`, `services.tsx`, `infinite-hero.tsx`
   - Global background in `globals.css`

## Recommendations

- **Preferred Background**: Deep Navy (#0a0e27) - gives a premium, Apple-like feel while maintaining contrast
- Keep the existing glow effects (violet/indigo) as they complement the new background
- Ensure text contrast remains WCAG compliant with the new background

## Next Steps

Please confirm which background color you prefer, or provide a specific color code.
