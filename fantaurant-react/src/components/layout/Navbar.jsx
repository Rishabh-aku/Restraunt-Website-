import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import logo from '../../assets/images/fantaurant logo.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled]     = useState(false);
  const searchRef = useRef(null);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* ── Main Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-brand-cream
          transition-all duration-300 border-b border-brand-gold
          ${scrolled ? 'shadow-[0_2px_20px_rgba(253,124,124,0.5)]' : 'shadow-[0_2px_10px_rgba(253,124,124,0.2)]'}`}
      >
        <div className="flex items-center justify-between h-[60px] px-[7vw]">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
          >
            <img src={logo} alt="FanTaurant" className="w-[150px] object-contain" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'text-brand-primary after:w-full' : 'text-gray-800'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop Account Icons ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="relative flex items-center" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-brand-warm transition-colors duration-200"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass text-gray-700 hover:text-brand-primary transition-colors duration-200" />
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }
                }}
                className={`absolute right-0 top-10 flex items-center bg-white rounded-full
                  shadow-brand border border-brand-gold overflow-hidden
                  transition-all duration-300 origin-right
                  ${searchOpen ? 'w-48 opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'}`}
              >
                <input
                  type="search"
                  placeholder="Search food…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
                  autoFocus={searchOpen}
                />
                <button
                  type="submit"
                  className="fa-solid fa-magnifying-glass bg-brand-warm text-brand-primary px-3 py-2 cursor-pointer border-none outline-none flex items-center justify-center"
                  aria-label="Submit search"
                />
              </form>
            </div>

            {/* Auth: show user name + logout OR login button */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
                  <i className="fa-solid fa-circle-user text-brand-primary mr-1" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-brand-primary text-white
                    hover:bg-red-600 transition-colors duration-200 flex items-center gap-1"
                >
                  <i className="fa-solid fa-right-from-bracket" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-full hover:bg-brand-warm transition-colors duration-200"
              >
                <i className="fa-solid fa-user text-gray-700 hover:text-brand-primary transition-colors duration-200" />
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-brand-warm transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 flex flex-col gap-1.5 transition-all duration-300">
              <span
                className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300
                  ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center
                  ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-40 bg-[rgb(252,231,216)]
          shadow-[-5px_0_30px_rgba(253,120,69,0.2)]
          transition-transform duration-500 ease-in-out md:hidden flex flex-col
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-20 pb-6 border-b border-brand-gold">
          <img src={logo} alt="FanTaurant" className="w-32" />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-brand-warm transition-colors duration-200"
          >
            <i className="fa-solid fa-xmark text-xl text-gray-700" />
          </button>
        </div>

        {/* User info in drawer if logged in */}
        {user && (
          <div className="mx-4 mt-4 px-4 py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center gap-3">
            <i className="fa-solid fa-circle-user text-brand-primary text-2xl" />
            <div>
              <p className="text-sm font-bold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-xl font-bold text-sm
                transition-all duration-200 border border-transparent
                ${isActive
                  ? 'bg-brand-primary text-white shadow-brand-sm'
                  : 'text-gray-800 hover:bg-brand-warm hover:text-brand-primary hover:border-brand-gold'
                }`
              }
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Account icons */}
        <div className="mt-auto px-6 py-6 border-t border-brand-gold bg-[rgb(252,210,182)]
          flex items-center justify-around">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 group"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-house-chimney text-xl group-hover:text-brand-primary transition-colors duration-200" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <button
            className="flex flex-col items-center gap-1 group"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <i className="fa-solid fa-magnifying-glass text-xl group-hover:text-brand-primary transition-colors duration-200" />
            <span className="text-xs font-semibold">Search</span>
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 group"
            >
              <i className="fa-solid fa-right-from-bracket text-xl group-hover:text-red-500 transition-colors duration-200" />
              <span className="text-xs font-semibold">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center gap-1 group"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-user text-xl group-hover:text-brand-primary transition-colors duration-200" />
              <span className="text-xs font-semibold">Account</span>
            </Link>
          )}
        </div>
      </div>

      {/* Spacer to push content below fixed header */}
      <div className="h-[60px]" />
    </>
  );
};

export default Navbar;
