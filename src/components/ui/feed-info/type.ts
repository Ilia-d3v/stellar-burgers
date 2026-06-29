import { TOrdersData } from '@utils-types';

type TFeedInfoData = TOrdersData & {
  isLoading?: boolean;
  error?: string | null;
};

export type FeedInfoUIProps = {
  feed: TFeedInfoData;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
