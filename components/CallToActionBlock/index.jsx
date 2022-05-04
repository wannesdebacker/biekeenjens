import Button from 'components/Button';
import Text from 'components/Text';
import Title from 'components/Title';
import React from 'react';
import styles from './CallToActionBlock.module.scss';

const CallToActionBlock = ({ title, text, links }) => {
  return (
    <div className={styles['call-to-action-block']}>
      <div className={styles['call-to-action-block__wrapper']}>
        {title && (
          <Title className={styles['call-to-action-block__title']} variant="h2">
            {title}
          </Title>
        )}
        {text && (
          <Text modWysiwyg className={styles['call-to-action-block__text']}>
            {text}
          </Text>
        )}
        {links && links.length && (
          <ul className={styles['call-to-action-block__links']}>
            {links.map(({ id, slug, title }, index) => (
              <li className={styles['call-to-action-block__link']} key={`${slug}-${index}-${id}`}>
                <Button href={`/${slug}`} modDark>
                  {title}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CallToActionBlock;

export { CallToActionBlock };
