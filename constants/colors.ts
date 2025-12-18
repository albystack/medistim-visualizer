/**
 * Centralized color palette for the medical visualization UI.
 * Colors are chosen to be professional, high-contrast, and suitable
 * for medical device interfaces.
 */

/** Zone colors for gauge arcs and indicators */
export const ZONE_COLORS = {
  /** Optimal range - indicates healthy/acceptable values */
  green: '#2E7D32',
  /** Borderline range - indicates caution/attention needed */
  yellow: '#F9A825',
  /** Poor range - indicates concerning values */
  red: '#C62828',
} as const;

/** Background and surface colors */
export const SURFACE_COLORS = {
  /** Primary background */
  background: '#F5F5F5',
  /** Card/surface background */
  card: '#FFFFFF',
  /** Elevated surface */
  elevated: '#FAFAFA',
  /** Border color */
  border: '#E0E0E0',
  /** Gauge background arc */
  gaugeBackground: '#EEEEEE',
} as const;

/** Text colors for various contexts */
export const TEXT_COLORS = {
  /** Primary text - high emphasis */
  primary: '#212121',
  /** Secondary text - medium emphasis */
  secondary: '#616161',
  /** Tertiary text - low emphasis */
  tertiary: '#9E9E9E',
  /** Text on dark backgrounds */
  inverse: '#FFFFFF',
  /** Value display text */
  value: '#1A237E',
} as const;

/** UI element colors */
export const UI_COLORS = {
  /** Primary action button */
  primaryButton: '#1565C0',
  /** Primary button pressed state */
  primaryButtonPressed: '#0D47A1',
  /** Input border */
  inputBorder: '#BDBDBD',
  /** Input border focused */
  inputBorderFocused: '#1565C0',
  /** Gauge needle */
  needle: '#37474F',
  /** Gauge needle center */
  needleCenter: '#263238',
} as const;

/** Type for zone color keys */
export type ZoneColorKey = keyof typeof ZONE_COLORS;
