/**
 * Modules dependencies.
 */

import { toast } from 'react-toastify';

/**
 * Export `errorNotification` function.
 */

export const errorNotification = (error: string) => {
  toast.error(error);
};

/**
 * Export `successNotification` function.
 */

export const successNotification = (success: string) => {
  toast.success(success);
};
