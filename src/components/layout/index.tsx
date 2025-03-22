/**
 * Modules dependencies.
 */

import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

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

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
			<Navbar />
			<main className="container">{children}</main>
			<Footer />
		</div>
	);
};
