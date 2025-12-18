/**
 * Math utilities for gauge rendering.
 * Contains all angle, arc, and positioning calculations for the semicircle gauge.
 * 
 * Coordinate system:
 * - SVG has Y increasing downward
 * - We use degrees where 0° = 3 o'clock, 90° = 12 o'clock, 180° = 9 o'clock
 * - Gauge spans from 180° (left) to 0° (right) forming an upward-facing semicircle
 */

/** Constant for converting degrees to radians */
const DEG_TO_RAD = Math.PI / 180;

/**
 * Clamps a value between min and max boundaries.
 * Ensures gauge values stay within displayable range.
 */
export const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Converts a value to a percentage within a given range.
 * Returns 0-1 representing position within min/max.
 */
export const valueToPercentage = (
  value: number,
  min: number,
  max: number
): number => {
  if (max === min) return 0;
  const clamped = clampValue(value, min, max);
  return (clamped - min) / (max - min);
};

/**
 * Converts a percentage (0-1) to an angle on the semicircle gauge.
 * 0% = 180° (left side), 100% = 0° (right side)
 */
export const percentageToAngle = (percentage: number): number => {
  const clampedPercentage = clampValue(percentage, 0, 1);
  // Start at 180° and move toward 0° as percentage increases
  return 180 - clampedPercentage * 180;
};

/**
 * Converts a value directly to a gauge angle.
 * Combines value-to-percentage and percentage-to-angle conversions.
 */
export const valueToAngle = (
  value: number,
  min: number,
  max: number
): number => {
  const percentage = valueToPercentage(value, min, max);
  return percentageToAngle(percentage);
};

/**
 * Calculates the (x, y) coordinates for a point on an arc.
 * Uses standard math convention where angle 0 = right, 90 = up.
 * Converts to SVG coordinates where Y increases downward.
 *
 * @param centerX - X coordinate of arc center
 * @param centerY - Y coordinate of arc center
 * @param radius - Arc radius
 * @param angleInDegrees - Angle in degrees (0° = right, 90° = up, 180° = left)
 */
export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = angleInDegrees * DEG_TO_RAD;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    // Subtract because SVG Y-axis is inverted
    y: centerY - radius * Math.sin(angleInRadians),
  };
};

/**
 * Generates an SVG arc path string for a portion of the gauge.
 * Draws clockwise from startAngle to endAngle.
 *
 * @param centerX - X coordinate of arc center
 * @param centerY - Y coordinate of arc center
 * @param radius - Arc radius
 * @param startAngleDeg - Start angle in degrees (higher = more left)
 * @param endAngleDeg - End angle in degrees (lower = more right)
 */
export const describeArc = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string => {
  const start = polarToCartesian(centerX, centerY, radius, startAngleDeg);
  const end = polarToCartesian(centerX, centerY, radius, endAngleDeg);

  // Calculate the angular span
  const angularSpan = Math.abs(startAngleDeg - endAngleDeg);
  
  // Large arc flag: 1 if arc spans more than 180°
  const largeArcFlag = angularSpan > 180 ? 1 : 0;
  
  // Sweep flag: 0 = counter-clockwise in SVG coords, which is clockwise visually
  // Since we go from high angle (left) to low angle (right), we sweep clockwise
  const sweepFlag = 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
};

/**
 * Calculates needle endpoint coordinates based on value.
 * The needle rotates from the center of the gauge base.
 *
 * @param value - Current metric value
 * @param min - Minimum range value
 * @param max - Maximum range value
 * @param centerX - X coordinate of needle pivot
 * @param centerY - Y coordinate of needle pivot
 * @param length - Needle length
 */
export const calculateNeedlePosition = (
  value: number,
  min: number,
  max: number,
  centerX: number,
  centerY: number,
  length: number
): { tipX: number; tipY: number; angle: number } => {
  const angle = valueToAngle(value, min, max);
  const tip = polarToCartesian(centerX, centerY, length, angle);

  return {
    tipX: tip.x,
    tipY: tip.y,
    angle,
  };
};

/**
 * Converts zone boundaries to arc angles for rendering.
 * Zone start (lower value) maps to higher angle (left).
 * Zone end (higher value) maps to lower angle (right).
 */
export const zoneToArcAngles = (
  zoneStart: number,
  zoneEnd: number,
  rangeMin: number,
  rangeMax: number
): { startAngle: number; endAngle: number } => {
  // Zone start (lower value) = higher angle (more left on gauge)
  // Zone end (higher value) = lower angle (more right on gauge)
  const startAngle = valueToAngle(zoneStart, rangeMin, rangeMax);
  const endAngle = valueToAngle(zoneEnd, rangeMin, rangeMax);
  
  return { startAngle, endAngle };
};

/**
 * Creates a full semicircle arc path from left (180°) to right (0°).
 */
export const describeFullArc = (
  centerX: number,
  centerY: number,
  radius: number
): string => {
  return describeArc(centerX, centerY, radius, 180, 0);

  return { startAngle, endAngle };
};

/**
 * Formats a numeric value for display.
 * Handles decimal places appropriately for different metric types.
 */
export const formatDisplayValue = (
  value: number,
  decimalPlaces: number = 1
): string => {
  if (Number.isInteger(value) || decimalPlaces === 0) {
    return Math.round(value).toString();
  }
  return value.toFixed(decimalPlaces);
};
