"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  maxSpeed: number;
  lifetime: number;
  age: number;
  element: HTMLDivElement;
}
interface SpaceBackgroundProps {
  width: number;
  height: number;
}
const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const MAX_STARS = 50;
  const MAX_LIFETIME = 15000; // 15 seconds in milliseconds

  const createStar = (width: number, height: number): Star => {
    const star: Star = {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      opacity: 0, // Start with 0 opacity
      velocity: { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 },
      acceleration: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02
      },
      maxSpeed: Math.random() * 0.5 + 0.1,
      lifetime: Math.random() * (MAX_LIFETIME - 5000) + 5000, // Random lifetime between 5 and 15 seconds
      age: 0,
      element: document.createElement('div')
    };

    star.element.className = 'absolute rounded-full bg-white';
    star.element.style.width = `${star.size}px`;
    star.element.style.height = `${star.size}px`;
    star.element.style.opacity = '0';
    star.element.style.transform = `translate(${star.x}px, ${star.y}px)`;
    star.element.style.transition = 'opacity 0.5s ease-out';

    return star;
  };

  const updateStar = (star: Star, width: number, height: number, deltaTime: number) => {
    star.age += deltaTime;
    const lifeRatio = star.age / star.lifetime;

    // Update opacity
    if (lifeRatio < 0.1) {
      star.opacity = lifeRatio * 10;
    } else if (lifeRatio > 0.9) {
      star.opacity = (1 - lifeRatio) * 10;
    } else {
      star.opacity = 1;
    }

    // Update velocity and position
    star.velocity.x += star.acceleration.x;
    star.velocity.y += star.acceleration.y;

    const speed = Math.sqrt(star.velocity.x ** 2 + star.velocity.y ** 2);
    if (speed > star.maxSpeed) {
      const ratio = star.maxSpeed / speed;
      star.velocity.x *= ratio;
      star.velocity.y *= ratio;
    }

    star.x += star.velocity.x * (deltaTime / 16); // Adjust for 60 FPS
    star.y += star.velocity.y * (deltaTime / 16);

    // Handle screen boundaries with new acceleration
    if (star.x < 0 || star.x > width) {
      star.velocity.x *= -1.1; // Increase speed slightly on collision
      star.x = Math.max(0, Math.min(star.x, width));
      star.acceleration.x = (Math.random() - 0.5) * 0.04; // New random acceleration
    }
    if (star.y < 0 || star.y > height) {
      star.velocity.y *= -1.1; // Increase speed slightly on collision
      star.y = Math.max(0, Math.min(star.y, height));
      star.acceleration.y = (Math.random() - 0.5) * 0.04; // New random acceleration
    }

    // Randomly change acceleration occasionally
    if (Math.random() < 0.01) { // 1% chance each frame
      star.acceleration.x = (Math.random() - 0.5) * 0.02;
      star.acceleration.y = (Math.random() - 0.5) * 0.02;
    }

    // Update DOM element
    star.element.style.opacity = star.opacity.toString();
    star.element.style.transform = `translate(${star.x}px, ${star.y}px)`;

    return star.age < star.lifetime;
  };

  const animateStars = (currentTime: number) => {
    if (!containerRef.current) return;

    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const { width, height } = containerRef.current.getBoundingClientRect();

    starsRef.current = starsRef.current.filter(star => {
      const keep = updateStar(star, width, height, deltaTime);
      if (!keep) {
        star.element.remove();
      }
      return keep;
    });

    while (starsRef.current.length < MAX_STARS) {
      const newStar = createStar(width, height);
      containerRef.current.appendChild(newStar.element);
      starsRef.current.push(newStar);
    }

    animationFrameRef.current = requestAnimationFrame(animateStars);
  };

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      starsRef.current = Array.from({ length: MAX_STARS }, () => {
        const star = createStar(width, height);
        containerRef.current!.appendChild(star.element);
        return star;
      });

      animationFrameRef.current = requestAnimationFrame(animateStars);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      starsRef.current.forEach(star => star.element.remove());
    };
  }, []);

  return (
    <div ref={containerRef}
      // style={{
      //   width: `${width}px`,
      //   height: `${height}px`,
      //   display: 'flex',
      //   position: 'relative',
      //   overflow: 'hidden',
      //   background: 'linear-gradient(to bottom, #581c87, #000000)',
      //   borderRadius: '1rem'
      // }} 
      className={`w-full h-[600px] relative overflow-hidden bg-gradient-to-b from-purple-900 to-black rounded-lg`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">

          <Link className="px-6 py-2 bg-white text-purple-900 rounded-full hover:bg-opacity-90 transition-colors" href="/dashboard">Get Started</Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"> Copy the code</button>
        </div>
      </div>
    </div>
  );
};

export default SpaceBackground;