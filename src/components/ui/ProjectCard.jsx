import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './Badge';

export const ProjectCard = ({
  title,
  category,
  tags,
  description,
  slug,
  image,
  onClick
}) => {
  const gradients = {
    "Web Apps": "from-indigo-500/10 via-purple-500/5 to-cyan-500/10",
    "Web3": "from-cyan-500/10 via-blue-500/5 to-indigo-500/10",
    "Landing Pages": "from-purple-500/10 via-pink-500/5 to-indigo-500/10",
    "Redesigns": "from-emerald-500/10 via-teal-500/5 to-cyan-500/10"
  };

  const gradientClass = gradients[category] || "from-indigo-500/10 via-purple-500/5 to-cyan-500/10";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass card-shadow rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-black/5 bg-white/50"
      onClick={onClick}
    >
      {/* Image Area */}
      <div className="w-full h-48 overflow-hidden relative border-b border-black/5 flex items-center justify-center">

        {image ? (
          /* Real screenshot */
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback monogram */
          <>
            <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} opacity-80`} />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-display font-light text-text/30 tracking-tight select-none">
                {title.substring(0, 2).toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-text/40 mt-1 select-none font-sans">
                {category}
              </span>
            </div>
          </>
        )}

        {/* Hover action buttons */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:text-brand-300"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://github.com", "_blank");
            }}
          >
            <Github size={16} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:text-brand-300"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <ExternalLink size={16} />
          </motion.div>
        </div>
      </div>

      {/* Description Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="glass">{tag}</Badge>
          ))}
        </div>

        <h3 className="text-xl font-normal tracking-tight text-text mb-2 transition-colors duration-300 group-hover:text-brand-500">
          {title}
        </h3>

        <p className="text-sm text-text/60 font-light leading-relaxed flex-grow line-clamp-2">
          {description}
        </p>

        <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-brand-500 hover:text-brand-600 transition-colors duration-300">
          <span className="font-normal tracking-wider uppercase">View Case Study</span>
          <span className="text-base">→</span>
        </div>
      </div>
    </motion.div>
  );
};
