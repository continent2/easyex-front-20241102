import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { safeToLocaleString } from '@/lib/common';
import { validatePositiveDecimal } from '@/lib/validate';
import { Account } from '@/types/account';

type Props = {
  accounts?: Account[];
  exchangeAllowedPairs?: any;
  activeExchangeAllowedPair: any;
};

export default function TransactionFromAccount({
  accounts,
  exchangeAllowedPairs,
  activeExchangeAllowedPair,
}: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const activeAccountIndex = watch('from.activeAccountIndex');
  const activeAccount = accounts?.[activeAccountIndex];

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
            {accounts && (
              <ImageSelect
                options={accounts?.map((account, index) => ({
                  img: account?.urllogo,
                  label: account?.symbol,
                  value: index,
                }))}
                isVisibleLabel={true}
                className="z-10"
                {...register('from.activeAccountIndex')}
                value={activeAccountIndex}
              />
            )}
          </div>
          <ErrorMessage
            errors={errors}
            name="from.accountAccount"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p
                  className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px]"
                  key={type}
                >
                  {message}
                </p>
              ))
            }
          />
        </div>
      </div>
      <div className="cont_box">
        <div>
          <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
            Amount
          </h3>
          <div className="money_inp">
            {accounts && (
              <ImageSelect
                options={accounts?.map((account, index) => ({
                  img: account.urllogo,
                  label: account.symbol,
                  value: index,
                }))}
                isVisibleLabel={false}
                className="z-10"
                {...register('from.activeAccountIndex')}
                value={activeAccountIndex}
              />
            )}
            <input
              type="text"
              className="inp_style"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = (event.target.value = event.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*?)\./g, '$1')
                  .replace(/^\./, ''));

                const numericValue = parseFloat(value);
                if (!isNaN(numericValue)) {
                  if (
                    numericValue > Number(activeExchangeAllowedPair?.maxdeposit)
                  ) {
                    event.target.value =
                      activeExchangeAllowedPair?.maxdeposit as string;
                  }
                }
              }}
              placeholder={safeToLocaleString(activeAccount?.balancefloat)}
              {...register('from.amount', {
                validate: (amount) => {
                  if (!amount) {
                    return 'Please enter amount';
                  }

                  if (activeExchangeAllowedPair) {
                    if (
                      Number(amount) <
                      Number(activeExchangeAllowedPair.minwithdrawamount)
                    ) {
                      return `Out of bounds`;
                    }

                    if (
                      Number(amount) >
                      Number(activeExchangeAllowedPair.maxwithdrawamount)
                    ) {
                      return `Out of bounds`;
                    }
                  }

                  return validatePositiveDecimal(amount) || 'Invalid amount';
                },
              })}
            />
            <span>{activeAccount?.symbol}</span>
          </div>
          {activeExchangeAllowedPair && (
            <div className="mt-4">{`MIN: ${safeToLocaleString(Number(activeExchangeAllowedPair.minwithdrawamount))},  MAX:${safeToLocaleString(Number(activeExchangeAllowedPair.maxwithdrawamount))}`}</div>
          )}
          <ErrorMessage
            errors={errors}
            name="from.amount"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p
                  className="absolute bottom-[-25px] text-red-500 leading-[20px] text-[13px]"
                  key={type}
                >
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
