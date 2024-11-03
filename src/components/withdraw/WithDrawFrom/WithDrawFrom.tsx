import ChangeImage from '@/assets/img/ico_change.png';

export default function WithDrawFrom() {
  return (
    <div className="cont_box_wrp">
      <form>
        <div
          className="cont_box flexBox area02 ver_noList m-column gap-[20px]"
          style={{ position: 'relative' }}
        >
          <div className="relative inp_tit" style={{ width: '40%' }}>
            <h3>From</h3>
            <div className="cont_box">
              <h3>보내시는 계좌 </h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
              >
                <i className="eth"></i>
                <textarea
                  name=""
                  id=""
                  className="inp_style"
                  rows={2}
                  style={{ height: 'auto' }}
                  value=""
                >
                  OX2027Ddg573g821w5d8g93q45dg9dg9g123d
                </textarea>
              </div>
              <p className="red_alert">유효하지 않은 주소입니다.</p>
            </div>
          </div>
          <span className="exchange pcVer">
            <img src={ChangeImage} alt="" />
          </span>

          <div className="inp_tit" style={{ width: '40%' }}>
            <h3>TO</h3>
            <div className="cont_box">
              <h3>받으시는 계좌 </h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
              >
                <i className="eth"></i>
                <textarea
                  name=""
                  id=""
                  className="inp_style"
                  rows={2}
                  style={{ height: 'auto' }}
                  value=""
                >
                  OX2027Ddg573g821w5d8g93q45dg9dg9g123d
                </textarea>
              </div>
              <p className="red_alert">유효하지 않은 주소입니다.</p>
            </div>
          </div>
        </div>

        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit">
            <h3>금액</h3>
            <div className="money_inp">
              <i className="eth"></i>
              <input type="text" className="inp_style" value="45" />
              <span>ETH</span>
            </div>
            <p className=" red_alert">유효하지 않은 수량입니다.</p>
          </div>
        </div>

        <div className="btn_box">
          <button>Request</button>
        </div>
      </form>
    </div>
  );
}
