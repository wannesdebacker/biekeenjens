import classNames from 'classnames';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageChooser from 'components/LanguageChooser';

const Navigation = ({ pages = [], className }) => {
  const classes = classNames(styles['navigation'], className);
  const { asPath } = useRouter();

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
                    <Link href={item.slug === 'homepage' ? '/' : `/${item.slug}`}>
                      <a
                        className={classNames(
                          styles['navigation__link'],
                          asPath === `/${item.slug}` && styles['navigation__link--active'],
                        )}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
        <div className={styles['navigation__language-chooser']}>
          <LanguageChooser />
        </div>
      </div>
    </div>
  );
};

export default Navigation;

export { Navigation };
