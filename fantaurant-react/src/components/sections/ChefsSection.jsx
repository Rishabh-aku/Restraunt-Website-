import React from 'react';
import ChefCard from '../ui/ChefCard';
import SectionHeader from '../ui/SectionHeader';
import { chefs } from '../../data/chefs';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const ChefsSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className={`flex flex-col items-center w-full py-16 px-[7vw] transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <SectionHeader
        title="Our Golden"
        highlight="Chefs"
        subtitle="Meet our world-class culinary team dedicated to crafting unforgettable dining experiences."
        className="mb-12"
      />

      <div className="flex flex-wrap justify-evenly gap-8 w-full">
        {chefs.map((chef, i) => (
          <div
            key={chef.id}
            className="transition-all duration-500"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <ChefCard
              name={chef.name}
              bio={chef.bio}
              image={chef.image}
              specialty={chef.specialty}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChefsSection;
