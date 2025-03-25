/**
 * Modules dependecies.
 */

import type { UserContext, UserProfile } from '@auth0/nextjs-auth0/client';

/**
 * User type.
 */

export type User = UserProfile & {
	assigned_roles?: string[];
};

// TODO: Add user type to auth0 user type
