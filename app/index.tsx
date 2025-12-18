/**
 * Input screen for entering coronary bypass graft assessment metrics.
 * Users enter numeric values for each metric before viewing results.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MetricKey,
  MetricInputState,
  METRIC_KEYS,
  DEFAULT_INPUT_STATE,
} from '../types/metrics';
import { REFERENCE_RANGES } from '../constants/referenceRanges';
import {
  SURFACE_COLORS,
  TEXT_COLORS,
  UI_COLORS,
} from '../constants/colors';
import NumericInput from '../components/NumericInput';

/**
 * InputScreen renders a form with numeric inputs for each CABG metric.
 * Values are passed to the results screen via URL params.
 */
const InputScreen = () => {
  const router = useRouter();
  const [inputState, setInputState] = useState<MetricInputState>(DEFAULT_INPUT_STATE);

  /**
   * Updates a single metric's input value.
   * Accepts any string input to support controlled input behavior.
   */
  const handleInputChange = useCallback((key: MetricKey, value: string) => {
    setInputState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  /**
   * Parses string inputs to numbers and navigates to results.
   * Empty or invalid inputs default to 0.
   */
  const handleViewResults = useCallback(() => {
    const params: Record<string, string> = {};

    METRIC_KEYS.forEach((key) => {
      const parsed = parseFloat(inputState[key]);
      params[key] = isNaN(parsed) ? '0' : parsed.toString();
    });

    router.push({
      pathname: '/results',
      params,
    });
  }, [inputState, router]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Enter Metric Values</Text>
          <Text style={styles.subtitle}>
            Input CABG assessment values for visualization
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          {METRIC_KEYS.map((key) => {
            const range = REFERENCE_RANGES[key];
            return (
              <NumericInput
                key={key}
                label={range.label}
                unit={range.unit}
                value={inputState[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                placeholder={`${range.min}-${range.max}`}
                testID={`input-${key}`}
              />
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleViewResults}
            accessibilityRole="button"
            accessibilityLabel="View Results"
          >
            <Text style={styles.buttonText}>View Results</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SURFACE_COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
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
  inputsContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    backgroundColor: UI_COLORS.primaryButton,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: UI_COLORS.primaryButtonPressed,
  },
  buttonText: {
    color: TEXT_COLORS.inverse,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
});

export default InputScreen;
