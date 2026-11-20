import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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

    // Particle pool
    const numStars = Math.min(180, Math.floor(width / 10));
    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      hue: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.4,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        hue: Math.random() > 0.8 ? (Math.random() > 0.5 ? 260 : 190) : 0 // violet, cyan, or white
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient nebula glow
      const grad = ctx.createRadialGradient(
        width * 0.7,
        height * 0.2,
        50,
        width * 0.7,
        height * 0.2,
        width * 0.6
      );
      grad.addColorStop(0, 'rgba(124, 58, 237, 0.04)');
      grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star upward slowly
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Twinkle
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.015;
        const currentOpacity = Math.max(0.1, Math.min(0.95, star.opacity));

        // Parallax offset
        const dx = (mouseX - width / 2) * 0.01 * (star.size * 0.5);
        const dy = (mouseY - height / 2) * 0.01 * (star.size * 0.5);

        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);

        if (star.hue === 260) {
          ctx.fillStyle = `rgba(167, 139, 250, ${currentOpacity})`;
        } else if (star.hue === 190) {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentOpacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
