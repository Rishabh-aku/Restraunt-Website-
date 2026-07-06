import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import chefAni from '../../assets/images/anichef.png';

const AboutHero = () => {
  const [textRef, textVisible] = useScrollAnimation(0.1);
  const [imgRef, imgVisible]   = useScrollAnimation(0.1);

  return (
    <section className="px-[7vw] py-16 flex flex-wrap-reverse items-center gap-10">

      {/* Text */}
      <div
        ref={textRef}
        className={`flex-1 min-w-[280px] transition-all duration-700
          ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="inline-block text-xs font-bold tracking-widest uppercase
          text-brand-primary bg-brand-warm px-3 py-1 rounded-full mb-4">
          🌟 Our Story
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 section-title">
          About <span>Us</span>
        </h1>
        <p className="text-sm text-gray-600 leading-loose">
          It is very important for the customer to pay attention to the adipiscing process.
          Moreover, to be rejected, and because there is anyone who is the very thing? It hinders,
          therefore, a great laborious pleasure, which I shall explain to the right. It is true,
          that they do not know that we can accuse him often that he hinders the most deserving
          of insight. He flees from what is not present. And some pains, in certain times, are
          caused to the architect by the rejection of all the most worthy labors, and this is
          scorned by the mere fault of the accusers.
        </p>
      </div>

      {/* Image */}
      <div
        ref={imgRef}
        className={`flex-1 min-w-[240px] flex justify-center transition-all duration-700
          ${imgVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <img
          src={chefAni}
          alt="Animated Chef"
          className="w-full max-w-xs object-contain animate-float drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default AboutHero;
