import { Outlet } from 'react-router-dom';

import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';

export default function AuthLayout() {
  return (
    <div id="Wrap">
      <Header />
      <div className="container auth-container">
        <div className="inner">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
