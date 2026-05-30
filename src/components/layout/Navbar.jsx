import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

export const Navbar = () => {
  const { scrolled } = useScrollProgress(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const links = [
    { label: "home",    href: "/",          index: "01" },
    { label: "about",   href: "/about",     index: "02" },
    { label: "work",    href: "/portfolio", index: "03" },
    { label: "contact", href: "/contact",   index: "04" },
  ];

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.pathname);
    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'glass py-4 card-shadow' : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <Avatar size={36} className="transition-transform duration-300 group-hover:scale-105" />
            <span className="text-sm font-sans tracking-widest text-text/80 uppercase font-light border-l border-black/10 pl-2.5 transition-colors duration-300 group-hover:text-text">
              Debest.dev
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a key={link.href} href={link.href} className="group flex items-center gap-1.5 transition-colors duration-300">
                  <span className={`text-[9px] font-mono font-normal transition-colors duration-300 ${isActive ? 'text-brand-500' : 'text-text/30 group-hover:text-brand-500/60'}`}>
                    {link.index}
                  </span>
                  <span className={`text-[11px] font-mono transition-colors duration-300 ${isActive ? 'text-brand-500' : 'text-text/25 group-hover:text-brand-500/50'}`}>
                    //
                  </span>
                  <span className={`text-[11px] uppercase tracking-widest font-light transition-colors duration-300 ${isActive ? 'text-brand-500 font-normal' : 'text-text/60 group-hover:text-brand-500'}`}>
                    {link.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Download CV — outline so it doesn't compete with hero CTA */}
          <div className="hidden md:block">
            <Button href="/Blessed-Anthony-CV.pdf" variant="outline" className="py-2.5 px-5 text-xs font-normal" target="_blank" rel="noopener noreferrer">
              Download CV
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 text-text transition-colors duration-200"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={links}
        activeLink={activeHash}
      />
    </>
  );
};
