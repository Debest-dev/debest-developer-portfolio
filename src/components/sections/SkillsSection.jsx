import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { SkillBar } from '../ui/SkillBar';
import { coreSkills, proficientSkills, familiarSkills } from '../../data/skills';

// Tier card content — reusable
const TierCard = ({ accentStyle, label, labelColor, description, skills, isString }) => (
  <div
    className="glass card-shadow rounded-2xl relative overflow-hidden flex flex-col pt-6 pb-8 px-6 bg-white/40 border border-black/5 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
    style={{ transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
  >
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 w-full h-[3px]" style={accentStyle} />
    <span className={`text-[10px] font-sans font-light uppercase tracking-widest mb-1 block ${labelColor}`}>
      {label}
    </span>
    <p className="text-xs text-text/50 font-light mb-6">{description}</p>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="text-xs px-3 py-1.5 rounded-lg bg-black/5 border border-black/5 text-text/70 transition-all duration-200 hover:text-[#4F46E5] hover:bg-white hover:border-[#4F46E5]/20 font-light"
        >
          {isString ? skill : skill.name}
        </span>
      ))}
    </div>
  </div>
);

const tiers = [
  {
    label: 'Core Expertise',
    labelColor: 'text-brand-500',
    description: 'What I build with every day',
    accentStyle: { background: 'linear-gradient(to right, #4F46E5, #0EA5E9)' },
    skills: null, // filled below
    isString: false,
  },
  {
    label: 'Proficient',
    labelColor: 'text-brand-500',
    description: 'Solid working knowledge, used regularly',
    accentStyle: { background: '#4F46E5' },
    skills: null,
    isString: true,
  },
  {
    label: 'Familiar',
    labelColor: 'text-text/50',
    description: 'Working knowledge, actively improving',
    accentStyle: { background: 'rgba(0,0,0,0.4)' },
    skills: null,
    isString: true,
  },
];

// Sticky stack card — exact same as AboutSnapshot StickyStatCard
const StickyTierCard = ({ tier, index, total }) => (
  <div
    className="sticky"
    style={{
      top: `${80 + index * 28}px`,
      zIndex: total - index,
    }}
  >
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
        <TierCard {...tier} />
      </div>
    </motion.div>
  </div>
);

export const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Attach skills data
  const tiersWithData = [
    { ...tiers[0], skills: coreSkills },
    { ...tiers[1], skills: proficientSkills },
    { ...tiers[2], skills: familiarSkills },
  ];

  return (
    <section id="skills" className="py-16 px-6 bg-[#FAFAFA]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <SectionHeader
          badge="EXPERTISE"
          title="Skills & Tech Stack"
          subtitle="A full-stack skillset built for modern web and Web3 product development."
        />

        {/* Core Proficiency Bars */}
        <div className="mb-16">
          <h3 className="text-xl font-normal tracking-tight text-text mb-6 border-b border-black/5 pb-2">
            Core Proficiency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {coreSkills.map((skill, idx) => (
              <SkillBar key={idx} name={skill.name} percentage={skill.percentage} />
            ))}
          </div>
        </div>

        {/* Tier Cards */}

        {/* ── Mobile: sticky scroll stack (same as Who I Am) ── */}
        <div className="md:hidden flex flex-col pb-8">
          {tiersWithData.map((tier, idx) => (
            <StickyTierCard
              key={idx}
              tier={tier}
              index={idx}
              total={tiersWithData.length}
            />
          ))}
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {tiersWithData.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TierCard {...tier} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
