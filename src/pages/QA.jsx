import React, { useState, useEffect } from 'react';
import { Plus, X, Send } from 'lucide-react';
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

  const dummyQuestions = [
    { id: '1', title: 'ChatGPTで効果的なプロンプトを書くには？', body: 'ChatGPTからより良い結果を得たいです。プロンプト作成のベストプラクティスは何ですか？', author: 'alex@example.com', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), replies: 8, views: 234 },
    { id: '2', title: 'GPT-3とGPT-4の違いは何ですか？', body: 'GPT-3と比較してGPT-4の主な違いと改善点を教えてください。', author: 'jordan@example.com', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), replies: 12, views: 456 },
    { id: '3', title: 'AIモデルとAPIを連携するには？', body: 'OpenAI APIを使ったアプリを作りたいです。どこから始めればいいですか？', author: 'sam@example.com', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), replies: 15, views: 567 },
    { id: '4', title: 'AI画像生成のおすすめツールは？', body: 'Midjourneyの代替ツールを探しています。おすすめはありますか？', author: 'casey@example.com', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), replies: 20, views: 789 },
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
      setQuestions(dummyQuestions);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('すべての項目を入力してください');
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
      setError('質問の投稿に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const diffMs = new Date() - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 7) return `${diffDays}日前`;
    return date.toLocaleDateString();
  };

  const displayQuestions = questions.length > 0 ? questions : dummyQuestions;

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroSub}>Community</p>
          <h1 className={styles.heroTitle}>Q&A</h1>
          <p className={styles.heroDesc}>質問して、コミュニティと知識を共有しよう。</p>
        </div>
      </div>

      <div className="page-content">
        <div className={styles.headerRow}>
          <span className={styles.count}>{displayQuestions.length}件の質問</span>
          <button onClick={() => setShowModal(true)} className={styles.newBtn}>
            <Plus size={16} />
            質問する
          </button>
        </div>

        <div className={styles.list}>
          {displayQuestions.map((q) => (
            <div key={q.id} className={styles.item}>
              <div className={styles.itemMain}>
                <h3 className={styles.itemTitle}>{q.title}</h3>
                <p className={styles.itemBody}>{q.body}</p>
              </div>
              <div className={styles.itemMeta}>
                <span>{q.author}</span>
                <span>{formatDate(q.createdAt)}</span>
                <span>{q.replies}件の返信</span>
                <span>{q.views}回表示</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>質問を投稿</h2>
              <button onClick={() => setShowModal(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>質問タイトル</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="何について質問しますか？"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>詳細</label>
                <textarea
                  className={styles.textarea}
                  placeholder="質問の詳細を入力してください..."
                  rows="5"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>
                  キャンセル
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  <Send size={14} />
                  {loading ? '投稿中...' : '質問を投稿'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QA;
