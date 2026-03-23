import React, { useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styles from './Layout.module.css';

const DemoLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/demo', label: 'ホーム' },
    { path: '/demo/contents', label: 'コース' },
    { path: '/demo/qa', label: 'Q&A' },
    { path: '/demo/notifications', label: 'お知らせ' },
  ];

  return (
    <div className={styles.layout}>
      {/* Marquee Ticker Bar */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(12)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeIcon}>&#9679;</span>
              <span className={styles.marqueeBold}>AI Nexus メンバーシップ</span>
              <span className={styles.marqueeText}>すべてのコースが見放題</span>
            </span>
          ))}
        </div>
      </div>

      {/* Top Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/demo" className={styles.logo}>
            <span className={styles.logoMark}>N.</span>
          </Link>

          <nav className={styles.nav}>
            {navItems.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.headerRight}>
            <Link to="/login" className={styles.avatarBtn} style={{
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: '600',
              background: '#222',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}>
              ログイン
            </Link>

            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerOpen1 : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerOpen2 : ''}`} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={styles.mobileMenuItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link to="/login" className={styles.mobileMenuItem} onClick={() => setMobileMenuOpen(false)}>
              ログイン / 新規登録
            </Link>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default DemoLayout;
