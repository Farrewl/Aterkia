import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

const toAppUser = (authUser, profile) => {
  const meta = authUser.user_metadata || {};
  const avatar =
    profile?.avatar_url ||
    meta.avatar_url ||
    meta.picture ||
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
        } catch (e) {
          setError(e.message || 'Unable to load your profile.');
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
      } catch (e) {
        setError(e.message || 'Unable to load your profile.');
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (role === 'admin') return user.role === 'admin';
    if (role === 'user') return user.role === 'user' || user.role === 'admin';
    return false;
  }, [user]);

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAuthenticated: !!session?.user, error, hasRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthContext;
