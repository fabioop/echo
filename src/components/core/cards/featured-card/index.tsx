/**
 * Modules dependencies.
 */

import { Header } from '@/components/core/header';
import { Image } from '@/components/core/image';
import { Link } from '@/components/core/link';
import type { Article } from '@/types/article';
import styles from '../cards.module.css';

/**
 * Props type.
 */

type Props = {
	article: Article;
	isFirst: boolean;
};

/**
 * Export `FeaturedCard` component.
 */

export const FeaturedCard = ({ article, isFirst }: Props) => {
	const { title, smallDescription, authorNickname, slug, imageUrl, category } = article;

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
				</div>
			</div>
		</div>
	);
};
