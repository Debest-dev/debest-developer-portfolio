import React, { useState, useEffect } from 'react';
import { ArrowUp, Linkedin, Twitter, Mail, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';           // ← new import

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="w-full bg-[#0F0F1A] pt-16 pb-8 px-6 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        {/* Monogram Col */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <Avatar size={32} />                  {/* ← avatar replaces DD */}
            <span className="text-sm font-sans tracking-widest text-white/50 uppercase font-light border-l border-white/10 pl-2.5">
              Debest.dev
            </span>
          </Link>
          <p className="text-xs text-white/35 font-light leading-relaxed max-w-xs">
            A premium full-stack developer portfolio focused on building fast, scalable, and highly aesthetic web apps for Web2 & Web3 startups.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest font-normal text-white/30">Navigation</span>
          <nav className="flex flex-col gap-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Me' },
              { to: '/portfolio', label: 'Portfolio' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="group relative text-xs text-white/50 hover:text-brand-400 font-light transition-all duration-200 ease-out hover:translate-x-1 w-fit">
                {label}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-brand-400 transition-all duration-200 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect & Social */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest font-normal text-white/30">Connect</span>
          <a href="mailto:debestcreative0@gmail.com" className="group relative text-xs text-white/50 hover:text-brand-400 font-light transition-all duration-200 ease-out hover:translate-x-1 break-words w-fit">
            debestcreative0@gmail.com
            <span className="absolute -bottom-px left-0 h-px w-0 bg-brand-400 transition-all duration-200 ease-out group-hover:w-full" />
          </a>
          <div className="flex gap-3 mt-2 flex-wrap">
            {[
              { href: 'mailto:debestcreative0@gmail.com', title: 'Email', icon: Mail, external: false },
              { href: 'https://wa.me/qr/AMKMR6UQIS6VB1', title: 'WhatsApp', icon: MessageSquare, external: true },
              { href: 'https://x.com/DebestOnchain', title: 'Twitter / X', icon: Twitter, external: true },
              { href: 'https://www.linkedin.com/in/debest-dev-b72854367', title: 'LinkedIn', icon: Linkedin, external: true },
              { href: 'https://t.me/DebestOnchain', title: 'Telegram', icon: Send, external: true },
            ].map(({ href, title, icon: Icon, external }) => (
              <a key={title} href={href} title={title} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-400 hover:border-brand-400/40 hover:bg-brand-400/10 hover:-translate-y-0.5 active:scale-90 transition-all duration-200 ease-out"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-white/25 font-light">© 2025 Blessed Anthony. All rights reserved.</span>
        <span className="text-[11px] text-white/25 font-light">Built with React & Tailwind CSS</span>
      </div>

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-400 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 z-30" aria-label="Scroll to top">
          <ArrowUp size={16} />
        </button>
      )}
    </footer>
  );
};