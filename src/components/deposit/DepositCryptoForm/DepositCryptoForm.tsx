import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import ImageSelect from '@/components/common/ImageSelect/ImageSelect';

import ChangeImage from '@/assets/img/ico_change.png';

import {
  validateCrypto,
  validateHex64Or66,
  validatePositiveDecimal,
} from '@/lib/validate';
import { AdminCryptoAccount, Token } from '@/types/deposit';

export type DepositCryptoFormValue = {
  activeCryptoIndex: number;
  fromAccount: string;
  fromAmount: string;
  fromTxhash: string;
  activeAdminCryptoAccountIndex: number;
};

type Props = {
  cryptos?: Token[];
  adminCryptoAccounts?: AdminCryptoAccount[];
  depositPolicy?: string;
  onSubmitDepositCryptoForm: (
    depositCryptoFormValue: DepositCryptoFormValue,
  ) => void;
};

export default function DepositCryptoForm({
  cryptos,
  adminCryptoAccounts,
  depositPolicy,
  onSubmitDepositCryptoForm,
}: Props) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<DepositCryptoFormValue>();

  const activeCryptoIndex = watch('activeCryptoIndex');
  const activeCrypto = cryptos?.[activeCryptoIndex];
  const activeAdminCryptoAccountIndex = watch('activeAdminCryptoAccountIndex');
  const activeAdminCryptoAccount =
    adminCryptoAccounts?.[activeAdminCryptoAccountIndex];

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
              <h3>보내시는 계좌 </h3>
              <div
                className="money_inp ver_textarea !px-[20px]"
                style={{ width: '100%' }}
              >
                <ImageSelect
                  options={cryptos?.map((crypto, index) => ({
                    img: crypto.urllogo,
                    label: crypto.symbol,
                    value: index,
                  }))}
                  onChange={(_, index) => setValue('activeCryptoIndex', index)}
                  value={activeCryptoIndex}
                />
                <textarea
                  className="inp_style"
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
              <ErrorMessage
                errors={errors}
                name="fromAccount"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p className="red_alert" key={type}>
                      {message}
                    </p>
                  ))
                }
              />
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
                <ImageSelect
                  options={adminCryptoAccounts?.map(
                    (adminCryptoAccount, index) => ({
                      img: adminCryptoAccount.urllogo,
                      label: adminCryptoAccount.symbol,
                      value: index,
                    }),
                  )}
                  onChange={(_, index) =>
                    setValue('activeAdminCryptoAccountIndex', index)
                  }
                  value={activeAdminCryptoAccountIndex}
                />
                <textarea
                  className="inp_style"
                  style={{ height: '100%', resize: 'none' }}
                  value={activeAdminCryptoAccount?.address || ''}
                  readOnly
                ></textarea>
              </div>
              {/* <p className="red_alert">유효하지 않은 주소입니다.</p> */}
            </div>
          </div>
        </div>

        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit">
            <h3>금액</h3>
            <div className="money_inp">
              <ImageSelect
                options={cryptos?.map((cryptos, index) => ({
                  img: cryptos.urllogo,
                  label: cryptos.name,
                  value: index,
                }))}
                onChange={(_, index) => setValue('activeCryptoIndex', index)}
                value={activeCryptoIndex}
              />
              <input
                type="text"
                className="inp_style"
                {...register('fromAmount', {
                  validate: (fromAmount) => {
                    if (watch('fromTxhash')) {
                      return true;
                    }
                    if (!fromAmount) {
                      return 'Please enter amount';
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
            <ErrorMessage
              errors={errors}
              name="fromAmount"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p className="red_alert" key={type}>
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
            <div className="money_inp">
              <ImageSelect
                options={cryptos?.map((cryptos, index) => ({
                  img: cryptos.urllogo,
                  label: cryptos.name,
                  value: index,
                }))}
                onChange={(_, index) => setValue('activeCryptoIndex', index)}
                value={activeCryptoIndex}
              />
              <input
                type="text"
                className="inp_style"
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
                  <p className="red_alert" key={type}>
                    {message}
                  </p>
                ))
              }
            />
          </div>
        </div>
        <div className="cont_box flexBox area02 ver_noList m-column">
          <div className="inp_tit">
            <div className="mt-8 text-[#ff0000]">{depositPolicy}</div>
            <div className="btn_box">
              <button>Request</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}