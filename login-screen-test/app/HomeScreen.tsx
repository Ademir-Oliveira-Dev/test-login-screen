import React, { useEffect, useState } from 'react';
import { Center, Heading, Spinner, Text, Button, ButtonSpinner } from "@gluestack-ui/themed";
import { useAuth } from "@/contexts/authContext";
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const deviceInfo =
          Platform.OS === 'ios' ? Device.osVersion : Device.manufacturer;

        if (!deviceInfo) throw new Error('Não foi possível obter informações');
        setInfo(deviceInfo);
      } catch (error: any) {
        setError(error?.message ?? 'Erro desconhecido ao obter informações do dispositivo');
      }
    })();
  }, []);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.replace('/');
    } catch (e) {
      console.error('Erro ao sair', e);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (error) 
    return (
      <Center flex={1} px="$4">
        <Text color="$error">{error}</Text>
        <Button mt="$4" onPress={handleLogout} variant="outline">
          <Text>Tentar novamente</Text>
        </Button>
      </Center>
    );

  if (!info) {
    return (
      <Center flex={1}>
        <Spinner size="large" />
      </Center>
    );
  }

  return (
    <Center flex={1} px="$4">
      <Heading>Dispositivo</Heading>
      <Text mt="$2">{info}</Text>

      <Button mt="$6" variant="outline" onPress={handleLogout} isDisabled={isSigningOut}>
        {isSigningOut ? <ButtonSpinner size="small" /> : <Text>Sair</Text>}
      </Button>
    </Center>
  );
}
