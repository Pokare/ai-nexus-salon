import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser } = useAuth();

  const stats = [
    { label: '総メンバー', value: '2,847' },
    { label: 'コース数', value: '8' },
    { label: 'Q&A投稿', value: '892' },
    { label: 'エンゲージメント', value: '94%' },
  ];

  const recentCourses = [
    { id: 1, title: 'ChatGPT完全マスター', progress: 72, image: 'https://picsum.photos/seed/ai1/600/340' },
    { id: 2, title: '上級プロンプトエンジニアリング', progress: 35, image: 'https://picsum.photos/seed/ai2/600/340' },
    { id: 3, title: 'Midjourney & DALL-E入門', progress: 55, image: 'https://picsum.photos/seed/ai6/600/340' },
  ];

  const recentActivity = [
    { title: '上級プロンプトエンジニアリング', desc: '新しいコースが追加されました', time: '2時間前' },
    { title: 'AI Nexusへようこそ', desc: '5人の新メンバーが参加しました', time: '4時間前' },
    { title: '質問に回答がつきました', desc: 'Q&A投稿に3件の返信', time: '1日前' },
    { title: 'マイルストーン達成', desc: '10レッスンを完了しました', time: '2日前' },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroSub}>Learn from the Best</p>
          <h1 className={styles.heroTitle}>AI NEXUS</h1>
          <p className={styles.heroDesc}>
            AIスキルの未来を形作る。厳選されたコースとコミュニティ。
          </p>
          <div className={styles.heroPricing}>
            <span>すべてのコースにアクセス。 </span>
            <span className={styles.heroPriceNum}>8</span>
            <span> コース学び放題</span>
          </div>
          <Link to="/contents" className={styles.heroLink}>コース一覧を見る &rarr;</Link>
        </div>
      </div>

      <div className="page-content">
        {/* Stats row */}
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>学習を続ける</h2>
            <Link to="/contents" className={styles.sectionLink}>すべて見る</Link>
          </div>
          <div className={styles.courseGrid}>
            {recentCourses.map((course) => (
              <Link to="/contents" key={course.id} className={styles.courseCard}>
                <div className={styles.courseImage}>
                  <img src={course.image} alt={course.title} loading="lazy" />
                  <div className={styles.courseProgress}>
                    <div className={styles.courseProgressBar}>
                      <div
                        className={styles.courseProgressFill}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className={styles.courseProgressText}>{course.progress}%</span>
                  </div>
                </div>
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>最近のアクティビティ</h2>
          <div className={styles.activityList}>
            {recentActivity.map((item, i) => (
              <div key={i} className={styles.activityItem}>
                <div className={styles.activityContent}>
                  <span className={styles.activityTitle}>{item.title}</span>
                  <span className={styles.activityDesc}>{item.desc}</span>
                </div>
                <span className={styles.activityTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
