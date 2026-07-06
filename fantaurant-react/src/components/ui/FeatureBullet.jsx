import React from 'react';

const FeatureBullet = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 py-4 cursor-pointer group
    hover:bg-brand-warm/30 px-3 rounded-xl transition-all duration-300">
    <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center
      rounded-full bg-brand-warm group-hover:scale-110 transition-transform duration-300 overflow-hidden">
      <img src={icon} alt={title} className="w-12 h-12 object-contain" />
    </div>
    <div>
      <h4 className="font-bold text-sm mb-1 group-hover:text-brand-primary transition-colors duration-200">
        {title}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default FeatureBullet;
