/**
 * Modules dependencies.
 */

import styles from '@/components/core/button/button.module.css';
import NextLink from 'next/link';

/**
 * Props type.
 */

type Props = {
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  href: string;
  isButton?: boolean;
  isAction?: boolean;
  label?: string;
};

/**
 * Export `Link` component.
 */

export const Link = ({ href, children, className, ariaLabel, isButton = false, isAction = false, label }: Props) => {
  return (
    <NextLink
      aria-label={ariaLabel}
      data-is-button={isButton}
      data-is-action={isAction}
      className={isButton ? `${styles.button} ${className}` : className}
      href={href}
    >
      {label || children}
    </NextLink>
  );
};
