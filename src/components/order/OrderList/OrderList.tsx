import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';

import useModal from '@/components/hooks/useModal';

import copyImage from '@/assets/img/ico-copy.png';

import { orderStatusClassNameMap, orderStatusMap } from '@/constants/order';
import { deleteOrder, getOrders } from '@/lib/api/order';
import { safeToLocaleString } from '@/lib/common';
import { Order } from '@/types/order';

export default function OrderList() {
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

  const { openModal } = useModal();

  const onCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        openModal({
          title: 'Success',
          content: 'Copied to clipboard.',
          isVisibleOkBtn: true,
        });
      })
      .catch((err) => {});
  };

  const { mutate: deleteOrderMutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      refetchOrderPageNation();
    },
  });

  const onDeleteOrder = (uuid: string) => {
    deleteOrderMutate(uuid);
  };

  return (
    <form>
      {/* <div className="search-opt">
        <div className="opt">
          <h3>Account</h3>
          <div className="inp-wrap">
            <input type="text" className="opt-inp opt-inp-search" />
          </div>
        </div>
        <div className="opt">
          <h3>Date</h3>
          <div className="inp-wrap">
            <div id="range">
              <input
                type="text"
                className="opt-inp opt-inp-date"
                name="start"
                autoComplete="off"
              />
              <span>~</span>
              <input
                type="text"
                className="opt-inp opt-inp-date"
                name="end"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="opt">
          <h3>Type</h3>
          <div className="inp-wrap">
            <select className="opt-inp" name="" id="">
              <option value="type01">type01</option>
            </select>
          </div>
        </div>
      </div> */}
      <div className="cont_box_wrp tbl-cont-box-wrap ">
        <div className="tbl-wrap">
          <table className="tbl min-h-[682px]">
            <thead className="tbl-head">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>From account</th>
                <th>From amount</th>
                <th>To account</th>
                <th>To amount</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="tbl-body ">
              {orders?.map((order) => {
                const fromdata = JSON.parse(order.fromdata);
                const todata = JSON.parse(order.todata);

                return (
                  <tr key={order.id}>
                    <td>{dayjs(order.createdat).format('YYYY-MM-DD')}</td>
                    <td>{`${fromdata.typecf} to ${todata.typecf}`}</td>
                    <td className="ta-l">
                      <p>
                        {fromdata.typecf === 'C'
                          ? fromdata.symbol
                          : fromdata.bankname}
                      </p>
                      <span className="sm-text">
                        {fromdata.typecf === 'C'
                          ? fromdata.address || `txhash: ${fromdata.txhash}`
                          : fromdata.account}
                      </span>
                      <button
                        className="copy-btn"
                        onClick={() =>
                          onCopyText(
                            fromdata.typecf === 'C'
                              ? fromdata.address
                              : fromdata.account,
                          )
                        }
                        type="button"
                      >
                        <img src={copyImage} alt="Copy" />
                      </button>
                    </td>
                    <td>{safeToLocaleString(Number(fromdata.amount))}</td>
                    <td>
                      <div>
                        <p>
                          {todata.typecf === 'C'
                            ? todata.symbol
                            : todata.bankname}
                        </p>
                        <span className="sm-text">
                          {todata.typecf === 'C'
                            ? todata.address
                            : todata.account}
                        </span>
                      </div>
                    </td>
                    <td>{safeToLocaleString(Number(todata.amount))}</td>
                    <td>
                      <span
                        className={clsx(
                          'status',
                          orderStatusClassNameMap[order.status],
                        )}
                      >
                        {orderStatusMap[order.status]}
                      </span>
                    </td>
                    <td>
                      <BsTrash
                        className="cursor-pointer"
                        onClick={() => onDeleteOrder(order.uuid)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            type="button"
            className="pg-button pprev-button"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button
            type="button"
            className="pg-button prev-button"
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <ul className="pg-button-grp">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  type="button"
                  className={`pg-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => onChangePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="pg-button next-button"
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            type="button"
            className="pg-button nnext-button"
            onClick={() => onChangePage(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </form>
  );
}
