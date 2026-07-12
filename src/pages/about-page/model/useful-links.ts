import type { ComponentType, SVGProps } from 'react';

import { BracketsIcon } from '@/shared/ui/brackets-icon';
import { GitHubIcon } from '@/shared/ui/github-icon';
import { GraduationCapIcon } from '@/shared/ui/graduation-cap-icon';

export interface UsefulLinkConfigItem {
  id: 'rs-school' | 'openapi' | 'github';
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const usefulLinksConfig: UsefulLinkConfigItem[] = [
  {
    id: 'rs-school',
    href: 'https://rs.school/',
    Icon: GraduationCapIcon,
  },
  {
    id: 'openapi',
    href: 'https://www.openapis.org/',
    Icon: BracketsIcon,
  },
  {
    id: 'github',
    href: 'https://github.com/FierceSloth/swagger-editor-app',
    Icon: GitHubIcon,
  },
];
