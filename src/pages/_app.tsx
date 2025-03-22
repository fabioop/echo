/**
 * Modules dependencies.
 */

import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";

/**
 * Export `App` component.
 */

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}
