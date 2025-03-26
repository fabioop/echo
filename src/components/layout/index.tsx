/**
 * Modules dependencies.
 */

import { Link } from '@/components/core/link';
import { Loading } from '@/components/core/loading';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { useUser } from '@/hooks/use-user';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

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

			<main className='container layout'>
				{isLoading && <Loading message='Loading user...' />}

				{error && <div>{error.message}</div>}

				{!isLoading && !user && (
					<div className='hero'>
						<h1>Your voice, amplified.</h1>
						<br />
						<Link ariaLabel='Login' href='/api/auth/login' label='Get started' isButton />
					</div>
				)}

				{!isLoading && user && children}
			</main>

			<Footer />
		</div>
	);
};
