/**
 * Controlled numeric input component for metric value entry.
 * Handles string-to-number conversion and provides appropriate keyboard.
 */

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TEXT_COLORS, UI_COLORS, SURFACE_COLORS } from '../constants/colors';

interface NumericInputProps {
  /** Display label for the input */
  readonly label: string;
  /** Unit to display after the input */
  readonly unit: string;
  /** Current string value of the input */
  readonly value: string;
  /** Callback when value changes */
  readonly onChangeText: (text: string) => void;
  /** Placeholder text when empty */
  readonly placeholder?: string;
  /** Test ID for testing purposes */
  readonly testID?: string;
}

/**
 * NumericInput renders a labeled text input configured for numeric entry.
 * Uses controlled input pattern with string state for proper handling
 * of partial inputs like "1." or empty values.
 */
export const NumericInput: React.FC<NumericInputProps> = ({
  label,
  unit,
  value,
  onChangeText,
  placeholder = '0',
  testID,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={TEXT_COLORS.tertiary}
          keyboardType="decimal-pad"
          returnKeyType="done"
          testID={testID}
          accessibilityLabel={`${label} input`}
          accessibilityHint={`Enter ${label.toLowerCase()} value in ${unit}`}
        />
        {unit.length > 0 && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_COLORS.secondary,
    marginBottom: 6,
    letterSpacing: 0.25,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: UI_COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 18,
    fontWeight: '500',
    color: TEXT_COLORS.primary,
    backgroundColor: SURFACE_COLORS.card,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXT_COLORS.secondary,
    marginLeft: 10,
    minWidth: 60,
  },
});

export default NumericInput;
