import React from 'react';
import FeatureBullet from '../ui/FeatureBullet';
import SectionHeader from '../ui/SectionHeader';
import { features } from '../../data/homeData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import foodPlate from '../../assets/images/foodplate1.png';

const WhyChooseUs = () => {
  const [imgRef, imgVisible]   = useScrollAnimation(0.1);
  const [textRef, textVisible] = useScrollAnimation(0.1);

  return (
    <section className="px-[7vw] my-20 flex flex-wrap justify-between items-center gap-10">

      {/* Food image */}
      <div
        ref={imgRef}
        className={`flex-1 min-w-[260px] flex justify-center transition-all duration-700
          ${imgVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      >
        <img
          src={foodPlate}
          alt="Why Choose Us"
          className="w-[45vw] max-w-[450px] object-contain drop-shadow-xl
            hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Features */}
      <div
        ref={textRef}
        className={`flex-1 min-w-[280px] ml-0 md:ml-10 transition-all duration-700
          ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
      >
        <SectionHeader
          title="Why People"
          highlight="Choose Us?"
          center={false}
          className="mb-4"
        />
        <div className="mt-2">
          {features.map((f, i) => (
            <div
              key={f.id}
              className={`transition-all duration-500`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <FeatureBullet
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
