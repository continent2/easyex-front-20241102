import WithDrawFrom from '@/components/withdraw/WithDrawFrom';
import WithDrawResult from '@/components/withdraw/WithDrawResult';

export default function WithdrawPage() {
  return (
    <>
      <h2>출금</h2>
      <div className="flexBox area02 ver_noList m-column">
        <WithDrawFrom />
        <WithDrawResult />
      </div>
    </>
  );
}
