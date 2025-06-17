require('dotenv').config();

/** @type {import('@expo/config').ExpoConfig} */
module.exports = ({ config }) => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.default.com';
  const ENV     = process.env.NODE_ENV || 'development';

  return {
    ...config,
    name: 'login-screen',
    slug: 'login-screen',
    version: '1.0.0',

    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'loginscreen',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      bundleIdentifier: 'com.aoliveiradev.loginscreen',
      supportsTablet: true,
    },

    android: {
      package: 'com.aoliveiradev.loginscreen',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },

    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          statusBar: {
            backgroundColor: '#ffffff',
            barStyle: 'auto',
        },
        },
      ],
    ],

    experiments: { typedRoutes: true },

    extra: {
      eas: { projectId: '7a18f879-c8f8-4125-8001-408110122d72' },
      apiUrl: API_URL,
      env: ENV,
    },

    owner: 'aoliveira-dev',
  };
};
