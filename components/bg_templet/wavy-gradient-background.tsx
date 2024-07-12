import React from 'react';
import Link from 'next/link';

interface WavyGradientBackgroundProps {
  width: number;
  height: number;
}

const WavyGradientBackground: React.FC<WavyGradientBackgroundProps> = ({ width, height }) => {
  return (
    <div className="wavy-background" style={{ width: `${width}px`, height: `${height}px`, borderRadius: '1rem' }}>
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default WavyGradientBackground;
