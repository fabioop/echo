/**
 * Modules dependencies.
 */

import styles from './checkbox.module.css';

/**
 * Props type.
 */

type Props = {
	label: string;
	checked: boolean;
	onChange: () => void;
};

/**
 * Export `Checkbox` component.
 */

export const Checkbox = ({ label, checked, onChange }: Props) => {
	return (
		<label className={styles.label} aria-label={label} htmlFor={label} data-checked={checked}>
			<input type='checkbox' checked={checked} onChange={onChange} id={label} />
			{label}
		</label>
	);
};
