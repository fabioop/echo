/**
 * Modules dependencies.
 */

import { useArticles } from '@/hooks/use-articles';
import type { Article } from '@/types/article';
import { errorNotification } from '@/utils/notifications';
import { useEffect, useState } from 'react';

/**
 * Export `FeaturedArticle` component.
 */

const FeaturedArticle = ({ article }: { article: Article }) => {
	return (
		<div>
			<h1>Featured {article.title}</h1>
		</div>
	);
};

/**
 * Export `FeaturedArticles` component.
 */

export const FeaturedArticles = () => {
	const { getFeaturedArticles } = useArticles();

	const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getFeaturedArticles();
				const articles = data?.articles;

				if (articles) {
					setFeaturedArticles(articles);
				}
			} catch (error) {
				errorNotification(error as string);
			}
		})();
	}, [getFeaturedArticles]);

	return (
		<div>
			{featuredArticles.map((article) => (
				<FeaturedArticle key={article.id} article={article} />
			))}
		</div>
	);
};
