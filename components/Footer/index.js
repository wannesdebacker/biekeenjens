import styles from './Footer.module.scss';
import Text from 'components/Text';
import Title from 'components/Title';

const Footer = ({ field1, field2, field3, field4 }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer__wrapper']}>
        <div className={styles['footer__content']}>
          <Title variant="h4">{field1}</Title>
        </div>
        {!!field2 && <div className={styles['footer__content']}>{field2}</div>}
        {!!field3 && <div className={styles['footer__content']}>{field3}</div>}
        {!!field4 && (
          <div className={styles['footer__content']}>
            <Text modWysiwyg>{field4}</Text>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;

export { Footer };
