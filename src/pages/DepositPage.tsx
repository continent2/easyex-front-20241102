import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import CryptoFiatToggleGroup from '@/components/common/CryptoFiatToggleGroup';
import DepositCryptoForm from '@/components/deposit/DepositCryptoForm';
import { DepositCryptoFormValue as depositCryptoFormValue } from '@/components/deposit/DepositCryptoForm/DepositCryptoForm';
import DepositFiatForm from '@/components/deposit/DepositFiatForm';
import { DepositFiatFormValue as depositFiatFormValue } from '@/components/deposit/DepositFiatForm/DepositFiatForm';

import { env } from '@/env';
import { getAdminAccounts } from '@/lib/api/account';
import { getBanks } from '@/lib/api/bank';
import { getCryptos } from '@/lib/api/crypto';
import {
  depositCrypto,
  depositFiat,
  getDepositPolicy,
} from '@/lib/api/deposit';
import useModal from '@/lib/hooks/useModal';
import { Bank } from '@/types/bank';
import { Crypto } from '@/types/crypto';
import {
  AdminBankAccount as AdminBankAccount,
  AdminCryptoAccount,
} from '@/types/deposit';

export default function DepositPage() {
  const [searchParams] = useSearchParams();
  const typecfParm = searchParams.get('typecf');
  const initTypecf =
    typecfParm === 'C' || typecfParm === 'F' ? typecfParm : 'C';
  const symbolParm = searchParams.get('symbol');

  const [typecf, setTypecf] = useState<'C' | 'F'>(initTypecf);

  const { data: banks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    select: (response) => response.data.list as Bank[],
    enabled: typecf === 'F',
  });

  const { data: adminBankAccounts } = useQuery({
    queryKey: ['adminBankAccounts', 'F'],
    queryFn: () => getAdminAccounts({ typecf: 'F' }),
    select: (response) => response.data.list as AdminBankAccount[],
    enabled: typecf === 'F',
  });

  const { data: depositPolicy } = useQuery({
    queryKey: ['depositPolicy', typecf],
    queryFn: () => getDepositPolicy(typecf),
    select: (response) => response.data.policy as string,
  });

  const depositFiatForm = useForm<depositFiatFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      activeAdminAccountIndex: 0,
      activeBankIndex: 0,
    },
    mode: 'onChange',
  });

  const { openModal } = useModal();
  const { mutate: depositFiatMutate } = useMutation({
    mutationFn: depositFiat,
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
      depositFiatForm.resetField('fromAccount');
      depositFiatForm.resetField('fromAmount');
    },
  });

  const onSubmitDepositFiatForm = (
    depositFiatFormValue: depositFiatFormValue,
  ) => {
    if (!banks || !adminBankAccounts) return;

    const { activeBankIndex, activeAdminAccountIndex } = depositFiatFormValue;

    const activeBank = banks[activeBankIndex];
    const activeAdminBank = adminBankAccounts[activeAdminAccountIndex];

    depositFiatMutate({
      typecf: 'F',
      from: {
        typecf: 'F',
        account: depositFiatFormValue.fromAccount,
        amount: depositFiatFormValue.fromAmount,
        bankcode: activeBank.code,
        bankname: activeBank.banknameen,
        symbol: activeBank.primarycurrency,
      },
      to: {
        typecf: 'F',
        account: activeAdminBank.number,
        amount: depositFiatFormValue.fromAmount,
        bankcode: activeAdminBank.bankcode,
        bankname: activeAdminBank.bankname,
        symbol: activeAdminBank.symbol,
      },
    });
  };

  // CRYPTO
  const depositCryptoForm = useForm<depositCryptoFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      activeCryptoIndex: 0,
      activeAdminCryptoAccountIndex: 0,
    },
    mode: 'onChange',
  });

  const { data: cryptos } = useQuery({
    queryKey: ['cryptos', 'C'],
    queryFn: () => getCryptos('C'),
    select: (response) => response.data.list as Crypto[],
    enabled: typecf === 'C',
  });

  useEffect(() => {
    if (cryptos && symbolParm) {
      const activeCryptoIndex = cryptos.findIndex(
        (crypto) => crypto.symbol === symbolParm,
      );
      if (activeCryptoIndex !== -1) {
        depositCryptoForm.setValue('activeCryptoIndex', activeCryptoIndex);
      }
    }
  }, [cryptos]);

  const activeCryptoSymbol =
    cryptos?.[depositCryptoForm.watch('activeCryptoIndex')].symbol;

  const { data: adminCryptoAccounts } = useQuery({
    queryKey: ['adminCryptoAccounts', 'C', activeCryptoSymbol],
    queryFn: () =>
      getAdminAccounts({
        typecf: 'C',
        symbol: activeCryptoSymbol,
        nettype: env.netType,
      }),
    select: (response) => response.data.list as AdminCryptoAccount[],
    enabled: typecf === 'C' && !!activeCryptoSymbol,
  });

  useEffect(() => {
    depositCryptoForm.setValue('activeAdminCryptoAccountIndex', 0);
  }, [depositCryptoForm.watch('activeCryptoIndex')]);

  const { mutate: depositCryptoMutate } = useMutation({
    mutationFn: depositCrypto,
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

  const onSubmitDepositCryptoForm = (
    depositCryptoFormValue: depositCryptoFormValue,
  ) => {
    if (!cryptos || !adminCryptoAccounts) return;

    const { activeCryptoIndex, activeAdminCryptoAccountIndex } =
      depositCryptoFormValue;

    const activeCrypto = cryptos[activeCryptoIndex];
    const activeAdminCryptoAccount =
      adminCryptoAccounts[activeAdminCryptoAccountIndex];

    if (
      depositCryptoFormValue.fromAccount &&
      depositCryptoFormValue.fromAmount
    ) {
      depositCryptoMutate({
        typecf: 'C',
        from: {
          typecf: 'C',
          symbol: activeCrypto.symbol,
          address: depositCryptoFormValue.fromAccount,
          amount: depositCryptoFormValue.fromAmount,
        },
        to: {
          typecf: 'C',
          symbol: activeAdminCryptoAccount.symbol,
          address: activeAdminCryptoAccount.address,
          amount: depositCryptoFormValue.fromAmount,
        },
      });
    }

    if (depositCryptoFormValue.fromTxhash) {
      depositCryptoMutate({
        typecf: 'C',
        from: {
          typecf: 'C',
          symbol: activeCrypto.symbol,
          txhash: depositCryptoFormValue.fromTxhash,
        },
        to: {
          typecf: 'C',
          symbol: activeAdminCryptoAccount.symbol,
          address: activeAdminCryptoAccount.address,
        },
      });
    }
  };

  const { watch: depositCryptoFormWatch, setValue: depositCryptoFormSetValue } =
    depositCryptoForm;

  const depositCryptoFormWatchValues = depositCryptoFormWatch();

  useEffect(() => {
    const { fromAccount, fromAmount, fromTxhash } =
      depositCryptoFormWatchValues;
    if (fromAccount && !/^[a-zA-Z0-9]+$/.test(fromAccount)) {
      depositCryptoFormSetValue('fromAccount', fromAccount.slice(0, -1));
    }
    if (fromAmount && !/^[\d.]+$/.test(fromAmount)) {
      depositCryptoFormSetValue('fromAmount', fromAmount.slice(0, -1));
    }

    if (fromTxhash && !/^[a-zA-Z0-9]+$/.test(fromTxhash)) {
      depositCryptoFormSetValue('fromTxhash', fromTxhash.slice(0, -1));
    }
  }, [depositCryptoFormWatchValues]);

  const { watch: depositFiatFormWatch, setValue: depositFiatFormSetValue } =
    depositFiatForm;

  const depositFiatFormWatchValues = depositFiatFormWatch();

  useEffect(() => {
    const { fromAccount, fromAmount } = depositFiatFormWatchValues;
    if (fromAccount && !/^\d+$/.test(fromAccount)) {
      depositFiatFormSetValue('fromAccount', fromAccount.slice(0, -1));
    }
    if (fromAmount && !/^[1-9]\d*$/.test(fromAmount)) {
      depositFiatFormSetValue('fromAmount', fromAmount.slice(0, -1));
    }
  }, [depositFiatFormWatchValues]);

  return (
    <>
      <h2>Deposit</h2>
      <div className="w-[760px] mb-3 xl:w-[65%] lg:!w-[90%] lg:mx-auto">
        <CryptoFiatToggleGroup
          className="w-full"
          value={typecf}
          onChange={(_, typecf) => setTypecf(typecf)}
        />
      </div>
      {typecf === 'C' && (
        <FormProvider {...depositCryptoForm}>
          <div className="flexBox area02 ver_noList m-column">
            <DepositCryptoForm
              cryptos={cryptos}
              adminCryptoAccounts={adminCryptoAccounts}
              depositPolicy={depositPolicy}
              onSubmitDepositCryptoForm={onSubmitDepositCryptoForm}
            />
          </div>
        </FormProvider>
      )}
      {typecf === 'F' && (
        <FormProvider {...depositFiatForm}>
          <DepositFiatForm
            banks={banks}
            adminBankAccounts={adminBankAccounts}
            depositPolicy={depositPolicy}
            onSubmitDepositFiatForm={onSubmitDepositFiatForm}
          />
        </FormProvider>
      )}
    </>
  );
}
