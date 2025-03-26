/**
 * Modules dependencies.
 */
import styles from './button.module.css';

/**
 * Props type.
 */

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ariaLabel: string;
  isAction?: boolean;
};

/**
 * Export `Button` component.
 */

export const Button = ({ children, ariaLabel, className, isAction, ...props }: Props) => {
  return (
    <button aria-label={ariaLabel} data-is-action={isAction} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};
