import classNames from 'classnames';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguageChooser from 'components/LanguageChooser';
import useMediaQuery from 'hooks/useMedia';
import { useEffect, useState } from 'react';

const Navigation = ({ pages = [], className }) => {
  const { asPath } = useRouter();
  const [menuVisible, toggleMenu] = useState(true);
  const mediaQuery = useMediaQuery();

  const smallMedia = mediaQuery === 'small' || mediaQuery === 'xsmall';
  const classes = classNames(
    styles['navigation'],
    smallMedia && styles['navigation--mobile'],
    menuVisible && styles['navigation--visible'],
    className,
  );

  useEffect(() => {
    if (mediaQuery === 'small' || mediaQuery === 'xsmall') {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  }, [mediaQuery]);

  return (
    <div className={classes}>
      <div className={styles['navigation__container']}>
        <div className="navigation__logo"></div>
        <nav className={classNames(styles['navigation__nav'])}>
          {!!smallMedia && !menuVisible && (
            <button
              className={classNames(styles['navigation__menu-button'])}
              aria-label="Menu"
              onClick={() => {
                toggleMenu(!menuVisible);
              }}
            >
              <svg
                viewBox="0 0 100 80"
                width="40"
                height="40"
                className={classNames(styles['navigation__menu-button__icon'])}
              >
                <title>Menu</title>
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
              </svg>
            </button>
          )}
          {pages && pages.length && menuVisible && (
            <>
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
                          onClick={() => {
                            toggleMenu(false);
                          }}
                        >
                          {item.title}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {!!smallMedia && (
                <div className={styles['navigation__language-chooser']}>
                  <LanguageChooser />
                </div>
              )}
              {!!smallMedia && (
                <button
                  onClick={() => {
                    toggleMenu(false);
                  }}
                  className={classNames(styles['navigation__close-button'])}
                  aria-label="Close menu"
                >
                  <svg
                    viewBox="0 0 460.775 460.775"
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames(styles['navigation__close-button__icon'])}
                  >
                    <path d="m285.08 230.397 171.138-171.127c6.076-6.077 6.076-15.911 0-21.986l-32.707-32.719c-2.913-2.911-6.866-4.55-10.992-4.55-4.127 0-8.08 1.639-10.993 4.55l-171.138 171.14-171.138-171.14c-2.913-2.911-6.866-4.55-10.993-4.55-4.126 0-8.08 1.639-10.992 4.55l-32.707 32.719c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128-171.121 171.107c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719c2.911 2.911 6.865 4.55 10.992 4.55s8.08-1.639 10.994-4.55l171.117-171.12 171.118 171.12c2.913 2.911 6.866 4.55 10.993 4.55 4.128 0 8.081-1.639 10.992-4.55l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986z" />
                  </svg>
                </button>
              )}
            </>
          )}
        </nav>
        {!smallMedia && (
          <div className={styles['navigation__language-chooser']}>
            <LanguageChooser />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;

export { Navigation };
