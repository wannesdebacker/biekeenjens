import classNames from 'classnames';
import styles from './Header.module.scss';

import Title from 'components/Title';
import Button from 'components/Button';
import Text from 'components/Text';
import Image from 'components/Image';

import { format } from 'date-fns';
import { nl, en } from 'date-fns/locale';

import React from 'react';
import { useRouter } from 'next/router';

const Header = ({ className, title, logo, image, links = [], date, small = false }) => {
  const classes = classNames(styles['header'], styles['header--small'], className);
  const { locale } = useRouter();

  if (small) {
    return (
      <header className={classes}>
        <figure className={styles['header__logo']}>
          <Image
            className={styles['header__logo__img']}
            src={logo?.url}
            alt={logo?.alt}
            modShadow={false}
            modZoom={false}
          />
        </figure>
        {image && (
          <div className={styles['header__artwork']}>
            <figure className={styles['header__figure']}>
              <img
                className={styles['header__image']}
                src={image?.url}
                alt={image?.alt}
                loading="lazy"
              />
            </figure>
          </div>
        )}
        <div className={styles['header__text-content']}>
          {!!title && (
            <Title className={styles['header__title']} variant="h1" modLarge>
              {title}
            </Title>
          )}
          {!!date && (
            <Title variant={'h3'} className={styles['header__date']}>
              {format(new Date(date), 'do MMMM yyyy', { locale: locale === 'nl' ? nl : en })}
            </Title>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={classes}>
      <figure className={styles['header__logo']}>
        <Image
          className={styles['header__logo__img']}
          src={logo?.url}
          alt={logo?.alt}
          modShadow={false}
          modZoom={false}
        />
      </figure>
      <div className={styles['header__wrapper']}>
        <div className={styles['header__content']}>
          {image && (
            <div className={styles['header__artwork']}>
              <figure className={styles['header__figure']}>
                <img
                  className={styles['header__image']}
                  src={image?.url}
                  alt={image?.alt}
                  loading="lazy"
                />
              </figure>
            </div>
          )}
        </div>
      </div>
      <div className={styles['header__extra']}>
        <div className={styles['header__extra-text']}>
          {!!title && (
            <Title className={styles['header__title']} variant="h1" modLarge>
              {title}
            </Title>
          )}
          {!!date && (
            <Title variant={'h3'} className={styles['header__date']}>
              {format(new Date(date), 'do MMMM yyyy', { locale: locale === 'nl' ? nl : en })}
            </Title>
          )}
        </div>
        {!!links.length && (
          <div className={styles['header__links']}>
            {links.map(({ id, slug, title }, index) => (
              <div className={styles['header__link']} key={`${slug}-${index}-${id}`}>
                <Button href={`/${slug}`} modAlt={Number(index) % 2 === 0}>
                  {title}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

export { Header };
