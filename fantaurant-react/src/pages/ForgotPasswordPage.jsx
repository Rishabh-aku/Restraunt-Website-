import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import blueImg from '../assets/images/BLUE.jpg';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState('request'); // 'request' | 'reset' | 'done'
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'FanTaurant | Forgot Password';
  }, []);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      // In production, this token would be emailed. For demo, we get it back.
      setResetToken(data.resetToken);
      setMessage(data.message);
      setStep('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(resetToken, newPassword);
      setStep('done');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Token may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${blueImg})` }}
    >
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border-4 border-white
        rounded-2xl px-10 py-8 text-white shadow-2xl animate-scale-in">

        <h1 className="text-3xl font-extrabold text-center mb-6">Forgot Password</h1>

        {/* STEP 1: Request reset */}
        {step === 'request' && (
          <form onSubmit={handleRequestReset} className="space-y-5">
            <p className="text-sm text-white/70 text-center">Enter your email to receive a reset token.</p>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-white text-gray-800 font-bold rounded-full
                shadow-md transition-all duration-300 hover:bg-brand-warm hover:scale-[1.02]
                active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" /> Sending…</>
              ) : 'Send Reset Token'}
            </button>
          </form>
        )}

        {/* STEP 2: Enter new password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="bg-green-500/20 border border-green-400/40 rounded-xl p-3 text-sm text-center">
              <i className="fa-solid fa-circle-check text-green-400 mr-2" />
              {message}. Enter your new password below.
            </div>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password (min 6 chars)"
                required minLength={6}
                className="form-input pr-12"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors">
                <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`} />
              </button>
            </div>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                required
                className="form-input"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-white text-gray-800 font-bold rounded-full
                shadow-md transition-all duration-300 hover:bg-brand-warm hover:scale-[1.02]
                active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" /> Resetting…</>
              ) : 'Reset Password'}
            </button>
          </form>
        )}

        {/* STEP 3: Done */}
        {step === 'done' && (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 animate-bounce">
              <i className="fa-solid fa-check text-3xl" />
            </div>
            <p className="text-lg font-semibold">Password Reset Successful!</p>
            <p className="text-sm text-white/70">Redirecting to login page…</p>
          </div>
        )}

        {step !== 'done' && (
          <p className="text-sm text-center mt-6">
            Remember your password?{' '}
            <Link to="/login" className="font-bold hover:underline hover:text-red-300 transition-colors">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
