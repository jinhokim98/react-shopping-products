import React, { useEffect } from 'react';

interface IntersectionObserverAreaProps {
  callback: () => Promise<void>;
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
}

function IntersectionObserverArea({
  targetRef,
  callback,
  children,
}: React.PropsWithChildren<IntersectionObserverAreaProps>) {
  useEffect(() => {
    const observerCallback = async (entries: IntersectionObserverEntry[]) => {
      if (!entries[0].isIntersecting) return;
      await callback();
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 1 });
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, targetRef]);

  return <div>{children}</div>;
}

export default IntersectionObserverArea;
