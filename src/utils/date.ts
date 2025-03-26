/**
 * Export `formatDate` function.
 */

export const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString();
};
