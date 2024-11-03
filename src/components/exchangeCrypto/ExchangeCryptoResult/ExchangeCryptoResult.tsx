export default function ExchangeCryptoResult() {
  return (
    <div className="result_box">
      <h3>
        Please deposit <b className="grn">2,385,359.08 KRW</b> to
        <br />
        account below in 1 hour
      </h3>
      <div className="money_inp">
        <i className="label">우리은행</i>
        <input type="text" className="inp_style" value="1002-000-000000" />
      </div>
      <div className="money_inp">
        <i className="label">예금주</i>
        <input type="text" className="inp_style" value="홍길*" />
      </div>
    </div>
  );
}
