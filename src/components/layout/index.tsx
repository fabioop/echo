/**
 * Modules dependencies.
 */

import type { UserContext } from "@auth0/nextjs-auth0/client";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

/**
 * Props type.
 */

type Props = {
	children: ReactNode;
} & Pick<UserContext, "user" | "isLoading" | "error">;

/**
 * Geist fonts.
 */

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

/**
 * Export `Layout`.
 */

export const Layout = ({ children, user, isLoading, error }: Props) => {
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
			<Navbar user={user} isLoading={isLoading} />

			<main className="container">
				{!isLoading && !user && <h2>Please login</h2>}

				{!isLoading && user && children}
			</main>
			<Footer />
		</div>
	);
};
