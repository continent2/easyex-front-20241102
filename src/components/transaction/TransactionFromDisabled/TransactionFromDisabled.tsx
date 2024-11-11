import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { validatePositiveDecimal } from '@/lib/validate';
import { Crypto } from '@/types/crypto';

type Props = {
  cryptos?: Crypto[];
};

export default function TransactionFromDisabled({ cryptos }: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const activeAccountIndex = watch('from.activeAccountIndex');
  const activeAccount = cryptos?.[activeAccountIndex];

  return (
    <div>
      <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
        From
      </h3>
      <div className="cont_box relative">
        <div>
          <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
            Account
          </h3>
          <div className="money_inp">
            <i>Currency</i>
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto?.urllogo,
                  label: crypto?.symbol,
                  value: index,
                }))}
                isVisibleLabel={true}
                className="z-10"
                {...register('from.activeAccountIndex')}
                value={activeAccountIndex}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cont_box">
        <div>
          <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px] ">
            Amount
          </h3>
          <div className="money_inp">
            {cryptos && (
              <ImageSelect
                options={cryptos?.map((crypto, index) => ({
                  img: crypto.urllogo,
                  label: crypto.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10 "
                {...register('from.activeAccountIndex')}
                value={activeAccountIndex}
              />
            )}
            <input
              type="text"
              className="inp_style disabled:bg-gray-300"
              disabled
              {...register('from.amount', {
                validate: (amount) => {
                  if (!amount) {
                    return 'Please enter amount';
                  }
                  return validatePositiveDecimal(amount) || 'Invalid amount';
                },
              })}
            />
            <span>{activeAccount?.symbol}</span>
          </div>
        </div>
      </div>
      <div className="cont_box text-[#ff0000]">NO BALANCES</div>
    </div>
  );
}
