/**
 * Modules dependecies.
 */

import type { UserProfile } from '@auth0/nextjs-auth0/client';

/**
 * User type.
 */

export type User = UserProfile & {
  assigned_roles?: string[];
};
