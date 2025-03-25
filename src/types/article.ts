/**
 *  Export `Article` type.
 */

export type Article = {
	authorNickname: string;
	category: string;
	content: string;
	createdAt: string;
	id: string;
	imageUrl?: string;
	isFeatured: boolean;
	itemType: string;
	slug: string;
	smallDescription?: string;
	status: 'draft' | 'published';
	title: string;
	updatedAt: string;
};

/**
 * Export `ArticleResponse` type
 */

export type ArticleResponse = {
	success: boolean;
	data: Article | null;
};

/**
 * Export `ArticlesResponse` type
 */

export type ArticlesResponse = {
	success: boolean;
	data: {
		articles: Article[];
		totalPages: number;
		currentPage: number;
	};
};
