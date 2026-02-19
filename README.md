# Realtime Color Sync

A real-time color synchronization app with a React web controller and a Flutter viewer.
The controller pushes background color/gradient settings to Firebase, and the Flutter view reflects changes instantly.

## Architecture

```
controller/  → React + Vite + TypeScript (Web UI to control colors)
view/        → Flutter (Cross-platform viewer that displays colors in real-time)
```

## Prerequisites

- Node.js (v18+) & npm
- Flutter SDK (3.7.2+)
- Firebase project with **Realtime Database** enabled

## Setup

### 1. Firebase

Create a Firebase project and enable **Realtime Database**.

### 2. Controller (React)

```bash
cd controller
cp .env.example .env   # Fill in your Firebase credentials
npm install
npm run dev            # Runs at http://localhost:3000
```

**Required `.env` variables:**
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### 3. View (Flutter)

```bash
cd view
flutter pub get
flutter run            # Choose your target device
```

## Usage

1. Open the **controller** in a browser.
2. Select a background type (**Color** or **Gradient**).
3. Pick colors — the **view** app updates in real-time.
4. Enable **Animation Effect** for an animated gradient.

## Tech Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Controller | React, TypeScript, Vite, MUI      |
| View       | Flutter, Dart                     |
| Backend    | Firebase Realtime Database        |
