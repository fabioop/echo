/**
 * Modules dependencies.
 */
import Link from "next/link";

/**
 * Export `Navbar` component.
 */

export const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link href="/">home</Link>
			</div>
		</header>
	);
};
