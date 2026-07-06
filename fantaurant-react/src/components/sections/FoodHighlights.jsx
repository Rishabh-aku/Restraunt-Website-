import React from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../ui/FoodCard';
import Button from '../ui/Button';
import { featuredItems } from '../../data/homeData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FoodHighlights = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="px-[7vw] my-16">
      <div
        className={`bg-white rounded-[30px] shadow-card py-8 px-4
          flex flex-wrap justify-around gap-4
          transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {featuredItems.map((item, i) => (
          <FoodCard
            key={item.id}
            variant="featured"
            name={item.name}
            description={item.description}
            image={item.image}
            className={`transition-all duration-700 animation-delay-${(i + 1) * 100}
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <Link to="/menu">
              <Button variant={item.btnVariant} size="sm">
                See Menu
              </Button>
            </Link>
          </FoodCard>
        ))}
      </div>
    </section>
  );
};

export default FoodHighlights;
