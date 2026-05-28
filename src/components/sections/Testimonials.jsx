import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { TestimonialCard } from '../ui/TestimonialCard';
import { testimonials } from '../../data/testimonials';

const stackedStart = { x: 0, y: 60, scale: 0.7, opacity: 0, rotateZ: 0 };

const finalPositions = [
  { x: '-110%', y: 0, rotateZ: 0 },
  { x: '0%',    y: 0, rotateZ: 0 },
  { x: '110%',  y: 0, rotateZ: 0 },
];

const MobileCarousel = ({ items, inView }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const activeIndexRef = useRef(0);
  const resumeTimerRef = useRef(null);
  const sectionRef = useRef(null);

  const startLoop = (el) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % items.length;
      const cardWidth = el.offsetWidth * 0.78 + 16;
      el.scrollTo({ left: cardWidth * next, behavior: 'smooth' });
      activeIndexRef.current = next;
      setActiveIndex(next);
    }, 2200);
  };

  useEffect(() => {
    if (!inView) return;
    const el = scrollRef.current;
    if (!el) return;
    startLoop(el);
    return () => clearInterval(intervalRef.current);
  }, [inView, items.length]);

  // Update dots on scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.78 + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  // Any touch — pause immediately
  const handleTouchStart = () => {
    clearInterval(intervalRef.current);
    clearTimeout(resumeTimerRef.current);
  };

  // Touch ends — resume after 3s
  const handleTouchEnd = () => {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      const el = scrollRef.current;
      if (el) startLoop(el);
    }, 5000);
  };

  // Section leaves/enters viewport
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
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex-none w-[78vw] snap-center flex flex-col"
          >
            <TestimonialCard
              quote={t.quote}
              name={t.name}
              role={t.role}
              company={t.company}
              rating={t.rating}
              className="bg-white/40 border border-black/5 h-full"
            />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent" />

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
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

export const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section className="py-16 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Testimonials"
          title="What Clients Say"
          className="mb-6"
        />

        {/* Desktop */}
        <div className="hidden md:block relative h-[380px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                animate={inView ? {
                  x: finalPositions[i].x,
                  y: finalPositions[i].y,
                  scale: 1,
                  opacity: 1,
                  rotateZ: finalPositions[i].rotateZ,
                } : stackedStart}
                transition={{
                  duration: 0.9,
                  delay: inView ? i * 0.1 : (testimonials.length - 1 - i) * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                  opacity: {
                    duration: 0.3,
                    delay: inView ? i * 0.1 : (testimonials.length - 1 - i) * 0.08,
                  },
                }}
                className="absolute w-[30%] h-[320px] flex flex-col"
                style={{ originX: 0.5, originY: 0.5, zIndex: testimonials.length - i }}
              >
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  rating={t.rating}
                  className="bg-white/40 border border-black/5 h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden relative">
          <MobileCarousel items={testimonials} inView={inView} />
        </div>
      </div>
    </section>
  );
};
