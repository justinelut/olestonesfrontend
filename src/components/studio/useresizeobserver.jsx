import { useState, useEffect, useRef } from 'react';

const useResizeObserver = () => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    if (!observeTarget) return; // Make sure ref is not null before observing
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setDimensions(entry.contentRect);
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return [ref, dimensions];
};

export default useResizeObserver;
