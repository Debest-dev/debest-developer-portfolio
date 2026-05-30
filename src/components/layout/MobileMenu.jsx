import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Twitter, Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const MobileMenu = ({ isOpen, onClose, links, activeLink }) => {
  const menuVariants = {
    hidden: { x: "100%", opacity: 0.9 },
    visible: {
      x: 0, opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 18, mass: 0.8, staggerChildren: 0.08, delayChildren: 0.15 }
    },
    exit: {
      x: "100%", opacity: 0.9,
      transition: { type: "spring", stiffness: 100, damping: 18, mass: 0.8 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40"
          />

          <motion.div
            variants={menuVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white/95 backdrop-blur-md border-l border-black/5 card-shadow z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/5">
              <Avatar size={34} />
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-black/5 text-text hover:bg-black/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-1 px-8 pt-8 flex-1">
              {links.map((link, idx) => {
                const isActive = activeLink === link.href;
                return (
                  <motion.a
                    key={idx} variants={linkVariants}
                    href={link.href} onClick={onClose}
                    className="group flex items-center gap-2 py-3 border-b border-black/5 last:border-none transition-colors duration-300"
                  >
                    <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? 'text-brand-500' : 'text-text/25 group-hover:text-brand-500/60'}`}>{link.index}</span>
                    <span className={`text-[12px] font-mono transition-colors duration-300 ${isActive ? 'text-brand-500' : 'text-text/20 group-hover:text-brand-500/50'}`}>//</span>
                    <span className={`text-xl font-display tracking-tight transition-colors duration-300 ${isActive ? 'text-brand-500 font-normal' : 'text-text/70 font-light group-hover:text-text'}`}>{link.label}</span>
                  </motion.a>
                );
              })}

              <motion.div variants={linkVariants} className="pt-6">
                <Button href="/Blessed-Anthony-CV.pdf" target="_blank" rel="noopener noreferrer" onClick={onClose} variant="outline" className="w-full">
                  Download CV
                </Button>
              </motion.div>
            </div>

            {/* Social footer */}
            <motion.div variants={linkVariants} className="px-8 py-6 border-t border-black/5 flex flex-col gap-4">
              <span className="text-[10px] text-text/40 tracking-widest uppercase font-light">Connect</span>
              <div className="flex gap-4">
                <a href="https://github.com/Debest-dev" target="_blank" rel="noopener noreferrer" className="text-text/50 hover:text-brand-500 transition-colors">
                  <GithubIcon />
                </a>
                <a href="mailto:debestcreative0@gmail.com" title="Email" className="text-text/50 hover:text-brand-500 transition-colors"><Mail size={18} /></a>
                <a href="https://wa.me/qr/AMKMR6UQIS6VB1" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-text/50 hover:text-brand-500 transition-colors"><MessageSquare size={18} /></a>
                <a href="https://x.com/DebestOnchain" target="_blank" rel="noopener noreferrer" title="Twitter / X" className="text-text/50 hover:text-brand-500 transition-colors"><Twitter size={18} /></a>
                <a href="https://www.linkedin.com/in/debest-dev-b72854367?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAHSsBwD5QAGr5eIRbAeEeA%3D%3D" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-text/50 hover:text-brand-500 transition-colors"><Linkedin size={18} /></a>
                <a href="https://t.me/DebestOnchain" target="_blank" rel="noopener noreferrer" title="Telegram" className="text-text/50 hover:text-brand-500 transition-colors"><Send size={18} /></a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
