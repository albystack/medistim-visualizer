# Medistim Visualizer

A React Native mobile application for visualizing coronary artery bypass graft (CABG) assessment metrics using interactive gauge displays. This educational tool provides real-time visual feedback on key hemodynamic parameters measured during cardiac surgery.

## Overview

Medistim Visualizer helps medical professionals and students understand CABG quality metrics by providing intuitive, color-coded gauge visualizations. Users enter numeric values for six key metrics, and the app displays each on a segmented arc gauge with zone-based color coding (green/yellow/red) indicating optimal, borderline, and concerning ranges.

## Features

- **Six Key Metrics Support**:
  - **Mean Flow (MF)**: Blood flow volume through the graft (mL/min)
  - **Pulsatility Index (PI)**: Flow variation ratio
  - **Diastolic Filling (DF)**: Percentage of diastolic flow (%)
  - **Backflow (BF)**: Reverse flow percentage (%)
  - **Acoustic Coupling Index (ACI)**: Ultrasound signal quality (%)
  - **Mean Arterial Pressure (MAP)**: Blood pressure measurement (mmHg)

- **Interactive Gauges**: Visual arc gauges with color-coded zones for instant interpretation
- **Clean Input Interface**: Validated numeric inputs with real-time feedback
- **Responsive Design**: Optimized for mobile devices using React Native
- **Educational Reference**: Predefined reference ranges for each metric

## Tech Stack

- **Framework**: React Native with Expo (SDK 52)
- **Navigation**: Expo Router v4
- **Language**: TypeScript
- **Gauges**: [@shipt/segmented-arc-for-react-native](https://www.npmjs.com/package/@shipt/segmented-arc-for-react-native)
- **Graphics**: React Native SVG

## Project Structure

```
medistim-visualizer/
├── app/
│   ├── _layout.tsx        # Root navigation layout
│   ├── index.tsx          # Input screen for entering metrics
│   └── results.tsx        # Results screen with gauge visualizations
├── components/
│   ├── Gauge.tsx          # Segmented arc gauge component
│   ├── GaugeCard.tsx      # Card wrapper for gauge with labels
│   └── NumericInput.tsx   # Validated numeric input field
├── constants/
│   ├── colors.ts          # Color palette definitions
│   └── referenceRanges.ts # Metric reference ranges and zones
├── types/
│   └── metrics.ts         # TypeScript type definitions
├── utils/
│   └── gaugeMath.ts       # Gauge angle calculations
└── assets/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android emulator (used in this project), can also use IOS emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medistim-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web (limited support)
npm run web
```

## Usage

1. **Enter Metrics**: On the home screen, input numeric values for each of the six CABG metrics
2. **View Results**: Press "View Results" to navigate to the visualization screen
3. **Interpret Gauges**: Each gauge displays your entered value with color-coded zones:
   - **Green**: Optimal range
   - **Yellow**: Borderline/caution range
   - **Red**: Concerning range
4. **Go Back**: Use the "Back to Input" button to enter new values

## Development

### Key Components

- **NumericInput**: Handles validated numeric input with real-time parsing
- **Gauge**: Renders the segmented arc visualization using SVG
- **GaugeCard**: Combines gauge, label, and value display in a card layout

### Reference Ranges

Reference ranges are defined in [`constants/referenceRanges.ts`](constants/referenceRanges.ts). Each metric includes:
- Min/max display range
- Unit of measurement
- Descriptive label
- Zone boundaries with color classifications

**Note**: Current ranges are for educational purposes only and should not be used for clinical decision-making.

## Deployment

This project is configured for EAS Build (Expo Application Services):

```bash
# Build for production
eas build --platform ios
eas build --platform android

# Submit to app stores
eas submit
```

## Contributing

Contributions are welcome! Please ensure:
- TypeScript types are properly defined
- Code follows existing style conventions
- Components are documented with JSDoc comments
- Reference ranges cite appropriate medical sources

## Disclaimer

This application is intended for **educational purposes only**. The reference ranges and visualizations are representative examples and should not be used for actual clinical decision-making. Always consult validated medical guidelines and qualified healthcare professionals for patient care.

## Author

Made with ❤️ by [Alberto Rescigno](https://www.linkedin.com/in/resci)

## Acknowledgments

- Inspired by Medistim INTUI CABG assessment interface
- Built with Expo and React Native
- Gauge visualization powered by @shipt/segmented-arc-for-react-native
