import { JSX } from 'react';
import s from './styles.module.scss';

const LoadingScreen = (): JSX.Element => {
  return (
    <section id={s.loading}>
      <div className={s.spinner_container}>
        <div>
          <div className={s.spinner} />
        </div>
      </div>
    </section>
  );
};

export default LoadingScreen;
