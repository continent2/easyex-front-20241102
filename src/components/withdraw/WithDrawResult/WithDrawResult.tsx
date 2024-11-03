import QrImage from '@/assets/img/qr.png';

export default function WithDrawResult() {
  return (
    <div className="result_box ver_qr">
      <h3>
        Please deposit <span className="grn">10 ETH </span>to account below in
        <br />1 hour
      </h3>
      <div className="money_inp">
        <div className="qr_box">
          <img src={QrImage} alt="" />
        </div>
      </div>
      <p>OX2027Ddg573g821w5d8g93q45dg9dg9g123d</p>
    </div>
  );
}
