import { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import clsx from 'clsx';
import useScrollPosition from '@react-hook/window-scroll';
import { useMutation, useQuery } from '@tanstack/react-query';

import LogoImage from '@/assets/img/common/logo.png';

import { logout } from '@/lib/api/auth';
import { getUser } from '@/lib/api/user';
import storage from '@/lib/storage';

import './style.css';

export default function Header() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!storage.getItem('token'),
    select: (response: any) => response?.data?.payload?.myinfo,
  });

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      storage.removeItem('token');
      window.location.href = '/login';
    },
  });

  const headerRef = useRef<HTMLElement>(null);
  const scrollY = useScrollPosition(60);
  const [isNavOpen, setIsNevOpen] = useState<boolean>(false);

  const headerHeight = headerRef.current?.offsetHeight;
  const isFixed = headerHeight ? scrollY > headerHeight : false;

  const onToggleNav = () => {
    setIsNevOpen((prevState) => !prevState);
  };

  const onLogout = () => {
    logoutMutate();
  };

  return (
    <>
      <div className="mobVer">
        <div id="new_nav" className={clsx('trans05', isNavOpen && 'on')}>
          <div className="m_nav_top">
            {user && <div className="txt_box">Hello, {user.username}</div>}

            <div className="a_box">
              {user ? (
                <>
                  <a href="/my/info">myinfo</a>
                  <a className="cursor-pointer" onClick={onLogout}>
                    logout
                  </a>
                </>
              ) : (
                <>
                  <a href="/login">Login</a>
                  <a href="/join">join</a>
                </>
              )}
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
              <a href="/deposit">Deposit</a>
            </li>
            <li>
              <a href="/withdraw">Withdraw</a>
            </li>
            <li>
              <a href="/exchange">Exchange</a>
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
        className={clsx(
          'header',
          isNavOpen && 'fix',
          isFixed && 'fixed',
          '!z-50',
        )}
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
                <a
                  className={clsx(
                    location.pathname === '/deposit'
                      ? '!text-[19px] !text-black'
                      : ' ',
                  )}
                  href="/deposit"
                >
                  Deposit
                </a>
              </li>
              <li>
                <a
                  className={clsx(
                    location.pathname === '/withdraw'
                      ? '!text-[19px] !text-black'
                      : ' ',
                  )}
                  href="/withdraw"
                >
                  Withdraw
                </a>
              </li>
              <li>
                <a
                  className={clsx(
                    location.pathname === '/exchange'
                      ? '!text-[19px] !text-black'
                      : ' ',
                  )}
                  href="/exchange"
                >
                  Exchange
                </a>
              </li>
              <li>
                <a
                  className={clsx(
                    location.pathname === '/my/activity'
                      ? '!text-[19px] !text-black'
                      : ' ',
                  )}
                  href="/my/activity"
                >
                  Activity
                </a>
              </li>
              <li>
                <a
                  className={clsx(
                    location.pathname === '/my/balances'
                      ? '!text-[19px] !text-black'
                      : ' ',
                  )}
                  href="/my/balances"
                >
                  Balances
                </a>
              </li>
            </ul>
            <div className="a_box">
              {user ? (
                <>
                  <a href="/my/info">myinfo</a>
                  <a className="cursor-pointer" onClick={onLogout}>
                    logout
                  </a>
                </>
              ) : (
                <>
                  <a
                    className={clsx(
                      location.pathname === '/login'
                        ? '!text-[15px] !text-black'
                        : ' ',
                    )}
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    className={clsx(
                      location.pathname === '/join'
                        ? '!text-[15px] !text-black'
                        : ' ',
                    )}
                    href="/join"
                  >
                    join
                  </a>
                </>
              )}
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
