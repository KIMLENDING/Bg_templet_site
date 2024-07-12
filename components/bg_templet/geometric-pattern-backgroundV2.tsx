import React, { useMemo } from 'react';
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
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  const patterns = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => (
      <pattern
        key={index}
        id={`pattern-${index}`}
        x="0"
        y="0"
        width={patternSize}
        height={patternSize}
        patternUnits="userSpaceOnUse"
      >
        <polygon
          points={generatePolygon(patternSize * 0.8)}
          fill="none"
          stroke={`rgba(255, 255, 255, ${0.2 - index * 0.03})`}
          strokeWidth="1"
        />
      </pattern>
    ));
  }, [patternSize]);

  return (
    <div style={{ position: 'relative', width: `100%`, height: `${height}px`, overflow: 'hidden', borderRadius: '1rem' }}>
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
            fill={`url(#pattern-${index})`}
            className={`pattern-layer-${index}`}
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
      <style jsx>{`
        @keyframes movePattern {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(${patternSize}px, ${patternSize}px);
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
      `}</style>
    </div>
  );
};

export default GeometricPatternBackgroundv2;
