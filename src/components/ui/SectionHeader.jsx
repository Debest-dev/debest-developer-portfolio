import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-col ${alignmentClasses[align]} max-w-2xl mx-auto mb-16 ${className}`}
    >
      {badge && (
        <motion.span
          variants={itemVariants}
          className="glass text-[10px] uppercase font-normal tracking-widest text-brand-500 bg-brand-50/50 px-4 py-1.5 rounded-full mb-4 border border-brand-500/10 inline-block"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-5xl font-normal tracking-tighter text-text mb-4"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-text/60 font-light leading-relaxed"
        >
          {typeof subtitle === 'string'
            ? subtitle.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))
            : subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
