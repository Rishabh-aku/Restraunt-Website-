import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import FoodHighlights from '../components/sections/FoodHighlights';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import PopularItems from '../components/sections/PopularItems';
import TestimonialSection from '../components/sections/TestimonialSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'FanTaurant | Home';
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner fullscreen />;

  return (
    <Layout>
      <HeroSection />
      <FoodHighlights />
      <WhyChooseUs />
      <PopularItems />
      <TestimonialSection />
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
