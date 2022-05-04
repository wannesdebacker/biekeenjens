import Image from 'components/Image';
import Text from 'components/Text';
import Title from 'components/Title';
import React from 'react';
import styles from './GalleryBlock.module.scss';

const GalleryBlock = ({ title, text, images }) => {
  return (
    <div className={styles['gallery-block']}>
      <div className={styles['gallery-block__wrapper']}>
        <div className={styles['gallery-block__text-wrapper']}>
          {title && <Title>{title}</Title>}
          {text && <Text>{text}</Text>}
        </div>
        {images?.length && (
          <div className={styles['gallery-block__images-wrapper']}>
            {images.map(({ url, alt, id }, index) => (
              <>
                <div
                  key={`${id}-gallery-block-${index}`}
                  className={styles['gallery-block__image-wrapper']}
                >
                  <Image
                    modShadow={false}
                    src={url}
                    alt={alt}
                    modZoom
                    className={styles['gallery-block__image']}
                  />
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryBlock;

export { GalleryBlock };
