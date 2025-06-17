import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

type User = { name: string; email: string };

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /** Carrega credenciais salvas ao iniciar o app */
  useEffect(() => {
    (async () => {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('@token'),
        AsyncStorage.getItem('@user'),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post('/login', { email, password });
    const fakeUser = { name: email.split('@')[0], email };
    
    await AsyncStorage.multiSet([
      ['@token', data.token],
      ['@user', JSON.stringify(fakeUser)],
    ]);

    setToken(data.token);
    setUser(fakeUser);
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove(['@token', '@user']);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
