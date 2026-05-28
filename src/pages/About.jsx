import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SkillsSection } from '../components/sections/SkillsSection';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }
  })
};

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About — Debest.dev</title>
        <meta name="description" content="Discover the story of Debest.dev — helping startups build high-performing web applications. Available for remote projects worldwide." />
      </Helmet>

      {/* ── Bio Block ── */}
      <section className="pt-32 pb-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-brand-500/15 blur-2xl rounded-full" />
              <img
                src="/images/aboutme.png"
                alt="Blessed Anthony"
                className="relative z-10 w-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-500 font-sans">About Me</span>

            <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-text">
              Full-Stack Developer
            </h3>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              I'm Blessed Anthony, a full-stack developer focused on building modern web applications that are fast, scalable, and user-friendly. I work with startups, founders, and product teams to turn ideas into reliable digital products across both Web2 and Web3.
            </p>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              My work spans frontend development with React and Next.js, backend systems with Node.js and Python, and blockchain solutions including smart contracts and dApp interfaces. I enjoy building products that not only look good, but perform well and solve real problems.
            </p>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              I've worked with startups across fintech, e-commerce, healthcare, and blockchain, collaborating with both local and international teams. I take projects from idea to deployment, handling architecture decisions, UI implementation, API design, and everything in between.
            </p>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              I believe the best products are built on a foundation of clean code, honest communication, and a genuine understanding of the business problem being solved. I don't just write code — I think deeply about what's being built and how it creates value.
            </p>

            <p className="text-sm md:text-base text-text/65 font-light leading-relaxed">
              I value clean code, clear communication, and delivering work that lasts.
            </p>

            <a
              href="/Blessed-Anthony-CV.pdf"
              download
              className="mt-3 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 text-white text-xs uppercase tracking-widest font-normal hover:bg-brand-600 transition-colors shadow-sm"
            >
              Download CV <span className="text-base leading-none">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Unique Value Proposition ── */}
      <section className="py-24 px-6 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto">

          {/* Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-brand-500 font-sans">Why Work With Me</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
            className="text-3xl md:text-5xl font-display font-light tracking-tight text-text mb-6 max-w-3xl leading-tight"
          >
            Most developers write code.<br />
            <span className="text-brand-500 font-normal">I build products.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={2}
            className="text-sm md:text-base text-text/55 font-light leading-relaxed max-w-2xl mb-16"
          >
            There's no shortage of developers who can push pixels and ship features. What's rare is someone who understands why you're building: the business model, the user, the deadline, and makes decisions accordingly. That's the gap I fill.
          </motion.p>

          {/* 3-column differentiators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                number: '01',
                title: 'One person. Full product.',
                body: `Most agencies hand your project to a junior developer after the sales call. I handle the architecture, the frontend, the backend, and the deployment, and I'm the one you talk to throughout. No handoffs. No lost context.`,
              },
              {
                number: '02',
                title: 'I think in outcomes, not tickets.',
                body: `I've seen engineers close every ticket and still ship something nobody uses. I care about whether the thing works for your users and moves your numbers. If a feature doesn't serve the goal, I'll tell you before I build it.`,
              },
              {
                number: '03',
                title: 'Startup-speed. Production-quality.',
                body: `Speed and quality aren't opposites. Cutting corners only moves the cost to later. I ship fast because I've solved these problems before, not because I skip steps. Your MVP won't embarrass you in six months.`,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                className="flex flex-col gap-4 p-6 rounded-2xl border border-black/5 bg-[#FAFAFA] hover:border-brand-500/20 hover:bg-white transition-all duration-300"
              >
                <span className="text-[10px] font-mono text-brand-500/50 tracking-widest">{item.number}</span>
                <h4 className="text-base font-normal tracking-tight text-text">{item.title}</h4>
                <p className="text-xs text-text/55 font-light leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Pull quote */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
            className="border-l-2 border-brand-500 pl-6 max-w-2xl"
          >
            <p className="text-lg md:text-xl font-light text-text/70 leading-relaxed italic">
              "The function of good software is to make the complex appear simple."
            </p>
            <span className="text-[10px] uppercase tracking-widest text-text/35 font-sans mt-3 block">— Grady Booch · and the standard I hold myself to</span>
          </motion.div>
        </div>
      </section>

      {/* ── What I Actually Do (process) ── */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-brand-500 font-sans block mb-4">How I Work</span>
            <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight text-text max-w-xl">
              From first message to live product.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Understand', body: `I start by asking the uncomfortable questions: what problem are we actually solving, who is it for, and what does success look like? Most issues in development start here.` },
              { step: '2', title: 'Architect', body: `Before writing a single line of code, I map out the system: data flow, tech stack, and third-party integrations. The decisions made here save weeks later.` },
              { step: '3', title: 'Build', body: `Clean, documented, and testable code. I build in the open with weekly updates, staging links, and no surprises at the end of a sprint.` },
              { step: '4', title: 'Ship & Support', body: `Deployment isn't the finish line. I make sure what I build actually runs and stays running. Post launch support is part of the deal.` },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i * 0.5}
                className="flex flex-col gap-3"
              >
                <div className="w-8 h-8 rounded-full border border-brand-500/30 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-brand-500">{item.step}</span>
                </div>
                <h4 className="text-sm font-normal tracking-tight text-text">{item.title}</h4>
                <p className="text-xs text-text/50 font-light leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Deep Dive ── */}
      <SkillsSection />
    </>
  );
};
