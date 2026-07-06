import React, { useState } from 'react';

const ChefCard = ({ name, bio, image, specialty }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="bg-white rounded-[30px_70px] shadow-[0_2px_10px_rgb(255,81,0)]
      w-64 h-auto min-h-[480px] p-4 pt-5 text-center cursor-pointer
      transition-all duration-300 hover:shadow-[0_8px_50px_rgb(255,0,0)]
      hover:-translate-y-2 group flex flex-col items-center">

      {/* Image */}
      <div className="w-52 h-56 relative flex items-center justify-center overflow-hidden mb-3">
        {!imgLoaded && (
          <div className="skeleton w-full h-full rounded-[30px_70px]" />
        )}
        <img
          src={image}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover rounded-[30px_70px] transition-all duration-500
            group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
        />
      </div>

      {/* Specialty badge */}
      {specialty && (
        <span className="text-xs bg-brand-warm text-brand-primary-dark
          font-semibold px-3 py-1 rounded-full mb-2">
          {specialty}
        </span>
      )}

      {/* Name */}
      <h3 className="text-brand-primary font-bold text-lg mt-1 mb-2
        group-hover:text-brand-primary-dark transition-colors duration-200">
        {name}
      </h3>

      {/* Bio */}
      <p className="text-gray-600 text-xs leading-relaxed px-2">{bio}</p>
    </div>
  );
};

export default ChefCard;
