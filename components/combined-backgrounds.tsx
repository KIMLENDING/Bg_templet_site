"use client"
import React, { useEffect, useState } from 'react';
import { bg_templet } from '@/public/export_bg_templet';
import { BackgroundSelectorProps } from '@/utils/types';

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ bg }) => {
  const [activeBackground, setActiveBackground] = useState(bg);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    setActiveBackground(bg);
  }, [bg]);
  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(1200, window.innerWidth - 40); // 20px padding on each side
      setDimensions({ width, height: 600 });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const renderActiveBackground = () => {
    switch (activeBackground) {
      case 'space':
        return <bg_templet.SpaceBackground width={dimensions.width} height={dimensions.height} />;
      case 'rain':
        return <bg_templet.RainBackground width={dimensions.width} height={dimensions.height} />;
      case 'geometric':
        return <bg_templet.GeometricBackground width={dimensions.width} height={dimensions.height} />;
      case 'wave':
        return <bg_templet.WaveBackground width={dimensions.width} height={dimensions.height} />;
      case 'geometric_pattern':
        return <bg_templet.GeometricPatternBackground width={dimensions.width} height={dimensions.height} />;
      case 'wavy_gradient':
        return <bg_templet.WavyGradientBackground width={dimensions.width} height={dimensions.height} />;
      case 'smooth_gradient':
        return <bg_templet.SmoothGradientBackground width={dimensions.width} height={dimensions.height} />;
      case 'particle':
        return <bg_templet.ParticleBackground width={dimensions.width} height={dimensions.height} />;
      case 'geometric_pattern_v2':
        return <bg_templet.GeometricPatternBackgroundv2 width={dimensions.width} height={dimensions.height} />;
      case 'neon_rays':
        return <bg_templet.NeonRaysBackground width={dimensions.width} height={dimensions.height} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 ">
      {renderActiveBackground()}
    </div>
  );
};

export default BackgroundSelector;