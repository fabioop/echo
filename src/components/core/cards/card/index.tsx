/**
 * Modules dependencies.
 */

import { Button } from '@/components/core/button';
import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import type { Article } from '@/types/article';
import { formatDate } from '@/utils/date';
import { Pencil, Trash } from 'lucide-react';
import styles from '../cards.module.css';

/**
 * Props type.
 */

type Props = {
	article: Article;
	isAuthorized: boolean;
	handleDelete: (slug: string) => void;
};

/**
 * Export `Card` component.
 */

export const Card = ({ article, isAuthorized, handleDelete }: Props) => {
	const { title, smallDescription, category, slug, imageUrl } = article;

	return (
		<div className={styles.card}>
			<div className={styles.image}>
				<Image src={imageUrl} alt={title} />
			</div>

			<div className={styles.content}>
				<div className={styles.header}>
					<h3>{title}</h3>

					<div className={styles.meta}>
						<time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
						&#x2022;
						<Link
							ariaLabel='View author profile'
							href={`/${article.authorNickname}`}
							label={`@${article.authorNickname}`}
						/>
					</div>

					<span className={styles.category}>{category}</span>
				</div>

				<p>{smallDescription}</p>

				<div className={styles.actions}>
					<Link ariaLabel='Read more' href={`/${article.authorNickname}/${slug}`} isButton label='Read more' />

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
