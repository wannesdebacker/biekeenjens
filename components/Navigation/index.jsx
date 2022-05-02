import classNames from 'classnames';
import styles from './Navigation.module.scss';
import Link from 'next/link';

const Navigation = ({ pages = [], className }) => {
  const classes = classNames(styles['navigation'], className);

  return (
    <div className={classes}>
      <div className={styles['navigation__container']}>
        <div className="navigation__logo"></div>
        <nav className={styles['navigation__nav']}>
          {pages && pages.length && (
            <ul className={styles['navigation__items']}>
              {pages.map((item, index) => {
                return (
                  <li className={styles['navigation__item']} key={`${item.title}-${index}`}>
                    <Link href={`/${item.slug}`}>
                      <a className={styles['navigation__link']}>{item.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;

export { Navigation };