import { useRef, useState } from 'react';
import clsx from 'clsx';
import useScrollPosition from '@react-hook/window-scroll';

import LogoImage from '@/assets/img/common/logo.png';

import './style.css';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const scrollY = useScrollPosition(60);
  const [isNavOpen, setIsNevOpen] = useState<boolean>(false);

  const headerHeight = headerRef.current?.offsetHeight;
  const isFixed = headerHeight ? scrollY > headerHeight : false;

  const onToggleNav = () => {
    setIsNevOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="mobVer">
        <div id="new_nav" className={clsx('trans05', isNavOpen && 'on')}>
          <div className="m_nav_top">
            <div className="txt_box">안녕하세요. 반갑습니다.</div>
            <div className="a_box">
              <a href="/login">Login</a>
              <a href="/join">join</a>
            </div>
            <div className="nav_open on">
              <a onClick={onToggleNav}>
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
          </div>
          <ul>
            <li>
              <a href="/exchange-crypto">Exchange Crypto</a>
            </li>
            <li>
              <a href="/exchange-fiat">Exchange Fiat</a>
            </li>
            <li>
              <a href="/deposit">Deposit</a>
            </li>
            <li>
              <a href="/withdraw">Withdraw</a>
            </li>
            <li>
              <a href="/my/activity">Activity</a>
            </li>
            <li>
              <a href="/my/balances">Balances</a>
            </li>
          </ul>
        </div>
        <div
          onClick={onToggleNav}
          className={clsx('new_nav_bg', isNavOpen && 'on')}
        ></div>
      </div>
      <header
        ref={headerRef}
        className={clsx('header', isNavOpen && 'fix', isFixed && 'fixed')}
      >
        <div className="inner flexBox area02 ver_noList">
          <h1>
            <a href="/">
              <img src={LogoImage} alt="EASY EXCHANGE" />
            </a>
          </h1>
          <div className="Gnb pcVer">
            <ul>
              <li>
                <a href="/exchange-crypto">Exchange Crypto</a>
              </li>
              <li>
                <a href="/exchange-fiat">Exchange Fiat</a>
              </li>
              <li>
                <a href="/deposit">Deposit</a>
              </li>
              <li>
                <a href="/withdraw">Withdraw</a>
              </li>
              <li>
                <a href="/my/activity">Activity</a>
              </li>
              <li>
                <a href="/my/balances">Balances</a>
              </li>
            </ul>
            <div className="a_box">
              <a href="/login">Login</a>
              <a href="/join">join</a>
            </div>
          </div>
          <div className="mobVer nav_open">
            <a onClick={onToggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
