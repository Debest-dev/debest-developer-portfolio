import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  onClick
}) => {
  const hoverProps = hoverEffect
    ? {
        whileHover: { y: -6, scale: 1.02 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }
    : {};

  return (
    <motion.div
      className={`glass card-shadow rounded-2xl p-6 md:p-8 overflow-hidden transition-shadow duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
};
