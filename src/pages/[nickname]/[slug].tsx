/**
 * Modules dependencies.
 */

import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import type { Article } from '@/types/article';
import type { User } from '@/types/user';
import { errorNotification, successNotification } from '@/utils/notifications';
import Link from 'next/link';
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
		return <div>Loading...</div>;
	}

	if (!article) {
		return <div>Article not found</div>;
	}

	return (
		<div>
			<h1>{article.title}</h1>
			<div>{article.content}</div>
			<Link href={`/${article.authorNickname}`}>{article.authorNickname}</Link>

			{isAuthorized && (
				<Link href={`/article/edit/${slug}`}>
					<button type='button'>Edit</button>
				</Link>
			)}

			{isAuthorized && (
				<button type='button' onClick={handleDelete}>
					Delete
				</button>
			)}
		</div>
	);
}
