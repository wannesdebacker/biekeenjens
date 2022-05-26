import Title from 'components/Title';
import React, { useCallback, useState } from 'react';
import styles from './CheckinBlock.module.scss';
import Text from 'components/Text';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from 'components/Button';
import { useTranslation } from 'next-i18next';

const { SiteClient } = require('datocms-client');

const CheckinBlock = ({ title, text, succesMessage }) => {
  const { query } = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const { t } = useTranslation('common');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dag: 'gold',
      aanwezig: 'yes',
    },
  });
  const watchGenodigden = watch('genodigden');
  const watchAanwezig = watch('aanwezig');

  const submitForm = useCallback((data, event) => {
    event.preventDefault();
    if (data) {
      try {
        const { aanwezig, naam, dag, genodigden, honing, otherguests } = data;

        if (honing) {
          setFormSubmitted(true);
          setFormError(false);

          return true;
        }

        const isAanwezig = aanwezig === 'yes';

        if (!isAanwezig || (naam !== '' && dag !== '' && genodigden !== '')) {
          async function addCheckin() {
            const client = new SiteClient(process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN);
            const record = await client.items.create({
              itemType: '218135', // model ID checkin
              naam,
              dag: isAanwezig ? dag : '',
              genodigden: isAanwezig ? genodigden : '',
              naamAndereGenodigden: isAanwezig ? otherguests : '',
              aanwezig: isAanwezig ? 'ja' : 'nee',
            });

            return record;
          }

          addCheckin();

          setFormSubmitted(true);
          setFormError(false);

          return true;
        }

        setFormError(true);

        return false;
      } catch (error) {
        setFormSubmitted(false);
        setFormError(true);
        return false;
      }
    }
  }, []);

  return (
    <div className={styles['checkin-block']}>
      <div className={styles['checkin-block__wrapper']}>
        <div className={styles['checkin-block__text']}>
          {title && <Title variant="h2">{title}</Title>}
          {text && <Text modWysiwyg>{text}</Text>}
        </div>
        {!formSubmitted && (
          <form onSubmit={handleSubmit(submitForm)} className={styles['checkin-block__form']}>
            <ul className={styles['checkin-block__list']}>
              <li className={styles['checkin-block__list-item']}>
                <div className={styles['checkin-block__label']}>
                  {t('forms.availability.label')}
                </div>
                <label className={styles['checking-block__input-label']}>
                  <input
                    type="radio"
                    value="yes"
                    name="aanwezigheid"
                    className={styles['checkin-block__checkbox']}
                    {...register('aanwezig', { required: true })}
                  />
                  <span className={styles['checkin-block__checkbox-label']}>
                    {t('forms.availability.available')}
                  </span>
                </label>
                <label className={styles['checking-block__input-label']}>
                  <input
                    type="radio"
                    value="no"
                    name="aanwezigheid"
                    className={styles['checkin-block__checkbox']}
                    {...register('aanwezig', { required: true })}
                  />
                  <span className={styles['checkin-block__checkbox-label']}>
                    {t('forms.availability.unavailable')}
                  </span>
                </label>
              </li>
              <li className={styles['checkin-block__list-item']}>
                <label htmlFor="naam" className={styles['checkin-block__label']}>
                  {t('forms.name.label')}
                </label>
                {errors.naam?.type === 'required' && (
                  <span className={styles['checkin-block__error']}>
                    {t('forms.generic.required', { field: t('forms.name.label') })}
                  </span>
                )}
                <input
                  id="naam"
                  autoComplete="bieke-jens-naam"
                  placeholder={'vb: Jeff Theunissen'}
                  {...register('naam', { required: true })}
                  className={styles['checkin-block__input']}
                />
              </li>
              {watchAanwezig === 'yes' && (
                <>
                  {query?.day && (
                    <li
                      className={styles['checkin-block__list-item']}
                      style={{ visibilty: 'hidden', display: 'none' }}
                    >
                      <label htmlFor="dag" className={styles['checkin-block__label']}>
                        Dag
                      </label>
                      <input
                        id="dag"
                        value={query.day}
                        type={'hidden'}
                        autoComplete={'off'}
                        {...register('dag', { required: true })}
                        className={styles['checkin-block__input']}
                      />
                    </li>
                  )}
                  {!query?.day && (
                    <>
                      <li className={styles['checkin-block__list-item']}>
                        <div className={styles['checkin-block__label']}>{t('forms.day.label')}</div>
                        <label className={styles['checking-block__input-label']}>
                          <input
                            id="dag"
                            type="radio"
                            value="gold"
                            autoComplete="bieke-jens-dag"
                            className={styles['checkin-block__checkbox']}
                            {...register('dag', { required: true })}
                          />
                          <span className={styles['checkin-block__checkbox-label']}>
                            {t('forms.day.friday')}
                          </span>
                        </label>
                        <label className={styles['checking-block__input-label']}>
                          <input
                            id="dag"
                            type="radio"
                            value="diamond"
                            autoComplete="bieke-jens-dag"
                            {...register('dag', { required: true })}
                            className={styles['checkin-block__checkbox']}
                          />
                          <span className={styles['checkin-block__checkbox-label']}>
                            {t('forms.day.saturday')}
                          </span>
                        </label>
                      </li>
                    </>
                  )}
                  <li className={styles['checkin-block__list-item']}>
                    <label htmlFor="genodigden" className={styles['checkin-block__label']}>
                      {t('forms.guests.label')}
                    </label>
                    {errors.genodigden?.type === 'required' && (
                      <span className={styles['checkin-block__error']}>
                        {t('forms.generic.required', { field: t('forms.guests.label') })}
                      </span>
                    )}
                    {errors.genodigden?.type === 'max' && (
                      <span className={styles['checkin-block__error']}>
                        {t('forms.guests.max')}
                      </span>
                    )}
                    {errors.genodigden?.type === 'min' && (
                      <span className={styles['checkin-block__error']}>
                        {t('forms.guests.min')}
                      </span>
                    )}
                    <input
                      id="genodigden"
                      type={'number'}
                      min={1}
                      max={20}
                      placeholder={'vb: 2'}
                      autoComplete="bieke-jens-genodigden"
                      {...register('genodigden', { required: true, min: 1, max: 20 })}
                      className={styles['checkin-block__input']}
                    />
                  </li>
                  {watchGenodigden && parseInt(watchGenodigden) > 1 && (
                    <li className={styles['checkin-block__list-item']}>
                      <label htmlFor="otherguests" className={styles['checkin-block__label']}>
                        Namen van andere genodigden
                        {t('forms.otherGuests.label')}
                      </label>
                      {errors.otherguests?.type === 'required' && (
                        <span className={styles['checkin-block__error']}>
                          {t('forms.otherGuests.sublabel')}
                        </span>
                      )}
                      <textarea
                        id="otherguests"
                        autoComplete="bieke-jens-otherguests"
                        placeholder={'vb: Gerda Putmans, Willy Theunissen, Dirk Theunissen'}
                        {...register('otherguests', { required: true })}
                        className={styles['checkin-block__input']}
                      />
                    </li>
                  )}
                  <li
                    className={classNames(
                      styles['checkin-block__list-item'],
                      styles['checkin-block__list-item--honing'],
                    )}
                  >
                    <input type="text" {...register('honing')} />
                  </li>
                </>
              )}

              <li className={styles['checkin-block__list-item']}>
                <Button type={'submit'}>{t('forms.submit')}</Button>
              </li>
            </ul>
          </form>
        )}
        {formSubmitted && !formError && (
          <Text modWysiwyg className={styles['checkin-block__success']}>
            {succesMessage}
          </Text>
        )}
      </div>
    </div>
  );
};

export default CheckinBlock;

export { CheckinBlock };
