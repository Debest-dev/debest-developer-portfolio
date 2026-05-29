import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

const stats = [
  { value: "20+", label: "Projects Delivered", small: false },
  { value: "12+", label: "Startup Clients", small: false },
  { value: "Web2 & Web3", label: "Full Stack Expertise", small: true },
  { value: "100%", label: "Remote Ready", small: false }
];

const StickyStatCard = ({ stat, index, total }) => {
  return (
    <div className="sticky" style={{ top: `${80 + index * 28}px`, zIndex: total - index }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        style={{ scale: 1 - index * 0.015 }}
      >
        <div style={{
          boxShadow: `0 ${2 + index * 4}px ${12 + index * 6}px rgba(0,0,0,${0.05 + index * 0.02})`,
          borderRadius: '1rem',
          background: `rgba(255,255,255,${1 - index * 0.05})`,
        }}>
          <GlassCard className="flex items-center border border-black/5 min-h-[90px]" hoverEffect={false}>
            <div className="flex flex-col">
              <span className={`${stat.small ? 'text-xl' : 'text-2xl'} font-display font-light text-brand-500 tracking-tight`}>
                {stat.value}
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-text/50 mt-1">
                {stat.label}
              </span>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};

export const AboutSnapshot = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="py-16 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">

          {/* Left: Stats */}
          <div className="lg:col-span-5">
            {/* Mobile sticky stack */}
            <div className="lg:hidden flex flex-col pb-8">
              {stats.map((stat, idx) => (
                <StickyStatCard key={idx} stat={stat} index={idx} total={stats.length} />
              ))}
            </div>

            {/* Desktop 2-col grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <GlassCard
                    className="flex items-center border border-black/5 bg-white/40 min-h-[90px] h-full"
                    hoverEffect={true}
                  >
                    <div className="flex flex-col">
                      <span className={`${stat.small ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-display font-light text-brand-500 tracking-tight`}>
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-sans uppercase tracking-widest text-text/50 mt-1">
                        {stat.label}
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-7 flex flex-col items-start gap-4 lg:pl-6"
          >
            <div className="flex flex-col gap-1 mb-0 mt-6 lg:mt-0">
              <span className="text-[10px] uppercase tracking-widest text-brand-500 font-light">About Me</span>
              <h3 className="text-xl md:text-2xl font-normal tracking-tight text-text">
                Full-Stack Developer
              </h3>
            </div>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              I'm Blessed Anthony, a full-stack developer focused on building modern web applications that are fast, scalable, and user-friendly. I work with startups, founders, and product teams to turn ideas into reliable digital products across both Web2 and Web3.
            </p>

            <a
              href="/about"
              className="mt-2 inline-flex items-center gap-1 text-xs uppercase tracking-widest font-normal text-brand-500 hover:text-brand-600 transition-colors"
            >
              Read More <span className="text-sm">→</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
