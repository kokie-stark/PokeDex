import { fetchPokemonDetail } from '@/Api';
import { ROUTES } from '@/Consts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { memo, Suspense } from 'react';
import { Link, useParams } from 'react-router';

type DetailPageContentProps = {
  id: number;
};

const DetailPageContentComponent = ({ id }: DetailPageContentProps) => {
  const { data } = useSuspenseQuery({
    queryFn: () => fetchPokemonDetail(id),
    queryKey: ['details', id],
  });

  return (
    <div>
      <h3>名前: {data.name}</h3>
      {data.imageUrl && <img src={data.imageUrl} alt={data.name}></img>}
      <Link to={ROUTES.HOME}>ホームへ</Link>
    </div>
  );
};

const DetailPageContent = memo(DetailPageContentComponent);

const DetailPageComponent = () => {
  const { id } = useParams();

  if (!id || Number.isNaN(Number(id))) {
    return <div>不正なURLです</div>;
  }

  return (
    <Suspense fallback={<h1>loading..</h1>}>
      <DetailPageContent id={Number(id)} />
    </Suspense>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
