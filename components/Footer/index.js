import styles from './Footer.module.scss';
import Link from 'next/link';
import Title from 'components/Title';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__wrapper']}>
        <div className={styles['footer__content']}>
          <Title variant="h4">Bieke en Jens</Title>
        </div>
        <div className={styles['footer__content']}>22/03/2022</div>
        <div className={styles['footer__content']}>BE34 2342 4323 4323</div>
        <div className={styles['footer__content']}>
          <Link href={'/about_us'}>
            <a className={styles['footer__link']}>Meer info</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export { Footer };
