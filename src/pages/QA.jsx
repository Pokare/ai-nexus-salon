import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Plus, X, Send } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import styles from './QA.module.css';

const QA = () => {
  const { currentUser } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dummy data for fallback
  const dummyQuestions = [
    {
      id: '1',
      title: 'How do I write effective prompts for ChatGPT?',
      body: 'I want to get better results from ChatGPT. What are the best practices for prompt writing?',
      author: 'alex@example.com',
      authorInitial: 'A',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      replies: 8,
      views: 234,
    },
    {
      id: '2',
      title: 'What is the difference between GPT-3 and GPT-4?',
      body: 'Can someone explain the key differences and improvements in GPT-4 compared to GPT-3?',
      author: 'jordan@example.com',
      authorInitial: 'J',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      replies: 12,
      views: 456,
    },
    {
      id: '3',
      title: 'How to integrate APIs with AI models?',
      body: 'I want to build an app that uses OpenAI API. Where should I start?',
      author: 'sam@example.com',
      authorInitial: 'S',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      replies: 15,
      views: 567,
    },
    {
      id: '4',
      title: 'Best tools for AI image generation?',
      body: 'Looking for alternatives to Midjourney. What are your recommendations?',
      author: 'casey@example.com',
      authorInitial: 'C',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      replies: 20,
      views: 789,
    },
  ];

  useEffect(() => {
    try {
      const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        }));
        setQuestions(data);
      });
      return unsubscribe;
    } catch (err) {
      console.log('Using dummy data for Q&A');
      setQuestions(dummyQuestions);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'questions'), {
        title: formData.title,
        body: formData.body,
        author: currentUser.email,
        createdAt: serverTimestamp(),
        replies: 0,
        views: 0,
      });

      setFormData({ title: '', body: '' });
      setShowModal(false);
    } catch (err) {
      setError('Failed to post question. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
          <motion.div className={styles.header} variants={itemVariants}>
            <div>
              <h1>Q&A Community</h1>
              <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0' }}>
                Ask questions and share knowledge with the community
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
              style={{ gap: '0.5rem' }}
            >
              <Plus size={20} />
              Ask Question
            </button>
          </motion.div>

          {/* Questions List */}
          <motion.div className={styles.list} variants={containerVariants}>
            <AnimatePresence>
              {questions.length === 0 ? (
                <motion.div
                  key="empty"
                  className={styles.emptyState}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <MessageCircle size={48} color="var(--text-tertiary)" />
                  <h3>No questions yet</h3>
                  <p>Be the first to ask a question and start a discussion!</p>
                </motion.div>
              ) : (
                questions.map((question) => (
                  <motion.div
                    key={question.id}
                    className="glass-card"
                    style={{ padding: '1.5rem', cursor: 'pointer' }}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      {/* Avatar */}
                      <div className={styles.avatar}>
                        {question.authorInitial ||
                          question.author.charAt(0).toUpperCase()}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '1.125rem',
                            lineHeight: '1.4',
                            wordBreak: 'break-word',
                          }}
                        >
                          {question.title}
                        </h3>
                        <p
                          style={{
                            margin: '0 0 0.75rem 0',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            wordBreak: 'break-word',
                          }}
                        >
                          {question.body.substring(0, 100)}
                          {question.body.length > 100 ? '...' : ''}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            flexWrap: 'wrap',
                            fontSize: '0.875rem',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          <span>{question.author}</span>
                          <span>{formatDate(question.createdAt)}</span>
                          <span>💬 {question.replies} replies</span>
                          <span>👁️ {question.views} views</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Ask a Question</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={styles.closeBtn}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="input-group">
                  <label className="input-label">Question Title</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="What would you like to ask?"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Details</label>
                  <textarea
                    className="input-field"
                    placeholder="Provide more details about your question..."
                    rows="5"
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                {error && (
                  <motion.div
                    className="error-text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      padding: '1rem',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      color: '#ef4444',
                      fontSize: '0.875rem',
                    }}
                  >
                    {error}
                  </motion.div>
                )}

                <div className={styles.modalActions}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ gap: '0.5rem' }}
                  >
                    <Send size={18} />
                    {loading ? 'Posting...' : 'Post Question'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QA;
