/**
 * Modules dependencies.
 */

import { AlertCircle } from 'lucide-react';
import styles from './error.module.css';

/**
 * Export `ErrorMessage` component.
 */
export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.container}>
      <AlertCircle className={styles.icon} size={24} />
      <p className={styles.message}>{message}</p>
    </div>
  );
};
