import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = useCallback(
    async (credentialResponse) => {
      return loginWithGoogle(credentialResponse.credential);
    },
    [loginWithGoogle]
  );

  return { handleGoogleLogin };
};