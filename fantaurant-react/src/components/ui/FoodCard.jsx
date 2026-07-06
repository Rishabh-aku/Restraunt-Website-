import React, { useState } from 'react';

/** Skeleton placeholder shown while image loads. */
const ImageSkeleton = () => (
  <div className="skeleton w-full h-full rounded-full" />
);

/**
 * Food card used in menu grid and featured sections.
 */
const FoodCard = ({
  name,
  description,
  price,
  image,
  category,
  variant = 'menu',  // 'menu' | 'featured' | 'popular'
  children,
  className = '',
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (variant === 'featured') {
    return (
      <div className={`flex flex-col items-center text-center w-60 px-6 py-6 group ${className}`}>
        <div className="w-40 h-40 mb-4 relative flex items-center justify-center overflow-hidden rounded-full">
          {!imgLoaded && !imgError && <ImageSkeleton />}
          {imgError ? (
            <div className="w-full h-full bg-brand-warm rounded-full flex flex-col items-center justify-center text-brand-primary border-2 border-brand-gold">
              <i className="fa-solid fa-utensils text-4xl mb-1" />
              <span className="text-[10px] uppercase font-bold tracking-wide">No Image</span>
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover rounded-full transition-all duration-500
                group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            />
          )}
        </div>
        <h3 className="font-bold text-base mb-2 group-hover:text-brand-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">{description}</p>
        {children}
      </div>
    );
  }

  if (variant === 'popular') {
    return (
      <div className={`card bg-white rounded-lg p-4 pt-5 text-center cursor-pointer w-52 mb-6
        hover:shadow-[0_5px_20px_black] transition-all duration-300 group ${className}`}>
        <div className="h-40 mb-4 flex items-center justify-center overflow-hidden relative">
          {!imgLoaded && !imgError && <div className="skeleton w-36 h-36 rounded-full" />}
          {imgError ? (
            <div className="w-36 h-36 bg-brand-warm rounded-full flex flex-col items-center justify-center text-brand-primary border border-brand-gold">
              <i className="fa-solid fa-utensils text-3xl" />
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-36 h-36 object-cover rounded-full transition-all duration-500
                group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
            />
          )}
        </div>
        <h3 className="font-bold text-base mb-1 group-hover:text-brand-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-xs text-gray-500 mb-2 leading-relaxed">{description}</p>
        <p className="text-brand-primary font-bold text-sm">{price}</p>
      </div>
    );
  }

  // Default: menu grid card
  return (
    <div className={`menu-card p-6 text-center w-56 group ${className}`}>
      <div className="h-40 mb-3 flex items-center justify-center overflow-hidden relative">
        {!imgLoaded && !imgError && <div className="skeleton w-44 h-32 rounded" />}
        {imgError ? (
          <div className="w-44 h-32 bg-brand-warm rounded-full flex flex-col items-center justify-center text-brand-primary border-2 border-brand-gold">
            <i className="fa-solid fa-utensils text-3xl mb-1" />
            <span className="text-[9px] uppercase font-bold tracking-wide">No Image</span>
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-44 h-32 object-cover rounded-full transition-all duration-500
              group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          />
        )}
      </div>
      {category && (
        <span className="inline-block text-xs bg-brand-warm text-brand-primary-dark
          font-semibold px-2 py-0.5 rounded-full mb-2">
          {category}
        </span>
      )}
      <h3 className="font-bold text-sm mb-1 group-hover:text-brand-primary transition-colors duration-200">
        {name}
      </h3>
      <p className="text-xs text-gray-500 mt-2 mb-2 leading-relaxed">{description}</p>
      <p className="text-brand-primary font-bold text-sm">{price}</p>
    </div>
  );
};

export default FoodCard;
