import { useFormContext } from 'react-hook-form';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { AdminBankAccount } from '@/types/deposit';

type Props = {
  adminBankAccounts?: AdminBankAccount[];
};

export default function TransactionToFiat({ adminBankAccounts }: Props) {
  const { register, watch } = useFormContext<WithDrawFormValue>();

  const ActiveAdminBankAccountIndex = watch('to.activeAdminBankAccountIndex');
  const activeAdminBankAccout =
    adminBankAccounts?.[ActiveAdminBankAccountIndex];

  return (
    <div className="">
      <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
        TO
      </h3>
      <div className="flex flex-col gap-2">
        <div className="money_inp ">
          <i className="label !min-w-0">BANK</i>
          {adminBankAccounts && (
            <ImageSelect
              className="z-10"
              options={adminBankAccounts?.map((adminAccount, index) => ({
                img: adminAccount.urllogo,
                label: adminAccount.bankname,
                value: index,
              }))}
              isVisibleLabel={true}
              {...register('to.activeAdminBankAccountIndex', {
                valueAsNumber: true,
              })}
              value={ActiveAdminBankAccountIndex}
            />
          )}
        </div>
        <div className="money_inp in_alert">
          <i className="label">Account</i>
          <input
            type="text"
            className="inp_style"
            defaultValue={activeAdminBankAccout?.number}
            readOnly
          />
        </div>
        <div className="money_inp in_alert">
          <i className="won"></i>
          <input
            type="text"
            className="inp_style"
            {...register('to.bankAmount')}
            readOnly
          />
          <span>KRW</span>
        </div>
      </div>
    </div>
  );
}
