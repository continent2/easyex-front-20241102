import { useQuery } from '@tanstack/react-query';

import SnsAppleImage from '@/assets/img/sns-apple.png';
import SnsFacebookImage from '@/assets/img/sns-facebook.png';
import SnsGoogleImage from '@/assets/img/sns-google.png';
import SnsKakaoImage from '@/assets/img/sns-kakao.png';
import SnsNaverImage from '@/assets/img/sns-naver.png';
import SnsTwitterImage from '@/assets/img/sns-twitter.png';

import { getUserSocialSettings } from '@/lib/api/user';
import { UserSocialSetting } from '@/types/user';

// import { env } from '@/env';

export default function SnsLogin() {
  const { data: userSocialSettings } = useQuery({
    queryFn: getUserSocialSettings,
    queryKey: ['socialSetting'],
    select: (response: any) => {
      return response.data.list as UserSocialSetting[];
    },
  });

  const onNaverLogin = () => {};
  const onKakaoLogin = () => {};
  const onFacebookLogin = () => {};
  const onTwitterLogin = () => {};
  const onGoogleLogin = () => {
    // const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.googleClientId}&redirect_uri=${env.socialLoginRedirectUrl}&response_type=code&scope=openid%20email%20profile&socialProvider=GOOGLE`;
    // window.location.href = googleLoginUrl;
  };

  const onAppleLogin = () => {};

  if (!userSocialSettings) return null;

  return (
    <div className="sns-btns">
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'NAVER',
          )?.value_ !== '1'
        }
        // onClick={onNaverLogin}
        className="sns-btn sns-naver disabled:opacity-30"
      >
        <img src={SnsNaverImage} alt="" />
      </button>
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'KAKAO',
          )?.value_ !== '1'
        }
        // onClick={onKakaoLogin}
        className="sns-btn sns-kakao disabled:opacity-30"
      >
        <img src={SnsKakaoImage} alt="" />
      </button>
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'FACEBOOK',
          )?.value_ !== '1'
        }
        // onClick={onFacebookLogin}
        className="sns-btn sns-facebook disabled:opacity-30"
      >
        <img src={SnsFacebookImage} alt="" />
      </button>
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'TWITTER',
          )?.value_ !== '1'
        }
        // onClick={onTwitterLogin}
        className="sns-btn sns-twitter disabled:opacity-30"
      >
        <img src={SnsTwitterImage} alt="" />
      </button>
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'GOOGLE',
          )?.value_ !== '1'
        }
        // onClick={onGoogleLogin}
        className="sns-btn sns-google disabled:opacity-30"
      >
        <img src={SnsGoogleImage} alt="" />
      </button>
      <button
        type="button"
        disabled={
          userSocialSettings.find(
            (userSocialSetting) => userSocialSetting.subkey_ === 'APPLE',
          )?.value_ !== '1'
        }
        // onClick={onAppleLogin}
        className="sns-btn sns-apple disabled:opacity-30"
      >
        <img src={SnsAppleImage} alt="" />
      </button>
    </div>
  );
}
