/**
 * Reference ranges and zone thresholds for all coronary bypass graft metrics.
 * These values define the visualization boundaries for each metric gauge.
 *
 * Note: These are representative educational values, not clinical standards.
 * Real clinical thresholds would come from validated medical guidelines.
 */

import { ReferenceRanges } from '../types/metrics';

/**
 * Complete reference range definitions for all supported metrics.
 * Each metric includes min/max display range, unit, label, and color zones.
 */
export const REFERENCE_RANGES: ReferenceRanges = {
  /**
   * Mean Flow (MF)
   * Represents blood flow volume through the graft.
   * Higher values generally indicate better graft function.
   */
  MF: {
    min: 0,
    max: 200,
    unit: 'mL/min',
    label: 'Mean Flow',
    zones: [
      { start: 0, end: 15, type: 'red' },
      { start: 15, end: 30, type: 'yellow' },
      { start: 30, end: 200, type: 'green' },
    ],
  },

  /**
   * Pulsatility Index (PI)
   * Ratio of flow variation to mean flow.
   * Lower values suggest more consistent flow patterns.
   */
  PI: {
    min: 0,
    max: 10,
    unit: '',
    label: 'Pulsatility Index',
    zones: [
      { start: 0, end: 3, type: 'green' },
      { start: 3, end: 5, type: 'yellow' },
      { start: 5, end: 10, type: 'red' },
    ],
  },

  /**
   * Diastolic Filling (DF)
   * Percentage of flow occurring during diastole.
   * Higher values are generally better for coronary grafts.
   */
  DF: {
    min: 0,
    max: 100,
    unit: '%',
    label: 'Diastolic Filling',
    zones: [
      { start: 0, end: 50, type: 'red' },
      { start: 50, end: 70, type: 'yellow' },
      { start: 70, end: 100, type: 'green' },
    ],
  },

  /**
   * Backflow (BF)
   * Percentage of reverse flow in the graft.
   * Lower values indicate better unidirectional flow.
   */
  BF: {
    min: 0,
    max: 50,
    unit: '%',
    label: 'Backflow',
    zones: [
      { start: 0, end: 3, type: 'green' },
      { start: 3, end: 10, type: 'yellow' },
      { start: 10, end: 50, type: 'red' },
    ],
  },

  /**
   * Acoustic Coupling Index (ACI)
   * Signal quality indicator for ultrasound measurement.
   * Higher values indicate better probe contact.
   */
  ACI: {
    min: 0,
    max: 100,
    unit: '%',
    label: 'Acoustic Coupling',
    zones: [
      { start: 0, end: 50, type: 'red' },
      { start: 50, end: 80, type: 'yellow' },
      { start: 80, end: 100, type: 'green' },
    ],
  },

  /**
   * Mean Arterial Pressure (MAP)
   * System pressure during measurement.
   * Normal range is important for valid flow readings.
   */
  MAP: {
    min: 0,
    max: 200,
    unit: 'mmHg',
    label: 'Mean Arterial Pressure',
    zones: [
      { start: 0, end: 60, type: 'red' },
      { start: 60, end: 70, type: 'yellow' },
      { start: 70, end: 105, type: 'green' },
      { start: 105, end: 120, type: 'yellow' },
      { start: 120, end: 200, type: 'red' },
    ],
  },
} as const;

/**
 * Get the zone type for a given value within a metric's range.
 * Returns the zone type ('green', 'yellow', 'red') that contains the value.
 */
export const getZoneForValue = (
  metricKey: keyof typeof REFERENCE_RANGES,
  value: number
): 'green' | 'yellow' | 'red' => {
  const range = REFERENCE_RANGES[metricKey];
  const clampedValue = Math.max(range.min, Math.min(range.max, value));

  for (const zone of range.zones) {
    if (clampedValue >= zone.start && clampedValue <= zone.end) {
      return zone.type;
    }
  }

  // Fallback to red if no zone matches (edge case)
  return 'red';
};
