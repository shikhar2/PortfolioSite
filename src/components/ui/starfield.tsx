import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;       // depth 0.1–1.0
  size: number;
  opacity: number;
  twinkleOffset: number;
  color: string;
}

const COLORS = [
  'rgba(180,210,255,',  // cold white-blue
  'rgba(160,200,255,',  // blue
  'rgba(200,180,255,',  // purple-white
  'rgba(255,220,180,',  // warm yellow (rare)
];

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let scrollY = 0;
    let width = 0;
    let height = 0;
    const stars: Star[] = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Generate 3 depth layers of stars
    const counts = [180, 80, 30]; // far, mid, close
    counts.forEach((count, layer) => {
      for (let i = 0; i < count; i++) {
        const z = (layer + 1) / 3; // 0.33, 0.67, 1.0
        stars.push({
          x: Math.random(),   // normalized 0–1
          y: Math.random(),
          z,
          size: z * 1.2 + Math.random() * 0.8,
          opacity: z * 0.4 + Math.random() * 0.3,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: COLORS[Math.floor(Math.random() * (layer === 2 ? 4 : 3))],
        });
      }
    });

    let raf: number;
    let t = 0;

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        // Parallax: deeper stars shift less on scroll
        const parallaxY = (scrollY * star.z * 0.15) % height;

        const sx = star.x * width;
        const sy = (star.y * height - parallaxY + height) % height;

        // Twinkle
        const twinkle = 0.6 + 0.4 * Math.sin(t * 2 + star.twinkleOffset);
        const alpha = star.opacity * twinkle;

        // Glow for close stars
        if (star.z > 0.6) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 3);
          grd.addColorStop(0, `${star.color}${alpha})`);
          grd.addColorStop(1, `${star.color}0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
}
