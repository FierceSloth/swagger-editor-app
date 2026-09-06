'use client';

import { useEffect } from 'react';

export function HeaderScrollListener() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
