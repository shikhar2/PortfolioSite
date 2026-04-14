import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'text' | 'click';

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [clicking, setClicking] = useState(false);
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);

  // Dot follows instantly
  const dotX = useSpring(rawX, { damping: 28, stiffness: 600, mass: 0.3 });
  const dotY = useSpring(rawY, { damping: 28, stiffness: 600, mass: 0.3 });

  // Ring lags slightly behind — creates the parallax depth feel
  const ringX = useSpring(rawX, { damping: 22, stiffness: 180, mass: 0.5 });
  const ringY = useSpring(rawY, { damping: 22, stiffness: 180, mass: 0.5 });

  // Bloom lags a lot — creates the trailing aura
  const bloomX = useSpring(rawX, { damping: 40, stiffness: 80, mass: 1 });
  const bloomY = useSpring(rawY, { damping: 40, stiffness: 80, mass: 1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea')) {
        setState('text');
      } else if (t.closest('a, button, [role="button"], [data-interactive], label')) {
        setState('hover');
      } else {
        setState('default');
      }
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY, visible]);

  // Sizes per state
  const ringSize = clicking ? 20 : state === 'hover' ? 52 : state === 'text' ? 4 : 36;
  const dotSize = state === 'text' ? 20 : clicking ? 4 : 6;
  const dotOpacity = state === 'text' ? 0 : 1;
  const ringOpacity = state === 'text' ? 0.4 : clicking ? 0.6 : 0.7;
  const ringBorderColor =
    state === 'hover' ? 'hsl(var(--accent))' : 'hsl(var(--primary))';
  const dotColor =
    state === 'hover' ? 'hsl(var(--accent))' : 'hsl(var(--primary))';

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">

      {/* ── Layer 1: Ambient bloom ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: bloomX,
          top: bloomY,
          translateX: '-50%',
          translateY: '-50%',
          width: 480,
          height: 480,
          background:
            'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, hsl(var(--accent) / 0.03) 40%, transparent 70%)',
        }}
        animate={{ opacity: visible ? 1 : 0, scale: clicking ? 0.85 : 1 }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.15 } }}
      />

      {/* ── Layer 2: Outer ring — lags behind dot ── */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: ringBorderColor,
          boxShadow: `0 0 16px ${ringBorderColor}40, inset 0 0 8px ${ringBorderColor}10`,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
          scale: clicking ? 0.7 : 1,
          rotate: state === 'hover' ? 45 : 0,
          borderRadius: state === 'hover' ? '30%' : '50%',
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.12 },
          rotate: { type: 'spring', damping: 15, stiffness: 200 },
          borderRadius: { duration: 0.25 },
        }}
      />

      {/* ── Layer 3: Inner accent ring (only on hover) ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid hsl(var(--accent) / 0.4)',
        }}
        animate={{
          width: state === 'hover' ? 28 : 0,
          height: state === 'hover' ? 28 : 0,
          opacity: state === 'hover' ? 1 : 0,
          rotate: state === 'hover' ? -45 : 0,
          borderRadius: state === 'hover' ? '30%' : '50%',
        }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 280,
        }}
      />

      {/* ── Layer 4: Sharp cursor dot ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: dotColor,
          boxShadow: `0 0 8px ${dotColor}, 0 0 20px ${dotColor}60`,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: dotOpacity,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 400 },
          height: { type: 'spring', damping: 20, stiffness: 400 },
          opacity: { duration: 0.15 },
          scale: { duration: 0.1 },
        }}
      />

      {/* ── Layer 5: Click ripple ── */}
      {clicking && (
        <motion.div
          className="absolute rounded-full border border-primary/60"
          style={{
            left: dotX,
            top: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 8, height: 8, opacity: 0.8 }}
          animate={{ width: 64, height: 64, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}
