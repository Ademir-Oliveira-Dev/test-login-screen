# Login Screen App

A **React Native + Expo** application built as a technical assignment for a **Mid‑level React Native Developer** position. It showcases best practices for UI, global state, HTTP requests, dark/light theming, and optional native integration.

---

## ✨ Implemented Features

| Category       | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| **UI**         | Gluestack‑UI (`@gluestack-ui/themed`) + NativeWind               |
| **Form**       | **React Hook Form** + **Yup** (email & password validation)      |
| **State**      | `AuthContext` (Context API) for authentication                   |
| **Zustand**    | Manages theme (light/dark)                                       |
| **Requests**   | **Axios** with `x-api-key` interceptor → public *reqres.in* API  |
| **Theme**      | Persistent dark/light toggle stored in Zustand                   |
| **Device**     | Expo Device → iOS version or Android manufacturer on Home screen |
| **Navigation** | **expo-router** (file‑based routing)                             |

---

## 📋 Prerequisites

| Tool         | Version                         |
| ------------ | ------------------------------- |
| **Node.js**  | ≥ **18 LTS** (`nvm install 18`) |
| **Expo CLI** | `npx expo install expo-cli`     |
| **npm**      | 8+                              |

---

## 🚀 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/Ademir-Oliveira-Dev/test-login-screen.git
cd login-screen-test

# 2. Install dependencies
npm install

# 3. Copy the .env example and edit if needed
cp .env.example .env

# 4. Start Metro (clear cache)
npx expo start --clear
```

Launch the app on:

- **iOS Simulator** → `npx expo run:ios`
- **Android Emulator** → `npx expo run:android`

> **Valid login** (reqres.in)\
> `eve.holt@reqres.in` / `cityslicka`

---

## 🔐 Environment Variables

Create **.env**:

```env
REQRES_API_KEY=reqres-free-v1
```

---

## 🧩 Architecture

```text
AuthProvider  →  provides { user, token, signIn, signOut }
Zustand       →  stores { theme: 'light' | 'dark' }
expo-router   →  /login (public route)  /home (protected route)
```

1. **LoginScreen** calls `signIn` → token saved in AsyncStorage.
2. **HomeScreen** uses Expo Device to display device info.
3. The theme toggle reads/writes Zustand and notifies `GluestackUIProvider`.

---

## Demo
<p align="center">
  <img src="assets/images/login-record.gif" alt="App demo" width="280" />
</p>
