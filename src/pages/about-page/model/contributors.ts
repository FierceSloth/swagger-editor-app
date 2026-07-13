export type ContributorRoleVariant = 'blue' | 'green' | 'yellow';

export interface ContributorConfigItem {
  id: 'dastan' | 'meruert' | 'anna';
  githubUrl: string;
  avatarUrl: string;
  roleVariant: ContributorRoleVariant;
}

export const contributorsConfig: ContributorConfigItem[] = [
  {
    id: 'dastan',
    githubUrl: 'https://github.com/FierceSloth',
    avatarUrl: 'https://github.com/FierceSloth.png',
    roleVariant: 'blue',
  },
  {
    id: 'meruert',
    githubUrl: 'https://github.com/merucoding',
    avatarUrl: 'https://github.com/merucoding.png',
    roleVariant: 'green',
  },
  {
    id: 'anna',
    githubUrl: 'https://github.com/dilmun1101',
    avatarUrl: 'https://github.com/dilmun1101.png',
    roleVariant: 'yellow',
  },
];
