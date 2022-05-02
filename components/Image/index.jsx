import React from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import NextImage from 'next/image';
import Zoom from 'react-medium-image-zoom';

const Image = ({
  src,
  alt,
  className,
  width,
  height,
  modShadow = true,
  modZoom = false,
  fill,
  onClick,
  ...props
}) => {
  const classes = classNames(styles['image'], !!modShadow && styles['image--shadow'], className);

  if (width && height) {
    <div className={styles['image-wrapper']}>
      <NextImage
        src={src}
        alt={alt}
        className={classes}
        {...props}
        width={width}
        height={height}
        onClick={onClick}
      />
    </div>;
  }

  if (fill) {
    <div className={styles['image-wrapper']}>
      <NextImage
        src={src}
        alt={alt}
        className={classes}
        {...props}
        layout="fill"
        onClick={onClick}
      />
    </div>;
  }

  return (
    <div className={styles['image-wrapper']}>
      {!!modZoom && (
        <Zoom>
          <img src={src} alt={alt} className={classes} {...props} onClick={onClick} />
        </Zoom>
      )}
    </div>
  );
};

export default Image;

export { Image };
