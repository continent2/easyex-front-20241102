import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { validateCrypto } from '@/lib/validate';
import { Crypto } from '@/types/crypto';

type Props = {
  cryptos?: Crypto[];
};

export default function TransactionToCryptoDisabled({ cryptos }: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const activeCryptoIndex = watch('to.activeCryptoIndex');
  const activeCrypto = cryptos?.[activeCryptoIndex];

  return (
    <div>
      <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
        TO
      </h3>
      <div className="cont_box">
        <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
          Account
        </h3>
        <div
          className="money_inp ver_textarea !px-[20px] relative !overflow-visible"
          aria-disabled
        >
          {cryptos && (
            <ImageSelect
              options={cryptos?.map((crypto, index) => ({
                img: crypto.urllogo,
                label: crypto.symbol,
                value: index,
              }))}
              isVisibleLabel={false}
              className="z-10"
              {...register('to.activeCryptoIndex')}
              value={activeCryptoIndex}
            />
          )}
          <textarea
            className="inp_style disabled:bg-white"
            disabled
            style={{ height: '100%', resize: 'none' }}
            {...register('to.cryptoAccount', {
              validate: (cryptoAccount) => {
                if (!cryptoAccount) return 'Please Enter account';

                if (!activeCrypto) {
                  return false;
                }

                return (
                  validateCrypto(cryptoAccount, activeCrypto?.symbol) ||
                  'Invalid account'
                );
              },
            })}
          ></textarea>
        </div>
      </div>
      <div className="cont_box">
        <div className="">
          <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
            Amount
          </h3>
          <div className="money_inp" aria-disabled>
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto.urllogo,
                  label: crypto.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                {...register('to.activeCryptoIndex')}
                value={activeCryptoIndex}
              />
            )}
            <input
              type="text"
              className="inp_style disabled:bg-white"
              disabled
              {...register('to.cryptoAmount')}
              readOnly
            />
            <span>{activeCrypto?.symbol}</span>
          </div>
        </div>
      </div>
      <div className="cont_box text-red-500 leading-[20px] text-[13px]">
        NO CURRENCIES AVAILABLE
      </div>
    </div>
  );
}
