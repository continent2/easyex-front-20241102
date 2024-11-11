import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { Bank } from '@/types/bank';

type Props = {
  banks?: Bank[];
};

export default function TransactionToFiatDisabled({ banks }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const ActiveBankIndex = watch('to.activeBankIndex');
  const activeBank = banks?.[ActiveBankIndex];

  return (
    <div className="">
      <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
        TO
      </h3>
      <div className="flex flex-col gap-2">
        <div className="money_inp ">
          <i className="label !min-w-0">BANK</i>
          {banks && (
            <ImageSelect
              className="z-10"
              options={banks?.map((bank, index) => ({
                img: bank.urllogo,
                label: bank.banknameen,
                value: index,
              }))}
              isVisibleLabel={true}
              {...register('to.activeBankIndex', {
                valueAsNumber: true,
              })}
              value={ActiveBankIndex}
            />
          )}
        </div>
        <div className="money_inp in_alert">
          <i className="label">Bank</i>
          <input
            type="text"
            className="inp_style  disabled:bg-gray-300"
            disabled
            {...register('to.bankAccount', {
              required: 'Please Enter account',
              pattern: {
                value: /^[0-9][0-9-]*$/,
                message: 'Invalid account.',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="to.bankAccount"
            render={({ message }) => <p className="red_alert">{message}</p>}
          />
        </div>
        <div className="money_inp in_alert">
          <i className="won"></i>
          <input
            type="text"
            className="inp_style disabled:bg-gray-300"
            {...register('to.bankAmount')}
            readOnly
            disabled
          />
          <span>KRW</span>
        </div>
      </div>
      <div className="cont_box text-[#ff0000]">NO FIAT AVAILABLE</div>
    </div>
  );
}
