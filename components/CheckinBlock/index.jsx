import Title from 'components/Title';
import React, { useCallback, useState } from 'react';
import styles from './CheckinBlock.module.scss';
import axios from 'axios';
import Text from 'components/Text';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from 'components/Button';

const CheckinBlock = ({ title, text }) => {
  const { query } = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useCallback((data, event) => {
    event.preventDefault();
    if (data) {
      axios
        .post('/api/checkin', data)
        .then((data) => {
          setFormSubmitted(true);
          setFormError(false);
        })
        .catch(() => {
          setFormSubmitted(false);
          setFormError(true);
        });
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
                <label htmlFor="naam" className={styles['checkin-block__label']}>
                  Naam
                </label>
                {errors.naam?.type === 'required' && (
                  <span className={styles['checkin-block__error']}>Naam is required</span>
                )}
                <input
                  id="naam"
                  autoComplete="bieke-jens-naam"
                  placeholder={'vb: Jeff Theunissen'}
                  {...register('naam', { required: true })}
                  className={styles['checkin-block__input']}
                />
              </li>
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
                <li className={styles['checkin-block__list-item']}>
                  <label htmlFor="dag" className={styles['checkin-block__label']}>
                    Dag
                  </label>
                  {errors.dag?.type === 'required' && (
                    <span className={styles['checkin-block__error']}>Day is required</span>
                  )}
                  <input
                    id="dag"
                    autoComplete="bieke-jens-dag"
                    placeholder={'vb: donderdag'}
                    {...register('dag', { required: true })}
                    className={styles['checkin-block__input']}
                  />
                </li>
              )}
              <li className={styles['checkin-block__list-item']}>
                <label htmlFor="genodigden" className={styles['checkin-block__label']}>
                  Genodigden
                </label>
                {errors.genodigden?.type === 'required' && (
                  <span className={styles['checkin-block__error']}>Genodigden is required</span>
                )}
                {errors.genodigden?.type === 'max' && (
                  <span className={styles['checkin-block__error']}>
                    Je kan maximum 20 genodigden uitnodigen
                  </span>
                )}
                {errors.genodigden?.type === 'min' && (
                  <span className={styles['checkin-block__error']}>
                    Je moet minimaal 1 genodigde uitnodigen
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
              <li
                className={classNames(
                  styles['checkin-block__list-item'],
                  styles['checkin-block__list-item--honing'],
                )}
              >
                <input type="text" {...register('honing')} />
              </li>
              <li className={styles['checkin-block__list-item']}>
                <Button type={'submit'}>Submit</Button>
              </li>
            </ul>
          </form>
        )}
        {formSubmitted && !formError && (
          <div className={styles['checkin-block__success']}>
            <Text modLarge>Je gegevens werden correct ingechecked</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckinBlock;

export { CheckinBlock };
