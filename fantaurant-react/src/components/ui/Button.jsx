import React from 'react';

/**
 * Reusable Button component.
 * @param {'primary'|'secondary'} variant
 * @param {'sm'|'md'|'lg'} size
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Tag = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <Tag
      className={`${variantClass} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Button;
