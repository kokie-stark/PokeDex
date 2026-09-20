import { memo } from 'react';
import { Outlet } from 'react-router';

const PlainLayoutComponent = () => <Outlet />;

const PlainLayout = memo(PlainLayoutComponent);

export default PlainLayout;
