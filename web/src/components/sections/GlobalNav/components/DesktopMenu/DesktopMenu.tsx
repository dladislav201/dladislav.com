import Link from 'next/link';
import { menuItems } from '@/core/constants';
import './DesktopMenu.scss';

export const DesktopMenu = () => {
  return (
    <ul className="desktop-menu">
      {menuItems.map((item, index) => (
        <li key={index} className="desktop-menu__item">
          <Link
            href={item.href}
            className="desktop-menu__link"
            target={item.target}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
