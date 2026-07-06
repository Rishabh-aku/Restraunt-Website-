import fooditem1 from '../assets/images/fooditem1.jpg';
import fooditem2 from '../assets/images/fooditem2.jpg';
import fooditem3 from '../assets/images/fooditem3.jpg';

export const featuredItems = [
  {
    id: 1,
    name: 'Chicken Biryani',
    description: 'The pain itself should be followed by adipisicing elit. To be repelled, they are!',
    image: fooditem1,
    btnVariant: 'secondary',
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'The pain itself should be followed by adipisicing elit. To be repelled, they are!',
    image: fooditem2,
    btnVariant: 'primary',
  },
  {
    id: 3,
    name: 'Onion Dosa',
    description: 'The pain itself should be followed by adipisicing elit. To be repelled, they are!',
    image: fooditem3,
    btnVariant: 'secondary',
  },
];

import chowmin from '../assets/images/chowmin.jpg';
import burger from '../assets/images/berger.png';
import chickenSoup from '../assets/images/chicken soup.webp';
import idli from '../assets/images/idli.jpg';

export const popularItems = [
  { id: 1, name: 'Chowmin',      price: 'Rs 140', image: chowmin,      description: 'Rejection of services but flexibility.' },
  { id: 2, name: 'Burger',       price: 'Rs 199', image: burger,       description: 'Rejection of services but flexibility.' },
  { id: 3, name: 'Chicken Soup', price: 'Rs 120', image: chickenSoup,  description: 'Rejection of services but flexibility.' },
  { id: 4, name: 'Idli',         price: 'Rs 40',  image: idli,         description: 'Rejection of services but flexibility.' },
];

import foodplate4 from '../assets/images/foodplate4.png';

export const features = [
  {
    id: 1,
    title: 'Mind Blowing Flavours',
    description: 'The Secret of our mind blowing flavours is that we make all masalas handground',
    icon: foodplate4,
  },
  {
    id: 2,
    title: 'Everything\'s Fresh',
    description: 'Everytime we cook we use fresh vegetables and meat for preparation of the dish',
    icon: foodplate4,
  },
  {
    id: 3,
    title: 'Helpful Staff',
    description: 'Our Staff are trained to help you at any moment for anything',
    icon: foodplate4,
  },
];

export const stats = [
  { id: 1, icon: 'fa-hand-peace', count: '68+',  label: 'Happy Customers' },
  { id: 2, icon: 'fa-trophy',     count: '956+', label: 'Dishes Served' },
];
