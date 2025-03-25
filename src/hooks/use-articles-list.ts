/**
 * Modules dependencies.
 */

import type { Article } from '@/types/article';
import { errorNotification, successNotification } from '@/utils/notifications';
import { useCallback, useEffect, useState } from 'react';
import { useArticles } from './use-articles';
import { useUser } from './use-user';

/**
 * Export `useArticlesList` hook.
 */

export const useArticlesList = (userNickname?: string) => {
	const { user, isAdmin } = useUser();
	const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState<Article[]>([]);
	const { getArticles, getCategories, deleteArticle } = useArticles();
	const [categories, setCategories] = useState<string[]>([]);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 0,
	});

	/**
	 * Fetch articles.
	 */
	const fetchArticles = useCallback(async () => {
		setIsLoading(true);

		try {
			const { data: articles } = await getArticles(1, isAdmin, selectedCategories, userNickname);

			const { data: categories } = await getCategories();

			if (articles) {
				setArticles(articles.articles);
				setPagination({
					currentPage: articles.currentPage,
					totalPages: articles.totalPages,
				});
			}

			if (categories) {
				setCategories(categories);
			}
		} catch (error) {
			errorNotification(error as string);
		} finally {
			setIsLoading(false);
		}
	}, [getArticles, getCategories, isAdmin, selectedCategories, userNickname]);

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	/**
	 * Handle delete article.
	 */
	const handleDelete = async (slug: string) => {
		const response = await deleteArticle(slug);

		if (response.success) {
			const { data: articles } = await getArticles(1, isAdmin);

			if (articles) {
				setArticles(articles.articles);
				setPagination({
					currentPage: articles.currentPage,
					totalPages: articles.totalPages,
				});
			}

			successNotification('Article deleted successfully');
		} else {
			errorNotification('Failed to delete article');
		}
	};

	/**
	 * Handle load more articles.
	 */
	const handleLoadMore = async () => {
		setPagination({
			currentPage: pagination.currentPage + 1,
			totalPages: pagination.totalPages,
		});

		const { data: loadedArticles } = await getArticles(pagination.currentPage + 1, isAdmin);

		if (loadedArticles) {
			setArticles([...articles, ...loadedArticles.articles]);
		}
	};

	return {
		articles,
		categories,
		isLoading,
		pagination,
		selectedCategories,
		setSelectedCategories,
		handleDelete,
		handleLoadMore,
		user,
		isAdmin,
	};
};
