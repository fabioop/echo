/**
 * Modules dependencies.
 */

import { useUser } from '@/hooks/use-user';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from './footer';
import { Navbar } from './navbar';

/**
 * Props type.
 */

type Props = {
	children: ReactNode;
};

/**
 * Geist fonts.
 */

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

/**
 * Export `Layout`.
 */

export const Layout = ({ children }: Props) => {
	const { user, isLoading, error } = useUser();

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
			<Navbar />

			<main className='container'>
				{isLoading && <div>Loading user...</div>}

				{error && <div>{error.message}</div>}

				{!isLoading && !user && <h2>Please login</h2>}

				{!isLoading && user && children}
			</main>

			<Footer />
		</div>
	);
};
