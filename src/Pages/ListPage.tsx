import { fetchPokemonList } from '@/Api';
import { ROUTES } from '@/Consts';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Link } from 'react-router';

const ListPageComponent = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>ListPage</h1>
      <ul>
        {data.results.map(p => (
          <Link to={`/detail/${p.name}`}>
            <li key={p.name}>{p.name}</li>
          </Link>
        ))}
      </ul>
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
      </li>
    </div>
  );
};

const ListPage = memo(ListPageComponent);

export default ListPage;
