import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import CryptoFiatToggleGroup from '@/components/common/CryptoFiatToggleGroup';
import TransactionFromCrypto from '@/components/transaction/TransactionFromCrypto';
import TransactionFromFiat from '@/components/transaction/TransactionFromFiat';
import TransactionToCrypto from '@/components/transaction/TransactionToCrypto';
import TransactionToFiat from '@/components/transaction/TransactionToFiat';

import ChangeImage from '@/assets/img/ico_change.png';

import { env } from '@/env';
import { getAdminAccounts } from '@/lib/api/account';
import { getBanks } from '@/lib/api/bank';
import { getCryptos } from '@/lib/api/crypto';
import {
  getExchangeRate,
  getWithDrawPolicy,
  withdraw,
} from '@/lib/api/withdraw';
import useModal from '@/lib/hooks/useModal';
import { Bank } from '@/types/bank';
import { Crypto } from '@/types/crypto';
import { AdminBankAccount, AdminCryptoAccount } from '@/types/deposit';
import { ExChangeRate } from '@/types/withdraw';

export type WithDrawFormValue = {
  from: {
    activeBankIndex: number;
    bankAccount: string;
    bankAmount: string;
    activeCryptoIndex: number;
    cryptoAccount: string;
    cryptoAmount: string;
    txhash: string;
  };
  to: {
    activeAdminCryptoAccountIndex: number;
    activeAdminBankAccountIndex: number;
    bankAmount: string;
    cryptoAmount: string;
  };
};

export default function WithdrawPage() {
  const [searchParams] = useSearchParams();
  const fromTypecfParam = searchParams.get('fromTypecf');
  const initFromTypecf =
    fromTypecfParam === 'C' || fromTypecfParam === 'F' ? fromTypecfParam : 'C';
  const fromSymbolParm = searchParams.get('fromSymbol');

  const [fromTypecf, setFromTypecf] = useState<'C' | 'F'>(initFromTypecf);
  const [toTypecf, setToTypecf] = useState<'C' | 'F'>('C');

  const withDrawForm = useForm<WithDrawFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      from: {
        activeBankIndex: 0,
        activeCryptoIndex: 0,
      },
      to: {
        activeAdminCryptoAccountIndex: 0,
        activeAdminBankAccountIndex: 0,
        bankAmount: '0',
        cryptoAmount: '0',
      },
    },
  });

  const { watch, setValue, handleSubmit } = withDrawForm;

  const { data: banks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    select: (response) => response.data.list as Bank[],
    enabled: fromTypecf === 'F' || toTypecf === 'F',
  });

  const { data: cryptos } = useQuery({
    queryKey: ['cryptos', 'C'],
    queryFn: () => getCryptos('C'),
    select: (response) => response.data.list as Crypto[],
    enabled: fromTypecf === 'C' || toTypecf === 'C',
  });

  useEffect(() => {
    if (cryptos && fromSymbolParm) {
      const activeCryptoIndex = cryptos.findIndex(
        (crypto) => crypto.symbol === fromSymbolParm,
      );
      if (activeCryptoIndex !== -1) {
        withDrawForm.setValue('from.activeCryptoIndex', activeCryptoIndex);
      }
    }
  }, [cryptos]);

  const { data: adminBankAccounts } = useQuery({
    queryKey: ['adminBankAccounts', 'F'],
    queryFn: () => getAdminAccounts({ typecf: 'F' }),
    select: (response) => response.data.list as AdminBankAccount[],
    enabled: toTypecf === 'F',
  });

  const { data: adminCryptoAccounts } = useQuery({
    queryKey: ['adminCryptoAccounts', 'C'],
    queryFn: () =>
      getAdminAccounts({
        typecf: 'C',
        nettype: env.netType,
      }),
    select: (response) => response.data.list as AdminCryptoAccount[],
    enabled: toTypecf === 'C',
  });

  const activeCryptoSymbol = cryptos?.[watch('from.activeCryptoIndex')]?.symbol;
  const activeBankSymbol =
    banks?.[watch('from.activeBankIndex')]?.primarycurrency;
  const activeAdminCryptoAccountSymbol =
    cryptos?.[watch('to.activeAdminCryptoAccountIndex')]?.symbol;
  const activeAdminBankAccountSymbol = 'KRW';
  const cryptoAmount = watch('from.cryptoAmount');
  const bankAmount = watch('from.bankAmount');

  const from = (
    fromTypecf === 'C' ? activeCryptoSymbol : activeBankSymbol
  ) as string;
  const to = (
    toTypecf === 'C'
      ? activeAdminCryptoAccountSymbol
      : activeAdminBankAccountSymbol
  ) as string;
  const amount = fromTypecf === 'C' ? cryptoAmount : bankAmount;

  const { data: exChangeRate } = useQuery({
    queryKey: ['exChangeRate', fromTypecf, toTypecf, to, from, amount],
    queryFn: () =>
      getExchangeRate({
        from,
        to,
        amount,
      }),
    select: (response) => response.data.respdata as ExChangeRate,
    enabled: !!to && !!from && !!amount,
  });

  useEffect(() => {
    if (exChangeRate) {
      if (toTypecf === 'C') {
        setValue('to.cryptoAmount', exChangeRate.toamount);
        return;
      }
      setValue('to.bankAmount', exChangeRate.toamount);
    }
  }, [exChangeRate]);

  const { data: withDrawPolicy } = useQuery({
    queryKey: ['withDrawPolicy'],
    queryFn: getWithDrawPolicy,
    select: (response) => response.data.policy as string,
  });

  const { openModal } = useModal();

  const { mutate: withdrawMutate } = useMutation({
    mutationFn: withdraw,
    onSuccess: (response) => {
      openModal({
        title: response.data.message,
        content: (
          <>
            <div>{response.data.expiry - new Date().getTime() / 1000}</div>
            <div>Request ID: {response.data.uuid}</div>
          </>
        ),
        isVisibleOkBtn: true,
      });
    },
  });

  const onSubmitWithdrawFrom = (withDrawFormValue: WithDrawFormValue) => {
    const activeCrypto = cryptos?.[withDrawFormValue.from.activeCryptoIndex];
    const activeAdminCryptoAccount =
      adminCryptoAccounts?.[withDrawFormValue.to.activeAdminCryptoAccountIndex];

    const activeBank = banks?.[withDrawFormValue.from.activeBankIndex];
    const activeAdminBank =
      adminBankAccounts?.[withDrawFormValue.to.activeAdminBankAccountIndex];

    // C TO C
    if (toTypecf === 'C' && fromTypecf === 'C') {
      // account
      if (
        withDrawFormValue.from.cryptoAccount &&
        withDrawFormValue.from.cryptoAmount
      ) {
        withdrawMutate({
          from: {
            typecf: 'C',
            symbol: activeCrypto?.symbol,
            address: withDrawFormValue.from.cryptoAccount,
            amount: withDrawFormValue.from.cryptoAmount,
          },
          to: {
            typecf: 'C',
            symbol: activeAdminCryptoAccount?.symbol,
            address: activeAdminCryptoAccount?.address,
            amount: withDrawFormValue.to.cryptoAmount,
          },
          quotesignature: exChangeRate?.quotesignature,
        });
        return;
      }

      // txhash
      if (withDrawFormValue.from.txhash) {
        withdrawMutate({
          from: {
            typecf: 'C',
            symbol: activeCrypto?.symbol,
            txhash: withDrawFormValue.from.txhash,
          },
          to: {
            typecf: 'C',
            symbol: activeAdminCryptoAccount?.symbol,
            address: activeAdminCryptoAccount?.address,
            amount: withDrawFormValue.to.cryptoAmount,
          },
          quotesignature: exChangeRate?.quotesignature,
        });
      }

      // C TO F
    } else if (toTypecf === 'C' && fromTypecf === 'F') {
      // account
      if (
        withDrawFormValue.from.cryptoAccount &&
        withDrawFormValue.from.cryptoAmount
      ) {
        withdrawMutate({
          from: {
            typecf: 'C',
            symbol: activeCrypto?.symbol,
            address: withDrawFormValue.from.cryptoAccount,
            amount: withDrawFormValue.from.cryptoAmount,
          },
          to: {
            typecf: 'F',
            account: activeAdminBank?.number,
            amount: withDrawFormValue.to.bankAmount,
            bankcode: activeAdminBank?.bankcode,
            bankname: activeAdminBank?.bankname,
            symbol: 'KRW',
          },
          quotesignature: exChangeRate?.quotesignature,
        });
        return;
      }

      // txhash
      if (withDrawFormValue.from.txhash) {
        withdrawMutate({
          from: {
            typecf: 'C',
            symbol: activeCrypto?.symbol,
            txhash: withDrawFormValue.from.txhash,
          },
          to: {
            typecf: 'F',
            account: activeAdminBank?.number,
            amount: withDrawFormValue.to.bankAmount,
            bankcode: activeAdminBank?.bankcode,
            bankname: activeAdminBank?.bankname,
            symbol: 'KRW',
          },
          quotesignature: exChangeRate?.quotesignature,
        });
      }

      // F TO F
    } else if (toTypecf === 'F' && fromTypecf === 'F') {
      withdrawMutate({
        from: {
          typecf: 'F',
          account: withDrawFormValue.from.bankAccount,
          amount: withDrawFormValue.from.bankAmount,
          bankcode: activeBank?.code,
          bankname: activeBank?.banknameen,
          symbol: activeBank?.primarycurrency,
        },
        to: {
          typecf: 'F',
          account: activeAdminBank?.number,
          amount: withDrawFormValue.to.bankAmount,
          bankcode: activeAdminBank?.bankcode,
          bankname: activeAdminBank?.bankname,
          symbol: 'KRW',
        },
        quotesignature: exChangeRate?.quotesignature,
      });
      // F TO C
    } else if (toTypecf === 'F' && fromTypecf === 'C') {
      withdrawMutate({
        from: {
          typecf: 'F',
          account: withDrawFormValue.from.bankAccount,
          amount: withDrawFormValue.from.bankAmount,
          bankcode: activeBank?.code,
          bankname: activeBank?.banknameen,
          symbol: activeBank?.primarycurrency,
        },
        to: {
          typecf: 'C',
          symbol: activeAdminCryptoAccount?.symbol,
          address: activeAdminCryptoAccount?.address,
          amount: withDrawFormValue.to.cryptoAmount,
        },
        quotesignature: exChangeRate?.quotesignature,
      });
    }
  };

  return (
    <>
      <h2>withdraw</h2>
      <div className="flexBox area02 ver_noList m-column">
        <div className="cont_box_wrp">
          <FormProvider {...withDrawForm}>
            <form onSubmit={handleSubmit(onSubmitWithdrawFrom)}>
              <div className="cont_box flex gap-10 xl:flex-col">
                <div>
                  <CryptoFiatToggleGroup
                    value={fromTypecf}
                    onChange={(_, fromTypecf) => setFromTypecf(fromTypecf)}
                  />
                  {fromTypecf === 'C' && (
                    <TransactionFromCrypto cryptos={cryptos} />
                  )}
                  {fromTypecf === 'F' && <TransactionFromFiat banks={banks} />}
                </div>
                <img
                  className="w-9 h-9 self-center xl:hidden"
                  src={ChangeImage}
                />
                <div>
                  <CryptoFiatToggleGroup
                    value={toTypecf}
                    onChange={(_, toTypecf) => setToTypecf(toTypecf)}
                  />
                  {toTypecf === 'C' && (
                    <TransactionToCrypto
                      adminCryptoAccounts={adminCryptoAccounts}
                    />
                  )}
                  {toTypecf === 'F' && (
                    <TransactionToFiat adminBankAccounts={adminBankAccounts} />
                  )}
                </div>
              </div>
              <div className="cont_box flexBox area02 ver_noList m-column">
                <div className="inp_tit !w-full">
                  <div className="btn_box">
                    <button>Request</button>
                  </div>
                  <div className="mt-8 text-black text-center">
                    &quot;*{withDrawPolicy}*&quot;
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
