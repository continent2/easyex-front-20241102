import ExchangeImage from '@/assets/img/ico_exchange.png';

export default function ExchangeCryptoForm() {
  return (
    <>
      <div className="cont_box_wrp">
        <form>
          <div className="cont_box flexBox area02 ver_noList m-column">
            <div className="inp_tit">
              <h3>From</h3>
              <div className="money_inp ver_bg in_alert">
                <i className="won"></i>
                <input type="text" className="inp_style" value="2,385,539.08" />
                <span>KRW</span>
                <p className="red_alert">유효하지 않은 수량입니다.</p>
              </div>
            </div>
            <div className="inp_tit">
              <h3>TO</h3>
              <div className="money_inp in_alert">
                <i className="eth"></i>
                <input type="text" className="inp_style" value="45" />
                <span>ETH</span>
                <p className="red_alert">유효하지 않은 수량입니다.</p>
              </div>
            </div>
          </div>
          <div className="cont_box flexBox area02 ver_noList m-column">
            <div className="inp_txt">
              <h3>입금하시는 계좌 </h3>
              <div className="money_inp">
                <i className="label">Country</i>
                <input type="text" className="inp_style" value="CN" />
                <p className="red_alert  ver2">유효하지 않은 주소입니다.</p>
              </div>

              <div className="money_inp">
                <i className="label">Bank</i>
                <input type="text" className="inp_style" value="우리" />
              </div>
              <div className="money_inp in_alert">
                <i className="label">Account</i>
                <input
                  type="text"
                  className="inp_style"
                  value="110-399-442215"
                />
                <p className="red_alert">유효하지 않은 계좌번호입니다.</p>
              </div>
            </div>
            <span className="exchange pcVer">
              <img src={ExchangeImage} alt="" />
            </span>
            <div className="inp_txt">
              <h3>받으시는 계좌 </h3>
              <div className="money_inp ver_textarea">
                <textarea name="" id="" className="inp_style" rows={2} value="">
                  OX2027Ddg573g821w5d8g93q45dg9dg9g123d
                </textarea>
              </div>
              <p className="red_alert">유효하지 않은 주소입니다.</p>
            </div>
          </div>
          <div className="btn_box">
            <button>Request</button>
          </div>
        </form>
      </div>
    </>
  );
}
