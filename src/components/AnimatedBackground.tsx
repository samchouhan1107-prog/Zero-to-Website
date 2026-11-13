import React, { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  theme: 'dark' | 'light';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
      mousePos.current.active = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (theme !== 'dark' || hasReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle ambient cyber-nodes
    const nodeCount = Math.min(32, Math.floor((width * height) / 38000));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 1,
      baseAlpha: Math.random() * 0.15 + 0.05,
    }));

    let step = 0;

    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // 1. Subtle radial spotlight following cursor rollover
      if (mousePos.current.active && mx > 0 && my > 0) {
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 420);
        spotlight.addColorStop(0, 'rgba(43, 127, 255, 0.07)');
        spotlight.addColorStop(0.5, 'rgba(99, 93, 255, 0.025)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Ambient drifting cyber-nodes and faint connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Interaction with mouse cursor
        const dx = node.x - mx;
        const dy = node.y - my;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseProximity = Math.max(0, 1 - distToMouse / 220);

        const currentAlpha = Math.min(0.6, node.baseAlpha + mouseProximity * 0.4);

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + mouseProximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = mouseProximity > 0.3 ? `rgba(94, 168, 255, ${currentAlpha})` : `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distNodes = Math.hypot(node.x - other.x, node.y - other.y);
          if (distNodes < 140) {
            const lineAlpha = (1 - distNodes / 140) * 0.045 * (1 + mouseProximity);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(64, 120, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, hasReducedMotion]);

  if (theme !== 'dark') return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle isometric grid matrix */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)]"
      />
      {/* Interactive canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full opacity-90"
      />
    </div>
  );
};
