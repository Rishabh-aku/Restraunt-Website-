import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import back2Img from '../assets/images/back2.png';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'FanTaurant | Sign Up'; }, []);

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
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${back2Img})` }}
    >
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border-4 border-white
        rounded-2xl px-10 py-8 text-white shadow-2xl animate-scale-in">

        <h1 className="text-4xl font-extrabold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <input
              type="text" name="name" value={form.name}
              onChange={handleChange} placeholder="Full Name" required
              className="form-input"
            />
          </div>

          <div className="relative">
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="Email" required
              className="form-input"
            />
          </div>

          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              name="password" value={form.password}
              onChange={handleChange} placeholder="Create Password (min 6 chars)" required
              minLength={6}
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

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

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
                Creating account…
              </>
            ) : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold hover:underline hover:text-red-300 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
