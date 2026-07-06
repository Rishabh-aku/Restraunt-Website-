import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MenuGrid from '../components/sections/MenuGrid';

const MenuPage = () => {
  useEffect(() => {
    document.title = 'FanTaurant | Food Menu';
  }, []);

  return (
    <Layout>
      <MenuGrid />
    </Layout>
  );
};

export default MenuPage;
