# View - Realtime Color Sync

A Flutter application that displays synchronized colors in real-time from the controller.

## Features

- 📱 Cross-platform (iOS, Android, Web, Desktop)
- 🎨 Beautiful animated color display
- 🔄 Real-time color synchronization (ready for WebSocket integration)
- ✨ Smooth color transitions

## Getting Started

### Prerequisites

- Flutter SDK (3.7.2 or higher)
- Dart SDK

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
flutter pub get
```

### Run the app

#### On your preferred device/emulator:
```bash
flutter run
```

#### On a specific device:
```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device-id>
```

#### On Chrome (Web):
```bash
flutter run -d chrome
```

#### On macOS:
```bash
flutter run -d macos
```

### Build for production

```bash
# Android
flutter build apk

# iOS
flutter build ios

# Web
flutter build web

# macOS
flutter build macos
```

## Project Structure

```
lib/
  └── main.dart          # Main application entry point with ColorSyncView
```

## Next Steps

To connect this view with the React controller:
1. Add WebSocket support (e.g., `web_socket_channel` package)
2. Implement real-time color updates from the controller
3. Add error handling and connection status indicators

## Tech Stack

- Flutter
- Dart
- Material Design 3

