import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  href
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full text-sm transition-all duration-300 font-normal px-6 py-3 tracking-wide ease-out active:scale-95";

  const variants = {
    primary: "gradient-bg text-white hover:shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5",
    outline: "border border-black/10 bg-white/40 text-text hover:bg-black/5 hover:-translate-y-0.5",
    ghost: "text-text hover:bg-black/5"
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  // Glass shine overlay — only for primary variant
  const glassShine = variant === 'primary' ? (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '1px',
        left: '10%',
        width: '80%',
        height: '45%',
        borderRadius: '100px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  ) : null;

  // Wrap children with relative positioning so shine sits on top correctly
  const inner = variant === 'primary' ? (
    <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
      {children}
    </span>
  ) : children;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto') || href.endsWith('.pdf')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {glassShine}
          {inner}
        </a>
      );
    }
    return (
      <Link
        to={href}
        className={combinedClass}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {glassShine}
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {glassShine}
      {inner}
    </button>
  );
};
