import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const stats = [
    { icon: Users, label: '総メンバー数', value: '2,847', change: '+12%', color: '#6366f1' },
    { icon: BookOpen, label: 'コンテンツ数', value: '156', change: '+8', color: '#8b5cf6' },
    { icon: MessageCircle, label: 'Q&A投稿数', value: '892', change: '+24', color: '#ec4899' },
    { icon: TrendingUp, label: 'エンゲージメント', value: '94%', change: '+3%', color: '#06b6d4' },
  ];

  const recentActivity = [
    { title: '上級プロンプトエンジニアリング', description: '新しいコースが追加されました', time: '2時間前', icon: '📚' },
    { title: 'AI Nexusへようこそ！', description: '5人の新メンバーが参加しました', time: '4時間前', icon: '🎉' },
    { title: 'あなたの質問に回答がありました', description: 'Q&A投稿に3件の返信', time: '1日前', icon: '💬' },
    { title: 'マイルストーン達成！', description: '10レッスンを完了しました', time: '2日前', icon: '⭐' },
  ];

  const quickLinks = [
    { label: 'コースを見る', icon: '📖', path: '/contents' },
    { label: 'Q&Aに参加', icon: '❓', path: '/qa' },
    { label: '通知を確認', icon: '🔔', path: '/notifications' },
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
          {/* Welcome */}
          <motion.div className={styles.welcome} variants={itemVariants}>
            <div>
              <h1>おかえりなさい 👋</h1>
              <p className={styles.email}>{currentUser?.email}</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div className={styles.statsGrid} variants={itemVariants}>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ background: `${stat.color}12`, padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                      <Icon size={20} color={stat.color} />
                    </div>
                    <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>{stat.change}</span>
                  </div>
                  <p style={{ margin: '0 0 0.25rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{stat.label}</p>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
                </div>
              );
            })}
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '0.75rem' }}>クイックリンク</h2>
            <div className={styles.quickLinks}>
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="glass-card"
                  style={{
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <span style={{ flex: 1, fontWeight: '500', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{link.label}</span>
                  <ArrowRight size={18} color="var(--text-tertiary)" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '0.75rem' }}>最近のアクティビティ</h2>
            <div className={styles.activityList}>
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.875rem', alignItems: 'center' }}
                >
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{activity.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: '500', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{activity.title}</p>
                    <p style={{ margin: '0.125rem 0 0', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{activity.description}</p>
                  </div>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', flexShrink: 0 }}>{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
