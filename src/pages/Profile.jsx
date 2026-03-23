import React, { useState } from 'react';
import { Bell, Moon, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const userInitial = currentUser?.email?.[0]?.toUpperCase() || 'U';
  const memberSince = new Date(currentUser?.metadata?.creationTime || Date.now());

  const stats = [
    { label: '完了コース', value: '12' },
    { label: 'Q&A貢献', value: '45' },
    { label: '連続日数', value: '21' },
    { label: '習得スキル', value: '8' },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.avatar}>{userInitial}</div>
          <h1 className={styles.heroTitle}>
            {currentUser?.email?.split('@')[0] || 'User'}
          </h1>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>
              <Mail size={14} />
              {currentUser?.email}
            </span>
            <span className={styles.metaItem}>
              <Calendar size={14} />
              {memberSince.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}から参加
            </span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Settings */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>アカウント設定</h2>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <Bell size={16} />
                <div>
                  <h4 className={styles.settingName}>プッシュ通知</h4>
                  <p className={styles.settingDesc}>新しいコースやQ&Aの返信に関する通知</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <span className={styles.toggleTrack}>
                  <span className={styles.toggleThumb} style={{ transform: notificationsEnabled ? 'translateX(20px)' : 'translateX(0)' }} />
                </span>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <Moon size={16} />
                <div>
                  <h4 className={styles.settingName}>ダークモード</h4>
                  <p className={styles.settingDesc}>夜間の見やすさのためにダークテーマを使用</p>
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className={styles.toggleTrack}>
                  <span className={styles.toggleThumb} style={{ transform: darkMode ? 'translateX(20px)' : 'translateX(0)' }} />
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Danger */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitleDanger}>危険な操作</h2>
          <div className={styles.dangerCard}>
            <div>
              <h4 className={styles.dangerTitle}>アカウント削除</h4>
              <p className={styles.dangerDesc}>アカウントを削除すると元に戻せません。</p>
            </div>
            <button className={styles.dangerBtn}>削除する</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
