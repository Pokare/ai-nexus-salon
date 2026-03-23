import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, BookmarkPlus } from 'lucide-react';
import styles from './Contents.module.css';

const Contents = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState([]);

  const categories = ['All', 'AI Basics', 'Prompt Engineering', 'Tools', 'Advanced'];

  const contentData = [
    {
      id: 1,
      title: 'ChatGPT Mastery: From Zero to Hero',
      category: 'AI Basics',
      description: 'Learn everything about ChatGPT and how to use it effectively for work and personal projects.',
      duration: '3h 45m',
      lessons: 24,
      difficulty: 'Beginner',
      image: '🤖',
    },
    {
      id: 2,
      title: 'Advanced Prompt Engineering Techniques',
      category: 'Prompt Engineering',
      description: 'Master the art of crafting effective prompts to get the best results from AI models.',
      duration: '5h 20m',
      lessons: 38,
      difficulty: 'Intermediate',
      image: '✨',
    },
    {
      id: 3,
      title: 'AI Tools Ecosystem: Your Complete Toolkit',
      category: 'Tools',
      description: 'Explore the best AI tools available today and learn how to integrate them into your workflow.',
      duration: '4h 10m',
      lessons: 31,
      difficulty: 'Intermediate',
      image: '🛠️',
    },
    {
      id: 4,
      title: 'Building AI Applications with APIs',
      category: 'Advanced',
      description: 'Deep dive into building production-ready AI applications using OpenAI and other APIs.',
      duration: '6h 30m',
      lessons: 45,
      difficulty: 'Advanced',
      image: '⚙️',
    },
    {
      id: 5,
      title: 'The AI Revolution: Understanding Transformers',
      category: 'AI Basics',
      description: 'Understand the architecture behind modern AI models and how transformers work.',
      duration: '2h 50m',
      lessons: 18,
      difficulty: 'Beginner',
      image: '🧠',
    },
    {
      id: 6,
      title: 'Midjourney & DALL-E: AI Art Mastery',
      category: 'Tools',
      description: 'Create stunning AI-generated artwork with Midjourney and DALL-E. Perfect for designers.',
      duration: '3h 15m',
      lessons: 22,
      difficulty: 'Beginner',
      image: '🎨',
    },
    {
      id: 7,
      title: 'Fine-tuning Language Models',
      category: 'Advanced',
      description: 'Learn how to fine-tune and customize large language models for specific use cases.',
      duration: '7h 45m',
      lessons: 52,
      difficulty: 'Advanced',
      image: '🔬',
    },
    {
      id: 8,
      title: 'Prompt Engineering for Content Creators',
      category: 'Prompt Engineering',
      description: 'Specialized prompting techniques for writers, marketers, and content creators.',
      duration: '2h 30m',
      lessons: 16,
      difficulty: 'Beginner',
      image: '✍️',
    },
  ];

  const filteredContent = useMemo(() => {
    return contentData.filter((item) => {
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;
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
            <h1 style={{ marginBottom: '0.5rem' }}>Learning Contents</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, marginBottom: '2rem' }}>
              Explore {contentData.length} carefully curated courses and tutorials
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div className={styles.searchBar} variants={itemVariants}>
            <Search size={20} color="var(--text-tertiary)" />
            <input
              type="text"
              placeholder="Search courses..."
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
                      📚 {content.lessons} lessons
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
                          content.difficulty === 'Beginner'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : content.difficulty === 'Intermediate'
                              ? 'rgba(245, 158, 11, 0.1)'
                              : 'rgba(239, 68, 68, 0.1)',
                        color:
                          content.difficulty === 'Beginner'
                            ? '#10b981'
                            : content.difficulty === 'Intermediate'
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
              <h3>No content found</h3>
              <p>Try adjusting your search or category filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contents;
