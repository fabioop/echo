/**
 * Modules dependencies.
 */

import { Article } from '@/types/article';
import type { User } from '@/types/user';
import { delayResponse } from '@/utils/requests';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';
import { useCallback, useEffect } from 'react';
/**
 * Export `useUser` hook.
 */

export const useUser = () => {
  const { user, isLoading, error } = useAuth0User();
  const isAdmin = (user as User)?.assigned_roles?.includes('admin') ?? false;

  useEffect(() => {
    if (!user) {
      return;
    }

    const isUserInLocalStorage = localStorage.getItem(`user-${user.nickname}`);

    if (isUserInLocalStorage) {
      return;
    }

    localStorage.setItem(`user-${user.nickname}`, JSON.stringify(user));
  }, [user]);

  /**
   * Get local user
   */
  const getLocalUser = useCallback(async (nickname: string) => {
    try {
      await delayResponse();

      const user = localStorage.getItem(`user-${nickname}`);

      return {
        data: {
          user: user ? (JSON.parse(user) as User) : null,
        },
      };
    } catch (error) {
      return { error: 'Failed to get user' };
    }
  }, []);

  return {
    error,
    getLocalUser,
    isAdmin,
    isLoading,
    user,
  };
};
