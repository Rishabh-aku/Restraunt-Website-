import React from 'react';
import StatBadge from '../ui/StatBadge';
import { stats } from '../../data/homeData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import logo from '../../assets/images/fantaurant logo.png';
import chefImg from '../../assets/images/chef11.png';

const TestimonialSection = () => {
  const [textRef, textVisible] = useScrollAnimation(0.1);
  const [imgRef, imgVisible]   = useScrollAnimation(0.1);

  return (
    <section className="px-[7vw] mt-64 mb-10 flex flex-wrap-reverse items-end gap-10">

      {/* Text + stats */}
      <div
        ref={textRef}
        className={`flex-1 min-w-[280px] mt-8 transition-all duration-700
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 section-title">
          Customer <span>Feedback</span>
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-lg">
          The company itself is a very successful company. Little ones, they are abandoned, he takes
          up the chosen one, he flees and repels them, but it is true. But I will explain nothing
          about the pleasures of the truth, that pleasure of the pleasures, we accuse the escape
          from the body indeed pleases.
        </p>

        {/* Reviewer */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={logo}
            alt="Reviewer"
            className="w-12 h-12 rounded-full border-4 border-white shadow-brand object-contain bg-brand-warm"
          />
          <div>
            <h6 className="font-bold text-sm hover:text-lg transition-all duration-200 cursor-pointer">
              Uday Shetthi
            </h6>
            <p className="text-xs text-brand-primary">Head Chef</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-6 bg-[rgb(255,219,185)] px-6 py-5 rounded-[0_80px_0_0]">
          {stats.map((stat) => (
            <StatBadge
              key={stat.id}
              icon={stat.icon}
              count={stat.count}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Chef image */}
      <div
        ref={imgRef}
        className={`flex-1 min-w-[240px] text-right transition-all duration-700
          ${imgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <img
          src={chefImg}
          alt="Our Chef"
          className="-mt-32 w-[48vw] max-w-[490px] object-contain inline-block
            hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
