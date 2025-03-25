/**
 * Modules dependencies.
 */

import { ArticleForm } from '@/components/forms/article-form';
import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import styles from '@/styles/Article.module.css';
import type { Article, ArticleResponse } from '@/types/article';
import { errorNotification } from '@/utils/notifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Export `EditArticle` component.
 */

export default function EditArticle() {
	const router = useRouter();
	const { slug } = router.query as { slug: string };

	const { user } = useUser();

	const { getArticle } = useArticles();

	const [article, setArticle] = useState<Article | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (!slug) {
			return;
		}

		(async () => {
			setIsLoading(true);

			try {
				const { data } = await getArticle(slug);
				const article = data?.article;

				if (article) {
					setArticle(article);
					setIsAuthorized(user?.nickname === article.authorNickname);
				}

				setIsLoading(false);
			} catch (error) {
				errorNotification(error as string);
				setIsLoading(false);
			}
		})();
	}, [slug, getArticle, user?.nickname]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Edit Article</h1>

			{isLoading && <div className={styles.loading}>Loading article...</div>}

			{!isLoading && !isAuthorized && (
				<>
					<div className={styles.error}>You are not authorized to edit this article</div>

					<Link href='/'>Go back to home</Link>
				</>
			)}

			{error && <div className={styles.error}>{error}</div>}

			{article && isAuthorized && !isLoading && <ArticleForm article={article} isEdit />}

			{!error && !article && !isLoading && <div className={styles.message}>No article found</div>}
		</div>
	);
}
