import React from 'react';

import styles from './LanguageChooser.module.scss';
import Link from 'next/link';

import { useRouter } from 'next/router';

const LanguageChooser = () => {
  const { locales, locale, pathname } = useRouter();

  return (
    <div className={styles['language-chooser']}>
      <ul className={styles['language-chooser__list']}>
        {locales.map((singleLocale, index) => (
          <li className={styles['language-chooser__item']} key={`locale-${singleLocale}-${index}`}>
            {singleLocale !== locale && (
              <Link href={pathname} locale={singleLocale}>
                <a className={styles['language-chooser__link']}>{singleLocale}</a>
              </Link>
            )}
            {singleLocale === locale && (
              <span className={styles['language-chooser__span']}>{singleLocale}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageChooser;

export { LanguageChooser };
