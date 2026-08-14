"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AuthError,
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

type AuthResult = {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
};

type SignUpResult = AuthResult & {
  needsConfirmation: boolean;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullname: string,
    ): Promise<SignUpResult> => {
      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              fullname,
            },
          },
        });

      if (!error) {
        setUser(data.user);
        setSession(data.session);
      }

      return {
        user: data.user,
        session: data.session,
        error,
        needsConfirmation:
          !!data.user && !data.session,
      };
    },
    [],
  );

  const signIn = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<AuthResult> => {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (!error) {
        setUser(data.user);
        setSession(data.session);
      }

      return {
        user: data.user,
        session: data.session,
        error,
      };
    },
    [],
  );

  const signOut = useCallback(async () => {
    const { error } =
      await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setSession(null);
    }

    return { error };
  }, []);

  const refreshSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.refreshSession();

    setSession(session);
    setUser(session?.user ?? null);

    return session;
  }, []);

  const refreshUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    return user;
  }, []);

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    refreshSession,
    refreshUser,
    isAuthenticated: !!user,
  };
}