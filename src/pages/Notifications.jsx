import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'welcome',
      title: 'Welcome to AI Nexus!',
      message: 'Get started with our AI mastery program and join 2,847 members.',
      time: new Date(),
      read: true,
      icon: '🎉',
    },
    {
      id: 2,
      type: 'content',
      title: 'New Course: Advanced Prompt Engineering',
      message: 'Check out our latest course on mastering prompt techniques.',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      icon: '📚',
    },
    {
      id: 3,
      type: 'community',
      title: '5 New Members Joined',
      message: 'Our community is growing! Welcome our latest members.',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      icon: '👥',
    },
    {
      id: 4,
      type: 'qa',
      title: 'New Answer to Your Question',
      message: 'Someone replied to "How to write effective prompts?"',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '💬',
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Milestone Unlocked: 10 Lessons Completed',
      message: 'You\'ve completed 10 lessons. Keep up the great work!',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '⭐',
    },
    {
      id: 6,
      type: 'update',
      title: 'Platform Update: New Features Available',
      message: 'We\'ve added bookmarking and advanced filters to the content library.',
      time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '✨',
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const groupedNotifications = {
    today: notifications.filter(
      (n) => {
        const today = new Date();
        const notifDate = new Date(n.time);
        return (
          notifDate.getDate() === today.getDate() &&
          notifDate.getMonth() === today.getMonth() &&
          notifDate.getFullYear() === today.getFullYear()
        );
      }
    ),
    yesterday: notifications.filter(
      (n) => {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const notifDate = new Date(n.time);
        return (
          notifDate.getDate() === yesterday.getDate() &&
          notifDate.getMonth() === yesterday.getMonth() &&
          notifDate.getFullYear() === yesterday.getFullYear()
        );
      }
    ),
    earlier: notifications.filter(
      (n) => {
        const twoWeeksAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        return new Date(n.time) < twoWeeksAgo;
      }
    ),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <motion.div
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className={styles.header} variants={itemVariants}>
            <div>
              <h1>Notifications</h1>
              {unreadCount > 0 && (
                <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="btn btn-secondary"
                style={{ gap: '0.5rem' }}
              >
                <CheckCheck size={18} />
                Mark all as read
              </button>
            )}
          </motion.div>

          {/* Notifications by Period */}
          {notifications.length === 0 ? (
            <motion.div className={styles.emptyState} variants={itemVariants}>
              <span style={{ fontSize: '3rem' }}>📭</span>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </motion.div>
          ) : (
            <div className={styles.list}>
              {/* Today */}
              {groupedNotifications.today.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className={styles.sectionTitle}>Today</h3>
                  <div className={styles.notificationGroup}>
                    {groupedNotifications.today.map((notif) => (
                      <NotificationCard
                        key={notif.id}
                        notification={notif}
                        onMarkRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Yesterday */}
              {groupedNotifications.yesterday.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className={styles.sectionTitle}>Yesterday</h3>
                  <div className={styles.notificationGroup}>
                    {groupedNotifications.yesterday.map((notif) => (
                      <NotificationCard
                        key={notif.id}
                        notification={notif}
                        onMarkRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Earlier */}
              {groupedNotifications.earlier.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className={styles.sectionTitle}>Earlier</h3>
                  <div className={styles.notificationGroup}>
                    {groupedNotifications.earlier.map((notif) => (
                      <NotificationCard
                        key={notif.id}
                        notification={notif}
                        onMarkRead={handleMarkAsRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {
  const formatTime = (date) => {
    const hours = new Date().getHours() - new Date(date).getHours();
    if (hours < 1) {
      return `${new Date().getMinutes() - new Date(date).getMinutes()}m ago`;
    }
    return `${hours}h ago`;
  };

  return (
    <motion.div
      className={`glass-card ${!notification.read ? styles.unread : ''}`}
      style={{
        padding: '1.5rem',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        cursor: 'pointer',
        opacity: notification.read ? 0.8 : 1,
      }}
      whileHover={{ x: 4 }}
      onClick={() => onMarkRead(notification.id)}
    >
      {/* Icon */}
      <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
        {notification.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            margin: '0 0 0.25rem 0',
            fontSize: '1rem',
            fontWeight: !notification.read ? '700' : '600',
            color: 'var(--text-primary)',
          }}
        >
          {notification.title}
        </h4>
        <p
          style={{
            margin: '0 0 0.5rem 0',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {notification.message}
        </p>
        <p
          style={{
            margin: 0,
            color: 'var(--text-tertiary)',
            fontSize: '0.75rem',
          }}
        >
          {formatTime(notification.time)}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        {!notification.read && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--primary-start)',
              boxShadow: '0 0 8px var(--primary-start)',
            }}
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-tertiary)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ef4444')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-tertiary)')}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default Notifications;
