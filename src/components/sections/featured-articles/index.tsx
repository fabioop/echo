/**
 * Modules dependencies.
 */

import { FeaturedCard } from '@/components/core/cards/featured-card';
import { ErrorMessage } from '@/components/core/error';
import { Loading } from '@/components/core/loading';
import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import type { Article } from '@/types/article';
import { errorNotification, successNotification } from '@/utils/notifications';
import { useEffect, useState } from 'react';
import styles from './featured-articles.module.css';

/**
 * Export `FeaturedArticles` component.
 */

export const FeaturedArticles = () => {
	const { isAdmin, user } = useUser();
	const { getFeaturedArticles, deleteArticle } = useArticles();

	const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getFeaturedArticles(1, isAdmin);
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
	}, [getFeaturedArticles, isAdmin]);

	const handleDelete = async (slug: string) => {
		try {
			const { success } = await deleteArticle(slug);

			if (success) {
				successNotification('Article deleted successfully');
			}
		} catch (error) {
			errorNotification(error as string);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (featuredArticles.length === 0) {
		return <ErrorMessage message='No featured articles found' />;
	}

	return (
		<div className={styles.grid}>
			{featuredArticles.map((article) => (
				<FeaturedCard
					key={article.id}
					article={article}
					isAdmin={isAdmin}
					userNickname={user?.nickname ?? ''}
					handleDelete={handleDelete}
				/>
			))}
		</div>
	);
};
