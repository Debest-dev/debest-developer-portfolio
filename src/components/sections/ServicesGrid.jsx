import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Rocket, Blocks, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { GlassCard } from '../ui/GlassCard';
import { services } from '../../data/services';

const iconMap = {
  Monitor,
  Rocket,
  Blocks,
  Sparkles,
};

const ServiceIcon = ({ name }) => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return (
    <div className="w-12 h-12 rounded-2xl bg-brand-500/8 border border-brand-500/15 flex items-center justify-center text-brand-500 mb-6 shadow-sm">
      <Icon size={22} strokeWidth={1.5} />
    </div>
  );
};

const stackedStart = { x: 0, y: 60, scale: 0.7, opacity: 0, rotateZ: 0 };

const finalPositions = [
  { x: '-165%', y: 0, rotateZ: 0 },
  { x: '-55%',  y: 0, rotateZ: 0 },
  { x: '55%',   y: 0, rotateZ: 0 },
  { x: '165%',  y: 0, rotateZ: 0 },
];

const CardContent = ({ service }) => (
  <GlassCard
    className="flex flex-col h-full items-start bg-white/40 border border-black/5"
    hoverEffect={true}
  >
    <ServiceIcon name={service.icon} />
    <h3 className="text-lg font-normal tracking-tight text-text mb-3">
      {service.title}
    </h3>
    <p className="text-xs md:text-sm text-text/60 font-light leading-relaxed flex-grow">
      {service.shortDescription}
    </p>
    <a
      href="/contact"
      className="mt-4 pt-4 border-t border-black/5 w-full flex items-center justify-between text-[11px] text-brand-500 font-normal tracking-widest uppercase hover:text-brand-600 transition-colors group"
    >
      <span>Get in Touch</span>
      <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  </GlassCard>
);

const MobileCarousel = ({ services, inView }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const activeIndexRef = useRef(0);

  const startLoop = (el) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % services.length;
      const cardWidth = el.offsetWidth * 0.78 + 16;
      el.scrollTo({ left: cardWidth * next, behavior: 'smooth' });
      activeIndexRef.current = next;
      setActiveIndex(next);
    }, 1600);
  };

  useEffect(() => {
    if (!inView) return;
    const el = scrollRef.current;
    if (!el) return;
    startLoop(el);
    return () => clearInterval(intervalRef.current);
  }, [inView, services.length]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.78 + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const resumeTimerRef = useRef(null);

  const handleTouchStart = () => {
    clearInterval(intervalRef.current);
    clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      const el = scrollRef.current;
      if (el) startLoop(el);
    }, 5000);
  };

  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const el = scrollRef.current;
          if (el) startLoop(el);
        } else {
          clearInterval(intervalRef.current);
          clearTimeout(resumeTimerRef.current);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="flex-none w-[78vw] snap-center flex flex-col"
          >
            <CardContent service={service} />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

      <div className="flex justify-center gap-2 mt-4">
        {services.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: activeIndex === i ? 20 : 6,
              backgroundColor: activeIndex === i ? '#4F46E5' : 'rgba(79,70,229,0.2)',
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export const ServicesGrid = () => {
  const ref = useRef(null);

  // ── ONLY CHANGE: once: false + amount: 0.4 (same as Testimonials)
  // Cards fly in on scroll-enter AND fly back on scroll-past
  const inView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section id="services" className="py-24 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Services"
          title="What I Offer"
          subtitle="Helping Web2 and Web3 startups design, build, and deploy exceptional digital experiences."
        />

        {/* ── Desktop: scatter on enter, collapse on leave ── */}
        <div className="hidden md:block relative h-[420px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={stackedStart}
                animate={inView ? {
                  x: finalPositions[i].x,
                  y: finalPositions[i].y,
                  scale: 1,
                  opacity: 1,
                  rotateZ: finalPositions[i].rotateZ,
                } : stackedStart}
                transition={{
                  duration: 0.9,
                  delay: inView ? i * 0.1 : (services.length - 1 - i) * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                  opacity: {
                    duration: 0.3,
                    delay: inView ? i * 0.1 : (services.length - 1 - i) * 0.08,
                  },
                }}
                className="absolute w-[22%] h-[360px] flex flex-col"
                style={{ originX: 0.5, originY: 0.5, zIndex: services.length - i }}
              >
                <CardContent service={service} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: horizontal snap carousel — unchanged ── */}
        <div className="md:hidden relative">
          <MobileCarousel services={services} inView={inView} />
        </div>

      </div>
    </section>
  );
};
