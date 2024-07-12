"use client"
import React, { useEffect, useState } from 'react';
import { bg_templet } from '@/public/export_bg_templet';
import { BackgroundSelectorProps } from '@/utils/types';

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ bg }) => {
  const [activeBackground, setActiveBackground] = useState(bg);
  useEffect(() => {
    setActiveBackground(bg);
  }, [bg]);
  const renderActiveBackground = () => {
    switch (activeBackground) {
      case 'space':
        return <bg_templet.SpaceBackground width={1200} height={600} />;
      case 'rain':
        return <bg_templet.RainBackground width={1200} height={600} />;
      case 'geometric':
        return <bg_templet.GeometricBackground width={1200} height={600} />;
      case 'wave':
        return <bg_templet.WaveBackground width={1200} height={600} />;
      case 'geometric_pattern':
        return <bg_templet.GeometricPatternBackground width={1200} height={600} />;
      case 'wavy_gradient':
        return <bg_templet.WavyGradientBackground width={1200} height={600} />;
      case 'smooth_gradient':
        return <bg_templet.SmoothGradientBackground width={1200} height={600} />;
      case 'particle':
        return <bg_templet.ParticleBackground width={1200} height={600} />;
      case 'geometric_pattern_v2':
        return <bg_templet.GeometricPatternBackgroundv2 width={1200} height={600} />;
      case 'neon_rays':
        return <bg_templet.NeonRaysBackground width={1200} height={600} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {renderActiveBackground()}
    </div>
  );
};

export default BackgroundSelector;