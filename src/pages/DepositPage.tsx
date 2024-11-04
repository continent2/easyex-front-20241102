import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import DepositCryptoForm from '@/components/deposit/DepositCryptoForm';
import { DepositCryptoFormValue as depositCryptoFormValue } from '@/components/deposit/DepositCryptoForm/DepositCryptoForm';
// import DepositCryptoResult from '@/components/deposit/DepositCryptoResult';
import DepositFiatForm from '@/components/deposit/DepositFiatForm';
import { DepositFiatFormValue as depositFiatFormValue } from '@/components/deposit/DepositFiatForm/DepositFiatForm';
import useModal from '@/components/hooks/useModal';

import { env } from '@/env';
import {
  depositCrypto,
  depositFiat,
  getAdminAccounts,
  getBanks,
  getCryptos,
  getDepositPolicy,
} from '@/lib/api/deposit';
import {
  AdminBankAccount as AdminBankAccount,
  AdminCryptoAccount,
  Bank,
  Token,
} from '@/types/deposit';

export default function DepositPage() {
  const [typecf, setTypecf] = useState<'C' | 'F'>('C');

  const { data: banks } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
    select: (response: any) => response.data.list as Bank[],
    enabled: typecf === 'F',
  });

  const { data: adminBankAccounts } = useQuery({
    queryKey: ['adminBankAccounts', 'F'],
    queryFn: () => getAdminAccounts({ typecf: 'F' }),
    select: (response: any) => response.data.list as AdminBankAccount[],
    enabled: typecf === 'F',
  });

  const { data: depositPolicy } = useQuery({
    queryKey: ['depositPolicy', typecf],
    queryFn: () => getDepositPolicy(typecf),
    select: (response: any) => response.data.policy as string,
  });

  const depositFiatForm = useForm<depositFiatFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      activeAdminAccountIndex: 0,
      activeBankIndex: 0,
    },
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
        account: activeAdminBank.number,
        bankcode: activeAdminBank.bankcode,
        bankname: activeAdminBank.bankname,
        symbol: activeAdminBank.symbol,
        typecf: 'F',
      },
    });
  };

  // CRYPTO
  const { data: cryptos } = useQuery({
    queryKey: ['cryptos', 'C'],
    queryFn: () => getCryptos('C'),
    select: (response: any) => response.data.list as Token[],
    enabled: typecf === 'C',
  });

  const depositCryptoForm = useForm<depositCryptoFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      activeCryptoIndex: 0,
      activeAdminCryptoAccountIndex: 0,
    },
  });

  const symbol = cryptos?.[depositCryptoForm.watch('activeCryptoIndex')].symbol;

  const { data: adminCryptoAccounts } = useQuery({
    queryKey: ['adminCryptoAccounts', 'C', symbol],
    queryFn: () =>
      getAdminAccounts({ typecf: 'C', symbol, nettype: env.netType }),
    select: (response: any) => response.data.list as AdminCryptoAccount[],
    enabled: typecf === 'C' && !!symbol,
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
  };

  return (
    <>
      <h2>Deposit</h2>
      <ToggleButtonGroup
        color="primary"
        value={typecf}
        exclusive
        className="mb-3"
        onChange={(_, value) => setTypecf(value)}
      >
        <ToggleButton
          sx={{
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="C"
        >
          CRYPTO
        </ToggleButton>
        <ToggleButton
          sx={{
            '&.Mui-selected': {
              color: '#15a7a5',
              bgcolor: 'rgba(21, 167, 165, 0.08)',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgba(21, 167, 165, 0.12)',
            },
          }}
          value="F"
        >
          FIAT
        </ToggleButton>
      </ToggleButtonGroup>
      {typecf === 'C' && (
        <FormProvider {...depositCryptoForm}>
          <div className="flexBox area02 ver_noList m-column">
            <DepositCryptoForm
              cryptos={cryptos}
              adminCryptoAccounts={adminCryptoAccounts}
              depositPolicy={depositPolicy}
              onSubmitDepositCryptoForm={onSubmitDepositCryptoForm}
            />
            {/* <DepositCryptoResult /> */}
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
