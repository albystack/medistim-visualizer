/**
 * Professional gauge component using @shipt/segmented-arc-for-react-native
 * Provides clean zone visualization with animated filling.
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SegmentedArc } from '@shipt/segmented-arc-for-react-native';
import { ZoneBoundary } from '../types/metrics';
import { ZONE_COLORS } from '../constants/colors';

interface GaugeProps {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly zones: readonly ZoneBoundary[];
  readonly size?: number;
}

/**
 * Gauge component using segmented arcs for zone visualization
 */
export const Gauge: React.FC<GaugeProps> = ({
  value,
  min,
  max,
  zones,
  size = 200,
}) => {
  // Calculate percentage (0-100)
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  // Convert zones to segments for SegmentedArc
  const segments = zones.map((zone) => {
    const zoneRange = zone.end - zone.start;
    const totalRange = max - min;
    const scale = zoneRange / totalRange;
    
    return {
      scale,
      filledColor: ZONE_COLORS[zone.type],
      emptyColor: `${ZONE_COLORS[zone.type]}40`, // 25% opacity
      data: { label: zone.type, start: zone.start, end: zone.end }
    };
  });
  
  return (
    <View style={[styles.container, { width: size, height: size * 0.7 }]}>
      <SegmentedArc
        segments={segments}
        fillValue={percentage}
        isAnimated={true}
        animationDuration={1000}
        animationDelay={100}
        arcDegree={180}
        radius={size * 0.35}
        filledArcWidth={16}
        emptyArcWidth={16}
        spaceBetweenSegments={2}
        capInnerColor={ZONE_COLORS.green}
        capOuterColor="#FFFFFF"
      >
        {() => <View />}
      </SegmentedArc>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Gauge;
