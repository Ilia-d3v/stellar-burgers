import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/ordersSlice';
import { ORDERS_REFRESH_INTERVAL } from '../../utils/constants';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders.feed);
  const isLoading = useSelector((state) => state.orders.feedLoading);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    handleGetFeeds();
    const interval = window.setInterval(
      handleGetFeeds,
      ORDERS_REFRESH_INTERVAL
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
