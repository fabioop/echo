/**
 * Modules dependencies.
 */

import { SEO } from '@/components/core/seo';
import { ArticleForm } from '@/components/forms/article-form';
import styles from '@/styles/article.module.css';

/**
 * Export `NewArticle` component.
 */

export default function NewArticle() {
	return (
		<>
			<SEO title='Create New Article' description='Create a new article' canonical='/article/new' />

			<h1 className={styles.title}>Create New Article</h1>

			<ArticleForm />
		</>
	);
}
