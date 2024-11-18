import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AccountList from '@/components/account/AccountList';

import { getAccounts } from '@/lib/api/account';
import useDebounce from '@/lib/hooks/useDebounce';
import useInput from '@/lib/hooks/useInput';
import { Account } from '@/types/account';

export default function BalancesPage() {
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [filterval, onChangeFilterval] = useInput('');
  const debouncedFilterval = useDebounce<string>({
    value: filterval,
    delay: 1000,
  });

  const { data: orderPageNation } = useQuery({
    queryKey: ['accounts', offset, limit, order, debouncedFilterval],
    queryFn: () =>
      getAccounts({
        offset,
        limit,
        orderKey: 'symbol',
        order,
        filterkey: 'symbol',
        filterval: debouncedFilterval,
      }),
    select: (response) => {
      return response.data as {
        payload: {
          count: number;
        };
        list: Account[];
      };
    },
  });

  useEffect(() => {
    if (!orderPageNation) {
      return;
    }
    setTotalCount(orderPageNation.payload.count);
  }, [orderPageNation]);

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage, limit]);

  const totalPages = Math.ceil(totalCount / limit);

  const onChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const onChangeOrder = ({
    order,
  }: {
    orderKey: string;
    order: 'ASC' | 'DESC';
  }) => {
    setOrder(order);
  };

  const accounts = orderPageNation?.list;

  return (
    <>
      <h2>My balances</h2>
      <AccountList
        accounts={accounts}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={orderPageNation?.payload.count}
        onChangeOrder={onChangeOrder}
        onChangeFilterval={onChangeFilterval}
        onChangePage={onChangePage}
      />
    </>
  );
}
