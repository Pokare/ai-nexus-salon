import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

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
      icon: Users,
      label: '総メンバー数',
      value: '2,847',
      change: '+12%',
      color: '#6366f1',
    },
    {
      icon: BookOpen,
      label: 'コンテンツ数',
      value: '156',
      change: '+8',
      color: '#8b5cf6',
    },
    {
      icon: MessageCircle,
      label: 'Q&A投稿数',
      value: '892',
      change: '+24',
      color: '#ec4899',
    },
    {
      icon: TrendingUp,
      label: 'エンゲージメント',
      value: '94%',
      change: '+3%',
      color: '#06b6d4',
    },
  ];

  const recentActivity = [
    {
      type: 'new_content',
      title: '上級プロンプトエンジニアリング',
      description: '新しいコースが追加されました',
      time: '2時間前',
      icon: '📚',
    },
    {
      type: 'new_member',
      title: 'AI Nexusへようこそ！',
      description: '5人の新メンバーが参加しました',
      time: '4時間前',
      icon: '🎉',
    },
    {
      type: 'qa_answer',
      title: 'あなたの質問に回答がありました',
      description: 'Q&A投稿に3件の返信',
      time: '1日前',
      icon: '💬',
    },
    {
      type: 'milestone',
      title: 'マイルストーン達成！',
      description: '10レッスンを完了しました',
      time: '2日前',
      icon: '⭐',
    },
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
          {/* Welcome Section */}
          <motion.div className={styles.welcome} variants={itemVariants}>
            <div>
              <h1>おかえりなさい</h1>
              <p className={styles.email}>{currentUser?.email}</p>
            </div>
            <div className={styles.greeting}>
              <span className={styles.emoji}>👋</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className={styles.statsGrid} variants={itemVariants}>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="glass-card"
                  style={{ padding: '1.5rem' }}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ background: `${stat.color}15`, padding: '0.75rem', borderRadius: '12px' }}>
                      <Icon size={24} color={stat.color} />
                    </div>
                    <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '600' }}>
                      {stat.change}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    {stat.label}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700' }}>
                    {stat.value}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>クイックリンク</h2>
            <div className={styles.quickLinks}>
              {quickLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.path}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  whileHover={{ x: 4 }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>
                      {link.label}
                    </p>
                  </div>
                  <ArrowRight size={20} color="var(--text-tertiary)" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', marginTop: '2rem' }}>
              最近のアクティビティ
            </h2>
            <div className={styles.activityList}>
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    borderLeft: `4px solid var(--primary-start)`,
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                      {activity.icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>
                        {activity.title}
                      </h4>
                      <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {activity.description}
                      </p>
                      <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
