import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, HelpCircle } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { services } from '../data/services';
import { Button } from '../components/ui/Button';

export const Services = () => {
  // FAQs State
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We analyze your business, outline clear user flows, map out visual aesthetics, and finalize high-performance technology structures."
    },
    {
      num: "02",
      title: "Clean Design & Mockups",
      desc: "We draft beautiful visual design systems. We focus heavily on elegant typography, curated color pallets, and responsive micro-layouts."
    },
    {
      num: "03",
      title: "Clean Engineering",
      desc: "We build using robust frameworks like React or Next.js, pair with secure APIs, structure clean state code, and implement precise unit tests."
    },
    {
      num: "04",
      title: "Launch & Support",
      desc: "We deploy onto high-performance infrastructures, hook up monitoring setups, apply speed optimizations, and transition project ownership."
    }
  ];

  const packages = [
    {
      name: "Startup Landing Page",
      price: "$1,200+",
      desc: "Best for early-stage SaaS validation.",
      bullets: ["Custom Webpage (Syne/DM Sans layout)", "Complete visual responsive blocks", "Lightweight framer-motion reveals", "Modular React components", "Contact form & email integration"]
    },
    {
      name: "Full-Stack Web App",
      price: "$3,500+",
      desc: "Best for transactional portals or SaaS applications.",
      bullets: ["Dynamic Next.js/React frontend", "Node.js/Express or Python APIs", "MongoDB / Postgres database", "Secure User Auth & Profile panel", "Third-party payment checkout gateway"]
    },
    {
      name: "Web3 dApp Integration",
      price: "$5,000+",
      desc: "Best for decentralized Web3 startups.",
      bullets: ["Geth/Solidity custom smart contracts", "Web3modal / Wagmi wallet connection", "Dynamic dApp frontend dashboard", "Gas-optimized secure interactions", "Comprehensive contract test suites"]
    }
  ];

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Typical landing pages take 1-2 weeks. Full-stack applications and SaaS dashboards range from 3-6 weeks, depending on requirements, user portals, and complexity."
    },
    {
      q: "Which tech stack do you recommend?",
      a: "I highly recommend React/Next.js paired with Tailwind CSS for rapid frontend iterations. For backends, I prefer Node.js or Python (FastAPI/Django) coupled with PostgreSQL or MongoDB."
    },
    {
      q: "Do you offer post-launch support?",
      a: "Yes, I offer 30 days of free post-launch bug support. I also offer monthly retainer contracts for continuous optimization, hosting maintenance, and updates."
    },
    {
      q: "Can you redesign our legacy system?",
      a: "Absolutely! I specialize in full-scale aesthetic and performance redesigns. I'll audit your current app, optimize slow API structures, and style a modern, premium experience."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services — Debest.dev</title>
        <meta name="description" content="Discover full-stack web application development services for Web2 and Web3 startups by Blessed Anthony at Debest.dev." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#FAFAFA] border-b border-black/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="My Offerings"
            title="Premium Web Services"
            subtitle="I build fast, responsive, and secure custom applications focused on performance and modern design."
            align="center"
          />
        </div>
      </section>

      {/* Core offerings lists */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {services.map((service, sIdx) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                sIdx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Info Column (Col span 7) */}
              <div className={`lg:col-span-7 flex flex-col items-start gap-4 ${
                sIdx % 2 === 1 ? 'lg:order-last lg:pl-12' : ''
              }`}>
                <div className="w-12 h-12 rounded-full glass border border-black/5 flex items-center justify-center text-lg mb-2 shadow-xs">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-normal tracking-tight text-text">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Checklist Bullet Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full">
                  {service.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-text/75 font-light">
                      <span className="w-4 h-4 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                        <Check size={10} />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic/Visual column placeholder (Col span 5) */}
              <div className="lg:col-span-5 h-64 rounded-3xl border border-black/5 bg-gradient-to-tr from-brand-500/5 to-accent/5 flex items-center justify-center p-6 relative overflow-hidden">
                <span className="text-5xl font-display font-light text-text/10 select-none">
                  {service.id.toUpperCase()}
                </span>
                {/* Floating decor */}
                <div className="absolute w-24 h-24 rounded-full border border-black/5 scale-105 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Stepper Section */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Workflow"
            title="My Development Process"
            subtitle="An orderly, pixel-perfect layout of how we progress your startup idea from a sketch to active deployment."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <GlassCard key={idx} className="bg-white/40 border border-black/5 relative flex flex-col gap-4" hoverEffect={true}>
                <span className="text-brand-500 font-display text-4xl font-light opacity-50 block select-none">
                  {step.num}
                </span>
                <h4 className="text-base font-normal text-text tracking-tight">{step.title}</h4>
                <p className="text-xs text-text/60 font-light leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Packages Pricing section */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Investment"
            title="Budget Estimations"
            subtitle="Transparent pricing parameters tailored for early-stage startup validation and scaling."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <GlassCard
                key={idx}
                className={`bg-white/40 border border-black/5 flex flex-col justify-between ${
                  idx === 1 ? 'relative border-brand-500/30 ring-1 ring-brand-500/10' : ''
                }`}
                hoverEffect={true}
              >
                <div>
                  {/* Badge for Popular */}
                  {idx === 1 && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-normal text-white bg-brand-500">
                      Most Popular
                    </span>
                  )}

                  <span className="text-xs uppercase tracking-widest text-text/45 font-light">{pkg.name}</span>
                  <div className="flex items-baseline gap-1 mt-4 mb-2">
                    <span className="text-3xl md:text-4xl font-display font-light text-brand-500 tracking-tight">{pkg.price}</span>
                  </div>
                  <p className="text-xs text-text/50 font-light mb-6 leading-relaxed">{pkg.desc}</p>
                  
                  {/* Package Checklist */}
                  <ul className="flex flex-col gap-3 border-t border-black/5 pt-6 mb-8">
                    {pkg.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-text/70 font-light">
                        <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href="/contact" variant={idx === 1 ? 'primary' : 'outline'} className="w-full text-xs font-normal">
                  Get Started →
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="Help Desk"
            title="Frequently Asked Questions"
            subtitle="Have a query about budgets, stack components, or workflow integrations? Check out the answers below."
            align="center"
          />

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-black/5 pb-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                  >
                    <span className="text-sm font-normal text-text group-hover:text-brand-500 transition-colors flex items-center gap-2">
                      <HelpCircle size={14} className="text-brand-500/60" />
                      {faq.q}
                    </span>
                    <span className="text-text/50">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs md:text-sm text-text/60 font-light leading-relaxed pl-6 pt-2 pb-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
