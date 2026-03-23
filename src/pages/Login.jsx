import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className={styles.page}>
      {/* Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(12)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot}>&#9679;</span>
              <span className={styles.marqueeBold}>AI Nexus</span>
              <span>AIの学びとコミュニティへの入口</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Left - Hero */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroSub}>Learn from the Best</p>
            <h1 className={styles.heroTitle}>AI NEXUS</h1>
            <p className={styles.heroDesc}>
              AIスキルの未来を形作る。<br />
              厳選されたコースとコミュニティ。
            </p>

            <div className={styles.heroCta}>
              <span className={styles.heroPrice}>8</span>
              <span className={styles.heroPriceSub}>本のコースが学び放題</span>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className={styles.formSide}>
          <div className={styles.formWrapper}>
            <div className={styles.formTabs}>
              <button
                className={`${styles.formTab} ${isLogin ? styles.formTabActive : ''}`}
                onClick={() => { setIsLogin(true); setError(''); }}
              >
                ログイン
              </button>
              <button
                className={`${styles.formTab} ${!isLogin ? styles.formTabActive : ''}`}
                onClick={() => { setIsLogin(false); setError(''); }}
              >
                新規登録
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>メールアドレス</label>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>パスワード</label>
                <input
                  type="password"
                  className={styles.input}
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
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'しばらくお待ちください...' : isLogin ? 'ログイン' : 'アカウントを作成'}
              </button>
            </form>

            <p className={styles.switchText}>
              {isLogin ? 'アカウントをお持ちでない方は ' : 'すでにアカウントをお持ちの方は '}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className={styles.switchLink}
              >
                {isLogin ? '新規登録' : 'ログイン'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
