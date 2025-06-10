import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '../../model/constants';
import './MobileMenu.scss';

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className="mobile-menu"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              className="mobile-menu__item"
              variants={itemVariants}
            >
              <Link
                href={item.href}
                className="mobile-menu__link"
                target={item.target}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
