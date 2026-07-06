import React, { useEffect } from 'react';
import BookingForm from '../components/sections/BookingForm';
import Layout from '../components/layout/Layout';

const BookPage = () => {
  useEffect(() => {
    document.title = 'FanTaurant | Book Table';
  }, []);

  return (
    <Layout>
      <BookingForm />
    </Layout>
  );
};

export default BookPage;
