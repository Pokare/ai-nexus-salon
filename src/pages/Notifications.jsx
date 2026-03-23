import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'welcome',
      title: 'AI Nexusへようこそ！',
      message: 'AIマスタープログラムを始めましょう。2,847人のメンバーが参加しています。',
      time: new Date(),
      read: true,
      icon: '🎉',
    },
    {
      id: 2,
      type: 'content',
      title: '新コース：上級プロンプトエンジニアリング',
      message: 'プロンプト技術をマスターする最新コースをチェックしましょう。',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      icon: '📚',
    },
    {
      id: 3,
      type: 'community',
      title: '5人の新メンバーが参加',
      message: 'コミュニティが成長しています！新しいメンバーを歓迎しましょう。',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      icon: '👥',
    },
    {
      id: 4,
      type: 'qa',
      title: 'あなたの質問に回答がありました',
      message: '「効果的なプロンプトの書き方」に返信がつきました。',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '💬',
    },
    {
      id: 5,
      type: 'achievement',
      title: 'マイルストーン達成：10レッスン完了',
      message: '10レッスンを完了しました。この調子で頑張りましょう！',
      time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      icon: '⭐',
    },
    {
      id: 6,
      type: 'update',
      title: 'プラットフォーム更新：新機能が追加されました',
      message: 'ブックマーク機能と高度なフィルターがコンテンツライブラリに追加されました。',
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
              <h1>通知</h1>
              {unreadCount > 0 && (
                <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>
                  {unreadCount}件の未読通知
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
                すべて既読にする
              </button>
            )}
          </motion.div>

          {/* Notifications by Period */}
          {notifications.length === 0 ? (
            <motion.div className={styles.emptyState} variants={itemVariants}>
              <span style={{ fontSize: '3rem' }}>📭</span>
              <h3>通知はありません</h3>
              <p>すべて確認済みです！</p>
            </motion.div>
          ) : (
            <div className={styles.list}>
              {/* Today */}
              {groupedNotifications.today.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className={styles.sectionTitle}>今日</h3>
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
                  <h3 className={styles.sectionTitle}>昨日</h3>
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
                  <h3 className={styles.sectionTitle}>それ以前</h3>
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
      return `${new Date().getMinutes() - new Date(date).getMinutes()}分前`;
    }
    return `${hours}時間前`;
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
