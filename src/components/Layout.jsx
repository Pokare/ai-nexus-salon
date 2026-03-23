import React, { useState } from 'react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Layout.module.css';

const Layout = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'ホーム' },
    { path: '/contents', label: 'コース' },
    { path: '/qa', label: 'Q&A' },
    { path: '/notifications', label: 'お知らせ' },
    { path: '/profile', label: 'マイページ' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitial = currentUser?.email?.[0]?.toUpperCase() || 'U';

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
          {/* Logo */}
          <Link to="/dashboard" className={styles.logo}>
            <span className={styles.logoMark}>N.</span>
          </Link>

          {/* Desktop Nav */}
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

          {/* Right side */}
          <div className={styles.headerRight}>
            {/* User avatar */}
            <div className={styles.userMenuWrapper}>
              <button
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className={styles.avatarCircle}>{userInitial}</div>
              </button>
              {userMenuOpen && (
                <>
                  <div className={styles.userMenuOverlay} onClick={() => setUserMenuOpen(false)} />
                  <div className={styles.userMenu}>
                    <div className={styles.userMenuHeader}>
                      <span className={styles.userMenuName}>{currentUser?.email?.split('@')[0]}</span>
                      <span className={styles.userMenuEmail}>{currentUser?.email}</span>
                    </div>
                    <div className={styles.userMenuDivider} />
                    <Link to="/profile" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                      マイページ
                    </Link>
                    <Link to="/notifications" className={styles.userMenuItem} onClick={() => setUserMenuOpen(false)}>
                      お知らせ
                    </Link>
                    <div className={styles.userMenuDivider} />
                    <button className={styles.userMenuItemDanger} onClick={handleLogout}>
                      <LogOut size={14} />
                      ログアウト
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerOpen1 : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerOpen2 : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
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
            <button className={styles.mobileMenuLogout} onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
