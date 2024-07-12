import React, { useMemo } from 'react';

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
    <div style={{ width: `${width}px`, height: `${height}px`, overflow: 'hidden', background: '#000', position: 'relative', borderRadius: '1rem' }}>
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
            style={{ animationDelay: `${ray.animationDelay}s` }}
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
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        .ray {
          animation: pulse 3s infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default NeonRaysBackground;
