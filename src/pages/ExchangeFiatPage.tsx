import ExchangeFiatForm from '@/components/exchangeFiat/ExchangeFiatForm';
import ExchangeFiatResult from '@/components/exchangeFiat/ExchangeFiatResult';

export default function ExchangeFiatPage() {
  return (
    <>
      <h2>Exchange Fiat</h2>
      <div className="flexBox area02 ver_noList m-column">
        <ExchangeFiatForm />
        <ExchangeFiatResult />
      </div>
    </>
  );
}
