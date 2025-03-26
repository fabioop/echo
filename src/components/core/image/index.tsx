/**
 * Modules dependencies.
 */

import NextImage from 'next/image';

/**
 * Props type.
 */

type Props = {
  src?: string;
  alt: string;
  className?: string;
};

/**
 * Export `Image` component.
 */

export const Image = ({ src, alt, className }: Props) => {
  return (
    <NextImage
      src={src ?? '/images/placeholder.svg'}
      alt={alt}
      fill
      style={{ objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
      className={className}
    />
  );
};
