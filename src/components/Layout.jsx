import React, { useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, Bell, User, Zap, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'ホーム', icon: Home },
    { path: '/contents', label: 'コンテンツ', icon: BookOpen },
    { path: '/qa', label: 'Q&A', icon: HelpCircle },
    { path: '/notifications', label: '通知', icon: Bell },
    { path: '/profile', label: 'プロフィール', icon: User },
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
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/dashboard" className={styles.logo}>
            <div className={styles.logoIcon}>
              <Zap size={20} />
            </div>
            <span className={styles.logoText}>AI Nexus</span>
          </Link>
          <button className={styles.closeSidebar} onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{userInitial}</div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{currentUser?.email?.split('@')[0]}</p>
              <p className={styles.userEmail}>{currentUser?.email}</p>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={18} />
            <span>ログアウト</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={styles.main}>
        {/* Top header bar (mobile + breadcrumb) */}
        <header className={styles.header}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className={styles.headerTitle}>
            {navItems.find(n => n.path === location.pathname)?.label || 'AI Nexus'}
          </div>
          <div className={styles.headerRight}>
            <Link to="/notifications" className={styles.headerIcon}>
              <Bell size={20} />
            </Link>
            <Link to="/profile" className={styles.headerAvatar}>
              {userInitial}
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
