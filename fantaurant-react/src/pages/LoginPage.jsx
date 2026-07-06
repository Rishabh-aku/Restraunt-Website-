import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backImg from '../assets/images/back.png';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'FanTaurant | Login'; }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border-4 border-white
        rounded-2xl px-10 py-8 text-white shadow-2xl animate-scale-in">

        <h1 className="text-4xl font-extrabold text-center mb-6 text-white pb-2">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="form-input pr-12"
            />
            <i className="fa-solid fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-white/60" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="form-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm -mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <Link to="/forgot-password" className="hover:underline text-white/80 hover:text-white">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-300 text-xs text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-white text-gray-800 font-bold rounded-full
              shadow-md transition-all duration-300 hover:bg-brand-warm hover:scale-[1.02]
              active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                Logging in…
              </>
            ) : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold hover:underline hover:text-red-300 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
