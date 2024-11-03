import ArrowLeftStartOnImage from '@/assets/img/ico_arrow_left_start_on.svg';
import ArrowRightStartOnImage from '@/assets/img/ico_arrow_right_start_on.svg';
import BitImage from '@/assets/img/ico_bit.png';
import DownImage from '@/assets/img/ico_down.svg';
import EthImage from '@/assets/img/ico_eth.png';
import UpImage from '@/assets/img/ico_up.svg';
import WonImage from '@/assets/img/ico_won.png';

export default function MyBalancesList() {
  return (
    <form>
      <div className="search-opt">
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
                      <a href="#">
                        <img className="w-[24px]" src={UpImage} />
                      </a>
                      <a href="#">
                        <img className="w-[24px]" src={DownImage} />
                      </a>
                    </div>
                  </div>
                </th>
                <th className="half">AMOUNT</th>
                <th className="half">
                  <div className="flex items-center justify-center gap-[10px] relative">
                    환산가액
                    <div className="flex gap-[4px] right-0 relative xl:absolute">
                      <a href="#">
                        <img className="w-[24px]" src={UpImage} />
                      </a>
                      <a href="#">
                        <img className="w-[24px]" src={DownImage} />
                      </a>
                    </div>
                  </div>
                </th>
                <th className="half-half">입금</th>
                <th className="half-half">출금</th>
              </tr>
            </thead>

            <tbody className="tbl-body">
              <tr>
                <td className="text-center half">
                  <i
                    className="inline-block mx-auto w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                    style={{
                      backgroundImage: `url('${BitImage}')`,
                    }}
                  ></i>
                </td>
                <td className="text-right half">1,457,965</td>
                <td className="text-right half">1,457,965</td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowRightStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="rotate-180 inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowLeftStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="text-center half">
                  <i
                    className="inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                    style={{
                      backgroundImage: `url('${WonImage}')`,
                    }}
                  ></i>
                </td>
                <td className="text-right half">1,457,965</td>
                <td className="text-right half">1,457,965</td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowRightStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="rotate-180 inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowLeftStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="text-center half">
                  <i
                    className="inline-block mx-auto w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                    style={{
                      backgroundImage: `url('${EthImage}')`,
                    }}
                  ></i>
                </td>
                <td className="text-right half">1,457,965</td>
                <td className="text-right half">1,457,965</td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowRightStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
                <td className="half-half">
                  <div className="mx-auto cursor-pointer">
                    <i
                      className="rotate-180 inline-block w-[28px] h-[28px] bg-[length:28px] bg-no-repeat	 bg-[left_center]"
                      style={{
                        backgroundImage: `url('${ArrowLeftStartOnImage}')`,
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pagination"></div>

        <div className="pagination">
          <a href="#">
            <button type="button" className="pg-button pprev-button">
              &lt;&lt;
            </button>
          </a>
          <a href="#">
            <button type="button" className="pg-button prev-button">
              &lt;
            </button>
          </a>

          <ul className="pg-button-grp">
            <li>
              <a href="#">
                <button type="button" className="pg-button active">
                  1
                </button>
              </a>
            </li>
            <li>
              <a href="#">
                <button type="button" className="pg-button">
                  2
                </button>
              </a>
            </li>
            <li>
              <a href="#">
                <button type="button" className="pg-button">
                  3
                </button>
              </a>
            </li>
          </ul>

          <a href="#">
            <button type="button" className="pg-button next-button">
              &gt;
            </button>
          </a>
          <a href="#">
            <button type="button" className="pg-button nnext-button">
              &gt;&gt;
            </button>
          </a>
        </div>
      </div>
    </form>
  );
}
