/**
 * Root layout for Expo Router navigation.
 * Configures the stack navigator for the application.
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SURFACE_COLORS, TEXT_COLORS } from '../constants/colors';

/**
 * RootLayout provides the navigation structure for the app.
 * Uses Stack navigation with two screens:
 * - index: Input screen for entering metric values
 * - results: Visualization screen showing gauges
 */
const RootLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: SURFACE_COLORS.card,
          },
          headerTintColor: TEXT_COLORS.primary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: SURFACE_COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'CABG Metrics Input',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="results"
          options={{
            title: 'Visualization Results',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
