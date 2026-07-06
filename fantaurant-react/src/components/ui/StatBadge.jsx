import React from 'react';

const StatBadge = ({ icon, count, label }) => (
  <div className="flex items-center gap-3 flex-1">
    <i className={`fa-solid ${icon} text-2xl text-brand-primary`} />
    <h4 className="text-2xl font-bold text-brand-primary">{count}</h4>
    <p className="text-xs text-gray-600 leading-tight">{label}</p>
  </div>
);

export default StatBadge;
