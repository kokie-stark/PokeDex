import { ROUTES } from '@/Consts';
import { memo } from 'react';
import { Link, useParams } from 'react-router';

const DetailPageComponent = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>詳細 {id}</h2>
      <Link to={ROUTES.HOME}>ホームへ</Link>
    </div>
  );
};

const DetailPage = memo(DetailPageComponent);

export default DetailPage;
