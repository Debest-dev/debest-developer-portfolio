import React from 'react';
import { Star } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const TestimonialCard = ({
  quote,
  name,
  role,
  company,
  rating = 5,
  className = ''
}) => {
  return (
    <GlassCard className={`flex flex-col flex-grow ${className}`} hoverEffect={true}>
      {/* Quote Symbol */}
      <div className="text-3xl text-brand-500/25 font-display font-light select-none mb-3">
        “
      </div>

      {/* Quote Text */}
      <p className="text-sm md:text-base text-text/70 font-light italic leading-relaxed mb-6 flex-grow">
        {quote}
      </p>

      {/* Client Meta */}
      <div className="pt-4 border-t border-black/5 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-normal text-text">{name}</h4>
          <span className="text-[11px] font-light text-text/50">{role}</span>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={12} className="fill-brand-500 text-brand-500" />
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
