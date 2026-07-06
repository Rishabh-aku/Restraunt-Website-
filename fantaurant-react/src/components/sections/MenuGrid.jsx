import React, { useState, useEffect } from 'react';
import FoodCard from '../ui/FoodCard';
import SectionHeader from '../ui/SectionHeader';
import LoadingSpinner from '../ui/LoadingSpinner';
import { menuCategories } from '../../data/menuItems';
import api from '../../api/axios';
import { useSearchParams } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:5000';

const MenuGrid = () => {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState('');
  const [menuItems, setMenuItems]           = useState([]);
  const [searchQuery, setSearchQuery]       = useState(urlSearch);

  // Sync search input state if URL query param changes (e.g. search from Navbar)
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/menu');
        setMenuItems(data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setError('Could not load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Resolve image: if it's a backend path (/uploads/...) prepend server URL
  // Otherwise fall back to a placeholder
  const resolveImage = (imageURL) => {
    if (!imageURL) return null;
    if (imageURL.startsWith('/uploads/')) return `${BACKEND_URL}${imageURL}`;
    return imageURL;
  };

  const filtered = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesQ   = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <section className="px-[7vw] py-10">

      {/* Header + search */}
      <div className="text-center mb-8">
        <SectionHeader
          title="Food"
          highlight="Menu"
          subtitle="Explore our wide variety of freshly prepared dishes."
        />

        {/* Search bar */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-sm">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="search"
              placeholder="Search dishes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-brand-gold
                outline-none bg-white text-sm shadow-card
                focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary
                transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {menuCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border
              transition-all duration-300 hover:scale-105
              ${activeCategory === cat
                ? 'bg-brand-primary text-white border-brand-primary shadow-brand-sm'
                : 'bg-white text-gray-700 border-brand-gold hover:border-brand-primary hover:text-brand-primary'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Error state */}
      {error && (
        <div className="text-center py-10">
          <i className="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-3 block" />
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-brand-primary text-white rounded-full text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {!error && loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : !error && filtered.length === 0 ? (
        <div className="text-center py-20">
          <i className="fa-solid fa-bowl-food text-5xl text-brand-warm mb-4 block" />
          <p className="text-gray-500 text-base font-medium">
            {searchQuery
              ? <>No dishes found for "<strong>{searchQuery}</strong>"</>
              : 'No items in this category yet.'
            }
          </p>
        </div>
      ) : !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center w-full">
          {filtered.map((item, i) => (
            <div
              key={item._id || item.id}
              className="animate-scale-in"
              style={{ animationDelay: `${(i % 8) * 60}ms` }}
            >
              <FoodCard
                variant="menu"
                name={item.name}
                description={item.description}
                price={`Rs ${item.price}`}
                image={resolveImage(item.imageURL)}
                category={item.category}
              />
            </div>
          ))}
        </div>
      )}

      {/* Result count */}
      {!loading && !error && (
        <p className="text-center text-xs text-gray-400 mt-8">
          Showing {filtered.length} of {menuItems.length} items
        </p>
      )}
    </section>
  );
};

export default MenuGrid;
