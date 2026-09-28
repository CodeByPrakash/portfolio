'use client';

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top ${itemClassName}`.trim()}
    style={{
      position: 'relative',
      width: '100%',
      marginBottom: '2rem',
      borderRadius: '26px',
      boxSizing: 'border-box',
      transformOrigin: 'top center',
      willChange: 'transform, filter',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      WebkitFontSmoothing: 'antialiased',
      ...style
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 60,
  itemScale = 0.04,
  itemStackDistance = 26,
  stackPosition = '16%',
  scaleEndPosition = '6%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const cardBaseTopsRef = useRef([]);
  const endBaseTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    if (end <= start) return 0;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value) || 0;
  }, []);

  // Measure stable base layout positions without transform interference
  const measureLayout = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Temporarily reset transforms to get true baseline layout positions
    cardsRef.current.forEach(card => {
      if (card) {
        card.style.transform = 'none';
        card.style.webkitTransform = 'none';
      }
    });

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const baseTops = [];

    cardsRef.current.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      baseTops.push(rect.top + scrollY);
    });

    cardBaseTopsRef.current = baseTops;

    const endEl = scroller.querySelector('.scroll-stack-end');
    if (endEl) {
      const endRect = endEl.getBoundingClientRect();
      endBaseTopRef.current = endRect.top + scrollY;
    } else {
      endBaseTopRef.current = (baseTops[baseTops.length - 1] || 0) + 600;
    }

    lastTransformsRef.current.clear();
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const containerHeight = window.innerHeight || 800;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const totalCards = cardsRef.current.length;
    const endElementTop = endBaseTopRef.current || (cardBaseTopsRef.current[totalCards - 1] || 0) + 400;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardBaseTopsRef.current[i] ?? (card.offsetTop + (scrollerRef.current?.offsetTop || 0));
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = Math.max(pinStart + 50, endElementTop - containerHeight * 0.45);

      // Bidirectional Stacking & Destacking:
      // Calculate how many subsequent cards have arrived and stacked above card i
      let subsequentDepth = 0;
      for (let nextIdx = i + 1; nextIdx < totalCards; nextIdx++) {
        const nextCardTop = cardBaseTopsRef.current[nextIdx];
        if (nextCardTop) {
          const nextTriggerStart = nextCardTop - stackPositionPx - itemStackDistance * nextIdx;
          const nextTriggerEnd = nextCardTop - scaleEndPositionPx;
          const p = calculateProgress(scrollTop, nextTriggerStart, nextTriggerEnd);
          subsequentDepth += p;
        }
      }

      // Card scale decreases as newer cards stack over it; smoothly expands back when reverse scrolling
      const targetScale = Math.max(0.72, 1 - subsequentDepth * itemScale);
      const scale = targetScale;
      const rotation = rotationAmount ? i * rotationAmount * (subsequentDepth > 0 ? 1 : 0) : 0;

      let blur = 0;
      if (blurAmount && subsequentDepth > 0) {
        blur = Math.min(8, subsequentDepth * blurAmount);
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        // Pinned in the stack
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        // Released at end of section
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      } else {
        // Reverse scrolled above pin point -> cleanly destacked in original document position
        translateY = 0;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >= 0.4 ||
        Math.abs(lastTransform.scale - newTransform.scale) >= 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) >= 0.2 ||
        Math.abs(lastTransform.blur - newTransform.blur) >= 0.2;

      if (hasChanged) {
        const transformStr = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filterStr = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transformStr;
        card.style.webkitTransform = transformStr;
        if (filterStr) card.style.filter = filterStr;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === totalCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage
  ]);

  const onScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.zIndex = (i + 1).toString();
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.WebkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    measureLayout();
    updateCardTransforms();

    const handleResize = () => {
      measureLayout();
      updateCardTransforms();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(scroller);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cardsRef.current = [];
      cardBaseTopsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
      stackCompletedRef.current = false;
    };
  }, [itemDistance, measureLayout, onScroll, updateCardTransforms]);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={scrollerRef}
      style={{
        position: 'relative',
        width: '100%',
        willChange: 'transform'
      }}
    >
      <div
        className="scroll-stack-inner"
        style={{
          width: '100%',
          paddingTop: '1rem',
          paddingBottom: '8rem'
        }}
      >
        {children}
        {/* Stable spacer so the last pin releases cleanly */}
        <div
          className="scroll-stack-end"
          style={{
            width: '100%',
            height: '2px',
            marginTop: '2rem',
            clear: 'both',
            pointerEvents: 'none',
            visibility: 'hidden'
          }}
        />
      </div>
    </div>
  );
};

export default ScrollStack;
