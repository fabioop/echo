/**
 * Export `UserProfile` page component.
 */

import { ArticlesList } from '@/components/sections/articles-list';
import { useUser } from '@/hooks/use-user';
import type { User } from '@/types/user';
import { errorNotification } from '@/utils/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Export `UserProfile` page component.
 */

export default function UserProfile() {
	const router = useRouter();
	const { nickname } = router.query;

	const { getLocalUser } = useUser();
	const [isLoading, setIsLoading] = useState(true);

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);

				const { data } = await getLocalUser(nickname as string);
				const user = data?.user;

				if (user) {
					setUser(user);
				}

				setIsLoading(false);
			} catch (error) {
				errorNotification(error as string);
				setIsLoading(false);
			}
		})();
	}, [nickname, getLocalUser]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>User Profile</h1>

			<p>{user?.nickname}</p>

			<p>{user?.email}</p>

			{user?.picture && user?.nickname && <img src={user.picture} alt={user.nickname} />}

			<ArticlesList userNickname={nickname as string} />
		</div>
	);
}
