// src/components/ui/Avatar.jsx
import React from 'react';

export const Avatar = ({ size = 36, className = '' }) => (
  <div
    style={{ width: size, height: size }}
    className={`rounded-full overflow-hidden shrink-0 ${className}`}
  >
    <img
      src="/images/avatar.png"
      alt="Blessed Anthony"
      className="w-full h-full object-cover object-top"
      draggable={false}
    />
  </div>
);