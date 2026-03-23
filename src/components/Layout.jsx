import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Home, FileText, HelpCircle, Bell, User } from 'lucide-react';
import styles from './Layout.module.css';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'ホーム', icon: Home },
    { path: '/contents', label: 'コンテンツ', icon: FileText },
    { path: '/qa', label: 'Q&A', icon: HelpCircle },
    { path: '/notifications', label: '通知', icon: Bell },
    { path: '/profile', label: 'プロフィール', icon: User },
  ];

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <div className="nav-items">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={24} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
