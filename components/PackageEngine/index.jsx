import styles from './PackageEngine.module.scss';
import Title from 'components/Title';
import Text from 'components/Text';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import Image from 'components/Image';
import classNames from 'classnames';
import Button from 'components/Button';
import { PaymentCode } from 'sepa-payment-code';
import QRCode from 'react-qr-code';

const PackageEngine = ({ packages = [], iban = '', paymentInstructions }) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const { t } = useTranslation('common');
  const [activePane, setActivePane] = useState('1');
  const [showQr, setShowQr] = useState(null);
  const packageRef = useRef();

  const submitForm = useCallback(({ packages }, event) => {
    setActivePane('2');
    event.preventDefault();
  }, []);
  const packageWatcher = watch('package');

  const activePackages = useMemo(() => {
    return packages.filter(({ id }) =>
      packageWatcher?.length > 0 ? packageWatcher?.includes(id) : false,
    );
  }, [packageWatcher, packages]);

  const totalPrice = useMemo(() => {
    if (activePackages?.length) {
      let currentPrice = 0;

      activePackages.forEach(({ price }) => {
        currentPrice += price;
      });

      return currentPrice;
    }

    return 0;
  }, [activePackages]);

  const packageActive = useCallback(
    (id) =>
      activePackages?.length > 0 ? activePackages?.some((pack) => pack['id'] === id) : false,
    [activePackages],
  );

  const paymentCode = useMemo(() => {
    if (totalPrice && iban) {
      return new PaymentCode('Bieke en Jens', iban, totalPrice);
    }

    return null;
  }, [totalPrice, iban]);

  // const changeAmount = (id, amount) => {
  //   packages.forEach((pkg) => {
  //     if (pkg.id === id) {
  //       pkg.amount = amount;
  //     }
  //   });
  // };

  useEffect(() => {
    packages.forEach((pkg) => {
      pkg.amount = 0;
    });
  }, [packages]);

  if (activePane === '2') {
    return (
      <div className={styles['package-engine']}>
        <div className={styles['package-engine__result']}>
          <ul className={styles['package-engine__items']}>
            {activePackages?.map(({ id, title, price, image }) => (
              <li className={styles['package-engine__item']} key={`${id}-cart`}>
                {title && (
                  <Title className={styles['package__title']} variant="h4">
                    {title}
                  </Title>
                )}
                {image && (
                  <Image
                    src={image?.url}
                    alt={image?.alt}
                    className={styles['package__image']}
                    modShadow={false}
                  />
                )}
                {price && <Text className={styles['package__price']}>{price}</Text>}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['package__qr-price']}>{totalPrice}</div>
        {!!totalPrice && (
          <>
            <div
              className={classNames(styles['packages__footer'], styles['packages__footer--block'])}
            >
              <strong>{t('package.total_amount_price', { price: totalPrice })}</strong>
              <div>
                <Button onClick={setShowQr} type="button">
                  {t('forms.generate_qr_code')}
                </Button>
              </div>
            </div>
            <div className={styles['package__qr-wrapper']}>
              <div>
                {showQr && paymentCode && (
                  <div className={styles['package__qr__instructions']}>
                    <Text modWysiwyg>{paymentInstructions}</Text>
                  </div>
                )}
                {showQr && paymentCode && (
                  <div className={styles['package__qr']}>
                    <QRCode value={paymentCode?.getPayload()} />
                  </div>
                )}
                {showQr && paymentCode && (
                  <Text>{t('package.fallback', { price: totalPrice, iban })}</Text>
                )}
              </div>
            </div>
          </>
        )}
        <Button
          onClick={() => {
            setActivePane('1');
          }}
        >
          {t('package.previous_step')}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles['package-engine']}>
      <form onSubmit={handleSubmit(submitForm)}>
        <ul className={styles['packages__list']}>
          {packages.map(({ id, title, description, price, image }) => (
            <li
              key={id}
              className={classNames(
                styles['package'],
                !!packageActive(id) && styles['package--active'],
              )}
            >
              <label htmlFor={`package-${id}`} className={styles['package__label']}>
                <div className={styles['package__wrapper']}>
                  {title && (
                    <Title className={styles['package__title']} variant="h4">
                      {title}
                    </Title>
                  )}
                  {description && <Text className={styles['package__text']}>{description}</Text>}
                  {image && (
                    <Image
                      src={image?.url}
                      alt={image?.alt}
                      className={styles['package__image']}
                      modShadow={false}
                    />
                  )}
                  <div className={styles['package__price-wrapper']}>
                    <div className={styles['package__amount']}>
                      {/* <input
                        onChange={({ target }) => {
                          changeAmount(id, target.value);
                        }}
                        className={styles['package__amount-input']}
                        type="number"
                      /> */}
                    </div>
                    {price && <Text className={styles['package__price']}>{price}</Text>}
                  </div>
                </div>
                <input
                  id={`package-${id}`}
                  type="checkbox"
                  value={id}
                  className={styles['package__checkbox']}
                  {...register('package', { required: true })}
                  // onChange={() => {
                  //   changeAmount(id, 1);
                  // }}
                />
              </label>
            </li>
          ))}
        </ul>
        {!!totalPrice && (
          <div className={styles['packages__footer']}>
            <div>
              {t('package.total_amount_items', { items: activePackages?.length })} -{' '}
              <strong>{t('package.total_amount_price', { price: totalPrice })}</strong>
            </div>
            <div>
              <Button type="submit" disabled={!activePackages?.length}>
                {t('package.to_cart')}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PackageEngine;

export { PackageEngine };
