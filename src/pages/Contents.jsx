import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import styles from './Contents.module.css';

const Contents = () => {
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['すべて', 'AI基礎', 'プロンプト', 'ツール', '上級'];

  const contentData = [
    {
      id: 1,
      title: 'ChatGPT完全マスター：ゼロから実践まで',
      category: 'AI基礎',
      author: 'AI Lab Tokyo',
      duration: '3時間45分',
      lessons: 24,
      difficulty: '初級',
      progress: 72,
      image: 'https://picsum.photos/seed/ai1/600/340',
      tag: '人気',
    },
    {
      id: 2,
      title: '上級プロンプトエンジニアリング',
      category: 'プロンプト',
      author: 'Prompt Studio',
      duration: '5時間20分',
      lessons: 38,
      difficulty: '中級',
      progress: 35,
      image: 'https://picsum.photos/seed/ai2/600/340',
      tag: null,
    },
    {
      id: 3,
      title: 'AIツール大全：完全ガイド',
      category: 'ツール',
      author: 'Tech Academy JP',
      duration: '4時間10分',
      lessons: 31,
      difficulty: '中級',
      progress: 0,
      image: 'https://picsum.photos/seed/ai3/600/340',
      tag: '新着',
    },
    {
      id: 4,
      title: 'APIを使ったAIアプリ開発',
      category: '上級',
      author: 'Dev Dojo',
      duration: '6時間30分',
      lessons: 45,
      difficulty: '上級',
      progress: 0,
      image: 'https://picsum.photos/seed/ai4/600/340',
      tag: null,
    },
    {
      id: 5,
      title: 'AI革命：Transformerを理解する',
      category: 'AI基礎',
      author: 'Neural Academy',
      duration: '2時間50分',
      lessons: 18,
      difficulty: '初級',
      progress: 100,
      image: 'https://picsum.photos/seed/ai5/600/340',
      tag: '完了',
    },
    {
      id: 6,
      title: 'Midjourney & DALL-E：AIアート入門',
      category: 'ツール',
      author: 'Creative AI Lab',
      duration: '3時間15分',
      lessons: 22,
      difficulty: '初級',
      progress: 55,
      image: 'https://picsum.photos/seed/ai6/600/340',
      tag: '人気',
    },
    {
      id: 7,
      title: '言語モデルのファインチューニング',
      category: '上級',
      author: 'ML Research Hub',
      duration: '7時間45分',
      lessons: 52,
      difficulty: '上級',
      progress: 0,
      image: 'https://picsum.photos/seed/ai7/600/340',
      tag: null,
    },
    {
      id: 8,
      title: 'コンテンツクリエイター向けプロンプト術',
      category: 'プロンプト',
      author: 'Content Masters',
      duration: '2時間30分',
      lessons: 16,
      difficulty: '初級',
      progress: 12,
      image: 'https://picsum.photos/seed/ai8/600/340',
      tag: '新着',
    },
  ];

  const filteredContent = useMemo(() => {
    return contentData.filter((item) => {
      const categoryMatch = selectedCategory === 'すべて' || item.category === selectedCategory;
      const searchMatch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroSub}>Learn from the Best</p>
          <h1 className={styles.heroTitle}>COURSES</h1>
          <p className={styles.heroDesc}>
            AIスキルの未来を形作る、厳選されたコースコレクション。
          </p>
        </div>
      </div>

      <div className="page-content">
        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.categories}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.searchBox}>
            <Search size={16} />
            <input
              type="text"
              placeholder="コースを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className={styles.grid}>
          {filteredContent.map((c) => (
            <div key={c.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={c.image} alt={c.title} loading="lazy" />
                {c.tag && (
                  <span className={styles.cardTag}>{c.tag}</span>
                )}
                {c.progress > 0 && c.progress < 100 && (
                  <div className={styles.cardProgressOverlay}>
                    <div className={styles.cardProgressBar}>
                      <div className={styles.cardProgressFill} style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                )}
                {c.progress === 100 && (
                  <div className={styles.cardComplete}>
                    <span>完了</span>
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardDifficulty}>{c.difficulty}</span>
                  <span className={styles.cardCategory}>{c.category}</span>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.cardAuthor}>
                    By <strong>{c.author}</strong>
                  </span>
                  <span className={styles.cardDuration}>{c.lessons}レッスン &middot; {c.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className={styles.emptyState}>
            <h3>コンテンツが見つかりません</h3>
            <p>検索条件やカテゴリを変更してみてください。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contents;
