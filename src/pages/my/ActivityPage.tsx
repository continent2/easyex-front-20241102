import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import useModal from '@/components/hooks/useModal';
import OrderList from '@/components/order/OrderList';

import { orderStatusMap } from '@/constants/order';
import { deleteOrder, getOrders } from '@/lib/api/order';
import { Order } from '@/types/order';

export default function ActivityPage() {
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orderPageNation, refetch: refetchOrderPageNation } = useQuery({
    queryKey: ['orders', offset, limit],
    queryFn: () => getOrders({ offset, limit }),
    select: (response) => {
      return response.data as {
        payload: {
          count: number;
        };
        list: Order[];
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
  const orders = orderPageNation?.list;

  const onChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { mutate: deleteOrderMutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      refetchOrderPageNation();
    },
  });

  const { openModal } = useModal();

  const onDeleteOrder = (order: Order) => {
    if (orderStatusMap[order.status] === 'PROCESSED') {
      openModal({
        title: 'Warning',
        content: (
          <>
            <div>Delete following order record completely?</div>
            <div>{order.uuid}</div>
          </>
        ),
        isVisibleOkBtn: true,
        isVisibleCancelBtn: true,
        okBtnCallback: () => deleteOrderMutate(order.uuid),
      });
      return;
    }

    openModal({
      title: 'Warning',
      content: (
        <>
          <div>Cancel the following order?</div>
        </>
      ),
      isVisibleOkBtn: true,
      isVisibleCancelBtn: true,
      okBtnCallback: () => deleteOrderMutate(order.uuid),
    });
  };

  return (
    <>
      <h2>My activity</h2>
      <OrderList
        orders={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={onChangePage}
        onDeleteOrder={onDeleteOrder}
      />
    </>
  );
}
