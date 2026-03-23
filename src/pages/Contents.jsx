import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookOpen } from 'lucide-react';
import styles from './Contents.module.css';

const Contents = () => {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['すべて', 'AI基礎', 'プロンプト', 'ツール', '上級'];

  const contentData = [
    { id: 1, title: 'ChatGPT完全マスター：ゼロから実践まで', category: 'AI基礎', description: 'ChatGPTの基本から応用まで、仕事や個人プロジェクトで効果的に活用する方法を学びます。', duration: '3時間45分', lessons: 24, difficulty: '初級', image: '🤖', progress: 72 },
    { id: 2, title: '上級プロンプトエンジニアリング', category: 'プロンプト', description: 'AIモデルから最良の結果を引き出す、効果的なプロンプト作成技術をマスターします。', duration: '5時間20分', lessons: 38, difficulty: '中級', image: '✨', progress: 35 },
    { id: 3, title: 'AIツール大全：完全ガイド', category: 'ツール', description: '今日利用可能な最高のAIツールを探索し、ワークフローに統合する方法を学びます。', duration: '4時間10分', lessons: 31, difficulty: '中級', image: '🛠️', progress: 0 },
    { id: 4, title: 'APIを使ったAIアプリケーション開発', category: '上級', description: 'OpenAIなどのAPIを活用して、本番環境対応のAIアプリケーションを構築する方法を学びます。', duration: '6時間30分', lessons: 45, difficulty: '上級', image: '⚙️', progress: 0 },
    { id: 5, title: 'AI革命：Transformerを理解する', category: 'AI基礎', description: '最新AIモデルの基盤となるアーキテクチャとTransformerの仕組みを理解します。', duration: '2時間50分', lessons: 18, difficulty: '初級', image: '🧠', progress: 100 },
    { id: 6, title: 'Midjourney & DALL-E：AIアート入門', category: 'ツール', description: 'MidjourneyとDALL-Eで素晴らしいAI生成アートを作成。デザイナーにも最適です。', duration: '3時間15分', lessons: 22, difficulty: '初級', image: '🎨', progress: 55 },
    { id: 7, title: '言語モデルのファインチューニング', category: '上級', description: '大規模言語モデルを特定のユースケースに合わせてカスタマイズする方法を学びます。', duration: '7時間45分', lessons: 52, difficulty: '上級', image: '🔬', progress: 0 },
    { id: 8, title: 'コンテンツクリエイター向けプロンプト術', category: 'プロンプト', description: 'ライター、マーケター、コンテンツクリエイター向けの専門的なプロンプト技術。', duration: '2時間30分', lessons: 16, difficulty: '初級', image: '✍️', progress: 12 },
  ];

  const filteredContent = useMemo(() => {
    return contentData.filter((item) => {
      const categoryMatch = selectedCategory === 'すべて' || item.category === selectedCategory;
      const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  const getDifficultyStyle = (d) => {
    if (d === '初級') return { bg: 'var(--success-light)', color: 'var(--success)' };
    if (d === '中級') return { bg: 'var(--accent-light)', color: '#92400e' };
    return { bg: 'var(--danger-light)', color: 'var(--danger)' };
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <motion.div className={styles.container} variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <h1 style={{ marginBottom: '0.25rem' }}>学習コンテンツ</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              厳選された{contentData.length}本のコース・チュートリアル
            </p>
          </motion.div>

          {/* Search */}
          <motion.div className={styles.searchBar} variants={itemVariants}>
            <Search size={18} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="コースを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '0.9375rem', outline: 'none', color: 'var(--text-primary)' }}
            />
          </motion.div>

          {/* Categories */}
          <motion.div className={styles.categories} variants={itemVariants}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div className={styles.grid} variants={containerVariants}>
            {filteredContent.map((c) => {
              const ds = getDifficultyStyle(c.difficulty);
              return (
                <motion.div key={c.id} className="glass-card" variants={itemVariants} style={{ overflow: 'hidden', cursor: 'pointer' }}>
                  <div className={styles.thumbnail}>
                    <span style={{ fontSize: '3rem' }}>{c.image}</span>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
                      <span className="badge" style={{ background: ds.bg, color: ds.color }}>{c.difficulty}</span>
                      <span className="badge badge-primary">{c.category}</span>
                    </div>

                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', lineHeight: '1.4' }}>{c.title}</h3>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: '1.5' }}>{c.description}</p>

                    {/* Progress */}
                    {c.progress > 0 && (
                      <div style={{ marginBottom: '0.875rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>進捗</span>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: c.progress === 100 ? 'var(--success)' : 'var(--primary)' }}>{c.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-bar-fill" style={{ width: `${c.progress}%`, background: c.progress === 100 ? 'var(--success)' : 'var(--primary)' }} />
                        </div>
                      </div>
                    )}

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Clock size={14} /> {c.duration}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <BookOpen size={14} /> {c.lessons}レッスン
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredContent.length === 0 && (
            <div className={styles.emptyState}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3>コンテンツが見つかりません</h3>
              <p>検索条件やカテゴリを変更してみてください</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contents;
