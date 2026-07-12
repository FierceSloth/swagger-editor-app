export interface TechnologyItem {
  id: 'react' | 'typescript' | 'nextjs' | 'sass' | 'vite' | 'supabase';
  name: string;
  icon: string;
}

export const technologiesConfig: TechnologyItem[] = [
  {
    id: 'react',
    name: 'React',
    icon: '/icons/react.png',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '/icons/typescript.png',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '/icons/nextjs.png',
  },
  {
    id: 'sass',
    name: 'SASS',
    icon: '/icons/sass.png',
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: '/icons/vite.png',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: '/icons/supabase.png',
  },
];
