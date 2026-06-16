import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getProfileOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.profileOrders);

  useEffect(() => {
    dispatch(getProfileOrders());
    const interval = window.setInterval(() => {
      dispatch(getProfileOrders());
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
