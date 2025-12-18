/**
 * Results screen displaying gauge visualizations for all metrics.
 * Receives metric values via URL params and renders GaugeCards.
 */

import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MetricKey, MetricValues, METRIC_KEYS } from '../types/metrics';
import { REFERENCE_RANGES } from '../constants/referenceRanges';
import { SURFACE_COLORS, TEXT_COLORS } from '../constants/colors';
import GaugeCard from '../components/GaugeCard';

/**
 * ResultsScreen displays a scrollable list of GaugeCards,
 * one for each CABG metric with the user-entered value.
 */
const ResultsScreen = () => {
  const params = useLocalSearchParams<Record<MetricKey, string>>();

  /**
   * Parse URL params into numeric metric values.
   * Memoized to avoid recalculation on re-renders.
   */
  const metricValues = useMemo((): MetricValues => {
    const values: Partial<MetricValues> = {};

    METRIC_KEYS.forEach((key) => {
      const paramValue = params[key];
      if (typeof paramValue === 'string') {
        const parsed = parseFloat(paramValue);
        values[key] = isNaN(parsed) ? 0 : parsed;
      } else {
        values[key] = 0;
      }
    });

    return values as MetricValues;
  }, [params]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Assessment Results</Text>
        <Text style={styles.subtitle}>
          Visual representation of entered CABG metrics
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {METRIC_KEYS.map((key) => {
          const range = REFERENCE_RANGES[key];
          const value = metricValues[key];

          return (
            <GaugeCard
              key={key}
              metricKey={key}
              value={value}
              range={range}
              testID={`gauge-card-${key}`}
            />
          );
        })}
      </View>

      <View style={styles.disclaimer}>
        <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/resci')}>
          <Text style={styles.disclaimerText}>
            Made with ❤️ by <Text style={styles.linkedText}>Alberto Rescigno</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SURFACE_COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT_COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: TEXT_COLORS.secondary,
    lineHeight: 22,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  disclaimer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 12,
    color: TEXT_COLORS.tertiary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  linkedText: {
    textDecorationLine: 'underline',
  },
});

export default ResultsScreen;
