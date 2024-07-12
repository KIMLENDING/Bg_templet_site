"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface GeometricBackgroundProps {
  width: number;
  height: number;
}

interface Shape {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  type: 'circle' | 'square' | 'triangle';
}

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#B8E994'];

  const createShape = (): Shape => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 20 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 2 + 0.5,
    type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Initialize shapes
    shapesRef.current = Array.from({ length: 50 }, createShape);

    const drawShape = (shape: Shape) => {
      ctx.fillStyle = shape.color;
      ctx.beginPath();

      switch (shape.type) {
        case 'circle':
          ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
          break;
        case 'square':
          ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
          break;
        case 'triangle':
          ctx.moveTo(shape.x, shape.y - shape.size / 2);
          ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
          ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
          ctx.closePath();
          break;
      }

      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      shapesRef.current.forEach((shape) => {
        shape.y += shape.speed;
        if (shape.y > height + shape.size) {
          shape.y = -shape.size;
          shape.x = Math.random() * width;
        }
        drawShape(shape);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [width, height]);

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px`, borderRadius: '1rem' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #1A2980, #26D0CE)',
          borderRadius: '1rem'
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-purple-900 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeometricBackground;
