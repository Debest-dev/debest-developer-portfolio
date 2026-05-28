import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SkillBar = ({ name, percentage }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-normal text-text">{name}</span>
        <span className="text-xs font-light text-text/60">{percentage}%</span>
      </div>
      
      <div className="w-full h-[3px] bg-black/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-bg rounded-full"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${percentage}%` } : { width: "0%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
