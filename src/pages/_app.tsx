/**
 * Modules dependencies.
 */

import { Layout } from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

/**
 * Export `App` component.
 */

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
