import ArrowLeftStartOnImage from '@/assets/img/ico_arrow_left_start_on.svg';
import ArrowRightStartOnImage from '@/assets/img/ico_arrow_right_start_on.svg';
import BitImage from '@/assets/img/ico_bit.png';
import DownImage from '@/assets/img/ico_down.svg';
import UpImage from '@/assets/img/ico_up.svg';

import { safeToLocaleString } from '@/lib/common';
import { Account } from '@/types/account';

type Props = {
  accounts?: Account[];
  currentPage: number;
  totalPages: number;
  onChangeOrder: ({
    orderKey,
    order,
  }: {
    orderKey: string;
    order: 'ASC' | 'DESC';
  }) => void;
  onChangeFilterval: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangePage: (pageNumber: number) => void;
};

export default function AccountList({
  accounts,
  currentPage,
  totalPages,
  onChangeOrder,
  onChangeFilterval,
  onChangePage,
}: Props) {
  return (
    <form>
      <div className="search-opt">
        <div className="opt">
          <h3>Account</h3>
          <div className="inp-wrap">
            <input
              type="text"
              onChange={onChangeFilterval}
              className="opt-inp opt-inp-search"
            />
          </div>
        </div>
        {/* <div className="opt">
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
        </div> */}
        {/* <div className="opt">
          <h3>Type</h3>
          <div className="inp-wrap">
            <select className="opt-inp" name="" id="">
              <option value="type01">type01</option>
            </select>
          </div>
        </div> */}
      </div>

      <div className="cont_box_wrp tbl-cont-box-wrap">
        <div className="tbl-wrap">
          <table className="tbl">
            <colgroup>
              <col className="w-[300px]" />
              <col />
              <col />
              <col className="w-[150px]" />
              <col className="w-[120px]" />
            </colgroup>
            <thead className="tbl-head">
              <tr>
                <th className="half">
                  <div className="flex items-center justify-center gap-[10px] relative">
                    CURRENCY
                    <div className="flex gap-[4px] right-0 relative xl:absolute">
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          onChangeOrder({ orderKey: 'symbol', order: 'ASC' })
                        }
                      >
                        <img className="w-[24px]" src={UpImage} />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          onChangeOrder({ orderKey: 'symbol', order: 'DESC' })
                        }
                      >
                        <img className="w-[24px]" src={DownImage} />
                      </div>
                    </div>
                  </div>
                </th>
                <th className="half">AMOUNT</th>
                <th className="half">
                  <div className="flex items-center justify-center gap-[10px] relative">
                    환산가액
                    {/* <div className="flex gap-[4px] right-0 relative xl:absolute">
                      <a href="#">
                        <img className="w-[24px]" src={UpImage} />
                      </a>
                      <a href="#">
                        <img className="w-[24px]" src={DownImage} />
                      </a>
                    </div> */}
                  </div>
                </th>
                <th className="half-half">입금</th>
                <th className="half-half">출금</th>
              </tr>
            </thead>

            <tbody className="tbl-body">
              {accounts?.map((account) => (
                <tr key={account.id}>
                  <td className="text-center half">
                    <i
                      className="inline-block mx-auto w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${account.urllogo}')`,
                      }}
                    ></i>
                  </td>
                  <td className="text-right half">
                    {safeToLocaleString(Number(account.balancestr))}
                  </td>
                  <td className="text-right half">
                    {safeToLocaleString(Number(account.convvalue))}
                  </td>
                  <td className="half-half">
                    <div className="mx-auto cursor-pointer">
                      <a
                        href={`/deposit?typecf=${account.symbol === 'KRW' ? 'F' : 'C'}${account.symbol !== 'KRW' ? `&symbol=${account.symbol}` : ''}`}
                      >
                        <i
                          className="inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                          style={{
                            backgroundImage: `url('${ArrowRightStartOnImage}')`,
                          }}
                        ></i>
                      </a>
                    </div>
                  </td>
                  <td className="half-half">
                    <div className="mx-auto cursor-pointer">
                      <a href="/withdraw">
                        <i
                          className="rotate-180 inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                          style={{
                            backgroundImage: `url('${ArrowLeftStartOnImage}')`,
                          }}
                        ></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
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
