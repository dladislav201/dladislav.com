import Link from 'next/link';
import { Wrapper } from '@/shared/ui';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer__content">
          <p className="footer__copy">
            All of the code that powers this site is up on my{' '}
            <Link
              href={'https://github.com/dladislav201'}
              className="link"
              target="_blank"
            >
              Github page
            </Link>{' '}
            under the{' '}
            <Link
              href={'https://github.com/dladislav201/dladislav.com'}
              className="link"
              target="_blank"
            >
              dladislav.com
            </Link>{' '}
            repo.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};
