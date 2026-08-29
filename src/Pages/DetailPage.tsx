import { fetchPokemonDetail } from '@/Api';
import { ROUTES } from '@/Consts';
import { skipToken, useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { Link, useParams } from 'react-router';

const DetailPageComponent = () => {
  const { id: name } = useParams();
  const { data } = useQuery({
    queryFn: name ? () => fetchPokemonDetail(name!) : skipToken,
    queryKey: ['details', name],
  });

  return (
    <div>
      <h3>名前: {name}</h3>
      <img src={data?.sprites.front_default}></img>
      <Link to={ROUTES.HOME}>ホームへ</Link>
    </div>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
