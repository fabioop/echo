/**
 * Modules dependecies.
 */

import { ArticlesList } from '@/components/sections/articles-list';
import { FeaturedArticles } from '@/components/sections/featured-articles';
import Head from 'next/head';

/**
 * Export `Home` page component.
 */

export default function Home() {
	return (
		<>
			<Head>
				<title>Echo news app</title>
				<meta name='description' content='Echo news app. Your voice, amplified.' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<FeaturedArticles />

			<ArticlesList />
		</>
	);
}
