import { QRCodeSVG } from 'qrcode.react';
import { useQueries, useQuery } from '@tanstack/react-query';

import copyImage from '@/assets/img/ico-copy.png';

import { env } from '@/env';
import { getUserInfo } from '@/lib/api/user';
import useModal from '@/lib/hooks/useModal';
import { UserInfo } from '@/types/user';

export default function InfoPage() {
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (response: any) => {
      return response.data.payload as UserInfo;
    },
  });

  const { openModal } = useModal();

  const onCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        openModal({
          title: 'Success',
          content: 'Copied to clipboard.',
          isVisibleOkBtn: true,
        });
      })
      .catch((err) => {
        try {
          const textArea = document.createElement('textarea');
          document.body.appendChild(textArea);
          textArea.value = text;
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          openModal({
            title: 'Success',
            content: 'Copied to clipboard.',
            isVisibleOkBtn: true,
          });
        } catch (err) {
          openModal({
            title: 'Copy Fail',
            content: `${err}`,
            isVisibleOkBtn: true,
          });
        }
      });
  };

  return (
    <>
      <h2>My Info</h2>
      <div className="border-[1px] border-solid border-[#ddd] rounded-[10px] flex flex-col justify-center items-center p-[30px] gap-[32px]">
        <h3 className="self-start text-[#15a7a5]">My reference code</h3>
        <QRCodeSVG
          value={`${env.appUrl}/join?parentcode=${userInfo?.myinfo.referercode}`}
        />
        <div className="flex px-2 items-center h-[45px] rounded-[8px] border-[1px] border-solid border-[#15a7a5] disabled:bg-white">
          <input
            value={userInfo?.myinfo.referercode}
            className="rounded-[8px] disabled:bg-white border-none"
            readOnly
            disabled
          ></input>
          <button
            className="copy-btn"
            onClick={() => {
              const copyText = userInfo?.myinfo.referercode;
              onCopyText(copyText);
            }}
            type="button"
          >
            <img src={copyImage} alt="Copy" />
          </button>
        </div>
        <div className="text-[#15a7a5]">Share this code with your friends</div>
      </div>
    </>
  );
}
