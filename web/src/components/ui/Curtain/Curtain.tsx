import { motion } from 'framer-motion';
import classNames from 'classnames';
import './Curtain.scss';

interface CurtainProps {
  onCurtainClick: () => void;
  disableOnDesktop?: boolean;
}

export const Curtain = ({ onCurtainClick, disableOnDesktop = false }: CurtainProps) => {
  const curtainVariants = {
    hidden: {
      display: 'none',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    show: {
      display: 'block',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      display: 'none',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={classNames('curtain', { 'curtain--mobile-only': disableOnDesktop })}
      variants={curtainVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onCurtainClick}
    />
  );
};
