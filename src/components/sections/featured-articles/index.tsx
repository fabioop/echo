/**
 * Modules dependencies.
 */

import { FeaturedCard } from '@/components/core/cards/featured-card';
import { ErrorMessage } from '@/components/core/error';
import { Loading } from '@/components/core/loading';
import { useArticles } from '@/hooks/use-articles';
import type { Article } from '@/types/article';
import { errorNotification } from '@/utils/notifications';
import { useEffect, useState } from 'react';
import styles from './featured-articles.module.css';
/**
 * Export `FeaturedArticles` component.
 */

export const FeaturedArticles = () => {
	const { getFeaturedArticles } = useArticles();

	const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getFeaturedArticles();
				const articles = data?.articles;

				if (articles) {
					setFeaturedArticles(articles);
				}

				setIsLoading(false);
			} catch (error) {
				errorNotification(error as string);
				setIsLoading(false);
			}
		})();
	}, [getFeaturedArticles]);

	return (
		<div className={styles.grid}>
			{isLoading && <Loading />}

			{!isLoading && featuredArticles.length === 0 && <ErrorMessage message='No featured articles found' />}

			{!isLoading &&
				featuredArticles.length > 0 &&
				featuredArticles.map((article, index) => (
					<FeaturedCard key={article.id} article={article} isFirst={index === 0} />
				))}
		</div>
	);
};
