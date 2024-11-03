import AuthSnsLogin from '@/components/auth/AuthSnsLogin';

export default function AuthLoginForm() {
  return (
    <form>
      <div className="auth-box m-column">
        <div className="cont_box_wrp login-cont-box-wrap">
          <div className="login-inp-wrap">
            <div className="login-inp-grp">
              <div className="money_inp">
                <i className="label">Country</i>
                <input type="text" className="inp_style" value="CN" />
              </div>
              <div className="money_inp">
                <i className="label">Phone number</i>
                <input type="text" className="inp_style" value="01012345678" />
                <p className="red_alert">유효하지 않은 휴대폰 번호입니다.</p>
              </div>
            </div>

            <div className="money_inp password_inp">
              <i className="label">Password</i>
              <input type="password" className="inp_style" value="" />
              <p className="red_alert">올바르지 않은 비밀번호입니다.</p>
            </div>
          </div>

          <div className="btn_box">
            <button className="w100-btn">Login</button>
            <div className="opt-btns">
              <button type="button" className="opt-btn">
                Join
              </button>
              <button type="button" className="opt-btn">
                SMS Login
              </button>
            </div>
            <AuthSnsLogin />
          </div>
        </div>
      </div>
    </form>
  );
}
