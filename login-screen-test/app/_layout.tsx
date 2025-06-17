import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AuthProvider from '@/contexts/authContext';
import React from 'react';
import  useThemeStore from '@/store/useThemeStore';

export default function RootLayout() {
  const { theme } = useThemeStore();
  return (
    <GluestackUIProvider config={config} colorMode={theme}>
      <AuthProvider>
        <Stack />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
