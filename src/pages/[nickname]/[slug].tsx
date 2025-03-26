/**
 * Modules dependencies.
 */

import { Button } from '@/components/core/button';
import { ErrorMessage } from '@/components/core/error';
import { Header } from '@/components/core/header';
import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import { Loading } from '@/components/core/loading';
import { SEO } from '@/components/core/seo';
import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import styles from '@/styles/article.module.css';
import type { Article } from '@/types/article';
import type { User } from '@/types/user';
import { formatDate } from '@/utils/date';
import { errorNotification, successNotification } from '@/utils/notifications';
import { Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Props type.
 */

type Props = {
	article: Article | null;
};

/**
 * Export `ArticlePage` component.
 */

export default function ArticlePage() {
	const router = useRouter();
	const { nickname, slug } = router.query as { nickname: string; slug: string };

	const { user: userAuth, getLocalUser } = useUser();
	const { getArticle, deleteArticle } = useArticles();
	const [article, setArticle] = useState<Article | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (!slug) {
			return;
		}

		(async () => {
			try {
				const { data } = await getArticle(slug);
				const article = data?.article;

				if (article) {
					setArticle(article);
				}

				const { data: userData } = await getLocalUser(nickname);
				const user = userData?.user;

				if (user) {
					setUser(user);
				}

				setIsAuthorized(userAuth?.nickname === article?.authorNickname);

				setIsLoading(false);
			} catch (error) {
				errorNotification(error as string);
				setIsLoading(false);
			}
		})();
	}, [slug, getArticle, userAuth?.nickname, getLocalUser, nickname]);

	const handleDelete = async () => {
		try {
			const { success } = await deleteArticle(slug);

			if (success) {
				router.push(`/${nickname}`);
				successNotification('Article deleted successfully');
			}
		} catch (error) {
			errorNotification(error as string);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (!article) {
		return <ErrorMessage message='Article not found' />;
	}

	return (
		<>
			<SEO title={article.title} description={article.smallDescription} canonical={`/${nickname}/${slug}`} />

			<div>
				<div className={styles.featuredImage}>
					<Image src={article.imageUrl} alt={article.title} />
				</div>

				<article className={styles.content}>
					<div className={styles.actions}>
						{isAuthorized && (
							<>
								<Link ariaLabel={`Edit article: ${article.title}`} href={`/article/edit/${slug}`} isButton isAction>
									<Pencil size={16} />
								</Link>

								<Button ariaLabel={`Delete article ${article.title}`} type='button' onClick={handleDelete} isAction>
									<Trash size={16} />
								</Button>
							</>
						)}
					</div>

					<div>
						<Header
							title={article.title}
							createdAt={article.createdAt}
							authorNickname={article.authorNickname}
							category={article.category}
						/>

						<div className={styles.body}>{article.content}</div>
					</div>
				</article>
			</div>
		</>
	);
}
