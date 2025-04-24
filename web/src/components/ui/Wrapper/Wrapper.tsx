import classNames from 'classnames';
import './Wrapper.scss';

interface WrapperProps {
  children: React.ReactNode;
  centered?: boolean;
  fullHeight?: boolean;
}

export const Wrapper = ({ children, centered = false, fullHeight = false }: WrapperProps) => {
  const wrapperClass = classNames(
    'wrapper',
    { 'wrapper--centered': centered },
    { 'wrapper--full-height': fullHeight },
  );

  return <div className={wrapperClass}>{children}</div>;
};
