import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    if (target === undefined || target === null) return;

    const startValue = prevTarget.current;
    const endValue = target;
    const startTime = performance.now();

    if (startValue === endValue) {
      setCount(endValue);
      return;
    }

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    prevTarget.current = endValue;
  }, [target, duration]);

  return count;
}