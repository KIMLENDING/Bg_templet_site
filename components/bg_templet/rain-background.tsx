"use client"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

interface RainBackgroundProps {
  width: number;
  height: number;
}

interface Raindrop {
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const RainBackground: React.FC<RainBackgroundProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raindropRef = useRef<Raindrop[]>([]);
  const rippleRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createRaindrop = (): Raindrop => ({
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 5 + 2,
    });

    const createRipple = (x: number, y: number): Ripple => ({
      x,
      y,
      size: 0,
      opacity: 1,
    });

    // Initialize raindrops
    for (let i = 0; i < 100; i++) {
      raindropRef.current.push(createRaindrop());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = 'rgba(0, 0, 30, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw raindrops
      raindropRef.current.forEach((raindrop, index) => {
        raindrop.y += raindrop.speed;
        ctx.fillStyle = 'rgba(200, 200, 255, 0.8)';
        ctx.beginPath();
        ctx.ellipse(raindrop.x, raindrop.y, raindrop.size / 2, raindrop.size, 0, 0, Math.PI * 2);
        ctx.fill();

        if (raindrop.y > canvas.height) {
          rippleRef.current.push(createRipple(raindrop.x, canvas.height - 10));
          raindropRef.current[index] = createRaindrop();
        }
      });

      // Update and draw ripples
      rippleRef.current = rippleRef.current.filter((ripple) => {
        ripple.size += 0.5;
        ripple.opacity -= 0.02;

        if (ripple.opacity <= 0) return false;

        ctx.strokeStyle = `rgba(200, 200, 255, ${ripple.opacity})`;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #001, #003)',
          borderRadius: '1rem',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-slate-950 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:bg-opacity-40 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
    </div>
  );
};


export default RainBackground;