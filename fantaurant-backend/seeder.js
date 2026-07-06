/**
 * seeder.js - Populates MongoDB with initial menu data
 * Run: node seeder.js
 */
// Override DNS to use Cloudflare (1.1.1.1) — fixes ISP SRV DNS blocking
const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('./src/models/Menu');

const menuData = [
  { name: 'Chicken', description: '6 Pieces of Chicken thrown on delicious Chicken Gravy', price: 280, category: 'Non-Veg', imageURL: '/uploads/chicken (6 pieces).jpg', isAvailable: true },
  { name: 'Mutton Kosa', description: 'Very deliciously cooked Mutton on low steam of coal and water mixture to give smoke flavour', price: 350, category: 'Non-Veg', imageURL: '/uploads/mutton kosa.jpg', isAvailable: true },
  { name: 'Illish Bhapa', description: 'Delicious gravy of Mustard with Illish fish and spicy Green Chilli', price: 450, category: 'Seafood', imageURL: '/uploads/ilish bhapa.jpg', isAvailable: true },
  { name: 'Chicken Biryani', description: 'Smoking Flavours of biryani masala and fresh Chicken Meat', price: 150, category: 'Non-Veg', imageURL: '/uploads/chicken biryani.jpg', isAvailable: true },
  { name: 'Chicken Fried Rice', description: 'Chinese style cooked fried rice with Egg and fresh vegetables with the beautiful taste Chilli Chicken', price: 300, category: 'Non-Veg', imageURL: '/uploads/chicken fried rice with chili chicken.jpg', isAvailable: true },
  { name: 'Chola Bhatura', description: 'Highly cooked Chole with Soft Bhaturas with some Salad and Mint Chutney', price: 60, category: 'Veg', imageURL: '/uploads/chole.jpg', isAvailable: true },
  { name: 'Fish Fry', description: 'Double layered egg and crumbs with Softened Bhetki Fish inside with Beetroot salad and Kasundi', price: 100, category: 'Seafood', imageURL: '/uploads/fried.jpg', isAvailable: true },
  { name: 'Omlette', description: 'Softly cooked Omlette on low flame with variety of vegetables', price: 50, category: 'Veg', imageURL: '/uploads/omlete.jpg', isAvailable: true },
  { name: 'Rasgulla', description: "Kolkata's special Rasgulla with Mint leave topping", price: 20, category: 'Dessert', imageURL: '/uploads/rosgulla.jpg', isAvailable: true },
  { name: 'Ice Cream', description: 'Sweet Flavoured Ice-Cream with toppings of cashews', price: 50, category: 'Dessert', imageURL: '/uploads/icecream.jpeg.jpg', isAvailable: true },
  { name: 'Pizza', description: 'Soft pizza with toppings of cheese, Garlic, Capsicum, our Special pizza sauce', price: 180, category: 'Veg', imageURL: '/uploads/pizza.jpg', isAvailable: true },
  { name: 'Dosa', description: 'Flat Dosa made on low-med Flame and filled with Onion Masala served with Coconut and Spicy Chutney', price: 50, category: 'Veg', imageURL: '/uploads/dosa.jpeg.jpg', isAvailable: true },
  { name: 'Burger', description: 'Soft buns with vegetable slices and spicy Patty with Chicken slice fried on high flame', price: 199, category: 'Non-Veg', imageURL: '/uploads/berger.png', isAvailable: true },
  { name: 'Momo', description: 'Fluffy Momos served with special momo veg soup and mint leaves', price: 60, category: 'Veg', imageURL: '/uploads/momo.jpeg.jpg', isAvailable: true },
  { name: 'Chowmin', description: 'Long stirling chinese style Chowmin served with our special toppings of garlic sauce', price: 140, category: 'Veg', imageURL: '/uploads/chowmin.jpg', isAvailable: true },
  { name: 'Idli', description: 'Soft, Rice Idlis steamed and served with spicy hot coconut sauce', price: 40, category: 'Veg', imageURL: '/uploads/idli.jpg', isAvailable: true },
  { name: 'Chicken Pakora', description: 'Small chicken pieces fried on flaming hot oil', price: 80, category: 'Non-Veg', imageURL: '/uploads/chickenpokora.jpg', isAvailable: true },
  { name: 'Blue Lagoon', description: 'Mojito made out of sour blue flavour and soda', price: 100, category: 'Drinks', imageURL: '/uploads/blue lagon.webp', isAvailable: true },
  { name: 'Chicken Soup', description: 'Special masala soup with vegetables and small pieces of Chicken', price: 120, category: 'Non-Veg', imageURL: '/uploads/chicken soup.webp', isAvailable: true },
  { name: 'Coke', description: 'Chilling fresh Coca Cola for freshen up mind to enjoy your food', price: 20, category: 'Drinks', imageURL: '/uploads/coke.jpeg.jpg', isAvailable: true },
  { name: 'Tandoori Roti', description: 'Rotis made inside of Bhatti and served with butter and spinach as toppings', price: 10, category: 'Veg', imageURL: '/uploads/tandori roti.jpg', isAvailable: true },
  { name: 'Daab Chingri', description: 'Fresh Prawn Fish cooked with coconut water under smoking flame of coal and served in a Coconut', price: 220, category: 'Seafood', imageURL: '/uploads/dabchingri.jpg', isAvailable: true },
  { name: 'French Fries', description: 'Fresh potato cut finely into pieces and fried on high flaming oil', price: 50, category: 'Veg', imageURL: '/uploads/frenchfries.jpeg.jpg', isAvailable: true },
  { name: 'Saahi Paneer', description: 'Fluffy Paneer cooked with special Masala and curd served with our special Paneer Toppings', price: 150, category: 'Veg', imageURL: '/uploads/sahipaneer.jpeg.jpg', isAvailable: true },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log('Cleared existing menu items.');

    // Insert seed data
    const inserted = await Menu.insertMany(menuData);
    console.log(`✅ Seeded ${inserted.length} menu items successfully!`);

    mongoose.connection.close();
    console.log('Connection closed. Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder Error:', error.message);
    process.exit(1);
  }
};

seedDB();
