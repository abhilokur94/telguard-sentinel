/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: '#F4F8FF',
    tint: '#65E6D2',

    // Core surfaces
    background: '#07121F',
    foreground: '#F4F8FF',

    // Cards / elevated surfaces
    card: '#0D1D2D',
    cardForeground: '#F4F8FF',

    // Primary action color (buttons, links, active states)
    primary: '#65E6D2',
    primaryForeground: '#07121F',

    // Secondary / less-emphasis interactive surfaces
    secondary: '#142A3D',
    secondaryForeground: '#D9E6F2',

    // Muted / subdued elements (dividers, timestamps, placeholders)
    muted: '#102438',
    mutedForeground: '#8CA5B9',

    // Accent highlights (badges, selected items, focus rings)
    accent: '#173A47',
    accentForeground: '#B6FFF4',

    // Destructive actions (delete, error states)
    destructive: '#FF6B75',
    destructiveForeground: '#ffffff',

    // Borders and input outlines
    border: '#1C394F',
    input: '#23445B',
  },

  // Border radius (in px). Sync from the sibling web artifact's --radius
  // CSS variable. This value applies to cards, buttons, inputs, and modals.
  radius: 8,
};

export default colors;
