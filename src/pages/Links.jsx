import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Mail, MessageSquare, Twitter, Linkedin, Send,
  Globe, Github, Copy, Check
} from 'lucide-react';

const links = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'See my work & projects',
    href: 'https://debest-developer-portfolio.vercel.app/',
    icon: Globe,
    external: true,
    primary: true,
  },
  {
    id: 'email',
    label: 'Email Me',
    description: 'debestcreative0@gmail.com',
    href: 'mailto:debestcreative0@gmail.com',
    icon: Mail,
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Chat directly on WhatsApp',
    href: 'https://wa.me/qr/AMKMR6UQIS6VB1',
    icon: MessageSquare,
    external: true,
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    description: '@DebestOnchain',
    href: 'https://x.com/DebestOnchain',
    icon: Twitter,
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Debest Dev',
    href: 'https://www.linkedin.com/in/debest-dev-b72854367',
    icon: Linkedin,
    external: true,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    description: '@DebestOnchain',
    href: 'https://t.me/DebestOnchain',
    icon: Send,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'github.com/Debest-dev',
    href: 'https://github.com/Debest-dev',
    icon: Github,
    external: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const Links = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('debestcreative0@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Links — Debest.dev</title>
        <meta name="description" content="All links to connect with Blessed Anthony — Full-Stack Developer. Portfolio, WhatsApp, Twitter, LinkedIn, Telegram and more." />
      </Helmet>

      {/* Full page centered layout — no navbar/footer feel */}
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">

        {/* Dot grid background */}
        <div className="fixed inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Glow orb */}
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-sm flex flex-col items-center gap-3"
        >
          {/* Avatar + Name */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 mb-4">
            {/* Photo */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white shadow-lg">

              <img
                src="/images/profile_picture.png"
                alt="Dbest.dev"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Name & title */}
            <div className="text-center">
              <h1 className="text-lg font-normal tracking-tight text-text">
                Debest.dev
              </h1>
              <p className="text-[11px] uppercase tracking-widest text-text/40 font-light mt-0.5">
                Full-Stack Developer
              </p>
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/5 bg-white/60 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-text/50 font-light">
                Available for Projects
              </span>
            </div>
          </motion.div>

          {/* Links */}
          {links.map((link) => {
            const Icon = link.icon;
            const isEmail = link.id === 'email';

            const content = (
              <motion.div
                variants={itemVariants}
                key={link.id}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`w-full group relative flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 cursor-pointer
                  ${link.primary
                    ? 'gradient-bg text-white border-transparent shadow-[0_4px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.35)]'
                    : 'bg-white/60 backdrop-blur border-black/5 hover:bg-white hover:border-black/10 hover:shadow-md card-shadow'
                  }`}
                onClick={isEmail ? copyEmail : undefined}
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                  ${link.primary
                    ? 'bg-white/20'
                    : 'bg-black/4 group-hover:bg-brand-500/10'
                  }`}
                >
                  <Icon size={16} className={link.primary ? 'text-white' : 'text-brand-500'} />
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className={`text-sm font-normal tracking-wide
                    ${link.primary ? 'text-white' : 'text-text'}`}>
                    {link.label}
                  </span>
                  <span className={`text-[11px] font-light truncate
                    ${link.primary ? 'text-white/70' : 'text-text/40'}`}>
                    {link.description}
                  </span>
                </div>

                {/* Copy indicator for email */}
                {isEmail && (
                  <div className="shrink-0">
                    {copied
                      ? <Check size={14} className="text-emerald-500" />
                      : <Copy size={14} className="text-text/20 group-hover:text-text/40 transition-colors" />
                    }
                  </div>
                )}

                {/* Shine for primary */}
                {link.primary && (
                  <span
                    aria-hidden="true"
                    className="absolute top-px left-[10%] w-[80%] h-[45%] rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 100%)',
                    }}
                  />
                )}
              </motion.div>
            );

            if (isEmail) return content;

            return (
              <a
                key={link.id}
                href={link.href}
                className="w-full"
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {content}
              </a>
            );
          })}

          {/* Footer credit */}
          <motion.p
            variants={itemVariants}
            className="text-[10px] text-text/25 font-light mt-4 tracking-wide"
          >
            debest-developer-portfolio.vercel.app
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};
