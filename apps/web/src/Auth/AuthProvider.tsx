import { useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/Api';
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (newSession) {
        setSession(newSession);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
