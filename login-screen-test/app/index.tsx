import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import {
  GluestackUIProvider,
  Center,
  VStack,
  Heading,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonSpinner,
  Icon,
  EyeIcon,
  EyeOffIcon,
} from '@gluestack-ui/themed';
import colors from "tailwindcss/colors"
import { config } from '@gluestack-ui/config';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/contexts/authContext';
import { router } from 'expo-router';
import useThemeStore from '@/store/useThemeStore';

interface LoginFormValues {
  email: string;
  password: string;
}

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter ao menos 8 caracteres'),
});

export default function LoginScreen() {
  const { signIn, loading } = useAuth();
  const { theme, toggleTheme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      await signIn(email.trim(), password);
      router.replace('/HomeScreen')
      //Alert.alert('Login efetuado', `Bem‑vindo, ${email}!`);
    } catch (error) {
      Alert.alert('Erro de login', 'Credenciais inválidas!');
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Center flex={1} px="$4" bg="$backgroundLight">
          <VStack space="md" style={{ width: 360 }}>
            <Heading textAlign="center" size="lg" color='$text'>
              Acessar conta
            </Heading>

            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText color='$text'>E‑mail</FormControlLabelText>
              </FormControlLabel>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input variant="outline" size="md">
                    <InputField
                      placeholder="exemplo@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text.trim())}
                      value={value}
                      color='$text'
                    />
                  </Input>
                )}
              />

              <FormControlError>
                <FormControlErrorText>
                  {errors.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText color='$text'>Senha</FormControlLabelText>
              </FormControlLabel>

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input variant="outline" size="md" position='relative'>
                    <InputField
                      placeholder="********"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      color='$text'
                    />
                    <Button
                      position="absolute"
                      variant="link"
                      right="$3"
                      top="30%"
                      p="$1"
                      style={{ transform: [{ translateY: -12 }] }}
                      onPress={() => setShowPassword((prev) => !prev)}
                    >
                    <Icon
                      as={showPassword ? EyeOffIcon : EyeIcon}
                      size="sm"
                      color="$text"
                    />
                  </Button>
                  </Input>
                )}
              />

              <FormControlError>
                <FormControlErrorText>
                  {errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <Button
              mt="$2"
              isDisabled={!isValid || isSubmitting || loading}
              onPress={handleSubmit(onSubmit)}
            >
              {isSubmitting ? <ButtonSpinner color={colors.gray[400]} /> : <ButtonText>Entrar</ButtonText>}
            </Button>
            <Button
              variant="link"
              mt="$1"
              onPress={toggleTheme}
            >
              <ButtonText>
                Alternar para modo {theme === 'light' ? 'escuro' : 'claro'}
              </ButtonText>
            </Button>
          </VStack>
        </Center>
      </KeyboardAvoidingView>
    </GluestackUIProvider>
  );
};
