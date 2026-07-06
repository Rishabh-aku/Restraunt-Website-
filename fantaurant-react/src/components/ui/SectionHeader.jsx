import React from 'react';

/**
 * Animated section heading with a colored span.
 * Usage: <SectionHeader title="Our" highlight="Story" subtitle="..." />
 */
const SectionHeader = ({ title, highlight, subtitle, className = '', center = true }) => {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-extrabold section-title">
        {title} <span>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
