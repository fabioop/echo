/**
 * Modules dependencies.
 */

import styles from './footer.module.css';

/**
 * Export `Footer` component.
 */

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>Echo news app. Your voice, amplified.</div>
      <div>{`© ${new Date().getFullYear()} All rights reserved.`}</div>
    </footer>
  );
};
