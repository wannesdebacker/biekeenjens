import styles from './Title.module.scss';
import classNames from 'classnames';

const Title = ({ className, variant = 'h2', children }) => {
  const classes = classNames(styles['title'], styles[`title--${variant}`], className);

  const TagName = variant || 'h2';

  return <TagName className={classes}>{children}</TagName>;
};

export default Title;

export { Title };
