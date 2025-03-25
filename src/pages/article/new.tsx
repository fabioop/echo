/**
 * Modules dependencies.
 */

import { ArticleForm } from '@/components/forms/article-form';
import styles from '@/styles/Article.module.css';

/**
 * Export `NewArticle` component.
 */

export default function NewArticle() {
	return (
		<>
			<h1 className={styles.title}>Create New Article</h1>

			<ArticleForm />
		</>
	);
}
