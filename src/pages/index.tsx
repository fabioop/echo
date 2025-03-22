/**
 * Modules dependecies.
 */

import { Layout } from "@/components/layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

/**
 * Export `Home` page component.
 */

export default function Home() {
	const { user, isLoading } = useUser();

	const userRoles = user?.assigned_roles as string[];

	return (
		<Layout user={user} isLoading={isLoading}>
			<Head>
				<title>Echo news app</title>
				<meta name="description" content="Echo news app. Your voice, amplified." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>Echo news app body</div>

			{user && (
				<div>
					<p>Welcome {user.name}</p>
					<p>Roles: {userRoles[0]}</p>
				</div>
			)}
		</Layout>
	);
}
