import reactIcon from '../assets/icons/react.png';
import typescriptIcon from '../assets/icons/typescript.png';
import nextjsIcon from '../assets/icons/nextjs.png';
import scssIcon from '../assets/icons/sass.png';
import viteIcon from '../assets/icons/vite.png';
import supabaseIcon from '../assets/icons/supabase.png';
import type { StaticImageData } from 'next/image';

export interface TechnologyItem {
  id: 'react' | 'typescript' | 'nextjs' | 'sass' | 'vite' | 'supabase';
  name: string;
  icon: StaticImageData;
}

export const technologiesConfig: TechnologyItem[] = [
  {
    id: 'react',
    name: 'React',
    icon: reactIcon,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: typescriptIcon,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: nextjsIcon,
  },
  {
    id: 'sass',
    name: 'SASS',
    icon: scssIcon,
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: viteIcon,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: supabaseIcon,
  },
];
