import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/fantaurant logo.png';
import { navLinks } from '../../data/navLinks';

const Footer = () => {
  return (
    <footer className="bg-brand-footer border-t-2 border-brand-gold-dark py-14 px-8">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around items-center gap-10">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={logo}
            alt="FanTaurant"
            className="w-36 rounded-full border-4 border-brand-warm shadow-brand
              transition-all duration-300 hover:scale-105 hover:shadow-brand-lg"
          />
          <p className="text-xs text-gray-500 text-center mt-1">
            Enjoy Delicious Food in Your Healthy Life
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-3">
          <h5 className="font-bold text-sm text-gray-800 mb-1 uppercase tracking-widest">
            Quick Links
          </h5>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm text-gray-600 hover:text-brand-primary
                transition-colors duration-200 hover:underline decoration-brand-gold underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Credits */}
        <div className="text-center cursor-pointer">
          <h5 className="font-bold text-sm text-gray-800 mb-3 uppercase tracking-widest">
            Powered by
          </h5>
          {['Abhay Kumar'].map((name) => (
            <p
              key={name}
              className="font-semibold italic text-gray-700 py-1 px-2
                transition-all duration-200 hover:text-lg hover:text-brand-primary"
            >
              {name}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-brand-gold text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} FanTaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
