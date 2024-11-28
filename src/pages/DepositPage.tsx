import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';

import CryptoFiatToggleGroup from '@/components/deposit/CryptoFiatToggleGroup';
import DepositCryptoForm from '@/components/deposit/DepositCryptoForm';
import { DepositCryptoFormValue as depositCryptoFormValue } from '@/components/deposit/DepositCryptoForm/DepositCryptoForm';
import DepositFiatForm from '@/components/deposit/DepositFiatForm';
import { DepositFiatFormValue as depositFiatFormValue } from '@/components/deposit/DepositFiatForm/DepositFiatForm';

import { getAdminAccounts } from '@/lib/api/account';
import { getBanks } from '@/lib/api/bank';
import {
  depositCrypto,
  depositFiat,
  getDepositInfo,
  getDepositPolicy,
} from '@/lib/api/deposit';
import { getUserDepositSettings } from '@/lib/api/user';
import useModal from '@/lib/hooks/useModal';
import { Bank } from '@/types/bank';
import { AdminBankAccount, DepositInfo } from '@/types/deposit';
import { UserDepositSetting } from '@/types/user';

export default function DepositPage() {
  const [searchParams] = useSearchParams();
  const typecfParm = searchParams.get('typecf');
  const initTypecf =
    typecfParm === 'C' || typecfParm === 'F' ? typecfParm : 'C';
  const symbolParm = searchParams.get('symbol');

  const { data: userDepositSettings } = useQuery({
    queryKey: ['userDepositSettings'],
    queryFn: getUserDepositSettings,
    select: (response: any) => response.data.list as UserDepositSetting[],
  });

  const [typecf, setTypecf] = useState<'C' | 'F' | undefined>(initTypecf);

  useEffect(() => {
    if (!userDepositSettings) return;

    const enabledCrypto =
      userDepositSettings?.find(
        (userDepositSetting) => userDepositSetting.subkey_ === 'ALLOW-CRYPTO',
      )?.value_ === '1';
    // const enabledCrypto = false;

    const enabledFiat =
      userDepositSettings?.find(
        (userDepositSetting) => userDepositSetting.subkey_ === 'ALLOW-FIAT',
      )?.value_ === '1';
    // const enabledFiat = true;

    if (!enabledCrypto && !enabledFiat) {
      setTypecf(undefined);
      return;
    }

    if (!enabledCrypto && initTypecf === 'C') {
      setTypecf('F');
      return;
    }

    if (!enabledFiat && initTypecf === 'F') {
      setTypecf('C');
      return;
    }
  }, [userDepositSettings, initTypecf]);

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
    enabled: !!typecf,
  });

  const depositFiatForm = useForm<depositFiatFormValue>({
    criteriaMode: 'all',
    defaultValues: {
      activeAdminAccountIndex: 0,
      activeBankIndex: -1,
    },
    mode: 'onChange',
  });

  const { openModal } = useModal();
  const { mutate: depositFiatMutate } = useMutation({
    mutationFn: depositFiat,
    onSuccess: (response) => {
      openModal({
        title: `${response.data.message} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
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
      activeDepositInfoIndex: 0,
    },
    mode: 'onChange',
  });

  const { data: depositInfo } = useQuery({
    queryKey: ['depositInfo'],
    queryFn: getDepositInfo,
    select: (response) => response.data.list as DepositInfo[],
    enabled: typecf === 'C',
  });

  // 에러 초기화
  useEffect(() => {
    depositCryptoForm.clearErrors('fromTxhash');
  }, [
    depositCryptoForm.watch('fromAccount'),
    depositCryptoForm.watch('fromAmount'),
  ]);
  useEffect(() => {
    depositCryptoForm.clearErrors(['fromAccount', 'fromAmount']);
  }, [depositCryptoForm.watch('fromTxhash')]);

  // account페이지에서 들어올때
  useEffect(() => {
    if (depositInfo && symbolParm) {
      const activeDepositInfoIndex = depositInfo.findIndex(
        (depositInfo) => depositInfo.from.symbol === symbolParm,
      );
      if (activeDepositInfoIndex !== -1) {
        depositCryptoForm.setValue(
          'activeDepositInfoIndex',
          activeDepositInfoIndex,
        );
      }
    }
  }, [depositInfo, symbolParm]);

  const { mutate: depositCryptoMutate } = useMutation({
    mutationFn: depositCrypto,
    onSuccess: (response) => {
      openModal({
        title: `${response.data.message} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
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
    const { activeDepositInfoIndex } = depositCryptoFormValue;

    const activeCrypto = depositInfo?.[activeDepositInfoIndex].from;
    const activeAdminCryptoAccount = depositInfo?.[activeDepositInfoIndex].to;

    if (!activeCrypto || !activeAdminCryptoAccount) {
      return;
    }

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
    const { fromAccount, fromTxhash } = depositCryptoFormWatchValues;
    if (fromAccount && !/^[a-zA-Z0-9]+$/.test(fromAccount)) {
      depositCryptoFormSetValue('fromAccount', fromAccount.slice(0, -1));
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
              depositInfo={depositInfo}
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
