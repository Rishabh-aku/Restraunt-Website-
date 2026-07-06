import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import AboutHero from '../components/sections/AboutHero';
import ChefsSection from '../components/sections/ChefsSection';
import OurStory from '../components/sections/OurStory';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'FanTaurant | About';
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner fullscreen />;

  return (
    <Layout>
      <AboutHero />
      <ChefsSection />
      <OurStory />
    </Layout>
  );
};

export default AboutPage;
