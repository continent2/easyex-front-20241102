import SnsAppleImage from '@/assets/img/sns-apple.png';
import SnsFacebookImage from '@/assets/img/sns-facebook.png';
import SnsGoogleImage from '@/assets/img/sns-google.png';
import SnsKakaoImage from '@/assets/img/sns-kakao.png';
import SnsNaverImage from '@/assets/img/sns-naver.png';
import SnsTwitterImage from '@/assets/img/sns-twitter.png';

export default function AuthSnsLogin() {
  return (
    <div className="sns-btns">
      <button className="sns-btn sns-naver">
        <img src={SnsNaverImage} alt="" />
      </button>
      <button className="sns-btn sns-kakao">
        <img src={SnsKakaoImage} alt="" />
      </button>
      <button className="sns-btn sns-facebook">
        <img src={SnsFacebookImage} alt="" />
      </button>
      <button className="sns-btn sns-twitter">
        <img src={SnsTwitterImage} alt="" />
      </button>
      <button className="sns-btn sns-google">
        <img src={SnsGoogleImage} alt="" />
      </button>
      <button className="sns-btn sns-apple">
        <img src={SnsAppleImage} alt="" />
      </button>
    </div>
  );
}
