import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const NewsletterSection = () => {
  const [email, setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, isVisible]      = useScrollAnimation(0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section
      ref={ref}
      className={`px-[7vw] py-24 flex flex-wrap justify-between items-center gap-8
        transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Heading */}
      <div className="flex-1 min-w-[220px]">
        <h2 className="text-3xl font-extrabold section-title">
          Subscribe <span>Newsletter</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Get the latest offers and menu updates delivered to your inbox.
        </p>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 min-w-[260px] mt-5 md:mt-0 shadow-brand-sm rounded-xl overflow-hidden border border-brand-gold bg-white"
      >
        <div className="flex flex-1 items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3.5 text-sm outline-none bg-transparent border-none
              placeholder-gray-400 text-gray-800"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-6 py-3.5 text-sm rounded-none
            m-0 shadow-none border-none"
        >
          {submitted ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-check" /> Subscribed!
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
