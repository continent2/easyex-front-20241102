import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import CryptoFiatToggleGroup from '@/components/common/CryptoFiatToggleGroup';
import TransactionFromAccount from '@/components/transaction/TransactionFromAccount';
import TransactionToCrypto from '@/components/transaction/TransactionToCrypto';
import TransactionToFiat from '@/components/transaction/TransactionToFiat';

import ChangeImage from '@/assets/img/ico_change.png';

import { getAccounts } from '@/lib/api/account';
import { getBanks } from '@/lib/api/bank';
import { getCryptos } from '@/lib/api/crypto';
import {
  getExchangeAllowedPairs,
  getExchangeRate,
  getWithDrawPolicy,
  withdraw,
} from '@/lib/api/withdraw';
import useModal from '@/lib/hooks/useModal';
import { Account } from '@/types/account';
import { Bank } from '@/types/bank';
import { Crypto } from '@/types/crypto';
import { ExChangeRate } from '@/types/withdraw';

export type WithDrawFormValue = {
  from: {
    activeAccountIndex: number;
    amount: string;
  };
  to: {
    activeCryptoIndex: number;
    activeBankIndex: number;
    bankAccount: string;
    bankAmount: string;
    cryptoAccount: string;
    cryptoAmount: string;
  };
};

export default function WithdrawPage() {
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const fromSymbolParm = searchParams.get('fromSymbol');
  const [toTypecf, setToTypecf] = useState<'C' | 'F'>('C');

  const withDrawForm = useForm<WithDrawFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      from: {
        activeAccountIndex: 0,
      },
      to: {
        activeCryptoIndex: 0,
        activeBankIndex: 0,
      },
    },
  });

  const { watch, setValue, handleSubmit } = withDrawForm;

  const { data: accounts } = useQuery({
    queryKey: ['accounts', 50, 0, 'syombol', 'ASC'],
    queryFn: () =>
      getAccounts({
        limit: 50,
        offset: 0,
        orderKey: 'symbol',
        order: 'ASC',
      }),
    select: (response) => response.data.list as Account[],
  });

  useEffect(() => {
    if (accounts && fromSymbolParm) {
      const activeAccountIndex = accounts.findIndex(
        (account) => account.symbol === fromSymbolParm,
      );
      if (activeAccountIndex !== -1) {
        withDrawForm.setValue('from.activeAccountIndex', activeAccountIndex);
      }
    }
  }, [accounts]);

  const { data: banks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    select: (response) => response.data.list as Bank[],
    enabled: toTypecf === 'F',
  });

  const { data: exchangeAllowedPairs } = useQuery({
    queryKey: ['exchangeAllowedPairs'],
    queryFn: getExchangeAllowedPairs,
  });

  const activeAccountSymbol =
    accounts?.[watch('from.activeAccountIndex')].symbol;

  const { data: cryptos } = useQuery({
    queryKey: ['cryptos', 'C', activeAccountSymbol],
    queryFn: () => getCryptos('C'),
    select: (response) => {
      const cryptos = response.data.list as Crypto[];

      if (!activeAccountSymbol) {
        return;
      }

      if (exchangeAllowedPairs?.data?.j_fromsymbol_toarr[activeAccountSymbol]) {
        const possibleSymbols =
          exchangeAllowedPairs?.data?.j_fromsymbol_toarr[activeAccountSymbol];

        return cryptos.filter((crypto) =>
          possibleSymbols.find(
            (possibleSymbol: any) => possibleSymbol?.quote === crypto.symbol,
          ),
        );
      }

      return cryptos;
    },
    enabled: toTypecf === 'C' && !!exchangeAllowedPairs,
  });

  const activeToCryptoAccountSymbol =
    cryptos?.[watch('to.activeCryptoIndex')]?.symbol;

  const from = accounts?.[watch('from.activeAccountIndex')].symbol as string;

  const to = (toTypecf === 'C' ? activeToCryptoAccountSymbol : 'KRW') as string;
  const amount = watch('from.amount');

  useEffect(() => {
    setValue('from.amount', '');
    setValue('to.bankAmount', '');
    setValue('to.cryptoAmount', '');
  }, [watch('from.activeAccountIndex')]);

  const { data: exChangeRate } = useQuery({
    queryKey: ['exChangeRate', toTypecf, from, to, amount],
    queryFn: () =>
      getExchangeRate({
        from,
        to,
        amount,
      }),
    select: (response) => response.data.respdata as ExChangeRate,
    enabled: !!to && !!from && !!amount && to !== from,
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
    const activeCrypto = cryptos?.[withDrawFormValue.to.activeCryptoIndex];
    const activeBank = banks?.[withDrawFormValue.to.activeBankIndex];

    const activeAccount = accounts?.[withDrawFormValue.from.activeAccountIndex];

    if (!activeAccount) {
      return;
    }

    // TO C
    if (toTypecf === 'C') {
      // account
      withdrawMutate({
        from: {
          typecf: activeAccount.typecf,
          symbol: activeAccount.symbol,
          amount: withDrawFormValue.from.amount,
        },
        to: {
          typecf: 'C',
          symbol: activeCrypto?.symbol,
          address: withDrawFormValue.to.cryptoAccount,
          amount: withDrawFormValue.to.cryptoAmount,
        },
        quotesignature: exChangeRate?.quotesignature,
      });

      return;

      // TO F
    } else if (toTypecf === 'F') {
      withdrawMutate({
        from: {
          typecf: activeAccount.typecf,
          symbol: activeAccount.symbol,
          amount: withDrawFormValue.from.amount,
        },
        to: {
          typecf: 'F',
          account: withDrawFormValue.to.bankAccount,
          amount: withDrawFormValue.to.bankAmount,
          bankcode: activeBank?.code,
          bankname: activeBank?.banknameen,
          symbol: 'KRW',
        },
        quotesignature: exChangeRate?.quotesignature,
      });
    }
  };

  const watchValues = watch();

  useEffect(() => {
    const {
      from: { amount: fromAmount, activeAccountIndex },
      to: {
        bankAccount,
        cryptoAccount,
        bankAmount: toBankAmount,
        cryptoAmount: toCryptoAmount,
      },
    } = watch();

    if (!accounts) {
      return;
    }

    const activeAccount = accounts[activeAccountIndex];

    if (activeAccount.typecf === 'C') {
      if (fromAmount && !/^[\d.]+$/.test(fromAmount)) {
        setValue('from.amount', fromAmount.slice(0, -1));
      }
    }

    if (activeAccount.typecf === 'F') {
      if (fromAmount && !/^[1-9]\d*$/.test(fromAmount)) {
        setValue('from.amount', fromAmount.slice(0, -1));
      }
    }

    if (bankAccount && !/^\d+$/.test(bankAccount)) {
      setValue('to.bankAccount', bankAccount.slice(0, -1));
    }

    if (cryptoAccount && !/^[a-zA-Z0-9]+$/.test(cryptoAccount)) {
      setValue('to.cryptoAccount', cryptoAccount.slice(0, -1));
    }

    if (toCryptoAmount && !/^[\d.]+$/.test(toCryptoAmount)) {
      setValue('to.cryptoAmount', toCryptoAmount.slice(0, -1));
    }

    if (toBankAmount && !/^[\d.]+$/.test(toBankAmount)) {
      setValue('to.bankAmount', toBankAmount.slice(0, -1));
    }
  }, [watchValues]);

  return (
    <>
      <h2>withdraw</h2>
      <div className="flexBox area02 ver_noList m-column">
        <div className="cont_box_wrp">
          <FormProvider {...withDrawForm}>
            <form onSubmit={handleSubmit(onSubmitWithdrawFrom)}>
              <div className="cont_box flex gap-10 xl:flex-col">
                <div>
                  <TransactionFromAccount accounts={accounts} />
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
                    <TransactionToCrypto cryptos={cryptos} />
                  )}
                  {toTypecf === 'F' && <TransactionToFiat banks={banks} />}
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
