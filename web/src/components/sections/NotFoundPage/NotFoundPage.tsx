import { Button, Wrapper } from '@/components';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <Wrapper centered fullHeight>
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__copy">The page you’re looking for can’t be found.</p>
        <div className="not-found__button-wrapper">
          <Button href="/" variant="secondary" size="small">
            Home
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
