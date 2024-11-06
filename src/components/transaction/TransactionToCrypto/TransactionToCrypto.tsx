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
    <div className="inp_tit" style={{ width: '40%' }}>
      <h3>TO</h3>
      <div className="cont_box">
        <h3>Account</h3>
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
        <div className="inp_tit">
          <h3>Amount</h3>
          <div className="money_inp">
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
