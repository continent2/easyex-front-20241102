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
    formState: { errors },
  } = useFormContext<DepositFiatFormValue>();

  const activeBankIndex = watch('activeBankIndex');
  const activeBank = banks?.[activeBankIndex];

  const ActiveAdminBankAccountIndex = watch('activeAdminAccountIndex');
  const activeAdminBankAccout = adminBankAccounts?.[activeBankIndex];

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
                      className="z-10"
                      options={banks?.map((bank, index) => ({
                        img: bank.urllogo,
                        label: bank.banknameen,
                        value: index,
                      }))}
                      value={activeBankIndex}
                      isVisibleLabel={true}
                      {...register('activeBankIndex', {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="money_inp in_alert">
                    <i className="label">Account</i>
                    <input
                      type="text"
                      className="inp_style"
                      {...register('fromAccount', {
                        required: 'Please Enter account',
                        pattern: {
                          value: /^[0-9][0-9-]*$/,
                          message: 'Invalid account.',
                        },
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="fromAccount"
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
                      {...register('fromAmount', {
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
                      name="fromAmount"
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
                <div className="mt-2 mb-[15px] text-[#ff0000]">
                  {depositPolicy}
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
                          .number
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn_box">
              <button>Request</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
