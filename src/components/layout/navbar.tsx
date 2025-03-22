/**
 * Modules dependencies.
 */

import type { UserContext } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

/**
 * Export `Navbar` component.
 */

export const Navbar = ({ user, isLoading }: Pick<UserContext, "user" | "isLoading">) => {
	return (
		<header className="navbar">
			<nav className="container navigation">
				<Link href="/">home</Link>

				{user && !isLoading && <Link href="/api/auth/logout">logout</Link>}

				{!user && !isLoading && <Link href="/api/auth/login">login</Link>}
			</nav>
		</header>
	);
};
