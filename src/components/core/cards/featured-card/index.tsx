/**
 * Modules dependencies.
 */

import { Button } from '@/components/core/button';
import { Header } from '@/components/core/header';
import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import type { Article } from '@/types/article';
import { Pencil, Trash } from 'lucide-react';
import styles from '../cards.module.css';

/**
 * Props type.
 */

type Props = {
	article: Article;
	isAdmin: boolean;
	userNickname?: string;
	handleDelete: (slug: string) => void;
};

/**
 * Export `FeaturedCard` component.
 */

export const FeaturedCard = ({ article, isAdmin, userNickname, handleDelete }: Props) => {
	const { title, smallDescription, authorNickname, slug, imageUrl, category } = article;

	const isAuthorized = userNickname === article.authorNickname && isAdmin;

	return (
		<div className={`${styles.card} ${styles.featuredCard}`}>
			<div className={styles.image}>
				<Image src={imageUrl} alt={title} />
			</div>

			<div className={styles.content}>
				<div className={styles.header}>
					<Header
						title={title}
						createdAt={article.createdAt}
						authorNickname={article.authorNickname}
						category={category}
					/>
				</div>

				<p>{smallDescription}</p>

				<div className={styles.actions}>
					<Link ariaLabel='Read more' href={`/${authorNickname}/${slug}`} isButton label='Read more' />

					{isAuthorized && (
						<>
							<Link ariaLabel={`Edit article: ${title}`} href={`/article/edit/${slug}`} isButton isAction>
								<Pencil size={16} />
							</Link>

							<Button ariaLabel={`Delete article ${title}`} type='button' onClick={() => handleDelete(slug)} isAction>
								<Trash size={16} />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
