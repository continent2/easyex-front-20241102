import ChangeImage from '@/assets/img/ico_change.png';

export default function DepositForm() {
  return (
    <>
      <h2>입금</h2>
      <form>
        <div className="flexBox area02 ver_noList m-column">
          <div className="cont_box_wrp">
            <div
              className="cont_box flexBox area02 ver_noList m-column"
              style={{ position: 'relative' }}
            >
              <div className="inp_tit">
                <h3>From</h3>
                <div className="inp_txt">
                  <div className="money_inp">
                    <i className="label">BANK</i>
                    <i className="bank"></i>
                    <select>
                      <option selected>신한은행</option>
                    </select>
                  </div>
                  <div className="money_inp in_alert">
                    <i className="label">Account</i>
                    <input
                      type="text"
                      className="inp_style"
                      value="123-456-789012"
                    />
                    <p className="red_alert">유효하지 않은 계좌번호입니다.</p>
                  </div>
                  <div className="money_inp in_alert">
                    <i className="won"></i>
                    <input
                      type="text"
                      className="inp_style"
                      value="2,385,359"
                    />
                    <span>KRW</span>
                    <p className="red_alert">유효하지 않은 계좌번호입니다.</p>
                  </div>
                </div>
              </div>
              <span className="exchange pcVer">
                <img src={ChangeImage} alt="" />
              </span>

              <div className="inp_tit">
                <h3>TO</h3>

                <div className="inp_txt">
                  <div className="money_inp">
                    <i className="label">BANK</i>
                    <i className="bank"></i>
                    <select>
                      <option selected>국민은행</option>
                    </select>
                  </div>

                  <div className="money_inp in_alert">
                    <i className="label">Account</i>
                    <input
                      type="text"
                      className="inp_style"
                      value="123-456-789012"
                    />
                    <p className="red_alert">유효하지 않은 계좌번호입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="btn_box">
              <button>Request</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
