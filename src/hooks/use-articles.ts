/**
 * Modules dependencies
 */

import type { Article } from '@/types/article';
import { delayResponse } from '@/utils/requests';
import { useCallback } from 'react';

/**
 * Constants
 */
const ARTICLE_STORAGE_KEY = 'article';
const ARTICLES_PER_PAGE = 8;

/**
 * Export `useArticle` hook.
 */

export const useArticles = () => {
	/**
	 * Get articles from local storage
	 */
	const getStorageArticles = useCallback((isDraft = false, categories: string[] | null = null) => {
		const storageItems = Object.values(localStorage).map((item) => JSON.parse(item));
		const allArticles = storageItems.filter((item) => item.itemType === ARTICLE_STORAGE_KEY);
		const filteredArticles = isDraft ? allArticles : allArticles.filter((article) => article.status !== 'draft');

		if (categories) {
			return filteredArticles.filter((article) => categories.includes(article.category));
		}

		return filteredArticles;
	}, []);

	/**
	 * Create article
	 */
	const createArticle = useCallback(async (article: Article) => {
		try {
			await delayResponse();

			localStorage.setItem(
				`${ARTICLE_STORAGE_KEY}-${article.slug}`,
				JSON.stringify({
					...article,
					createdAt: new Date().toISOString(),
					itemType: ARTICLE_STORAGE_KEY,
				}),
			);

			return { success: true };
		} catch (error) {
			return { error: 'Failed to create article' };
		}
	}, []);

	/**
	 * Get article
	 */
	const getArticle = useCallback(async (slug: string) => {
		try {
			await delayResponse();

			const article = localStorage.getItem(`${ARTICLE_STORAGE_KEY}-${slug}`);

			return {
				data: {
					article: article ? (JSON.parse(article) as Article) : null,
				},
			};
		} catch (error) {
			return { error: 'Failed to get article' };
		}
	}, []);

	/**
	 * Update article
	 */
	const updateArticle = useCallback(async (article: Article) => {
		try {
			await delayResponse();

			localStorage.setItem(
				`${ARTICLE_STORAGE_KEY}-${article.slug}`,
				JSON.stringify({
					...article,
					updatedAt: new Date().toISOString(),
				}),
			);

			return { success: true };
		} catch (error) {
			return { error: 'Failed to update article' };
		}
	}, []);

	/**
	 * Delete article
	 */
	const deleteArticle = useCallback(async (slug: string) => {
		try {
			await delayResponse(0);

			localStorage.removeItem(`${ARTICLE_STORAGE_KEY}-${slug}`);

			return { success: true };
		} catch (error) {
			return { error: 'Failed to delete article' };
		}
	}, []);

	/**
	 * Get articles
	 */
	const getArticles = useCallback(
		async (page = 1, isDraft = false, categories: string[] | null = null, userNickname?: string) => {
			try {
				await delayResponse();

				let articles = getStorageArticles(isDraft, categories);

				if (userNickname) {
					articles = articles.filter((article) => article.authorNickname === userNickname);
				}

				const filteredArticles = articles.filter((article) => !article.isFeatured);
				const paginatedArticles = filteredArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
				const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

				return {
					data: {
						articles: paginatedArticles,
						totalPages,
						currentPage: page,
					},
				};
			} catch (error) {
				return { error: 'Failed to get articles' };
			}
		},
		[getStorageArticles],
	);

	/**
	 * Get featured articles
	 */
	const getFeaturedArticles = useCallback(
		async (page = 1, isDraft = false) => {
			try {
				await delayResponse();

				const articles = getStorageArticles(isDraft);
				const featuredArticles = articles.filter((article) => article.isFeatured);
				const paginatedFeaturedArticles = featuredArticles.slice(
					(page - 1) * ARTICLES_PER_PAGE,
					page * ARTICLES_PER_PAGE,
				);

				const totalPages = Math.ceil(featuredArticles.length / ARTICLES_PER_PAGE);
				return {
					data: {
						articles: paginatedFeaturedArticles,
						totalPages,
						currentPage: page,
					},
				};
			} catch (error) {
				return { error: 'Failed to get featured articles' };
			}
		},
		[getStorageArticles],
	);

	/**
	 * Get categories
	 */
	const getCategories = useCallback(async () => {
		try {
			await delayResponse();

			const categories = ['Marketing', 'Design', 'Engineering', 'Product', 'Business'];

			return { data: categories };
		} catch (error) {
			return { error: 'Failed to get categories' };
		}
	}, []);

	return {
		createArticle,
		deleteArticle,
		getArticle,
		getArticles,
		getCategories,
		getFeaturedArticles,
		updateArticle,
	};
};
