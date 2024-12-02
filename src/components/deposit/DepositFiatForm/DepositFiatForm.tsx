import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import ImageSelect from '@/components/common/ImageSelect';

import ChangeImage from '@/assets/img/ico_change.png';

import { Bank } from '@/types/bank';
import { AdminBankAccount } from '@/types/deposit';

export type DepositFiatFormValue = {
  activeBankIndex: number;
  fromAccount: string;
  fromAmount: string;
  activeAdminAccountIndex: number;
};

type Props = {
  banks?: Bank[];
  adminBankAccounts?: AdminBankAccount[];
  depositPolicy?: string;
  onSubmitDepositFiatForm: (depositFormValue: DepositFiatFormValue) => void;
};

export default function DepositFiatForm({
  banks,
  adminBankAccounts,
  depositPolicy,
  onSubmitDepositFiatForm,
}: Props) {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useFormContext<DepositFiatFormValue>();

  const activeBankIndex = watch('activeBankIndex');
  const activeBank = banks?.[activeBankIndex];

  const ActiveAdminBankAccountIndex = watch('activeAdminAccountIndex');
  const activeAdminBankAccout = adminBankAccounts?.[activeBankIndex];

  useEffect(() => {
    setValue('fromAmount', '');
  }, [activeBank]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitDepositFiatForm)}>
        <div className="flexBox area02 ver_noList m-column">
          <div className="cont_box_wrp">
            <div
              className="cont_box flexBox area02 ver_noList m-column"
              style={{ position: 'relative' }}
            >
              <div className="inp_tit">
                <h3>From</h3>
                <div className="inp_txt">
                  <div className="money_inp">
                    <i className="label !min-w-0">BANK</i>
                    <ImageSelect
                      placeholder="bank"
                      className="z-10"
                      options={[
                        {
                          label: 'SELECT',
                          value: -1,
                        },
                      ].concat(
                        banks?.map((bank, index) => ({
                          img: bank.urllogo,
                          label: bank.banknameen,
                          value: index,
                        })) || [],
                      )}
                      value={activeBankIndex}
                      isVisibleLabel={true}
                      {...register('activeBankIndex', {
                        validate: (activeBankIndex) => {
                          if (activeBankIndex === -1) {
                            return 'Please select bank';
                          }
                          return true;
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="money_inp">
                    <i className="label">Account</i>
                    <input
                      type="text"
                      className="inp_style "
                      {...register('fromAccount', {
                        required: 'Please Enter account',
                        pattern: {
                          value: /^[0-9][0-9-]*$/,
                          message: 'Invalid account.',
                        },
                      })}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="fromAccount"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p
                          className="text-red-500 leading-[20px] text-[13px] text-left"
                          key={type}
                        >
                          {message}
                        </p>
                      ))
                    }
                  />
                  <div className="money_inp">
                    <i className="won"></i>
                    <input
                      onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = (event.target.value = event.target.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*?)\./g, '$1')
                          .replace(/^\./, ''));

                        const numericValue = parseFloat(value);
                        if (!isNaN(numericValue)) {
                          if (numericValue > Number(activeBank?.maxdeposit)) {
                            event.target.value =
                              activeBank?.maxdeposit as string;
                          }
                        }
                      }}
                      type="text"
                      className="inp_style"
                      {...register('fromAmount', {
                        required: 'Please Enter amount',
                        pattern: {
                          value: /^[1-9][0-9]*$/,
                          message: 'Invalid amount.',
                        },
                        validate: (fromAmount) => {
                          if (
                            Number(fromAmount) <
                              Number(activeBank?.mindeposit) ||
                            Number(fromAmount) > Number(activeBank?.maxdeposit)
                          ) {
                            return `Out of bounds`;
                          }
                        },
                      })}
                    />
                    <span>KRW</span>
                  </div>

                  {activeBank && (
                    <div className="mt-4">
                      MIN: {activeBank?.mindeposit} MAX:{' '}
                      {activeBank?.maxdeposit}
                    </div>
                  )}
                  <ErrorMessage
                    errors={errors}
                    name="fromAmount"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <p
                          className="text-red-500 leading-[20px] text-[13px] text-left"
                          key={type}
                        >
                          {message}
                        </p>
                      ))
                    }
                  />
                </div>
              </div>
              <span className="exchange pcVer">
                <img src={ChangeImage} alt="" />
              </span>
              <div className="inp_tit">
                <h3>TO</h3>
                <div className="inp_txt">
                  <div className="money_inp ">
                    <i className="label !min-w-0">BANK</i>
                    <ImageSelect
                      className="z-10"
                      options={adminBankAccounts?.map(
                        (adminAccount, index) => ({
                          img: adminAccount.urllogo,
                          label: adminAccount.bankname,
                          value: index,
                        }),
                      )}
                      value={ActiveAdminBankAccountIndex}
                      isVisibleLabel={true}
                      {...register('activeAdminAccountIndex', {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="money_inp in_alert">
                    <i className="label">Account</i>
                    <input
                      type="text"
                      className="inp_style"
                      value={
                        adminBankAccounts?.[watch('activeAdminAccountIndex')]
                          ?.number
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_box">
              <button className="disabled:!bg-gray-300" disabled={!isValid}>
                Request
              </button>
            </div>
            <div className="mt-8 mb-[15px] text-black">
              &quot;*{depositPolicy}*&quot;
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
