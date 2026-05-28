import React from 'react';

export const Badge = ({ children, variant = 'glass', className = '' }) => {
  const styles = {
    glass: "glass text-[10px] uppercase font-normal tracking-widest text-text/75 px-3 py-1 rounded-full",
    brand: "gradient-bg text-white text-[10px] uppercase font-normal tracking-widest px-3 py-1 rounded-full",
    outline: "border border-black/10 text-text/75 text-[10px] uppercase font-normal tracking-widest px-3 py-1 rounded-full bg-white/40"
  };

  return (
    <span className={`${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};
