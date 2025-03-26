/**
 * Modules dependencies.
 */

import { NextSeo } from 'next-seo';

/**
 * Constants.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * Props.
 */

type Props = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
};

/**
 * Export `SEO` component.
 */

export const SEO = ({ title, description, canonical, image }: Props) => {
  return (
    <NextSeo
      title={`${title} - Echo news app`}
      description={description}
      canonical={`${baseUrl}${canonical}`}
      openGraph={{
        title,
        description,
        url: canonical,
        images: [
          {
            url: image || '',
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico',
        },
      ]}
    />
  );
};
