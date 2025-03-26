/**
 * Modules dependencies.
 */

import { ErrorMessage } from '@/components/core/error';
import { Link } from '@/components/core/link';
import { Loading } from '@/components/core/loading';
import { SEO } from '@/components/core/seo';
import { ArticleForm } from '@/components/forms/article-form';
import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import styles from '@/styles/article.module.css';
import type { Article } from '@/types/article';
import { errorNotification } from '@/utils/notifications';
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
				setError(error as string);
				errorNotification(error as string);
				setIsLoading(false);
			}
		})();
	}, [slug, getArticle, user?.nickname]);

	return (
		<>
			<SEO title='Edit Article' description='Edit your article' canonical={`/article/edit/${slug}`} />

			<div className={styles.container}>
				<h1 className={styles.title}>Edit Article</h1>

				{isLoading && <Loading message='Loading article...' />}

				{!isLoading && !isAuthorized && (
					<>
						<ErrorMessage message='You are not authorized to edit this article' />

						<Link ariaLabel='Go back to home' href='/' label='Go back to home' />
					</>
				)}

				{error && <ErrorMessage message={error} />}

				{article && isAuthorized && !isLoading && <ArticleForm article={article} isEdit />}

				{!error && !article && !isLoading && <ErrorMessage message='No article found' />}
			</div>
		</>
	);
}
