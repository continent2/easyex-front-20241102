import ExchangeCryptoForm from '@/components/exchangeCrypto/ExchangeCryptoForm';
import ExchangeCryptoResult from '@/components/exchangeCrypto/ExchangeCryptoResult';

export default function ExchangeCryptoPage() {
  return (
    <>
      <h2>Exchange Crypto</h2>
      <div className="flexBox area02 ver_noList m-column">
        <ExchangeCryptoForm />
        <ExchangeCryptoResult />
      </div>
    </>
  );
}
