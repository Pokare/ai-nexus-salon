import React, { useState } from 'react';
import { Trash2, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'AI Nexusへようこそ！', message: 'AIマスタープログラムを始めましょう。2,847人のメンバーが参加しています。', time: new Date(), read: true, type: 'welcome' },
    { id: 2, title: '新コース：上級プロンプトエンジニアリング', message: 'プロンプト技術をマスターする最新コースをチェックしましょう。', time: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false, type: 'content' },
    { id: 3, title: '5人の新メンバーが参加', message: 'コミュニティが成長しています！新しいメンバーを歓迎しましょう。', time: new Date(Date.now() - 4 * 60 * 60 * 1000), read: false, type: 'community' },
    { id: 4, title: 'あなたの質問に回答がありました', message: '「効果的なプロンプトの書き方」に返信がつきました。', time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), read: true, type: 'qa' },
    { id: 5, title: 'マイルストーン達成：10レッスン完了', message: '10レッスンを完了しました。この調子で頑張りましょう！', time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), read: true, type: 'achievement' },
    { id: 6, title: 'プラットフォーム更新', message: 'ブックマーク機能と高度なフィルターがコンテンツライブラリに追加されました。', time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), read: true, type: 'update' },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTime = (date) => {
    const diffMs = new Date() - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    return `${diffDays}日前`;
  };

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroSub}>Stay Updated</p>
          <h1 className={styles.heroTitle}>NOTIFICATIONS</h1>
        </div>
      </div>

      <div className="page-content">
        <div className={styles.headerRow}>
          <span className={styles.count}>
            {unreadCount > 0 ? `${unreadCount}件の未読` : 'すべて既読'}
          </span>
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className={styles.markAllBtn}>
              <CheckCheck size={14} />
              すべて既読にする
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>通知はありません</h3>
            <p>すべて確認済みです。</p>
          </div>
        ) : (
          <div className={styles.list}>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
                onClick={() => handleMarkAsRead(n.id)}
              >
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <h4 className={styles.itemTitle}>{n.title}</h4>
                    {!n.read && <span className={styles.unreadDot} />}
                  </div>
                  <p className={styles.itemMessage}>{n.message}</p>
                  <span className={styles.itemTime}>{formatTime(n.time)}</span>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => { e.stopPropagation(); handleDelete(n.id); }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
