/**
 * Modules dependencies.
 */

import { Loading } from '@/components/core/loading';
import { SEO } from '@/components/core/seo';
import { ArticlesList } from '@/components/sections/articles-list';
import { UserInfo } from '@/components/sections/user-info';
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
    return <Loading />;
  }

  return (
    <>
      <SEO
        title={`${user?.name} - Echo news app`}
        description={`${user?.name} - Echo news app`}
        canonical={`/${user?.nickname}`}
      />

      <div>
        {user && <UserInfo user={user} />}

        <ArticlesList userNickname={nickname as string} title='User articles' />
      </div>
    </>
  );
}
