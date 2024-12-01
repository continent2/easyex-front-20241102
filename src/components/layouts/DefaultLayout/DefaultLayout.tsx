import { Outlet } from 'react-router-dom';

import Footer from '@/components/base/Footer';
import Header from '@/components/base/Header';

import './style.css';
export default function DefaultLayout() {
  return (
    <div id="Wrap">
      <Header />
      <div className="container">
        <div className="inner">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
