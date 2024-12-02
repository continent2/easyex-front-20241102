import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import ImageSelect from '@/components/common/ImageSelect/ImageSelect';

import ChangeImage from '@/assets/img/ico_change.png';
import copyImage from '@/assets/img/ico-copy.png';

import useModal from '@/lib/hooks/useModal';
import {
  validateCrypto,
  validateHex64Or66,
  validatePositiveDecimal,
} from '@/lib/validate';
import { DepositInfo } from '@/types/deposit';

export type DepositCryptoFormValue = {
  activeDepositInfoIndex: number;
  fromAccount: string;
  fromAmount: string;
  fromTxhash: string;
};

type Props = {
  depositInfo?: DepositInfo[];
  depositPolicy?: string;
  onSubmitDepositCryptoForm: (
    depositCryptoFormValue: DepositCryptoFormValue,
  ) => void;
};

export default function DepositCryptoForm({
  depositInfo,
  depositPolicy,
  onSubmitDepositCryptoForm,
}: Props) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<DepositCryptoFormValue>();

  const activeDepositInfoIndex = watch('activeDepositInfoIndex');
  const activeDepositInfo = depositInfo?.[activeDepositInfoIndex];
  const activeCrypto = activeDepositInfo?.from;
  const activeAdminCryptoAccount = activeDepositInfo?.to;

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
    <div className="cont_box_wrp">
      <form onSubmit={handleSubmit(onSubmitDepositCryptoForm)}>
        <div
          className="cont_box flexBox area02 ver_noList m-column gap-[20px]"
          style={{ position: 'relative' }}
        >
          <div className="relative inp_tit" style={{ width: '40%' }}>
            <h3>From</h3>
            <div className="cont_box">
              <h3>Account</h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
                aria-disabled={!!watch('fromTxhash')}
              >
                <ImageSelect
                  options={depositInfo?.map((depositInfo, index) => ({
                    img: depositInfo.from?.urllogo,
                    label: depositInfo.from?.symbol,
                    value: index,
                    disabled:
                      depositInfo.to === null || depositInfo.to.active === 0,
                  }))}
                  isVisibleLabel={false}
                  className="z-10"
                  onChange={(e) =>
                    setValue('activeDepositInfoIndex', e.target.value as number)
                  }
                  value={activeDepositInfoIndex}
                />
                <textarea
                  className="inp_style disabled:bg-white"
                  style={{ height: '100%', resize: 'none' }}
                  disabled={!!watch('fromTxhash')}
                  {...register('fromAccount', {
                    validate: (fromAccount) => {
                      if (watch('fromTxhash')) {
                        return true;
                      }

                      if (!fromAccount) return 'Please Enter account';

                      if (!activeCrypto) {
                        return false;
                      }

                      return (
                        validateCrypto(fromAccount, activeCrypto?.symbol) ||
                        'Invalid account'
                      );
                    },
                  })}
                ></textarea>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="fromAccount"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p
                    className="text-red-500 leading-[20px] text-[13px] text-left"
                    key={type}
                  >
                    {message}
                  </p>
                ))
              }
            />
          </div>
          <span className="exchange pcVer">
            <img src={ChangeImage} alt="" />
          </span>

          <div className="inp_tit lg:hidden" style={{ width: '40%' }}>
            <h3>TO</h3>
            <div className="cont_box">
              <h3>Account</h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
              >
                <ImageSelect
                  options={[
                    {
                      img: activeAdminCryptoAccount?.urllogo,
                      label: activeAdminCryptoAccount?.symbol,
                      value: activeDepositInfoIndex,
                    },
                  ]}
                  isVisibleLabel={false}
                  className="z-10"
                  onChange={(e) =>
                    setValue('activeDepositInfoIndex', e.target.value as number)
                  }
                  value={activeDepositInfoIndex}
                />
                <textarea
                  className="inp_style"
                  style={{ height: '100%', resize: 'none' }}
                  value={activeAdminCryptoAccount?.address || ''}
                  readOnly
                ></textarea>
                {activeAdminCryptoAccount?.address && (
                  <button
                    className="copy-btn z-10 absolute bottom-1 right-1"
                    onClick={() => {
                      const copyText = activeAdminCryptoAccount?.address;
                      onCopyText(copyText);
                    }}
                    type="button"
                  >
                    <img src={copyImage} alt="Copy" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit">
            <h3>Amount</h3>
            <div className="money_inp" aria-disabled={!!watch('fromTxhash')}>
              <ImageSelect
                options={depositInfo?.map((depositInfo, index) => ({
                  img: depositInfo.from?.urllogo,
                  label: depositInfo.from?.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                onChange={(e) =>
                  setValue('activeDepositInfoIndex', e.target.value as number)
                }
                value={activeDepositInfoIndex}
              />
              <input
                type="text"
                className="inp_style disabled:bg-white"
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = (event.target.value = event.target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*?)\./g, '$1')
                    .replace(/^\./, ''));

                  const numericValue = parseFloat(value);
                  if (!isNaN(numericValue)) {
                    if (numericValue > Number(activeCrypto?.maxdeposit)) {
                      event.target.value = activeCrypto?.maxdeposit as string;
                    }
                  }
                }}
                {...register('fromAmount', {
                  validate: (fromAmount) => {
                    if (watch('fromTxhash')) {
                      return true;
                    }
                    if (!fromAmount) {
                      return 'Please enter amount';
                    }

                    if (
                      Number(fromAmount) < Number(activeCrypto?.mindeposit) ||
                      Number(fromAmount) > Number(activeCrypto?.maxdeposit)
                    ) {
                      return `Out of bounds`;
                    }

                    return (
                      validatePositiveDecimal(fromAmount) || 'Invalid amount'
                    );
                  },
                })}
                disabled={!!watch('fromTxhash')}
              />
              <span>{activeCrypto?.symbol}</span>
            </div>
            <div className="mt-4 text-left">
              MIN: {activeCrypto?.mindeposit} MAX: {activeCrypto?.maxdeposit}
            </div>
            <ErrorMessage
              errors={errors}
              name="fromAmount"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p
                    className="text-red-500 leading-[20px] text-[13px] text-left"
                    key={type}
                  >
                    {message}
                  </p>
                ))
              }
            />
          </div>
        </div>

        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit">
            <h3>txhash</h3>
            <div
              className="money_inp"
              aria-disabled={!!watch('fromAccount') || !!watch('fromAmount')}
            >
              <ImageSelect
                options={depositInfo?.map((depositInfo, index) => ({
                  img: depositInfo.from?.urllogo,
                  label: depositInfo.from?.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                onChange={(e) =>
                  setValue('activeDepositInfoIndex', e.target.value as number)
                }
                value={activeDepositInfoIndex}
              />
              <input
                type="text"
                className="inp_style disabled:bg-white"
                disabled={!!watch('fromAccount') || !!watch('fromAmount')}
                {...register('fromTxhash', {
                  validate: (fromTxhash) => {
                    if (!!watch('fromAccount') || !!watch('fromAmount')) {
                      return true;
                    }

                    if (!fromTxhash) return 'Please Enter txhash';
                    return validateHex64Or66(fromTxhash) || 'Invalid txhash';
                  },
                })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="fromTxhash"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p
                    className="text-red-500 leading-[20px] text-[13px] text-left"
                    key={type}
                  >
                    {message}
                  </p>
                ))
              }
            />
          </div>
        </div>
        <div className="cont_box flexBox area02 ver_noList m-column mt-3 !hidden lg:!block">
          <div className="inp_tit" style={{ width: '40%' }}>
            <h3>TO</h3>
            <div className="cont_box">
              <h3>Account</h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
              >
                <ImageSelect
                  options={[
                    {
                      img: activeAdminCryptoAccount?.urllogo,
                      label: activeAdminCryptoAccount?.symbol,
                      value: activeDepositInfoIndex,
                    },
                  ]}
                  isVisibleLabel={false}
                  className="z-10"
                  onChange={(e) =>
                    setValue('activeDepositInfoIndex', e.target.value as number)
                  }
                  value={activeDepositInfoIndex}
                />
                <textarea
                  className="inp_style"
                  style={{ height: '100%', resize: 'none' }}
                  value={activeAdminCryptoAccount?.address || ''}
                  readOnly
                ></textarea>
                {activeAdminCryptoAccount?.address && (
                  <button
                    className="copy-btn z-10 absolute bottom-1 right-1"
                    onClick={() => {
                      const copyText = activeAdminCryptoAccount?.address;
                      onCopyText(copyText);
                    }}
                    type="button"
                  >
                    <img src={copyImage} alt="Copy" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit !w-full">
            <div className="btn_box">
              <button className="disabled:!bg-gray-300" disabled={!isValid}>
                Request
              </button>
            </div>
            <div className="mt-8 text-black">*{depositPolicy}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
