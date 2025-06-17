import React, { useEffect, useState } from 'react';
import { Center, Heading, Spinner, Text, Button } from "@gluestack-ui/themed";
import { useAuth } from "@/contexts/authContext";
import getDeviceInfo from "@/native";

export default function HomeScreen() {
  const [info, setInfo] = useState<string | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    getDeviceInfo().then(setInfo);
  }, []);
  if (!info) return <Spinner size="large" />;

  return (
    <Center flex={1} px="$4">
      <Heading>Dispositivo</Heading>
      <Text mt="$2">{info}</Text>

      <Button mt="$4" onPress={signOut}>
        <Text>Sair</Text>
      </Button>
    </Center>
  );
}
