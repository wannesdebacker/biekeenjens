import styles from './PackageEngine.module.scss';
import Title from 'components/Title';
import Text from 'components/Text';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'components/Image';
import classNames from 'classnames';
import Button from 'components/Button';
import { PaymentCode } from 'sepa-payment-code';
import QRCode from 'react-qr-code';

const PackageEngine = ({ packages = [] }) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const { t } = useTranslation('common');
  const [activePane, setActivePane] = useState('1');
  const [showQr, setShowQr] = useState(null);

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
    if (totalPrice) {
      return new PaymentCode('Name', 'BE72000000001616', totalPrice);
    }

    return null;
  }, [totalPrice]);

  if (activePane === '2') {
    return (
      <div className={styles['package-engine']}>
        {activePackages?.map(({ id, title, price, image }) => (
          <div key={`${id}-cart`}>{title}</div>
        ))}
        {totalPrice}
        <Button
          onClick={() => {
            setActivePane('1');
          }}
        >
          {t('back')}
        </Button>
        <Button
          onClick={() => {
            setActivePane('3');
          }}
        >
          {t('go_to_payment')}
        </Button>
      </div>
    );
  }

  if (activePane === '3') {
    return (
      <div className={styles['package-engine']}>
        <Button
          onClick={() => {
            setActivePane('2');
          }}
        >
          {t('back')}
        </Button>
        <Button onClick={setShowQr} type="button">
          Generate QR code
        </Button>
        <div style={{ background: 'white', padding: '16px' }}>
          {showQr && paymentCode && <QRCode value={paymentCode?.getPayload()} />}
        </div>
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
              <label htmlFor={`package-${id}`}>
                <div className={styles['package__wrapper']}>
                  {title && <Title className={styles['package__title']}>{title}</Title>}
                  {description && <Text className={styles['package__title']}>{description}</Text>}
                  {price && <Text className={styles['package__price']}>{price}</Text>}
                  {image && (
                    <Image
                      src={image?.url}
                      alt={image?.alt}
                      className={styles['package__image']}
                      modShadow={false}
                    />
                  )}
                </div>
                <input
                  id={`package-${id}`}
                  type="checkbox"
                  value={id}
                  {...register('package', { required: true })}
                />
              </label>
            </li>
          ))}
        </ul>
        <div>
          <Button type="submit" disabled={!activePackages?.length}>
            {t('forms.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PackageEngine;

export { PackageEngine };
