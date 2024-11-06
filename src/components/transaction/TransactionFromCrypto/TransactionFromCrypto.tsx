import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import {
  validateCrypto,
  validateHex64Or66,
  validatePositiveDecimal,
} from '@/lib/validate';
import { Crypto } from '@/types/crypto';

type Props = {
  cryptos?: Crypto[];
};

export default function TransactionFromCrypto({ cryptos }: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const activeCryptoIndex = watch('from.activeCryptoIndex');
  const activeCrypto = cryptos?.[activeCryptoIndex];

  return (
    <div className="inp_tit">
      <h3>From</h3>
      <div className="cont_box relative">
        <div className="inp_tit">
          <h3>Account</h3>
          <div className="money_inp ver_textarea ">
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto.urllogo,
                  label: crypto.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                {...register('from.activeCryptoIndex')}
                value={activeCryptoIndex}
              />
            )}
            <textarea
              className="inp_style"
              style={{ height: '100%', resize: 'none' }}
              disabled={!!watch('from.txhash')}
              {...register('from.cryptoAccount', {
                validate: (fromCryptoAccount) => {
                  if (watch('from.txhash')) {
                    return true;
                  }

                  if (!fromCryptoAccount) return 'Please Enter account';

                  if (!activeCrypto) {
                    return false;
                  }

                  return (
                    validateCrypto(fromCryptoAccount, activeCrypto?.symbol) ||
                    'Invalid account'
                  );
                },
              })}
            ></textarea>
          </div>
          <ErrorMessage
            errors={errors}
            name="from.cryptoAccount"
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
      <div className="cont_box">
        <div className="inp_tit">
          <h3>Amount</h3>
          <div className="money_inp">
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto.urllogo,
                  label: crypto.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                {...register('from.activeCryptoIndex')}
                value={activeCryptoIndex}
              />
            )}
            <input
              type="text"
              className="inp_style"
              {...register('from.cryptoAmount', {
                validate: (fromCryptoAmount) => {
                  if (watch('from.txhash')) {
                    return true;
                  }
                  if (!fromCryptoAmount) {
                    return 'Please enter amount';
                  }
                  return (
                    validatePositiveDecimal(fromCryptoAmount) ||
                    'Invalid amount'
                  );
                },
              })}
              disabled={!!watch('from.txhash')}
            />
            <span>{activeCrypto?.symbol}</span>
          </div>
          <ErrorMessage
            errors={errors}
            name="from.cryptoAmount"
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
      <div className="cont_box">
        <div className="inp_tit">
          <h3>txhash</h3>
          <div className="money_inp">
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto.urllogo,
                  label: crypto.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                {...register('from.activeCryptoIndex')}
                value={activeCryptoIndex}
              />
            )}
            <input
              type="text"
              className="inp_style"
              disabled={
                !!watch('from.cryptoAccount') || !!watch('from.cryptoAmount')
              }
              {...register('from.txhash', {
                validate: (fromTxhash) => {
                  if (
                    !!watch('from.cryptoAccount') ||
                    !!watch('from.cryptoAmount')
                  ) {
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
            name="from.txhash"
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
    </div>
  );
}
