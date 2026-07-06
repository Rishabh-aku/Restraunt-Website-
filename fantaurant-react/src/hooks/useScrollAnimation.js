import { useEffect, useRef, useState } from 'react';

/**
 * Hook that returns a ref and a boolean indicating if the element is visible.
 * Used for scroll-triggered animations.
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * Hook for managing loading states with a minimum display duration.
 */
export function useLoading(initialState = true, minDuration = 800) {
  const [loading, setLoading] = useState(initialState);

  const stopLoading = () => {
    setTimeout(() => setLoading(false), minDuration);
  };

  return [loading, stopLoading];
}
