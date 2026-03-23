import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.message.replace(/Firebase:\s*/, '');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.logoMark}>
            <Zap size={28} />
          </div>
          <h1 className={styles.brand}>AI Nexus</h1>
          <p className={styles.tagline}>AIの学びとコミュニティへの入口</p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📚</span>
              <div>
                <h4>体系的な学習</h4>
                <p>初級から上級まで段階的に学べるカリキュラム</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💬</span>
              <div>
                <h4>コミュニティ</h4>
                <p>仲間と質問し合い、知識を深める</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🚀</span>
              <div>
                <h4>実践的スキル</h4>
                <p>すぐに使えるAIツール活用法を習得</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className={styles.formTitle}>
            {isLogin ? 'ログイン' : '新規登録'}
          </h2>
          <p className={styles.formSubtitle}>
            {isLogin ? 'アカウントにログインしてください' : '新しいアカウントを作成します'}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="input-group">
              <label className="input-label">メールアドレス</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">パスワード</label>
              <input
                type="password"
                className="input-field"
                placeholder="6文字以上"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className={styles.error}>{error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
              disabled={loading}
            >
              {loading ? 'しばらくお待ちください...' : isLogin ? 'ログイン' : '新規登録'}
            </button>
          </form>

          <p className={styles.switchText}>
            {isLogin ? 'アカウントをお持ちでない方は ' : 'すでにアカウントをお持ちの方は '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className={styles.switchLink}
            >
              {isLogin ? '新規登録' : 'ログイン'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
