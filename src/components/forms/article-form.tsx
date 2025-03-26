/**
 * Modules dependencies.
 */

import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { useArticles } from '@/hooks/use-articles';
import { useUser } from '@/hooks/use-user';
import type { Article } from '@/types/article';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './article-form.module.css';

/*
 * `Props` type.
 */

type Props = {
	article?: Article | null;
	isEdit?: boolean;
};

/**
 * `Slugify` util.
 */

const slugify = (title: string) => {
	return title
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
};

/**
 * Convert image to base64
 */
const convertImageToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
};

/**
 *  Export `ArticleForm` component
 */

// TODO: bug when uploading image?
// TODO: convert inputs to component

export const ArticleForm = ({ article, isEdit = false }: Props) => {
	const { user } = useUser();
	const { createArticle, updateArticle, getCategories } = useArticles();

	const [isSuccess, setIsSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(article?.imageUrl || null);

	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const { data: categories } = await getCategories();

				if (categories) {
					setCategories(categories);
				}
			} catch (error) {
				setError(error as string);
			}
		})();
	}, [getCategories]);

	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
		setValue,
	} = useForm<Article>({
		defaultValues: article ?? {},
	});

	const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			const base64Image = await convertImageToBase64(file);
			setImagePreview(base64Image);
			setValue('imageUrl', base64Image);
		} catch (error) {
			setError('Failed to process image');
		}
	};

	const onSubmit = async (data: Article) => {
		const articleData = {
			...data,
			authorNickname: user?.nickname ?? '',
			slug: isEdit && article ? article.slug : slugify(data.title),
		};

		try {
			setIsSubmitting(true);

			const response = (await (isEdit ? updateArticle(articleData) : createArticle(articleData))) as {
				success: boolean;
			};

			if (response.success) {
				setIsSubmitting(false);
				setIsSuccess(true);
				toast.success(`Article ${isEdit ? 'updated' : 'created'} successfully!`);
				setImagePreview(null);

				if (isEdit) {
					for (const [key, value] of Object.entries(articleData)) {
						setValue(key as keyof Article, value);
					}
				} else {
					reset();
				}
			}
		} catch (error) {
			toast.error(`Failed to ${isEdit ? 'update' : 'create'} article`);
			setError(error as string);
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.formGroup}>
				<label htmlFor='title' className={styles.label}>
					Title
				</label>
				<input
					type='text'
					placeholder='Title'
					{...register('title', {
						required: 'Title is required',
						minLength: { value: 5, message: 'Title must be at least 5 characters long' },
					})}
					className={styles.input}
				/>
				{errors.title && <p className={styles.error}>{errors.title.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='smallDescription' className={styles.label}>
					Small Description
				</label>
				<input
					type='text'
					placeholder='Small Description'
					{...register('smallDescription', {
						required: 'Small description is required',
						minLength: { value: 10, message: 'Small description must be at least 10 characters long' },
					})}
					className={styles.input}
				/>
				{errors.smallDescription && <p className={styles.error}>{errors.smallDescription.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='image' className={styles.label}>
					Image
				</label>
				<input type='file' accept='image/*' onChange={handleImageChange} className={styles.input} />
				{imagePreview && (
					<div className={styles.imagePreview}>
						<img src={imagePreview} alt='Preview' style={{ maxWidth: '200px', marginTop: '10px' }} />
					</div>
				)}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='category' className={styles.label}>
					Category
				</label>
				<select
					{...register('category', {
						required: 'Please select a category',
					})}
					className={styles.select}
					disabled={categories.length === 0}
				>
					<option value=''>Select a category...</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				{errors.category && <p className={styles.error}>{errors.category.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='content' className={styles.label}>
					Content
				</label>
				<textarea
					{...register('content', {
						required: 'Content is required',
						minLength: { value: 10, message: 'Content must be at least 10 characters long' },
					})}
					className={styles.textarea}
				/>
				{errors.content && <p className={styles.error}>{errors.content.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='status' className={styles.label}>
					Status
				</label>
				<select
					{...register('status', {
						required: 'Please select a status',
					})}
					className={styles.select}
				>
					<option value='draft'>Draft</option>
					<option value='published'>Published</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='isFeatured' className={styles.label}>
					Is Featured
				</label>
				<input type='checkbox' {...register('isFeatured')} className={styles.checkbox} />
			</div>

			<div className={styles.actions}>
				<Link ariaLabel='Cancel' className={styles.cancelButton} href='/' label='Cancel' />

				<Button
					ariaLabel={
						isSubmitting
							? isEdit
								? 'Updating article...'
								: 'Creating article...'
							: isEdit
								? 'Update article'
								: 'Create article'
					}
					type='submit'
					disabled={isSubmitting}
				>
					{isSubmitting ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'} Article
				</Button>
			</div>
		</form>
	);
};
