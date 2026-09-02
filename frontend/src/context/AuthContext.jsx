import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

const toAppUser = (authUser, profile) => {
  const meta = authUser.user_metadata || {};
  const avatar =
    profile?.avatar_url ||
    meta.avatar_url ||
    meta.picture ||
    // Google kadang menaruh avatar di identities[0].identity_data
    (Array.isArray(authUser.identities) && authUser.identities[0]?.identity_data?.avatar_url) ||
    (Array.isArray(authUser.identities) && authUser.identities[0]?.identity_data?.picture) ||
    null;

  return {
    id: authUser.id,
    email: authUser.email,
    name: profile?.name || meta.full_name || meta.name || authUser.email,
    avatar,
    role: profile?.role || 'user',
    division: profile?.division || '',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser || !supabase) return null;
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('name, avatar_url, role, division')
      .eq('id', authUser.id)
      .maybeSingle();

    // Jangan lempar error: degradasi ke metadata auth supaya `user` selalu utuh
    // (contoh: baris profile belum ada / RLS belum aktif → avatar tetap tampil via metadata).
    const profile = profileError ? null : data;
    return toAppUser(authUser, profile);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured yet.');
      setIsLoading(false);
      return undefined;
    }

    let active = true;
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (!active) return;
      setSession(currentSession);
      if (currentSession?.user) {
        try {
          setUser(await loadProfile(currentSession.user));
        } catch (profileError) {
          setError(profileError.message || 'Unable to load your profile.');
        }
      }
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession?.user) {
        setUser(null);
        return;
      }

      try {
        setUser(await loadProfile(nextSession.user));
      } catch (profileError) {
        setError(profileError.message || 'Unable to load your profile.');
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const login = async (email, password) => {
    setError(null);
    if (!supabase) return { success: false, error: 'Supabase is not configured yet.' };
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      return { success: false, error: loginError.message };
    }
    return { success: true };
  };

  const register = async ({ email, password, name }) => {
    setError(null);
    if (!supabase) return { success: false, error: 'Supabase is not configured yet.' };
    const { error: registerError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (registerError) {
      setError(registerError.message);
      return { success: false, error: registerError.message };
    }
    return { success: true };
  };

  const loginWithGoogle = async () => {
    setError(null);
    if (!supabase) return { success: false, error: 'Supabase is not configured yet.' };
    const { error: loginError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/login` },
    });
    if (loginError) {
      setError(loginError.message);
      return { success: false, error: loginError.message };
    }
    return { success: true };
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  const updateProfile = async ({ name, division }) => {
    setError(null);
    if (!supabase || !session?.user) return { success: false, error: 'You are not signed in.' };
    const { data, error: updateError } = await supabase
      .from('profiles')
      .update({ name, division: division || null, updated_at: new Date().toISOString() })
      .eq('id', session.user.id)
      .select('name, avatar_url, role, division')
      .single();

    if (updateError) {
      setError(updateError.message);
      return { success: false, error: updateError.message };
    }
    setUser(toAppUser(session.user, data));
    return { success: true };
  };

  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (role === 'admin') return user.role === 'admin';
    if (role === 'user') return user.role === 'user' || user.role === 'admin';
    return false;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      accessToken: session?.access_token || null,
      isLoading,
      isAuthenticated: !!session?.user,
      error,
      hasRole,
      login,
      register,
      loginWithGoogle,
      logout,
      updateProfile,
      clearError: () => setError(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
