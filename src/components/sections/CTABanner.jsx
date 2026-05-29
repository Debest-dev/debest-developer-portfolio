import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTABanner = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-bg rounded-3xl p-12 md:p-16 flex flex-col items-center text-center shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 via-transparent to-white/10" />
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

          <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tighter mb-4 max-w-xl relative z-10">
            Have a project in mind?
          </h2>

          <p className="text-sm md:text-base text-white/80 font-light max-w-md mb-8 leading-relaxed relative z-10">
            I'm currently available for freelance and contract work — remote, worldwide.
          </p>

          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }} className="relative z-10">
            <Button
              href="/contact"
              variant="outline"
              className="bg-white text-brand-500 border-transparent hover:bg-brand-50 hover:text-brand-600 px-8 py-3 text-xs uppercase tracking-widest font-normal"
            >
              Get in Touch <ArrowRight size={14} className="inline ml-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
