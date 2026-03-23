import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookmarkPlus } from 'lucide-react';
import styles from './Contents.module.css';

const Contents = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState([]);

  const categories = ['すべて', 'AI基礎', 'プロンプト', 'ツール', '上級'];

  const contentData = [
    {
      id: 1,
      title: 'ChatGPT完全マスター：ゼロから実践まで',
      category: 'AI基礎',
      description: 'ChatGPTの基本から応用まで、仕事や個人プロジェクトで効果的に活用する方法を学びます。',
      duration: '3時間45分',
      lessons: 24,
      difficulty: '初級',
      image: '🤖',
    },
    {
      id: 2,
      title: '上級プロンプトエンジニアリング',
      category: 'プロンプト',
      description: 'AIモデルから最良の結果を引き出す、効果的なプロンプト作成技術をマスターします。',
      duration: '5時間20分',
      lessons: 38,
      difficulty: '中級',
      image: '✨',
    },
    {
      id: 3,
      title: 'AIツール大全：完全ガイド',
      category: 'ツール',
      description: '今日利用可能な最高のAIツールを探索し、ワークフローに統合する方法を学びます。',
      duration: '4時間10分',
      lessons: 31,
      difficulty: '中級',
      image: '🛠️',
    },
    {
      id: 4,
      title: 'APIを使ったAIアプリケーション開発',
      category: '上級',
      description: 'OpenAIなどのAPIを活用して、本番環境対応のAIアプリケーションを構築する方法を学びます。',
      duration: '6時間30分',
      lessons: 45,
      difficulty: '上級',
      image: '⚙️',
    },
    {
      id: 5,
      title: 'AI革命：Transformerを理解する',
      category: 'AI基礎',
      description: '最新AIモデルの基盤となるアーキテクチャとTransformerの仕組みを理解します。',
      duration: '2時間50分',
      lessons: 18,
      difficulty: '初級',
      image: '🧠',
    },
    {
      id: 6,
      title: 'Midjourney & DALL-E：AIアート入門',
      category: 'ツール',
      description: 'MidjourneyとDALL-Eで素晴らしいAI生成アートを作成。デザイナーにも最適です。',
      duration: '3時間15分',
      lessons: 22,
      difficulty: '初級',
      image: '🎨',
    },
    {
      id: 7,
      title: '言語モデルのファインチューニング',
      category: '上級',
      description: '大規模言語モデルを特定のユースケースに合わせてカスタマイズする方法を学びます。',
      duration: '7時間45分',
      lessons: 52,
      difficulty: '上級',
      image: '🔬',
    },
    {
      id: 8,
      title: 'コンテンツクリエイター向けプロンプト術',
      category: 'プロンプト',
      description: 'ライター、マーケター、コンテンツクリエイター向けの専門的なプロンプト技術。',
      duration: '2時間30分',
      lessons: 16,
      difficulty: '初級',
      image: '✍️',
    },
  ];

  const filteredContent = useMemo(() => {
    return contentData.filter((item) => {
      const categoryMatch =
        selectedCategory === 'すべて' || item.category === selectedCategory;
      const searchMatch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
          <motion.div variants={itemVariants}>
            <h1 style={{ marginBottom: '0.5rem' }}>学習コンテンツ</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '2rem' }}>
              厳選された{contentData.length}本のコース・チュートリアル
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div className={styles.searchBar} variants={itemVariants}>
            <Search size={20} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="コースを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                flex: 1,
                fontSize: '1rem',
                outline: 'none',
                color: 'var(--text-primary)',
              }}
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div className={styles.categories} variants={itemVariants}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.active : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Content Grid */}
          <motion.div className={styles.grid} variants={containerVariants}>
            {filteredContent.map((content) => (
              <motion.div
                key={content.id}
                className="glass-card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
                style={{ overflow: 'hidden', cursor: 'pointer' }}
              >
                {/* Thumbnail */}
                <div className={styles.thumbnail}>
                  <span style={{ fontSize: '3.5rem' }}>{content.image}</span>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                      }}
                    >
                      {content.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSave(content.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        color: savedItems.includes(content.id)
                          ? '#ec4899'
                          : 'var(--text-tertiary)',
                        transition: 'color 0.2s',
                      }}
                    >
                      <BookmarkPlus
                        size={20}
                        fill={savedItems.includes(content.id) ? '#ec4899' : 'none'}
                      />
                    </button>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 0.75rem 0',
                      fontSize: '1.125rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {content.title}
                  </h3>

                  <p
                    style={{
                      margin: '0 0 1rem 0',
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: '1.5',
                    }}
                  >
                    {content.description}
                  </p>

                  {/* Meta Info */}
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0, 0, 0, 0.05)', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Clock size={16} />
                      {content.duration}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      📚 {content.lessons}レッスン
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.375rem 0.75rem',
                        background:
                          content.difficulty === '初級'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : content.difficulty === '中級'
                              ? 'rgba(245, 158, 11, 0.1)'
                              : 'rgba(239, 68, 68, 0.1)',
                        color:
                          content.difficulty === '初級'
                            ? '#10b981'
                            : content.difficulty === '中級'
                              ? '#f59e0b'
                              : '#ef4444',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '6px',
                      }}
                    >
                      {content.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredContent.length === 0 && (
            <motion.div
              className={styles.emptyState}
              variants={itemVariants}
            >
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3>コンテンツが見つかりません</h3>
              <p>検索条件やカテゴリを変更してみてください</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contents;
