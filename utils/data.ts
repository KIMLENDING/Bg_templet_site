// data/cardData.ts
import { CardData } from '@/utils/types';
import { codeSet } from "@/public/code/codeset";

export const cardData: CardData[] = [
    { id: 1, title: "Space", subtitle: "A moving wallpaper", imageSrc: "img/space.png", selectBg: 'space', codeData: codeSet.space },
    { id: 2, title: "Rain", subtitle: "A moving wallpaper", imageSrc: "img/rain.png", selectBg: 'rain', codeData: codeSet.rain },
    { id: 3, title: "Geometric", subtitle: "A moving wallpaper", imageSrc: "img/geometric.png", selectBg: 'geometric', codeData: codeSet.geometric },
    { id: 4, title: "Wave", subtitle: "A moving wallpaper", imageSrc: "img/wave.png", selectBg: 'wave', codeData: codeSet.wave },
    { id: 5, title: "Geometric Pattern", subtitle: "A moving wallpaper", imageSrc: "img/geometric_pattern.png", selectBg: 'geometric_pattern', codeData: codeSet.geometric_pattern },
    { id: 6, title: "Wavy Gradient", subtitle: "A moving wallpaper", imageSrc: "img/wavy_gradient.png", selectBg: 'wavy_gradient', codeData: codeSet.wavy_gradient },
    { id: 7, title: "Smooth gradient", subtitle: "A moving wallpaper", imageSrc: "img/smooth_gradient.png", selectBg: 'smooth_gradient', codeData: codeSet.smooth_gradient },
    { id: 8, title: "Particle", subtitle: "A moving wallpaper", imageSrc: "img/particle.png", selectBg: 'particle', codeData: codeSet.particle },
    { id: 9, title: "Geometric Pattern V2", subtitle: "A moving wallpaper", imageSrc: "img/geometric_pattern_v2.png", selectBg: 'geometric_pattern_v2', codeData: codeSet.geometric_pattern_v2 },
    { id: 10, title: "Neon Rays", subtitle: "A moving wallpaper", imageSrc: "img/neon_rays.png", selectBg: 'neon_rays', codeData: codeSet.neon_rays },
];
