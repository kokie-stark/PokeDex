import { fetchPokemonDetail } from '@/Api';
import { ROUTES } from '@/Consts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { Link, useParams } from 'react-router';

type DetailPageContentProps = {
  name: string;
};

const DetailPageContentComponent = ({ name }: DetailPageContentProps) => {
  const { data } = useSuspenseQuery({
    queryFn: () => fetchPokemonDetail(name),
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

const DetailPageContent = memo(DetailPageContentComponent);

const DetailPageComponent = () => {
  const { id: name } = useParams();

  if (!name) {
    return <div>不正なURLです</div>;
  }

  return (
    <Suspense fallback={<h1>loading..</h1>}>
      <DetailPageContent name={name} />
    </Suspense>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
