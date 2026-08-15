"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;

  signUp: (
    email: string,
    password: string,
    fullname: string,
  ) => Promise<SignUpResult>;

  signIn: (
    email: string,
    password: string,
  ) => Promise<AuthResult>;

  signOut: () => Promise<{
    error: AuthError | null;
  }>;

  refreshSession: () => Promise<{
    session: Session | null;
    error: AuthError | null;
  }>;

  refreshUser: () => Promise<{
    user: User | null;
    error: AuthError | null;
  }>;

  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  /*
   * ============================================
   * INITIAL SESSION CHECK
   * ============================================
   */

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error(
          "Failed to get auth session:",
          error,
        );

        setSession(null);
        setUser(null);
        setLoading(false);

        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initialize();

    /*
     * ============================================
     * AUTH STATE LISTENER
     * ============================================
     */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    /*
     * ============================================
     * CLEANUP
     * ============================================
     */

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /*
   * ============================================
   * SIGN UP
   * ============================================
   */

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

  /*
   * ============================================
   * SIGN IN
   * ============================================
   */

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

  /*
   * ============================================
   * SIGN OUT
   * ============================================
   */

  const signOut = useCallback(async () => {
    const { error } =
      await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setSession(null);
    }

    return {
      error,
    };
  }, []);

  /*
   * ============================================
   * REFRESH SESSION
   * ============================================
   */

  const refreshSession = useCallback(async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.refreshSession();

    if (!error) {
      setSession(session);
      setUser(session?.user ?? null);
    }

    return {
      session,
      error,
    };
  }, []);

  /*
   * ============================================
   * REFRESH USER
   * ============================================
   */

  const refreshUser = useCallback(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error) {
      setUser(user);
    }

    return {
      user,
      error,
    };
  }, []);

  /*
   * ============================================
   * CONTEXT VALUE
   * ============================================
   */

  const value: AuthContextType = {
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/*
 * ============================================
 * useAuth
 * ============================================
 */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider",
    );
  }

  return context;
}