/**
 * Modules dependencies.
 */

import { Loader } from 'lucide-react';
import styles from './loading.module.css';

/**
 * Export `Loading` component.
 */

export const Loading = ({ message }: { message?: string }) => {
	return (
		<div className={styles.container}>
			<span>{message || 'Loading'}</span>
			<Loader className={styles.spinner} size={24} />
		</div>
	);
};
