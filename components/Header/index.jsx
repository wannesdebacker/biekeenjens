import classNames from 'classnames';
import styles from './Header.module.scss';

import Title from 'components/Title';
import Button from 'components/Button';
import Text from 'components/Text';

const Header = ({ className, ...props }) => {
  const classes = classNames(styles['header'], className);
  const { title, intro } = props;

  return (
    <header className={classes}>
      <div className={styles['header__content']}>
        <div className={styles['header__text']}>
          {!!title && (
            <Title className={styles['header__title']} variant="h1">
              {title}
            </Title>
          )}
          {!!intro && (
            <Text modLarge modWysiwyg className={styles['header__copy']}>
              {intro}
            </Text>
          )}
          <Button href={'/'}>Go to button</Button>
        </div>
        <div className={styles['header__artwork']}>
          <figure className={styles['header__figure']}>
            <img
              className={styles['header__image']}
              src="https://picsum.photos/1300/1200"
              alt=""
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default Header;

export { Header };
