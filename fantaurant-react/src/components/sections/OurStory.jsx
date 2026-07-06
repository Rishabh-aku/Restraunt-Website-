import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const OurStory = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className={`flex flex-col items-center w-full py-16 px-[7vw] transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold section-title hover:text-5xl transition-all duration-200 cursor-default">
          Our <span>Story</span>
        </h2>
      </div>

      <div className="bg-white rounded-[30px] shadow-[0_0_15px_black] w-full max-w-4xl
        px-10 py-12 text-center transition-all duration-300 hover:shadow-xl">
        <p className="text-sm text-gray-600 leading-loose">
          Born from a passion for culinary excellence and healthy living, FanTaurant began as a small family dream. 
          Our mission has always been simple: to create unforgettable dining experiences by combining the finest 
          locally-sourced, fresh ingredients with authentic, time-honored recipes. From our handcrafted spice 
          blends ground daily to our slow-cooked signature dishes, we put love and expertise into every single plate. 
          Whether you are here for a quick wholesome bite or celebrating a special milestone, we welcome you to 
          be a part of our continuing story.
        </p>
      </div>
    </section>
  );
};

export default OurStory;
