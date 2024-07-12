import React from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

interface GeometricBackgroundProps {
  width: number;
  height: number;
}

const { className, styles } = css.resolve`
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


`;

const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ width, height }) => {
  return (
    <div className="geo-background" style={{ width: `${width}px`, height: `${height}px`, borderRadius: '1rem' }}>
      <div className={`${className} geo-bg-circle geo-bg-circle1`}></div>
      <div className={`${className} geo-bg-circle geo-bg-circle2`}></div>
      <div className={`${className} geo-bg-circle geo-bg-circle3`}></div>
      <div className={`${className} geo-bg-circle geo-bg-circle4`}></div>
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
      <style jsx>{`
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
      `}</style>
      {styles}
    </div>
  );
};

export default GeometricBackground;