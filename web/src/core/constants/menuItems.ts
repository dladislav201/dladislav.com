export interface MenuItem {
  href: string;
  label: string;
  target?: string;
}

/**
 * Menu items used in navigation
 */

export const menuItems: MenuItem[] = [
  {
    href: '/vladyslav_dobrodii_resume.pdf',
    label: 'Resume',
    target: '_blank',
  },
  {
    href: 'https://www.linkedin.com/in/vladyslav-dobrodii-20384a233/',
    label: 'LinkedIn',
    target: '_blank',
  },
  {
    href: 'mailto:dobrodii.vlad200@gmail.com',
    label: 'Email',
    target: '_blank',
  },
];
