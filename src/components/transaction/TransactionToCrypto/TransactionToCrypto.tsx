import { useFormContext } from 'react-hook-form';

import { WithDrawFormValue } from '@/pages/WithdrawPage';

import ImageSelect from '@/components/common/ImageSelect';

import { AdminCryptoAccount } from '@/types/deposit';

type Props = {
  adminCryptoAccounts?: AdminCryptoAccount[];
};

export default function TransactionToCrypto({ adminCryptoAccounts }: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<WithDrawFormValue>();

  const activeAdminCryptoAccountIndex = watch(
    'to.activeAdminCryptoAccountIndex',
  );
  const activeAdminCryptoAccount =
    adminCryptoAccounts?.[activeAdminCryptoAccountIndex];

  return (
    <div>
      <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
        TO
      </h3>
      <div className="cont_box">
        <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
          Account
        </h3>
        <div className="money_inp ver_textarea !px-[20px]">
          {adminCryptoAccounts && (
            <ImageSelect
              options={adminCryptoAccounts?.map(
                (adminCryptoAccount, index) => ({
                  img: adminCryptoAccount.urllogo,
                  label: adminCryptoAccount.symbol,
                  value: index,
                }),
              )}
              isVisibleLabel={false}
              className="z-10"
              {...register('to.activeAdminCryptoAccountIndex')}
              value={activeAdminCryptoAccountIndex}
            />
          )}
          <textarea
            className="inp_style"
            style={{ height: '100%', resize: 'none' }}
            value={activeAdminCryptoAccount?.address || ''}
            readOnly
          ></textarea>
        </div>
      </div>
      <div className="cont_box">
        <div className="">
          <h3 className="text-[#15a7a5] uppercase tracking-[-0.5px] font-extrabold text-[18px] mb-[10px]">
            Amount
          </h3>
          <div className="money_inp  ">
            {adminCryptoAccounts && (
              <ImageSelect
                options={adminCryptoAccounts?.map(
                  (adminCryptoAccount, index) => ({
                    img: adminCryptoAccount.urllogo,
                    label: adminCryptoAccount.symbol,
                    value: index,
                  }),
                )}
                isVisibleLabel={false}
                className="z-10"
                {...register('to.activeAdminCryptoAccountIndex')}
                value={activeAdminCryptoAccountIndex}
              />
            )}
            <input
              type="text"
              className="inp_style"
              {...register('to.cryptoAmount')}
              readOnly
            />
            <span>{activeAdminCryptoAccount?.symbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
