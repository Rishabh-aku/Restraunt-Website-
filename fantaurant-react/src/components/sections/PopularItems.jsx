import React from 'react';
import FoodCard from '../ui/FoodCard';
import SectionHeader from '../ui/SectionHeader';
import { popularItems } from '../../data/homeData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const PopularItems = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="relative z-10 flex flex-col items-center w-full py-12 px-[7vw]">

      {/* Section header */}
      <div
        ref={ref}
        className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <SectionHeader
          title="Our Popular"
          highlight="Food Items"
          subtitle="It is very important for the customer to pay attention to the adipiscing process. They fall, and the rougher ones prevent the flight of pleasures from convenient times."
          className="mb-8 max-w-[450px]"
        />
      </div>

      {/* Cards grid */}
      <div className="relative z-10 flex flex-wrap justify-evenly gap-4 w-[90%]">
        {popularItems.map((item, i) => (
          <FoodCard
            key={item.id}
            variant="popular"
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            className={`transition-all duration-700`}
            style={{ transitionDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Decorative background strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[rgb(255,214,176)]
        z-[-1] rounded-xl" />
    </section>
  );
};

export default PopularItems;
