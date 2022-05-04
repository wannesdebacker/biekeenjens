import styles from './TextBlock.module.scss';
import Text from 'components/Text';
import Title from 'components/Title';
import classNames from 'classnames';
import Image from 'components/Image';
import 'react-medium-image-zoom/dist/styles.css';

const TextBlock = ({
  className,
  children,
  title,
  image,
  floatImage = false,
  floatRight = false,
}) => {
  const classes = classNames(
    styles['text-block'],
    !!floatImage && styles['text-block--float'],
    !!floatRight && styles['text-block--float-right'],
    className,
  );

  return (
    <div className={styles['text-block-wrapper']}>
      <div className={classes}>
        <div className={styles['text-block__text-wrapper']}>
          {title && <Title className={styles['text-block__title']}>{title}</Title>}
          {children && (
            <Text modWysiwyg className={styles['text-block__text']}>
              {children}
            </Text>
          )}
        </div>
        {image && (
          <div className={styles['text-block__image-wrapper']}>
            <Image
              src={image.url}
              alt={image.alt}
              modZoom={true}
              className={styles['text-block__image']}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TextBlock;

export { TextBlock };
