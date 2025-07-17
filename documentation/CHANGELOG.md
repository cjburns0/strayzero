# StrayZero Changelog

## Version 1.00.0 - Landing Page Implementation (2025-07-16)

### Added
- **Landing Page**: Implemented a new landing page at the root route (`/`) with:
  - Modern, terminal-inspired design with green-on-black color scheme
  - Animated ellipsis effect on the tagline "The modern ballistic data interface..."
  - "Launch StrayZero" button that navigates to the main application
  - Footer with copyright information
  - Responsive design for mobile and desktop

### Changed
- **App Structure**: Reorganized the application routing:
  - Moved the main ballistic calculator from `/` to `/calculator`
  - The landing page now occupies the root route (`/`)
  - Maintained existing routes for `/reticle` and `/settings`

### Technical Details
- Added custom CSS animations in `globals.css`:
  - `blink1`, `blink2`, `blink3` keyframes for staggered ellipsis animation
  - Animation classes: `animate-blink-1`, `animate-blink-2`, `animate-blink-3`
- File structure changes:
  - Created `/app/calculator/page.tsx` for the main ballistic calculator
  - Created `/app/page.tsx` for the landing page
  - Updated navigation links to reflect new routing structure

### Files Modified
- `/app/page.tsx` - New landing page component
- `/app/calculator/page.tsx` - Relocated ballistic calculator (previously at `/app/page.tsx`)
- `/app/globals.css` - Added animation keyframes and classes

### Navigation Flow
1. Users land on the homepage (`/`) - Landing page
2. Click "Launch StrayZero" to navigate to `/calculator` - Ballistic Calculator
3. From the calculator, users can access:
   - `/reticle` - Reticle view
   - `/settings` - Firearms and ammunition profile management

This update provides a professional entry point for the application while maintaining all existing functionality.