import React from 'react';
import Text from 'components/Text';
import Title from 'components/Title';
import PackageEngine from 'components/PackageEngine';
import classNames from 'classnames';

import styles from './PackageBlock.module.scss';

const PackageBlock = ({ title, text, iban, packages = [], paymentInstructions }) => {
  const classes = classNames(styles['package-block']);

  return (
    <div className={styles['package-block-wrapper']}>
      <div className={classes}>
        <div className={styles['package-block__text-wrapper']}>
          {title && <Title className={styles['package-block__title']}>{title}</Title>}
          {text && (
            <Text modStructured className={styles['package-block__text']}>
              {text}
            </Text>
          )}
        </div>
        <PackageEngine packages={packages} iban={iban} paymentInstructions={paymentInstructions} />
      </div>
    </div>
  );
};

export default PackageBlock;

export { PackageBlock };
