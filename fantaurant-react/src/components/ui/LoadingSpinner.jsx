import React from 'react';

const LoadingSpinner = ({ size = 'md', fullscreen = false }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`${sizes[size]} border-brand-warm border-t-brand-primary
        rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-brand-cream flex flex-col items-center justify-center z-50 gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-brand-warm border-t-brand-primary
            rounded-full animate-spin" />
          <div className="absolute inset-2 border-2 border-brand-gold border-b-transparent
            rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-brand-primary font-bold text-lg tracking-wide animate-pulse">
          FanTaurant
        </p>
        <p className="text-gray-500 text-sm">Loading delicious content…</p>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
