import { BsTrash } from 'react-icons/bs';
import clsx from 'clsx';
import dayjs from 'dayjs';

import copyImage from '@/assets/img/ico-copy.png';

import { orderStatusClassNameMap, orderStatusMap } from '@/constants/order';
import { safeToLocaleString } from '@/lib/common';
import useModal from '@/lib/hooks/useModal';
import { Order } from '@/types/order';

type Props = {
  orders?: Order[];
  currentPage: number;
  totalPages: number;
  onChangePage: (pageNumber: number) => void;
  onDeleteOrder: (order: Order) => void;
};

export default function OrderList({
  orders,
  currentPage,
  totalPages,
  onChangePage,
  onDeleteOrder,
}: Props) {
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
      .catch((err) => {
        try {
          const textArea = document.createElement('textarea');
          document.body.appendChild(textArea);
          textArea.value = text;
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          openModal({
            title: 'Success',
            content: 'Copied to clipboard.',
            isVisibleOkBtn: true,
          });
        } catch (err) {
          openModal({
            title: 'Copy Fail',
            content: `${err}`,
            isVisibleOkBtn: true,
          });
        }
      });
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
                    <td className="w-28">
                      {dayjs(order.createdat).format('YYYY-MM-DD')}
                    </td>
                    <td className="w-16">{`${fromdata.typecf} to ${todata.typecf}`}</td>
                    <td className="w-64">
                      <p>
                        {fromdata.typecf === 'C'
                          ? fromdata.symbol
                          : fromdata.bankname}
                      </p>
                      <span className="sm-text whitespace-normal break-all overflow-hidden">
                        {fromdata.typecf === 'C' && fromdata.address
                          ? fromdata.address
                          : ''}
                        {fromdata.typecf === 'C' && fromdata.txhash
                          ? `(txhash)${fromdata.txhash}`
                          : ''}
                        {fromdata.typecf === 'F' && fromdata.account
                          ? fromdata.account
                          : ''}
                      </span>
                      {(fromdata.address ||
                        fromdata.txhash ||
                        fromdata.account) && (
                        <button
                          className="copy-btn"
                          onClick={() => {
                            let copyText = '';

                            if (fromdata.typecf === 'C' && fromdata.address) {
                              copyText = fromdata.address;
                            }
                            if (fromdata.typecf === 'C' && fromdata.txhash) {
                              copyText = fromdata.txhash;
                            }

                            if (fromdata.typecf === 'F' && fromdata.account) {
                              copyText = fromdata.account;
                            }

                            onCopyText(copyText);
                          }}
                          type="button"
                        >
                          <img src={copyImage} alt="Copy" />
                        </button>
                      )}
                    </td>
                    <td>{safeToLocaleString(Number(fromdata.amount))}</td>
                    <td className="w-64">
                      <p>
                        {todata.typecf === 'C'
                          ? todata.symbol
                          : todata.bankname}
                      </p>
                      <span className="sm-text whitespace-normal break-all overflow-hidden">
                        {todata.typecf === 'C'
                          ? todata.address
                          : todata.account}
                      </span>
                    </td>
                    <td>{safeToLocaleString(Number(todata.amount))}</td>
                    <td className="w-[112px]">
                      <span
                        className={clsx(
                          'status',
                          orderStatusClassNameMap[order.status],
                        )}
                      >
                        {orderStatusMap[order.status]}
                      </span>
                    </td>
                    <td className="w-[112px]">
                      <BsTrash
                        className="cursor-pointer"
                        onClick={() => onDeleteOrder(order)}
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
