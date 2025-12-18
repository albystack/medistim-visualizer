/**
 * Card component that displays a metric with its gauge visualization.
 * Combines label, value display, and gauge into a cohesive card layout.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MetricKey, MetricRange, ZoneType } from '../types/metrics';
import { SURFACE_COLORS, TEXT_COLORS, ZONE_COLORS } from '../constants/colors';
import { formatDisplayValue } from '../utils/gaugeMath';
import { getZoneForValue } from '../constants/referenceRanges';
import Gauge from './Gauge';

interface GaugeCardProps {
  /** Metric key for zone lookup */
  readonly metricKey: MetricKey;
  /** Current metric value */
  readonly value: number;
  /** Complete range configuration for the metric */
  readonly range: MetricRange;
  /** Optional test ID */
  readonly testID?: string;
}

/**
 * GaugeCard renders a complete metric visualization card containing:
 * - Metric label
 * - Current value with unit and zone-based color
 * - Semicircular gauge with needle
 */
export const GaugeCard: React.FC<GaugeCardProps> = ({
  metricKey,
  value,
  range,
  testID,
}) => {
  // Determine the zone for color-coding the value display
  const zone = getZoneForValue(metricKey, value);
  const valueColor = getValueColor(zone);

  // Format the display value appropriately
  const displayValue = formatDisplayValue(value, getDecimalPlaces(range.unit));

  return (
    <View style={styles.card} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.label}>{range.label}</Text>
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: valueColor }]}>
            {displayValue}
          </Text>
          {range.unit.length > 0 && (
            <Text style={styles.unit}>{range.unit}</Text>
          )}
        </View>
      </View>

      <View style={styles.gaugeContainer}>
        <Gauge
          value={value}
          min={range.min}
          max={range.max}
          zones={range.zones}
        />
      </View>

      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>{range.min}</Text>
        <Text style={styles.rangeLabel}>{range.max}</Text>
      </View>
    </View>
  );
};

/**
 * Maps zone type to appropriate display color for the value.
 */
const getValueColor = (zone: ZoneType): string => {
  switch (zone) {
    case 'green':
      return ZONE_COLORS.green;
    case 'yellow':
      return ZONE_COLORS.yellow;
    case 'red':
      return ZONE_COLORS.red;
    default:
      return TEXT_COLORS.primary;
  }
};

/**
 * Determines appropriate decimal places based on metric unit.
 */
const getDecimalPlaces = (unit: string): number => {
  // Pulsatility Index (unitless) typically shows 1 decimal
  if (unit === '') return 1;
  // Percentages and flow values are typically whole numbers
  return 0;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: SURFACE_COLORS.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: SURFACE_COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLORS.primary,
    flex: 1,
    letterSpacing: 0.15,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXT_COLORS.secondary,
    marginLeft: 6,
  },
  gaugeContainer: {
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: -10,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 4,
  },
  rangeLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT_COLORS.tertiary,
  },
});

export default GaugeCard;
