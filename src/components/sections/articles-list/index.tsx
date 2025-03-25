import { useArticlesList } from '@/hooks/use-articles-list';
import styles from '@/styles/ArticlesList.module.css';
import type { Article } from '@/types/article';
import Link from 'next/link';

/**
 * Props type.
 */

type Props = {
	userNickname?: string;
};

/**
 * Export `ArticlesList` component.
 */

export const ArticlesList = ({ userNickname }: Props) => {
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
		<div>
			<>
				<ul>
					<li>
						<button type='button' onClick={() => setSelectedCategories(null)}>
							All
						</button>
					</li>

					{categories.map((category) => (
						<li key={category}>
							<label>
								<input
									type='checkbox'
									checked={selectedCategories?.includes(category)}
									onChange={() => {
										if (selectedCategories) {
											setSelectedCategories(
												selectedCategories.includes(category)
													? selectedCategories.filter((c) => c !== category)
													: [...selectedCategories, category],
											);
										} else {
											setSelectedCategories([category]);
										}
									}}
								/>
								{category}
							</label>
						</li>
					))}
				</ul>

				{isLoading ? (
					<div>
						<p>Loading...</p>
					</div>
				) : articles.length > 0 ? (
					<>
						{articles.map((article) => {
							const isAuthorized = user?.nickname === article.authorNickname && isAdmin;

							return (
								<div
									key={article.id}
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '10px',
										backgroundColor: 'lightgray',
										alignItems: 'flex-start',
										marginBottom: '10px',
									}}
								>
									<h2>{article.category}</h2>

									<Link href={`/${article.authorNickname}/${article.slug}`}>
										<h2>{article.title}</h2>
									</Link>

									{isAuthorized && (
										<Link href={`/article/edit/${article.slug}`}>
											<button type='button'>Edit</button>
										</Link>
									)}

									{isAuthorized && (
										<button type='button' onClick={() => handleDelete(article.slug)}>
											Delete
										</button>
									)}

									<p>{article.content}</p>
								</div>
							);
						})}

						{pagination.currentPage < pagination.totalPages && articles.length > 0 && (
							<button type='button' onClick={() => handleLoadMore()}>
								Load more
							</button>
						)}
					</>
				) : (
					<p>No articles found. Create one!</p>
				)}
			</>
		</div>
	);
};
