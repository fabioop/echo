/**
 * Modules dependencies.
 */

import { Button } from '@/components/core/button';
import { Card } from '@/components/core/cards/card';
import { ErrorMessage } from '@/components/core/error';
import { Checkbox } from '@/components/core/inputs/checkbox';
import { Loading } from '@/components/core/loading';
import { useArticlesList } from '@/hooks/use-articles-list';
import styles from './articles-list.module.css';

/**
 * `CategoriesList` props type.
 */

type CategoriesListProps = {
	categories: string[];
	selectedCategories: string[] | null;
	setSelectedCategories: (categories: string[] | null) => void;
};

/**
 * `CategoriesList` component.
 */

const CategoriesList = ({ categories, selectedCategories, setSelectedCategories }: CategoriesListProps) => {
	const handleCategoryChange = (category: string) => {
		if (selectedCategories) {
			const newCategories = selectedCategories.includes(category)
				? selectedCategories.filter((c) => c !== category)
				: [...selectedCategories, category];
			setSelectedCategories(newCategories.length > 0 ? newCategories : null);
		} else {
			setSelectedCategories([category]);
		}
	};

	return (
		<ul className={styles.filters}>
			<li>
				<Checkbox label='All' checked={selectedCategories === null} onChange={() => setSelectedCategories(null)} />
			</li>

			{categories.map((category) => (
				<li key={category}>
					<Checkbox
						label={category}
						checked={selectedCategories?.includes(category) ?? false}
						onChange={() => handleCategoryChange(category)}
					/>
				</li>
			))}
		</ul>
	);
};

/**
 * `ArticlesList` props type.
 */

type Props = {
	userNickname?: string;
	title: string;
};

/**
 * Export `ArticlesList` component.
 */

export const ArticlesList = ({ userNickname, title }: Props) => {
	const {
		articles,
		categories,
		isLoading,
		pagination,
		selectedCategories,
		setSelectedCategories,
		handleDelete,
		handleLoadMore,
		user,
		isAdmin,
	} = useArticlesList(userNickname);

	return (
		<section className={styles.section}>
			<h2>{title}</h2>

			<div className={styles.container}>
				<CategoriesList
					categories={categories}
					selectedCategories={selectedCategories}
					setSelectedCategories={setSelectedCategories}
				/>

				{isLoading && <Loading />}

				{!isLoading && articles.length > 0 && (
					<div className={styles.grid}>
						{articles.map((article) => (
							<Card
								key={article.id}
								article={article}
								isAuthorized={user?.nickname === article.authorNickname && isAdmin}
								handleDelete={handleDelete}
							/>
						))}

						{pagination.currentPage < pagination.totalPages && articles.length > 0 && (
							<Button ariaLabel='Load more articles' type='button' onClick={() => handleLoadMore()}>
								Load more
							</Button>
						)}
					</div>
				)}

				{!isLoading && articles.length === 0 && (
					<ErrorMessage message={`No articles found. ${isAdmin ? 'Create one!' : ''}`} />
				)}
			</div>
		</section>
	);
};
