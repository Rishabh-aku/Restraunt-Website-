import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import heroImg from '../../assets/images/foodplate.png';

const HeroSection = () => {
  const [textRef, textVisible] = useScrollAnimation(0.1);
  const [imgRef, imgVisible]   = useScrollAnimation(0.1);

  return (
    <section className="bg-brand-cream px-[7vw] py-10 overflow-hidden">
      <div className="flex items-center flex-wrap-reverse gap-8 min-h-[400px]">

        {/* Text */}
        <div
          ref={textRef}
          className={`flex-1 min-w-[280px] transition-all duration-700
            ${textVisible ? 'animate-fade-in-left opacity-100' : 'opacity-0 translate-x-[-30px]'}`}
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase
            text-brand-primary bg-brand-warm px-3 py-1 rounded-full mb-4">
            🍽️ Welcome to FanTaurant
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 text-gray-900">
            Enjoy{' '}
            <span className="text-brand-primary underline decoration-brand-gold"
              style={{ textUnderlineOffset: '10px', textDecorationColor: '#FCC47C' }}>
              Delicious Food
            </span>
            {' '}in Your Healthy Life
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
            Experience food crafted with love, using fresh ingredients and handground spices. 
            From smoking hot tandoors to flavorful traditional recipes, discover a taste that feeds your soul.
          </p>
          <Link to="/menu">
            <Button variant="primary" size="lg" className="group">
              Visit Now
              <i className="fa-solid fa-arrow-right-long transition-transform duration-300
                group-hover:translate-x-1.5" />
            </Button>
          </Link>
        </div>

        {/* Hero image */}
        <div
          ref={imgRef}
          className={`flex-1 min-w-[260px] flex justify-center pt-6 transition-all duration-700
            ${imgVisible ? 'animate-fade-in-right opacity-100' : 'opacity-0 translate-x-[30px]'}`}
        >
          <img
            src={heroImg}
            alt="Delicious food plate"
            className="w-full max-w-[420px] object-contain animate-float drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
