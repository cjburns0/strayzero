# StrayZero Documentation

## Version 1.00.0

### Overview
StrayZero is a modern ballistic calculator application designed for precision shooting. This documentation covers the implementation of the landing page and application structure changes in version 1.00.0.

### Project Structure

```
/app
├── page.tsx           # Landing page (root route)
├── app/
│   └── page.tsx      # Main ballistic calculator
├── reticle/
│   └── page.tsx      # Reticle view
├── settings/
│   └── page.tsx      # Firearms & ammunition profiles
├── layout.tsx        # Root layout
└── globals.css       # Global styles & animations
```

### Routing

- `/` - Landing page with product branding and launch button
- `/app` - Main ballistic calculator application
- `/reticle` - Reticle visualization for scope adjustments
- `/settings` - Manage firearm and ammunition profiles

### Implementation Details

#### Landing Page Features
1. **Design**: Terminal-inspired aesthetic with green-on-black color scheme
2. **Typography**: Monospace font for tech-forward appearance
3. **Animation**: Staggered blinking ellipsis effect on tagline
4. **Responsive**: Adapts to mobile, tablet, and desktop viewports
5. **Navigation**: Single CTA button to launch the main application

#### CSS Animations
The landing page uses custom keyframe animations for the ellipsis effect:

```css
@keyframes blink1 { /* First dot animation */ }
@keyframes blink2 { /* Second dot animation */ }
@keyframes blink3 { /* Third dot animation */ }
```

Classes:
- `.animate-blink-1`
- `.animate-blink-2`
- `.animate-blink-3`

Each animation runs for 2 seconds infinitely with staggered opacity changes.

### Development Notes

1. **File Organization**: The main app was moved from `/app/page.tsx` to `/app/app/page.tsx` to make room for the landing page at the root route.

2. **Navigation Updates**: All internal links within the ballistic calculator maintain their original paths (`/reticle`, `/settings`).

3. **Styling Approach**: The landing page uses Tailwind CSS utility classes for styling, maintaining consistency with the rest of the application.

4. **Component Structure**: The landing page is a simple functional component with no state management, focusing on presentation and navigation.

### Future Considerations

- Add analytics tracking for the "Launch StrayZero" button
- Consider A/B testing different landing page designs
- Implement smooth transitions between landing and app pages
- Add loading states for initial app launch
- Consider adding feature highlights or testimonials to the landing page