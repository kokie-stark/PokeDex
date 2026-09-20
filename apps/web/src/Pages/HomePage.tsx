import { supabase } from '@/Api';
import { useAuth } from '@/Auth';
import { ROUTES } from '@/Consts';
import { memo } from 'react';
import { Link } from 'react-router';

const HomePageComponent = () => {
  const { session } = useAuth();

  return (
    <div>
      <h1>HomePage</h1>
      <li>
        <ul>
          <Link to={ROUTES.HOME}>ホームへ</Link>
        </ul>
        <ul>
          <Link to={ROUTES.LIST}>リストへ</Link>
        </ul>
        <ul>
          <Link to={'/detail/1'}>詳細1</Link>
        </ul>
        <ul>
          <Link to={'/detail/2'}>詳細2</Link>
        </ul>
        <ul>
          <Link to={'/detail/3'}>詳細3</Link>
        </ul>
        <ul>
          {session ? (
            <button type="button" onClick={() => supabase.auth.signOut()}>
              ログアウト
            </button>
          ) : (
            <Link to={ROUTES.LOGIN}>ログイン</Link>
          )}
        </ul>
      </li>
    </div>
  );
};

const HomePage = memo(HomePageComponent);

export default HomePage;
