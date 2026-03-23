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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className={styles.container}>
      <div className={styles.orbContainer}>
        <div className={`${styles.orb} ${styles.orbPrimary}`} />
        <div className={`${styles.orb} ${styles.orbSecondary}`} />
        <div className={`${styles.orb} ${styles.orbAccent}`} />
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <div className={styles.logo}>
            <Zap size={32} />
            <h1>AI Nexus</h1>
          </div>
          <p className={styles.subtitle}>
            Your gateway to AI mastery and community
          </p>
        </motion.div>

        <motion.div className={styles.card} variants={itemVariants}>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${isLogin ? styles.active : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Log In
            </button>
            <button
              className={`${styles.toggleBtn} ${!isLogin ? styles.active : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="input-group">
              <label className="input-label">Email</label>
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
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <motion.div
                className={styles.error}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.5rem' }}
              disabled={loading}
            >
              {loading ? 'Please wait...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <p className={styles.hint}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className={styles.link}
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </motion.div>

        <motion.div className={styles.features} variants={itemVariants}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💡</div>
            <div>
              <h4>Learn AI</h4>
              <p>Master AI tools and concepts</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🤝</div>
            <div>
              <h4>Connect</h4>
              <p>Join a vibrant community</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <div>
              <h4>Grow</h4>
              <p>Accelerate your AI journey</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
