import copyImage from '@/assets/img/ico-copy.png';

export default function MyActivityList() {
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
            <thead className="tbl-head">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th className="ta-l">From account</th>
                <th>From amount</th>
                <th>To account</th>
                <th>To amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="tbl-body">
              <tr>
                <td>2023-09-19</td>
                <td>Type 01</td>
                <td className="ta-l">
                  <span>0xA706d285a5c5246888D4f5DD27706f76D225D502</span>
                  <button className="copy-btn">
                    <img src={copyImage} alt="" />
                  </button>
                </td>
                <td>45</td>
                <td>
                  <div>
                    <p>Hana</p>
                    <span className="sm-text">123-456-789</span>
                  </div>
                </td>
                <td>69</td>
                <td>
                  <span className="status success">Success</span>
                </td>
              </tr>

              <tr>
                <td>2023-09-19</td>
                <td>Type 01</td>
                <td className="ta-l">
                  <span>0xA706d285a5c5246888D4f5DD27706f76D225D502</span>
                  <button className="copy-btn">
                    <img src={copyImage} alt="" />
                  </button>
                </td>
                <td>45</td>
                <td>
                  <div>
                    <p>Hana</p>
                    <span className="sm-text">123-456-789</span>
                  </div>
                </td>
                <td>69</td>
                <td>
                  <span className="status fail">Fail</span>
                </td>
              </tr>

              <tr>
                <td>2023-09-19</td>
                <td>Type 01</td>
                <td className="ta-l">
                  <span>0xA706d285a5c5246888D4f5DD27706f76D225D502</span>
                  <button className="copy-btn">
                    <img src={copyImage} alt="" />
                  </button>
                </td>
                <td>45</td>
                <td>
                  <div>
                    <p>Hana</p>
                    <span className="sm-text">123-456-789</span>
                  </div>
                </td>
                <td>69</td>
                <td>
                  <span className="status pending">Pending</span>
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
