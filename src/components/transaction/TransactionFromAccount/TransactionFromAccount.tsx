import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { validatePositiveDecimal } from '@/lib/validate';
import { Account } from '@/types/account';

type Props = {
  accounts?: Account[];
};

export default function TransactionFromAccount({ accounts }: Props) {
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
                  img: account.urllogo,
                  label: account.symbol,
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
