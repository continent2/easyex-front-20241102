import SnsAppleImage from '@/assets/img/sns-apple.png';
import SnsFacebookImage from '@/assets/img/sns-facebook.png';
import SnsGoogleImage from '@/assets/img/sns-google.png';
import SnsKakaoImage from '@/assets/img/sns-kakao.png';
import SnsNaverImage from '@/assets/img/sns-naver.png';
import SnsTwitterImage from '@/assets/img/sns-twitter.png';

// import { env } from '@/env';

export default function AuthSnsLogin() {
  const onNaverLogin = () => {};
  const onKakaoLogin = () => {};
  const onFacebookLogin = () => {};
  const onTwitterLogin = () => {};
  const onGoogleLogin = () => {
    // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.googleClientId}&redirect_uri=${env.socialLoginRedirectUrl}&response_type=code&scope=openid%20email%20profile&socialProvider=GOOGLE`;
    // window.location.href = googleLoginUrl;
  };

  const onAppleLogin = () => {};
  return (
    <div className="sns-btns">
      <button onClick={onNaverLogin} className="sns-btn sns-naver">
        <img src={SnsNaverImage} alt="" />
      </button>
      <button onClick={onKakaoLogin} className="sns-btn sns-kakao">
        <img src={SnsKakaoImage} alt="" />
      </button>
      <button onClick={onFacebookLogin} className="sns-btn sns-facebook">
        <img src={SnsFacebookImage} alt="" />
      </button>
      <button onClick={onTwitterLogin} className="sns-btn sns-twitter">
        <img src={SnsTwitterImage} alt="" />
      </button>
      <button onClick={onGoogleLogin} className="sns-btn sns-google">
        <img src={SnsGoogleImage} alt="" />
      </button>
      <button onClick={onAppleLogin} className="sns-btn sns-apple">
        <img src={SnsAppleImage} alt="" />
      </button>
    </div>
  );
}
