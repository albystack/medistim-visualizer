/**
 * Strongly typed metric definitions for coronary bypass graft assessment.
 * These types define the shape of all metric-related data throughout the app.
 */

/** Metric identifier keys matching Medistim INTUI CABG interface */
export type MetricKey = 'MF' | 'PI' | 'DF' | 'BF' | 'ACI' | 'MAP';

/** Zone classification for gauge coloring */
export type ZoneType = 'green' | 'yellow' | 'red';

/** Defines a single zone boundary within a metric's range */
export interface ZoneBoundary {
  readonly start: number;
  readonly end: number;
  readonly type: ZoneType;
}

/** Complete reference range definition for a single metric */
export interface MetricRange {
  readonly min: number;
  readonly max: number;
  readonly unit: string;
  readonly label: string;
  readonly zones: readonly ZoneBoundary[];
}

/** Map of all metric ranges keyed by MetricKey */
export type ReferenceRanges = Readonly<Record<MetricKey, MetricRange>>;

/** User-entered metric values */
export type MetricValues = Record<MetricKey, number>;

/** Input state with string representation for controlled inputs */
export type MetricInputState = Record<MetricKey, string>;

/** Display information for a metric */
export interface MetricDisplayInfo {
  readonly key: MetricKey;
  readonly label: string;
  readonly value: number;
  readonly unit: string;
  readonly range: MetricRange;
}

/** All metric keys as an array for iteration */
export const METRIC_KEYS: readonly MetricKey[] = [
  'MF',
  'PI',
  'DF',
  'BF',
  'ACI',
  'MAP',
] as const;

/** Default initial values for all metrics */
export const DEFAULT_METRIC_VALUES: MetricValues = {
  MF: 0,
  PI: 0,
  DF: 0,
  BF: 0,
  ACI: 0,
  MAP: 0,
};

/** Default initial input state (empty strings) */
export const DEFAULT_INPUT_STATE: MetricInputState = {
  MF: '',
  PI: '',
  DF: '',
  BF: '',
  ACI: '',
  MAP: '',
};
