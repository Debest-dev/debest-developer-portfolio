import { useState, useEffect } from 'react';

export const useScrollProgress = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Check threshold
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Calculate percentage scroll
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolledPct = (window.scrollY / height) * 100;
        setScrollPercent(scrolledPct);
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrolled, scrollPercent };
};
