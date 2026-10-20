export type SiteConfig = typeof siteConfig;

export interface ExtLink {
  href: string;
  target?: '_blank' | '_self';
  'aria-label': string;
}

export const siteConfig = {
  name: "AJ's Portfolio",
  description: 'A comprehensive website of all my projects/hobbies/accomplishments.',
  navItems: [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Programming',
      href: '/programming'
    },
    {
      label: 'Video',
      href: '/video'
    },
    {
      label: 'Motion',
      href: '/motion_graphics'
    },
    {
      label: 'Graphics',
      href: '/graphic_design'
    },
    {
      label: '3D Animation',
      href: '/3d_animation'
    }
  ],
  extLinks: {
    github: {
      href: 'https://github.com/alexanderjalexander',
      target: '_blank',
      'aria-label': 'GitHub'
    },
    linkedin: {
      href: 'https://www.linkedin.com/in/ajansiewicz/',
      target: '_blank',
      'aria-label': 'LinkedIn'
    },
    resume: {
      href: '/resume',
      'aria-label': 'Resume'
    }
  } satisfies Record<string, ExtLink>
};
