
const space = `"use client"
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
    star.element.style.width = \`\${star.size}px\`;
    star.element.style.height = \`\${star.size}px\`;
    star.element.style.opacity = '0';
    star.element.style.transform = \`translate(\${star.x}px, \${star.y}px)\`;
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
    star.element.style.transform = \`translate(\${star.x}px, \${star.y}px)\`;

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
    <div ref={containerRef} style={{
      width: \`\${width}px\`,
      height: \`\${height}px\`,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom, #581c87, #000000)',
      borderRadius: '1rem'
    }}>
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

export default SpaceBackground;`;


const rain = `"use client"
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

        ctx.strokeStyle = \`rgba(200, 200, 255, \${ripple.opacity})\`;
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
    <div style={{ position: 'relative', width: \`\${width}px\`, height: \`\${height}px\` }}>
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


export default RainBackground;`;

const geometric = `"use client"
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
    <div style={{ position: 'relative', width: \`\${width}px\`, height: \`\${height}px\`, borderRadius: '1rem' }}>
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

export default GeometricBackground;`;

const wave = `import React from 'react';
import Link from 'next/link';

interface WaveBackgroundProps {
  width: number;
  height: number;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ width, height }) => {
  return (
    <div style={{ position: 'relative', width: \`\${width}px\`, height: \`\${height}px\`, overflow: 'hidden', borderRadius: '1rem' }}>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bottom: 0,
          left: 0,
        }}
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.1)" />
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
        <h1 className="text-4xl font-bold mb-4 ">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
      <style jsx>{\`
        .waves {
          background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 150%);
        }
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
      \`}</style>
    </div>
  );
};

export default WaveBackground;`;

const geometric_pattern = `import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

interface GeometricBackgroundProps {
  width: number;
  height: number;
}

const { className, styles } = css.resolve\`
  @keyframes rotateCircle {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .geo-bg-circle {
    position: absolute;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .geo-bg-circle::before {
    content: '';
    position: absolute;
    width: 20%;
    height: 20%;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10%;
  }

  .geo-bg-circle1 {
    width: 300px;
    height: 300px;
    top: -50px;
    left: -50px;
    animation: rotateCircle 20s linear infinite;
  }
  .geo-bg-circle1::before {
    width: 30%;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.4);
  }

  .geo-bg-circle2 {
    width: 300px;
    height: 300px;
    bottom: -100px;
    right: -100px;
    animation: rotateCircle 25s linear infinite reverse;
  }

  .geo-bg-circle2::before {
    width: 30%;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.4);
  }

  .geo-bg-circle3 {
    width: 150px;
    height: 50px;
    bottom: 30px;
    left: 0px;
    animation: rotateCircle 15s linear infinite;
  }

  .geo-bg-circle3::before {
    width: 40%;
    height: 5px;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.4);
  }

  .geo-bg-circle4 {
    width: 400px;
    height: 400px;
    top: -100px;
    right: -30px;
    animation: rotateCircle 15s linear infinite;
  }

  .geo-bg-circle4::before {
    width: 70%;
    height: 10px;
    border-radius: 0%;
    background-color: rgba(255, 255, 255, 0.5);
  }


\`;

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ width, height }) => {
  return (
    <div className="geo-background" style={{ width: \`\${width}px\`, height: \`\${height}px\`, borderRadius: '1rem' }}>
      <div className={\`\${className} geo-bg-circle geo-bg-circle1\`}></div>
      <div className={\`\${className} geo-bg-circle geo-bg-circle2\`}></div>
      <div className={\`\${className} geo-bg-circle geo-bg-circle3\`}></div>
      <div className={\`\${className} geo-bg-circle geo-bg-circle4\`}></div>
      <div className="geo-content">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-purple-600 hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
      <style jsx>{\`
        .geo-background {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #8B5CF6, #EC4899);
        }
        .geo-content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 20px;
        }
      \`}</style>
      {styles}
    </div>
  );
};

export default GeometricBackground;`;

const wavy_gradient = `import React from 'react';
import Link from 'next/link';

interface WavyGradientBackgroundProps {
  width: number;
  height: number;
}

const WavyGradientBackground: React.FC<WavyGradientBackgroundProps> = ({ width, height }) => {
  return (
    <div className="wavy-background" style={{ width: \`\${width}px\`, height: \`\${height}px\`, borderRadius: '1rem' }}>
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      <div className="content">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-indigo-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
      <style jsx>{\`
        .wavy-background {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
        }
        .wave-container {
          position: absolute;
          width: 200%;
          height: 100%;
          top: 0;
          left: 0;
          transform: translate3d(0, 0, 0);
        }
        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transform: translate3d(0, 0, 0);
        }
        .wave1 {
          animation: wave 8s infinite linear;
        }
        .wave2 {
          animation: wave 10s infinite linear;
        }
        .wave3 {
          animation: wave 12s infinite linear;
        }
        @keyframes wave {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-25%) scaleY(0.8);
          }
          100% {
            transform: translateX(-50%) scaleY(1);
          }
        }
        .content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 20px;
        }
      \`}</style>
    </div>
  );
};

export default WavyGradientBackground;`;

const smooth_gradient = `import React from 'react';
import Link from 'next/link';

interface SmoothGradientBackgroundProps {
  width: number;
  height: number;
}

const SmoothGradientBackground: React.FC<SmoothGradientBackgroundProps> = ({ width, height }) => {
  return (
    <div className="gradient-background" style={{ width: \`\${width}px\`, height: \`\${height}px\`, borderRadius: '1rem' }}>
      <div className="gradient-layer"></div>
      <div className="content">
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-indigo-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
      <style jsx>{\`
        .gradient-background {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #4f46e5, #7c3aed);
        }
        .gradient-layer {
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(-45deg, #ff3d00, #0400ff, #4cc9f0, #4361ee);
          background-size: 400% 400%;
          animation: gradientBackground 15s ease infinite;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 20px;
        }
      \`}</style>
    </div>
  );
};

export default SmoothGradientBackground;`;

const particle = `import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface ParticleBackgroundProps {
  width: number;
  height: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number }> = [];
    let mouse = { x: 0, y: 0 };

    const createParticles = () => {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * 1;
          particle.y -= Math.sin(angle) * 1;
        }
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = width;
      canvas.height = height;
      createParticles();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [width, height]);

  return (
    <div style={{ position: 'relative', width: \`\${width}px\`, height: \`\${height}px\` }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, #3498db, #8e44ad)'
          , borderRadius: '1rem'
        }}
      />
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-purple-600 hover:bg-opacity-10 transition-colors">
            Copy the code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticleBackground;`;

const geometric_pattern_v2 = `import React, { useMemo } from 'react';
import Link from 'next/link';

interface GeometricPatternBackgroundv2Props {
  width: number;
  height: number;
}

const GeometricPatternBackgroundv2: React.FC<GeometricPatternBackgroundv2Props> = ({ width, height }) => {
  const patternSize = 100;

  const generatePolygon = (size: number) => {
    const points = [];
    const sides = 6; // Hexagon
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = size / 2 + (size / 2) * Math.cos(angle);
      const y = size / 2 + (size / 2) * Math.sin(angle);
      points.push(\`\${x},\${y}\`);
    }
    return points.join(' ');
  };

  const patterns = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => (
      <pattern
        key={index}
        id={\`pattern-\${index}\`}
        x="0"
        y="0"
        width={patternSize}
        height={patternSize}
        patternUnits="userSpaceOnUse"
      >
        <polygon
          points={generatePolygon(patternSize * 0.8)}
          fill="none"
          stroke={\`rgba(255, 255, 255, \${0.2 - index * 0.03})\`}
          strokeWidth="1"
        />
      </pattern>
    ));
  }, [patternSize]);

  return (
    <div style={{ position: 'relative', width: \`\${width}px\`, height: \`\${height}px\`, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'linear-gradient(45deg, #3498db, #8e44ad)',
        }}
      >
        <defs>{patterns}</defs>
        {Array.from({ length: 3 }).map((_, index) => (
          <rect
            key={index}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={\`url(#pattern-\${index})\`}
            className={\`pattern-layer-\${index}\`}
          />
        ))}
      </svg>
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 className="text-4xl font-bold mb-4">The API Security Framework</h1>
        <p className="mb-6">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
        <div className="space-x-4">
          <Link href="/dashboard" className="px-6 py-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors">
            Get Started
          </Link>
          <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-purple-600 hover:bg-opacity-10 transition-colors">
            Read the docs
          </button>
        </div>
      </div>
      <style jsx>{\`
        @keyframes movePattern {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(\${patternSize}px, \${patternSize}px);
          }
        }
        .pattern-layer-0 {
          animation: movePattern 60s linear infinite;
        }
        .pattern-layer-1 {
          animation: movePattern 40s linear infinite reverse;
        }
        .pattern-layer-2 {
          animation: movePattern 50s linear infinite;
        }
      \`}</style>
    </div>
  );
};

export default GeometricPatternBackgroundv2;`;

const neon_rays = `import React, { useMemo } from 'react';

interface NeonRaysBackgroundProps {
  width: number;
  height: number;
}

const NeonRaysBackground: React.FC<NeonRaysBackgroundProps> = ({ width, height }) => {
  const rayCount = 60;
  const colors = ['#FF1493', '#00FFFF', '#FF69B4', '#1E90FF', '#FF00FF'];

  const rays = useMemo(() => {
    return Array.from({ length: rayCount }).map((_, index) => {
      const angle = (index / rayCount) * 360;
      const length = Math.random() * 40 + 60; // 60% to 100% of radius
      const color = colors[Math.floor(Math.random() * colors.length)];
      const animationDelay = Math.random() * 3;
      return { angle, length, color, animationDelay };
    });
  }, [rayCount]);

  return (
    <div style={{ width: \`\${width}px\`, height: \`\${height}px\`, overflow: 'hidden', background: '#000', position: 'relative', borderRadius: '1rem' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        {rays.map((ray, index) => (
          <line
            key={index}
            x1="100"
            y1="100"
            x2={100 + ray.length * Math.cos(ray.angle * Math.PI / 180)}
            y2={100 + ray.length * Math.sin(ray.angle * Math.PI / 180)}
            stroke={ray.color}
            strokeWidth="2"
            className="ray"
            style={{ animationDelay: \`\${ray.animationDelay}s\` }}
          />
        ))}
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 1
      }}>
        <h1 className="text-4xl font-bold mb-4">Neon Rays Background</h1>
        <p className="mb-6">Inspired by the dynamic neon light effect.</p>
      </div>
      <style jsx>{\`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        .ray {
          animation: pulse 3s infinite;
          transform-origin: center;
        }
      \`}</style>
    </div>
  );
};

export default NeonRaysBackground;`;

const codeSet = {
  space: space,
  rain: rain,
  geometric: geometric,
  wave: wave,
  geometric_pattern: geometric_pattern,
  wavy_gradient: wavy_gradient,
  smooth_gradient: smooth_gradient,
  particle: particle,
  geometric_pattern_v2: geometric_pattern_v2,
  neon_rays: neon_rays
}
export { codeSet }

