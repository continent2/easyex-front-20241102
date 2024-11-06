import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { Bank } from '@/types/bank';

type Props = {
  banks?: Bank[];
};

export default function TransactionFromFiat({ banks }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  return (
    <div className="inp_tit">
      <h3>From</h3>
      <div className="inp_txt">
        <div className="money_inp">
          <i className="label !min-w-0">BANK</i>
          {banks && (
            <ImageSelect
              defaultValue={0}
              className="z-10"
              options={banks?.map((bank, index) => ({
                img: bank.urllogo,
                label: bank.banknameen,
                value: index,
              }))}
              isVisibleLabel={true}
              {...register('from.activeBankIndex')}
            />
          )}
        </div>
        <div className="money_inp in_alert">
          <i className="label">Account</i>
          <input
            type="text"
            className="inp_style"
            {...register('from.bankAccount', {
              required: 'Please Enter account',
              pattern: {
                value: /^[0-9][0-9-]*$/,
                message: 'Invalid account.',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="from.bankAccount"
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
        <div className="money_inp in_alert">
          <i className="won"></i>
          <input
            type="text"
            className="inp_style"
            {...register('from.bankAmount', {
              required: 'Please Enter amount',
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: 'Invalid amount.',
              },
            })}
          />
          <span>KRW</span>
          <ErrorMessage
            errors={errors}
            name="from.bankAmount"
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
