/**
 * Modules dependecies.
 */

import { SEO } from '@/components/core/seo';
import { ArticlesList } from '@/components/sections/articles-list';
import { FeaturedArticles } from '@/components/sections/featured-articles';

/**
 * Export `Home` page component.
 */

export default function Home() {
  return (
    <>
      <SEO title='Home' description='Echo news app. Your voice, amplified.' canonical='/' />

      <FeaturedArticles />

      <ArticlesList title='Explore news articles' />
    </>
  );
}
