import React from 'react';
import Link from 'next/link';

interface SmoothGradientBackgroundProps {
  width: number;
  height: number;
}

const SmoothGradientBackground: React.FC<SmoothGradientBackgroundProps> = ({ width, height }) => {
  return (
    <div className="gradient-background" style={{ width: `${width}px`, height: `${height}px`, borderRadius: '1rem' }}>
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default SmoothGradientBackground;
