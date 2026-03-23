import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell, Moon, Mail, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitial = currentUser?.email?.[0]?.toUpperCase() || 'U';
  const memberSince = new Date(currentUser?.metadata?.creationTime || Date.now());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const stats = [
    {
      label: 'Courses Completed',
      value: '12',
      icon: '📚',
      color: '#6366f1',
    },
    {
      label: 'Q&A Contributions',
      value: '45',
      icon: '💬',
      color: '#8b5cf6',
    },
    {
      label: 'Learning Streak',
      value: '21 days',
      icon: '🔥',
      color: '#ec4899',
    },
    {
      label: 'Skills Unlocked',
      value: '8',
      icon: '⭐',
      color: '#06b6d4',
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <motion.div
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Header */}
          <motion.div className={styles.profileCard} variants={itemVariants}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>{userInitial}</div>
            </div>

            <h1 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
              {currentUser?.email?.split('@')[0] || 'User'}
            </h1>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Mail size={16} />
                {currentUser?.email}
              </p>
              <p style={{ margin: '0.75rem 0 0 0', color: 'var(--text-tertiary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Calendar size={16} />
                Member since {memberSince.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                Edit Profile
              </button>
              <button
                className="btn btn-ghost"
                onClick={handleLogout}
                style={{ flex: 1, gap: '0.5rem', color: '#ef4444' }}
              >
                <LogOut size={18} />
                Log Out
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className={styles.statsGrid} variants={itemVariants}>
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                style={{ padding: '1.5rem', textAlign: 'center' }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                  {stat.icon}
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '700' }}>
                  {stat.value}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Account Settings */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
              <Award size={24} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Account Settings
            </h2>

            <div className={styles.settingsList}>
              <SettingItem
                icon={<Bell size={20} />}
                title="Push Notifications"
                description="Receive alerts about new courses and Q&A replies"
                toggle={true}
                value={notificationsEnabled}
                onChange={setNotificationsEnabled}
              />

              <SettingItem
                icon={<Moon size={20} />}
                title="Dark Mode"
                description="Use dark theme for better visibility at night"
                toggle={true}
                value={darkMode}
                onChange={setDarkMode}
              />
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', color: '#ef4444' }}>
              Danger Zone
            </h2>

            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.05)',
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ef4444' }}>
                Delete Account
              </h4>
              <p
                style={{
                  margin: '0 0 1.5rem 0',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                }}
              >
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                className="btn"
                style={{
                  background: '#fecaca',
                  color: '#dc2626',
                  fontWeight: '600',
                }}
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, title, description, toggle, value, onChange }) => {
  return (
    <motion.div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}
      whileHover={{ x: 4 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            color: 'var(--primary-start)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: '0.25rem', fontSize: '1rem' }}>
            {title}
          </h4>
          <p
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {toggle && (
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            style={{ display: 'none' }}
          />
          <div
            style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              background: value
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'var(--border)',
              position: 'relative',
              transition: 'all 0.2s',
            }}
          >
            <motion.div
              initial={false}
              animate={{
                x: value ? '22px' : '2px',
              }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '10px',
                background: 'white',
                position: 'absolute',
                top: '2px',
              }}
            />
          </div>
        </label>
      )}
    </motion.div>
  );
};

export default Profile;
